define([ 
   'providers/enabled',
   'jquery', 'jquery/splitter', 'jquery/rest', 'jqueryui/droppable', 'jqueryui/texteditor',
   'tmpl!livedesk>layouts/livedesk', 
   'tmpl!livedesk>layouts/blog', 
   'tmpl!livedesk>edit', 
   'tmpl!livedesk>edit-timeline'],
function(providers, $) 
{
    var config = { updateInterval: 3 },
        latestPost = 0,
        providers = $.arrayValues(providers), 
        content = null,
        editorImageControl = function()
        {
            // call super
            var command = $.ui.texteditor.prototype.plugins.controls.image.apply(this, arguments);
            // do something on insert event
            $(command).on('image-inserted.text-editor', function()
            {
                var img = $(this.lib.selectionHas('img'));
                if( !img.parents('figure.blog-image:eq(0)').length )
                    img.wrap('<figure class="blog-image" />');
            });
            return command;
        },
        editorTitleControls = $.extend({}, $.ui.texteditor.prototype.plugins.controls, { image : editorImageControl }),
        initEditBlog = function(theBlog)
        {
            content = $(this).find('[is-content]');
            var h2ctrl = $.extend({}, $.ui.texteditor.prototype.plugins.controls);
            delete h2ctrl.justifyRight;
            delete h2ctrl.justifyLeft;
            delete h2ctrl.justifyCenter; 
            delete h2ctrl.html;
            delete h2ctrl.image;
            delete h2ctrl.link;
            content.find('section header h2').texteditor
            ({
                plugins: {controls: h2ctrl},
                floatingToolbar: 'top'
            });
            content.find('article#blog-intro').texteditor({floatingToolbar: 'top', plugins:{ controls: editorTitleControls }});
            
            $('.tabbable')
            .on('show','a[data-toggle="tab"]', function(e)
            {
                var el = $(e.target);
                var idx = parseInt(el.attr('data-idx'));
                providers[idx].el = $(el.attr('href'));
                providers[idx].init(theBlog);
            })
            .on('hide','a[data-toggle="tab"]', function(e)
                    { console.log('cifi-cif'); });
            
        },
        updateInterval = 0,
        updateItemCount = 0,
        update = function(postHref)
        {
            new $.rest(postHref)
            .request({data:{'startEx.cId':latestPost}})
            .xfilter('Id, CId, Content, CreatedOn, Type, AuthorName, Author.Source.Name, Author.Source.Id, IsModified')
            .done(function(posts)
            {
                var posts = this.extractListData(posts);
                if(!posts) return; 
                for(var i=0; i<posts.length; i++)
                    latestPost = Math.max(latestPost, parseInt(posts[i].CId));
                updateItemCount += posts.length;
                
                // trigger update with callback to be applied on click
                $('#timeline-view .new-results', content).trigger('update.livedesk', [updateItemCount, function()
                {
                    $.tmpl('livedesk>edit-timeline', {Posts: posts}, function(e, o)
                    {
                        $('#timeline-view .post-list', content).prepend(o);
                        updateItemCount -= posts.length;
                    });
                }]);
            });
        };
    
    var EditApp = function(theBlog)
    {
        new $.restAuth(theBlog).xfilter('Creator.Name, Creator.Id').done(function(blogData)
        { 
            var data = $.extend({}, blogData, {ui: {content: 'is-content=1', side: 'is-side=1'}, providers: providers}),
                content = $.superdesk.applyLayout('livedesk>edit', data, function(){ initEditBlog.call(this, theBlog); });
            $('.live-blog-content').droppable({
                drop: function( event, ui ) {
                    var el = ui.draggable.prependTo($(this).find('#timeline-view>ul:first'));
                    var data = ui.draggable.data('data');
                    el.draggable( "destroy").remove();
                    new $.restAuth(theBlog + '/Post/Published').resetData().insert(data);
                },
                activeClass: 'ui-droppable-highlight'
            });
            $("#MySplitter").splitter({
                type: "v",
                outline: true,
                sizeLeft: 470,
                minLeft: 470,
                minRight: 600,
                resizeToWidth: true,
                //dock: "left",
                dockSpeed: 100,
                cookie: "docksplitter",
                dockKey: 'Z',   // Alt-Shift-Z in FF/IE
                accessKey: 'I'  // Alt-Shift-I in FF/IE
            });

            $('.collapse-title-page', content).off('click.livedesk')
            .on('click.livedesk', function()
            {
                var intro = $('article#blog-intro', content);
                !intro.is(':hidden') && intro.fadeOut('fast') && $(this).text('Expand');
                intro.is(':hidden') && intro.fadeIn('fast') && $(this).text('Collapse');
            });
            
            var postHref = blogData.PostPublished.href;
            this.get('PostPublished')
            .xfilter('Id, CId, Content, CreatedOn, Type, AuthorName, Author.Source.Name, Author.Source.Id, IsModified')
            .done(function(posts)
            {
                var posts = this.extractListData(posts);
                $('#timeline-view .results-placeholder', content).tmpl('livedesk>edit-timeline', {Posts: posts}, function()
                {
                    // bind update event for new results notification button
                    $('#timeline-view .new-results', content)
                    .off('update.livedesk')
                    .on('update.livedesk', function(e, count, callback)
                    {
                        var self = $(this);
                        self.removeClass('hide').one('click.livedesk', function()
                        {
                            self.addClass('hide'); 
                            callback.apply(this);
                        })
                        .find('span').text(count);
                    });
                });
                
                for(var i=0; i<posts.length; i++)
                    latestPost = Math.max(latestPost, parseInt(posts[i].CId));
                
                clearInterval(updateInterval);
                updateInterval = setInterval(function()
                {
                    if(!$('#timeline-view:visible', self.el).length) 
                    {
                        clearInterval(updateInterval);
                        return;
                    }
                    update(postHref); 
                }, config.updateInterval*1000);
                
            });
        });
        
    };
    return EditApp;
});