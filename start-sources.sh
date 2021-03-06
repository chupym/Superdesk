ALLYPATH=../
ALLYCOM=${ALLYPATH}components/
PYTHONPATH=${ALLYPATH}ally-api
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-authentication
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-authentication-core
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-authentication-http
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-core
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-core-http
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-core-plugin
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-core-sqlalchemy
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-http-asyncore-server
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-http-mongrel2-server
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}ally-utilities
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}support-administration
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}support-cdm
PYTHONPATH=${PYTHONPATH}:${ALLYCOM}support-development

ALLYPLUG=${ALLYPATH}plugins/
PYTHONPATH=${PYTHONPATH}:${ALLYPLUG}gui-action
PYTHONPATH=${PYTHONPATH}:${ALLYPLUG}gui-core
PYTHONPATH=${PYTHONPATH}:${ALLYPLUG}internationalization
PYTHONPATH=${PYTHONPATH}:${ALLYPLUG}introspection-request
PYTHONPATH=${PYTHONPATH}:${ALLYPLUG}support-sqlalchemy

FULLPATH=
SUPERPLUG=${FULLPATH}plugins/
#PYTHONPATH=%PYTHONPATH%;%SUPERPLUG%ffmpeg-binary
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}livedesk
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}media-archive
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}media-archive-audio
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}media-archive-image
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}media-archive-video
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-address
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-article
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-authentication
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-collaborator
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-country
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-language
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-person
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-post
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-source
PYTHONPATH=${PYTHONPATH}:${SUPERPLUG}superdesk-user

#echo $PYTHONPATH
#del distribution\workspace\superdesk.db
python3.2 distribution/application.py
