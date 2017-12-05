var SideBar = {
    init: function(){
        $('.sidebar-btn').click(function(){
            $('.sidebar').toggleClass('active');
            $('.menu-link span').toggleClass('hide');
            $(this).toggleClass('toggle');
            $('.main-panel').toggleClass('adjust');
        })
    }
}
$(document).on('page:load', SideBar.init)
$(document).on('turbolinks:load', SideBar.init)