'''
Created on Aug 23, 2012

@package: superdesk media archive
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Ioan v. Pocol

Contains the SQL alchemy meta for media video data API.
'''

from ..api.video_data import VideoData
from .meta_data import MetaDataMapped
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer
from sqlalchemy.ext.declarative import declared_attr
from superdesk.meta.metadata_superdesk import Base
from ally.internationalization import N_

# --------------------------------------------------------------------

META_TYPE_KEY = N_('video')
# The key used for video meta data

# --------------------------------------------------------------------

class VideoDataDefinition:
    '''
    Provides the mapping for VideoData definition.
    '''
    __tablename__ = 'archive_video_data'
    __table_args__ = dict(mysql_engine='InnoDB', mysql_charset='utf8')

    Id = declared_attr(lambda cls: Column('fk_metadata_id', ForeignKey(MetaDataMapped.Id), primary_key=True))
    Width = declared_attr(lambda cls: Column('width', Integer))

# --------------------------------------------------------------------

class VideoDataEntry(Base, VideoDataDefinition):
    '''
    Provides the mapping for VideoData table.
    '''

# --------------------------------------------------------------------

class VideoDataMapped(VideoDataDefinition, MetaDataMapped, VideoData):
    '''
    Provides the mapping for VideoData when extending MetaData.
    '''
    __table_args__ = dict(VideoDataDefinition.__table_args__, extend_existing=True)
