'''
Created on Apr 25, 2012

@package: superdesk media archive
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

Implementation for the image persistence API.
'''

from ..core.spec import IThumbnailManager
from ..meta.image_data import ImageDataEntry
from ..meta.meta_data import MetaDataMapped
from ally.container import wire
from ally.container.ioc import injected
from ally.container.support import setup
from ally.support.sqlalchemy.session import SessionSupport
from ally.support.sqlalchemy.util_service import handle
from ally.support.util_sys import pythonPath
from datetime import datetime
from os.path import join, splitext, abspath
from sqlalchemy.exc import SQLAlchemyError
from subprocess import Popen, PIPE
from superdesk.media_archive.core.impl.meta_service_base import \
    thumbnailFormatFor, metaTypeFor
from superdesk.media_archive.core.spec import IMetaDataHandler
from superdesk.media_archive.meta.image_data import META_TYPE_KEY
import re

# --------------------------------------------------------------------

@injected
@setup(IMetaDataHandler, 'imageDataHandler')
class ImagePersistanceAlchemy(SessionSupport, IMetaDataHandler):
    '''
    Provides the service that handles the image persistence @see: IImagePersistanceService.
    '''

    format_file_name = '%(id)s.%(file)s'; wire.config('format_file_name', doc='''
    The format for the images file names in the media archive''')
    default_format_thumbnail = '%(size)s/image.jpg'; wire.config('default_format_thumbnail', doc='''
    The format for the images thumbnails in the media archive''')
    format_thumbnail = '%(size)s/%(id)s.%(name)s.jpg'; wire.config('format_thumbnail', doc='''
    The format for the images thumbnails in the media archive''')
    metadata_extractor_path = join('workspace', 'tools', 'exiv2')
    wire.config('metadata_extractor_path', doc='''The path to the metadata extractor file.''')
    
    image_supported_files = 'gif, png, bmp, jpg'

    thumbnailManager = IThumbnailManager; wire.entity('thumbnailManager')
    # Provides the thumbnail referencer

    def __init__(self):
        assert isinstance(self.format_file_name, str), 'Invalid format file name %s' % self.format_file_name
        assert isinstance(self.default_format_thumbnail, str), 'Invalid format thumbnail %s' % self.default_format_thumbnail
        assert isinstance(self.format_thumbnail, str), 'Invalid format thumbnail %s' % self.format_thumbnail
        assert isinstance(self.image_supported_files, str), 'Invalid supported files %s' % self.image_supported_files
        assert isinstance(self.thumbnailManager, IThumbnailManager), 'Invalid thumbnail manager %s' % self.thumbnailManager

        self.imageSupportedFiles = set(re.split('[\\s]*\\,[\\s]*', self.image_supported_files))

    def deploy(self):
        '''
        @see: IMetaDataHandler.deploy
        '''

        self._defaultThumbnailFormat = thumbnailFormatFor(self.session(), self.default_format_thumbnail)
        self.thumbnailManager.putThumbnail(self._defaultThumbnailFormat.id, abspath(join(pythonPath(), 'resources', 'image.jpg')))

        self._thumbnailFormat = thumbnailFormatFor(self.session(), self.format_thumbnail)
        self._metaTypeId = metaTypeFor(self.session(), META_TYPE_KEY).Id

# --------------------------------------------------------------------

    def processByInfo(self, metaDataMapped, contentPath, contentType):
        '''
        @see: IMetaDataHandler.processByInfo
        '''
        if contentType is not None and contentType.startswith(META_TYPE_KEY):
            return self.process(metaDataMapped, contentPath)

        extension = splitext(metaDataMapped.Name)[1][1:]
        if extension in self.imageSupportedFiles: return self.process(metaDataMapped, contentPath)

        return False

    def process(self, metaDataMapped, contentPath):
        '''
        @see: IMetaDataHandler.process
        '''
        assert isinstance(metaDataMapped, MetaDataMapped), 'Invalid meta data mapped %s' % metaDataMapped

        p = Popen([join(self.metadata_extractor_path, 'bin', 'exiv2.exe'), contentPath],
                  stdin=PIPE, stdout=PIPE, stderr=PIPE)
        result = p.wait()
        # 253 is the exiv2 code for error: No Exif data found in the file
        if result != 0 and result != 253: return False

        imageDataEntry = ImageDataEntry()
        imageDataEntry.Id = metaDataMapped.Id

        while True:
            line = p.stdout.readline()
            if not line: break
            line = str(line, "utf-8")

            property = self.extractProperty(line)

            if property is None:
                continue

            if property == 'Image size':
                size = self.extractSize(line)
                imageDataEntry.Width = size[0]
                imageDataEntry.Height = size[1]
            elif property == 'Image timestamp':
                imageDataEntry.CreationDate = self.extractDateTime(line)
            elif property == 'Camera make':
                imageDataEntry.CameraMake = self.extractString(line)
            elif property == 'Camera model':
                imageDataEntry.CameraModel = self.extractString(line)


        path = self.format_file_name % {'id': metaDataMapped.Id, 'file': metaDataMapped.Name}
        path = ''.join((META_TYPE_KEY, '/', self.generateIdPath(metaDataMapped.Id), '/', path))

        metaDataMapped.content = path
        metaDataMapped.typeId = self._metaTypeId
        metaDataMapped.thumbnailFormatId = self._thumbnailFormat.id
        metaDataMapped.IsAvailable = True

        self.thumbnailManager.putThumbnail(self._thumbnailFormat.id, contentPath, metaDataMapped)

        try: self.session().add(imageDataEntry)
        except SQLAlchemyError as e:
            metaDataMapped.IsAvailable = False
            handle(e, ImageDataEntry)

        return True

    # ----------------------------------------------------------------

    def extractProperty(self, line):
        return line.partition(':')[0].strip()

    def extractString(self, line):
        str = line.partition(':')[2].strip()
        return str

    def extractDateTime(self, line):
        # example:'2010:11:08 18:33:13'
        dateTimeFormat = '%Y:%m:%d %H:%M:%S'
        str = line.partition(':')[2].strip()
        if str is None or str is '' : return None
        return datetime.strptime(str, dateTimeFormat)

    def extractSize(self, line):
        str = line.partition(':')[2].strip()
        str = str.partition('x')
        return (str[0], str[2])

    # ----------------------------------------------------------------

    def generateIdPath (self, id):
        return "{0:03d}".format((id // 1000) % 1000)
