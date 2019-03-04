// This File is just for development. 
// The code for this is inside applicationCache.js starting on line 55

updateActiveHeight();

$('.close-menu').click(function(){
    // Declare Vars
    var menuNumber = $(this).attr("menu");
    // Call Functions
    closeOtherMenus(menuNumber);
    checkThisMenu(menuNumber);
});

function closeOtherMenus(thisMenu) {
    var totalMenus = $('.side-bar-sub-menu > div').length;
    for (i = 1; i <= totalMenus; i++) {
        if (i == thisMenu) {
            null
        } else {
            closeThisMenu(i)
        }
    }
}
function checkThisMenu(menuNumber) {
    var thisMenu = '.menu-' + menuNumber;
    if ($(thisMenu).hasClass("active")) {
        $(thisMenu).removeClass('active');
        $(thisMenu).parent('div').css('height', 0)
    }  else {
        $(thisMenu).addClass('active');
        updateActiveHeight();
    }
}
function closeThisMenu(props) {
    var thisMenu = '.menu-'+props
    $(thisMenu).removeClass('active')
    $(thisMenu).parent('div').css('height', 0)
}
function updateActiveHeight() {
    $('.active').parent('div').css('height', $('.active').height())
}