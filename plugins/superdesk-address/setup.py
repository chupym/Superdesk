'''
Created on June 14, 2012

@package: Superdesk
@copyright: 2012 Sourcefabric o.p.s.
@license: http://www.gnu.org/licenses/gpl-3.0.txt
@author: Mugur Rus
'''

# --------------------------------------------------------------------

from setuptools import setup, find_packages

# --------------------------------------------------------------------

setup(
    name="superdesk_address",
    version="1.0",
    packages=find_packages(),
    install_requires=['ally_api >= 1.0', 'internationalization >= 1.0', 'gui_action >= 1.0',
                      'gui_core >= 1.0'],
    platforms=['all'],
    zip_safe=True,
    package_data={
        '': ['*.gif', '*.png', '*.jpg', '*.jpeg', '*.js', '*.css', '*.less', '*.dust', '*.html'],
    },

    # metadata for upload to PyPI
    author="Gabriel Nistor",
    author_email="gabriel.nistor@sourcefabric.org",
    description="Superdesk address plugin",
    long_description='Address management functionality',
    license="GPL v3",
    keywords="Ally REST framework plugin Livedesk",
    url="http://www.sourcefabric.org/en/superdesk/", # project home page
)
