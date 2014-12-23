/**
 * jQueryUI Dnd Demo
 *
 * @author Elf-mousE
 * @website http://elf-mouse.me/
 * @since 2014.12.22
 */
$(function() {

  var debug = false,
    sidebars = $('.widgets-sortables');

  $('#widget-list').children('.widget').draggable({
    connectToSortable: '.widgets-sortables',
    //handle: '> .widget-title',
    helper: 'clone',
    zIndex: 100,
    containment: 'document',
    start: function(event, ui) {
      if (debug) {
        console.log('draggable start');
      }
    },
    stop: function() {
      if (debug) {
        console.log('draggable stop');
      }
    }
  });

  sidebars.sortable({
    placeholder: 'widget-placeholder',
    items: '> .widget',
    //handle: '> .widget-title',
    cursor: 'move',
    containment: 'document',
    start: function(event, ui) {
      if (debug) {
        console.log('sortable start');
      }

      var $this = $(this),
        $wrap = $this.parent(),
        inside = ui.item.children('.widget-inside');

      // if inside has changed
      $(this).sortable('refreshPositions');
    },
    stop: function(event, ui) {
      if (debug) {
        console.log('sortable stop');
      }

      var $widget = ui.item,
        isNew = $widget.hasClass('ui-draggable');

      if ($widget.hasClass('deleting')) {
        // delete widget action
        console.info('delete widget');
        $widget.remove();
        return;
      }

      $widget.attr('style', '').removeClass('ui-draggable');

      if (isNew) {
        // add widget action
        console.info('add widget');
      } else {
        // saveOrder action
        console.info('saveOrder');
      }
    },
    activate: function() {
      if (debug) {
        console.log('sortable activate');
      }
      $(this).parent().addClass('widget-hover');
    },
    deactivate: function() {
      if (debug) {
        console.log('sortable deactivate');
      }
      $(this).parent().removeClass('widget-hover');
    },
    receive: function(event, ui) {
      if (debug) {
        console.log('sortable receive');
      }

      var $sender = $(ui.sender);
    }
  }).sortable('option', 'connectWith', '.widgets-sortables');

  // drop for deleting
  $('#available-widgets').droppable({
    tolerance: 'pointer',
    accept: function(o) {
      if (debug) {
        console.warn('droppable accept');
      }
      return $(o).parent().attr('id') !== 'widget-list';
    },
    drop: function(e, ui) {
      if (debug) {
        console.warn('droppable drop');
      }
      ui.draggable.addClass('deleting');
    },
    over: function(e, ui) {
      if (debug) {
        console.warn('droppable over');
      }
      ui.draggable.addClass('deleting');
      $('.widget-placeholder').hide();
    },
    out: function(e, ui) {
      if (debug) {
        console.warn('droppable out');
      }
      ui.draggable.removeClass('deleting');
      $('.widget-placeholder').show();
    }
  });

});
