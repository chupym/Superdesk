'''
Created on May 3rd, 2012

@package: superdesk media archive
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: 

'''

from ..gui_core.gui_core import publishGui, publish

# --------------------------------------------------------------------

@publish
def publishJS():
    publishGui('superdesk/desks')
    
    