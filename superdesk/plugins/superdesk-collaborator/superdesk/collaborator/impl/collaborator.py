'''
Created on May 3, 2012

@package: superdesk collaborator
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

Contains the SQL alchemy implementation for collaborator API.
'''

from ..api.collaborator import ICollaboratorService
from ..meta.collaborator import CollaboratorMapped
from ally.container.ioc import injected
from ally.support.sqlalchemy.util_service import buildQuery, buildLimits
from sql_alchemy.impl.entity import EntityGetCRUDServiceAlchemy
from superdesk.person.meta.person import Person
from superdesk.source.meta.source import SourceMapped

# --------------------------------------------------------------------

@injected
class CollaboratorServiceAlchemy(EntityGetCRUDServiceAlchemy, ICollaboratorService):
    '''
    Implementation for @see: ICollaboratorService
    '''

    def __init__(self):
        '''
        Construct the collaborator service.
        '''
        EntityGetCRUDServiceAlchemy.__init__(self, CollaboratorMapped)

    def getAll(self, personId=None, sourceId=None, offset=None, limit=None, qp=None, qs=None):
        '''
        @see: ICollaboratorService.getAll
        '''
        sql = self.session().query(CollaboratorMapped)
        if personId: sql = sql.filter(CollaboratorMapped.Person == personId)
        if sourceId: sql = sql.filter(CollaboratorMapped.Source == sourceId)
        if qp: sql = buildQuery(sql.join(Person), qp, Person)
        if qs: sql = buildQuery(sql.join(SourceMapped), qs, SourceMapped)
        sql = buildLimits(sql, offset, limit)
        return sql.all()

