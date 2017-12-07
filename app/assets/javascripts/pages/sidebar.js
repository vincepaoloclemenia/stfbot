var SideBar = {
    init: function(){
        $('.sidebar-btn').click(function(){
            $('.sidebar').toggleClass('active');
            $(this).toggleClass('toggle');
            $('.main-panel').toggleClass('adjust');
            $('.menu-link span').toggleClass('hide');
        })
    }
}
$(document).on('page:load', SideBar.init)
$(document).on('turbolinks:load', SideBar.init)