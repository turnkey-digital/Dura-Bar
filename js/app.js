$(document).foundation();
// Home Hero JS
$('window').ready(function () {
    // Get information and pass it to the callFunctions function
    $('.dropdown-selector').click(function () {
        (
            ($(this).attr("id") === 'MP')
                ? callFunctions('#metalServices', '#metalProducts')
                : ($(this).attr("id") === 'MS')
                    ? callFunctions('#metalProducts', '#metalServices')
                    : null
        )
    })
    // Close currently selected tab
    $('.close').click(function () {
        var parentID = '#' + $(this).parents('div').parents('div').attr('id');
        toggleCurrent(parentID);
        updateParentHeight()
    })

    // Take information, and call functions
    function callFunctions(first, second) {
        closeOther(first);
        toggleCurrent(second);
        updateParentHeight(second);
    }
    function closeOther(first) {
        // alert(first)
        (($(first).attr('data-selection') === 'true') ? addClassHiding(first) : null)
    }
    function toggleCurrent(second) {
        (($(second).attr('data-selection') === 'true') ? addClassHiding(second) : removeClassHiding(second))
    }
    // Add or remove CSS class to triger animations
    function addClassHiding(second) {
        $(second).addClass('hide-container');
        toggleBool(second);
    }
    function removeClassHiding(second) {
        $(second).removeClass('hide-container');
        toggleBool(second);
    }

    function toggleBool(second) {
        $(second).attr('data-selection', ($(second).attr('data-selection') == "false" ? true : false));
    }
    function updateParentHeight(idSeleceted) {
        if ($(idSeleceted).attr('data-selection') === 'true') {
            $('.dropdown-content-container').css('height', $(idSeleceted).height())
        } else {
            $('.dropdown-content-container').css('height', 0)
        }
    }
    $('.nearest-location').mouseenter(function () {
        closeOther("#metalServices")
        closeOther('#metalProducts')
        updateParentHeight()
    })
});

// Home Hero Interaction Effects
$('.left-image-hover').mouseenter(function () {
    $('#left-img').addClass('zoom')
    $('#right-img').addClass('inactive')
})
$('.left-image-hover').mouseleave(function () {
    $('#left-img').removeClass('zoom')
    $('#right-img').removeClass('inactive')
})

$('.right-image-hover').mouseenter(function () {
    $('#right-img').addClass('zoom')
    $('#left-img').addClass('inactive')
})
$('.right-image-hover').mouseleave(function () {
    $('#right-img').removeClass('zoom')
    $('#left-img').removeClass('inactive')
})


// Side Bar JS
updateActiveHeight();
$('.close-menu').click(function () {
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
    } else {
        $(thisMenu).addClass('active');
        $(menuToggle).addClass('opened');
        updateActiveHeight();
    }
}
function closeThisMenu(props) {
    var thisMenu = '.menu-' + props;
    var menuToggle = $(thisMenu).parent('div').siblings('.titleSelector').find('.side-bar-x');
    $(thisMenu).removeClass('active')
    $(menuToggle).removeClass('opened');
    $(thisMenu).parent('div').css('height', 0)

}
function updateActiveHeight() {
    $('.active').parent('div').css('height', $('.active').height())
}
// END OF SIDE BAR

// Mobile Nav Interactions
$('.hamburger').click(function(){
    $('.hamburger').toggleClass('is-active')
    $('#mobile-nav').toggleClass('mobile-nav-hidden')
});
$('.search-button').click(function(){
    $('#search-bar-mobile').toggleClass('hiding');
})
// END OF MOBILE NAV

// REFFER
$(document).ready(function(){
    oldURL = document.referrer;
    lastURL = `Referring URL: ${oldURL} (Hidden to user)`

    document.getElementById('referrer').value = lastURL;
});
