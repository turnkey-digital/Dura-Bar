// This File is just for development. 
// The code for this is inside applicationCache.js starting on line 81

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
    var menuToggle = $(thisMenu).parent('div').siblings('.titleSelector').find('.side-bar-x');

    if ($(thisMenu).hasClass("active")) {
        $(thisMenu).removeClass('active');
        $(menuToggle).removeClass('opened'); 
        $(thisMenu).parent('div').css('height', 0)
    }  else {
        $(thisMenu).addClass('active');
        $(menuToggle).addClass('opened');        
        updateActiveHeight();
    }
}
function closeThisMenu(props) {
    var thisMenu = '.menu-'+props;
    var menuToggle = $(thisMenu).parent('div').siblings('.titleSelector').find('.side-bar-x');
    $(thisMenu).removeClass('active')
    $(menuToggle).removeClass('opened'); 
    $(thisMenu).parent('div').css('height', 0)
    
}
function updateActiveHeight() {
    $('.active').parent('div').css('height', $('.active').height())
}