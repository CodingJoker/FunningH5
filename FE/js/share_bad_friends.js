$("body").on('tap','.more-icon-down',function(){
	$(this).siblings('.js-comment-text').removeClass('more');
	console.log('touch')
})