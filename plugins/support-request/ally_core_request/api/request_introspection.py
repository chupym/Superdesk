'''
Created on Jan 23, 2012

@package ally core request
@copyright 2011 Sourcefabric o.p.s.
@license http://www.gnu.org/licenses/gpl-3.0.txt
@author: Gabriel Nistor

API specifications for the node presenter.
'''

from ally.api.config import model, service, call
from ally.api.type import Iter, Id

# --------------------------------------------------------------------

@model
class Method:
    '''
    Provides a call method of a request.
    '''
    Id = Id
    Name = str
    APIClass = str
    APIClassDefiner = str
    APIDoc = str
    IMPL = str
    IMPLDefiner = str
    IMPLDoc = str

@model
class Request:
    '''
    Provides the request.
    '''
    Id = Id
    Pattern = str
    Get = Method.Id
    Delete = Method.Id
    Insert = Method.Id
    Update = Method.Id
    
@model
class Input:
    '''
    Provides the input.
    '''
    Id = Id
    Name = str
    Mandatory = bool
    Description = str
    
# --------------------------------------------------------------------

@service
class IRequestIntrospectService:
    '''
    Provides services for the request nodes.
    '''
    
    @call
    def getRequest(self, id:Request.Id) -> Request:
        '''
        Provides the request for the provided id.
        '''
            
    @call
    def getMethod(self, id:Method.Id) -> Method:
        '''
        Provides the method for the provided id.
        '''

    @call
    def getAllInputs(self, id:Request.Id=None) -> Iter(Input):
        '''
        Provides all the pattern inputs.
        '''
        
    @call
    def getAllRequests(self, offset:int=None, limit:int=None) -> Iter(Request):
        '''
        Provides all the request nodes.
        '''
