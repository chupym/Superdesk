/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

define('providers/edit', [
	'providers',
	'utils/str',
	'jquery',
    'jquery/utils',
    'jquery/rest',
    'jquery/superdesk',
    'jquery/tmpl',
    'jquery/avatar',
	'jqueryui/draggable',
    'jqueryui/texteditor',
	'providers/edit/adaptor',
    'tmpl!livedesk>providers/edit',
    'tmpl!livedesk>providers/edit/item',
], function( providers, str, $ ) {
	$.extend(providers.edit, {
        data: [],
        init: function(theBlog) {
            var 
            initEdit = function(theBlog) 
            {
                $(this)
                    .off('click.livedesk')
                    .on( 'click.livedesk','[ci="savepost"]', function(e){
                        e.preventDefault();
                        var data = {
                            Content: $.styledNodeHtml('.edit-block article.editable'),
                            Type: $('[name="type"]').val()
                        };
                        new $.restAuth(theBlog+'/Post').resetData().xfilter('Id,AuthorName,Content,Type.Key,PublishedOn,CreatedOn,Author.Source.Name').insert(data).done(function(post){
                            $('.editable',self.el).html('');
                            $('[name="type"]',self.el).val('normal');
                            startx = self.data.length;
                            self.data[startx] = post;
                            post.startx = startx;
                            post.PublishedOn = true;
                            updatePost( post );
                            new $.restAuth(post.href+'/Publish').resetData().insert().done(function(){
                                require([$.superdesk.apiUrl+'/content/gui/superdesk/livedesk/scripts/js/edit-live-blogs.js'],
                                    function(EditApp){ new EditApp(theBlog).update(); });
                            });
                        });
                    })
                    .on('click.livedesk','[ci="save"]',function(e){
                        e.preventDefault();
                        var data = {
                            Content: $.styledNodeHtml('.edit-block article.editable'),
                            Type: $('[name="type"]').val()
                        };
                        new $.restAuth(theBlog+'/Post').resetData().xfilter('Id,AuthorName,Content,Type.Key,PublishedOn,CreatedOn,Author.Source.Name').insert(data).done(function(post){
                            $('.editable',self.el).html('');
                            $('[name="type"]',self.el).val('normal');
                            startx = self.data.length;
                            self.data[startx] = post;
                            post.startx = startx;
                            updatePost( post );
                        });
                    });
                
                // editor 
                fixedToolbar = 
                {
                    _create: function(elements)
                    {
                        var self = this;
                        $(elements).on('toolbar-created', function()
                        {
                            self.plugins.toolbar.element.hide()
                                .appendTo($('.edit-block .toolbar-placeholder')); 
                        }); 
                        $(elements).on('focusin.texteditor keydown.texteditor click.texteditor', function(event)
                        {
                            self.plugins.toolbar.element.fadeIn('fast');
                        });
                        $(elements).on('blur.texteditor focusout.texteditor', function()
                        { 
                            self.plugins.toolbar.element.fadeOut('fast'); 
                        });
                    }
                };
                $('.edit-block article.editable').texteditor({ plugins: 
                {
                    floatingToolbar: null, 
                    draggableToolbar: null, 
                    fixedToolbar: fixedToolbar
                }});
                
                $('form').submit(function() {
                    console.log($(this).serializeArray());
                    return false;
                });
                updatePosts();
            }, updatePost = function(post){
                var avatar = $.avatar.get($.superdesk.login.EMail);
                $.tmpl('livedesk>providers/edit/item', {Posts: [post], Avatar: avatar}, function(e,o){
                    if(!e) {
                        var $el = $(o).prependTo(self.el.find('#own-posts-results'));
                        if(!$.isDefined(post.PublishedOn)) {
                            $el.draggable({
                                revert: 'invalid',
                                containment:'document',
                                helper: 'clone',
                                appendTo: 'body',
                                zIndex: 2700,
                                start: function() {
                                    var idx = parseInt($(this).attr('idx'),10),
                                    startx = parseInt($(this).attr('startx'),10);
                                    startx = isNaN(startx)? 0: startx;
                                    idx = isNaN(idx)? 0: idx;
                                    $(this).data('post', self.adaptor.universal(self.data[startx+idx], $(this)));
                                }
                            });
                        }
                    }
                });
            }, updatePosts = function(){
                new $.restAuth(theBlog+'/Post/Owned').resetData().request({data: { desc: 'createdOn'}}).xfilter('Id,AuthorName,Content,Type.Key,PublishedOn,CreatedOn,Author.Source.Name')
                .done(function(postList)
                {
                    //$.tmpl('livedesk>providers/edit/item', {Posts: postList}, function(e,o){ console.log(o);});
                    var avatar = $.avatar.get($.superdesk.login.EMail);
                    self.data = postList;
                    self.el.find('#own-posts-results')
                    .tmpl('livedesk>providers/edit/item', {Posts: postList, Avatar: avatar}, function(){
                        $(this).find('li.draggable').draggable(
                            {
                                revert: 'invalid',
                                containment:'document',
                                helper: 'clone',
                                appendTo: 'body',
                                zIndex: 2700,
                                start: function() {
                                    var idx = parseInt($(this).attr('idx'),10),
                                        startx = parseInt($(this).attr('startx'),10);
                                    startx = isNaN(startx)? 0: startx;
                                    idx = isNaN(idx)? 0: idx;
                                    $(this).data('post', self.adaptor.universal(self.data[startx+idx], $(this)));
                                }
                            }

                        );
                    }).end()
                    .on('click.livedesk','.close',function(){
                        /*
                        new $.restAuth(postHref);
                        */
                    });
                });

                    //self.el.find('.own-posts-results').tmpl('')
            },self = this;
            new $.restAuth('Superdesk/PostType').xfilter('Key').done(function(PostTypes){
                for(var i=0; i<PostTypes.length; i++){
                    if(PostTypes[i].Key == 'advertisement') {
                        PostTypes.splice(i,1);
                        break;
                    }
                }
                self.el.tmpl('livedesk>providers/edit',{PostTypes: PostTypes},function(){
                    initEdit.call(this, theBlog);
               });
            });
		2}		
	});
	return providers;
});
