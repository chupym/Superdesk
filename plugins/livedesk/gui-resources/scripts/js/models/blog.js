define([ 'gizmo/superdesk', 
    config.guiJs('livedesk', 'models/user'),
    config.guiJs('livedesk', 'models/language'),
    config.guiJs('livedesk', 'models/posts'),
    config.guiJs('livedesk', 'models/collaborators'),
    config.guiJs('livedesk', 'models/admins')],
function(Gizmo, User, Language, Posts, Collaborators, Admins) 
{
    // Blog
    return Gizmo.Model.extend
    ({
        // TODO this is not the real model path. should be LiveDesk/Blog
		url: new Gizmo.Url('Blog'),
        defaults:
        { 
            Creator: User,
            Language: Language,
            Collaborator: Collaborators,
            Admin: Admins,
            Post: Posts,
            PostPublished: Posts,
            PostUnpublished: Posts
        },
        putLive: function()
        {
            var putLiveHref = this.href+'/PutLive';
            var self = this,
                dataAdapter = function()
                { 
                    return self.syncAdapter.request.apply(self.syncAdapter, arguments); 
                },
                ret = dataAdapter(putLiveHref).update();
            this.triggerHandler('putlive');
            return ret;
        }
    }, 
    { register: 'Blog' } );
});