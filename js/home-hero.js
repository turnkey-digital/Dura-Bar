// This File is just for development. 
// The code for this is inside app.js starting on line 2

$('window').ready(function(){
  // Get information and pass it to the callFunctions function
  $('.dropdown-selector').click(function(){
    (
      ($(this).attr("id") === 'MP')
        ? callFunctions('#metalServices','#metalProducts')
      : ($(this).attr("id") === 'MS')
        ? callFunctions('#metalProducts','#metalServices')
      : null
    )
  })
  // Close currently selected tab
  $('.close').click(function(){
    var parentID = '#'+$(this).parents('div').parents('div').attr('id');
    toggleCurrent(parentID);
    updateParentHeight()
  })

  // Take information, and call functions
  function callFunctions(first,second) {
    closeOther(first);
    toggleCurrent(second);
    updateParentHeight(second);
  }
  function closeOther(first) {
    (($(first).attr('data-selection') === 'true') ? addClassHiding(first):null)
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
});
