'''
Created on Apr 19, 2012

@package: superdesk media archive
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

SQL Alchemy based implementation for the meta data API.
'''

from ally.api.model import Content
from ally.container import wire
from ally.container.ioc import injected
from ally.exception import InputError
from ally.internationalization import _
from ally.support.sqlalchemy.util_service import handle
from ally.container.support import setup
from ally.support.util_io import pipe, timestampURI
from ally.support.util_sys import pythonPath
from cdm.spec import ICDM
from ..api.meta_data import QMetaData
from ..core.impl.meta_service_base import MetaDataServiceBaseAlchemy
from ..core.spec import IMetaDataHandler, IMetaDataReferencer, IThumbnailManager
from ..meta.meta_data import MetaDataMapped
from superdesk.media_archive.core.impl.meta_service_base import metaTypeFor, thumbnailFormatFor
from superdesk.media_archive.meta.meta_data import META_TYPE_KEY
from sqlalchemy.exc import SQLAlchemyError
from datetime import datetime
from os import makedirs, access, W_OK
from os.path import join, getsize, abspath, exists, isdir, split
from superdesk.media_archive.api.meta_data import IMetaDataUploadService
from shutil import move

# --------------------------------------------------------------------

@injected
@setup(IMetaDataUploadService)
class MetaDataServiceAlchemy(MetaDataServiceBaseAlchemy, IMetaDataReferencer, IMetaDataUploadService):
    '''
    Implementation for @see: IMetaDataService, and also provides services as the @see: IMetaDataReferencer
    '''

    base_dir_path = join('workspace', 'media_archive', 'content'); wire.config('base_dir_path', doc='''
    The base path used as starting path to store unknown(other) media''')
    content_dir_path = join('workspace', 'media_archive', 'process_queue'); wire.config('content_dir_path', doc='''
    The folder path where the content is queued for processing''')
    format_file_name = '%(id)s.%(file)s'; wire.config('format_file_name', doc='''
    The format for the files names in the processing queue of media archive''')

    cdmArchive = ICDM
    # The archive CDM.
    thumbnailManager = IThumbnailManager; wire.entity('thumbnailManager')
    # Provides the thumbnail referencer
    metaDataHandlers = list
    # The handlers list used by the meta data in order to get the references.

    def __init__(self):
        '''
        Construct the meta data service.
        '''
        assert isinstance(self.base_dir_path, str), 'Invalid base directory %s' % self.base_dir_path
        assert isinstance(self.content_dir_path, str), 'Invalid processing directory %s' % self.content_dir_path
        assert isinstance(self.cdmArchive, ICDM), 'Invalid archive CDM %s' % self.cdmArchive
        assert isinstance(self.thumbnailManager, IThumbnailManager), \
        'Invalid thumbnail referencer %s' % self.thumbnailManager
        assert isinstance(self.metaDataHandlers, list), 'Invalid reference handlers %s' % self.referenceHandlers
        
        MetaDataServiceBaseAlchemy.__init__(self, MetaDataMapped, QMetaData, self)

        if not exists(self.base_dir_path): makedirs(self.base_dir_path)
        if not exists(self.content_dir_path): makedirs(self.content_dir_path)
        if not isdir(self.content_dir_path) or not access(self.content_dir_path, W_OK):
            raise IOError('Unable to access the processing directory %s' % self.content_dir_path)

    def deploy(self):
        '''
        Deploy the meta data and all handlers.
        '''
        self._metaType = metaTypeFor(self.session(), META_TYPE_KEY)
        self._thumbnailFormat = thumbnailFormatFor(self.session(), '%(size)s/other.jpg')
        referenceLast = self.thumbnailManager.timestampThumbnail(self._thumbnailFormat.id)
        imagePath = join(pythonPath(), 'resources', 'other.jpg')
        if referenceLast is None or referenceLast < timestampURI(imagePath):
            self.thumbnailManager.processThumbnail(self._thumbnailFormat.id, imagePath)

    # ----------------------------------------------------------------

    def populate(self, metaData, scheme, thumbSize=None):
        '''
        @see: IMetaDataReferencer.populate
        '''
        assert isinstance(metaData, MetaDataMapped), 'Invalid meta data %s' % metaData
        metaData.Content = self.cdmArchive.getURI(self._reference(metaData), scheme)
        return self.thumbnailManager.populate(metaData, scheme, thumbSize)

    # ----------------------------------------------------------------
    
    def generateIdPath (self, id):
        path = join("{0:03d}".format(id // 1000000000), "{0:03d}".format((id // 1000000) % 1000), "{0:03d}".format((id // 1000) % 1000)) 
        
        return path;  

    # ----------------------------------------------------------------

    def insert(self, content):
        '''
        @see: IMetaDataService.insert
        '''
        assert isinstance(content, Content), 'Invalid content %s' % content
        if not content.getName(): raise InputError(_('No name specified for content'))

        metaDataMapped = MetaDataMapped()
        metaDataMapped.CreatedOn = datetime.utcnow()
        metaDataMapped.Name = content.getName()
        if content.contentType: metaDataMapped.Type = content.contentType 
        else: metaDataMapped.Type = self._metaType.Type
            
        metaDataMapped.typeId = self._metaType.Id
        metaDataMapped.thumbnailFormatId = self._thumbnailFormat.id
        
        try:
            self.session().add(metaDataMapped)
            self.session().flush((metaDataMapped,))

            fileName = self.format_file_name % {'id': metaDataMapped.Id, 'file': metaDataMapped.Name}
            contentPath = abspath(join(self.content_dir_path, fileName))
            with open(contentPath, 'w+b') as fobj: pipe(content, fobj)
            metaDataMapped.SizeInBytes = getsize(contentPath)
            metaDataMapped.Content = contentPath

            for handler in self.metaDataHandlers:
                assert isinstance(handler, IMetaDataHandler), 'Invalid handler %s' % handler
                if handler.process(metaDataMapped.Id, contentPath): break
            else:
                path = join(self.base_dir_path, META_TYPE_KEY, fileName)
                fileName = self.format_file_name % {'id': metaDataMapped.Id, 'file': metaDataMapped.Name}
                metaDataMapped.Content = path
            
        except SQLAlchemyError as e: handle(e, metaDataMapped)
        
        if (metaDataMapped.Content != contentPath):
            dirPath = split(metaDataMapped.Content)[0]
            if not exists(dirPath): makedirs(dirPath)
            move(contentPath, metaDataMapped.Content)
        
        return metaDataMapped.Id

    # ----------------------------------------------------------------


    def _reference(self, metaData):
        '''
        Provides the refernce for the meta data.
        '''
        assert isinstance(metaData, MetaDataMapped), 'Invalid meta data %s' % metaData
        return ''.join((metaData.Type, '/', str(metaData.Id), '.', metaData.Name))

