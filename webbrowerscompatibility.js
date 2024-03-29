var db = new Firebase('https://browsersupport.firebaseio.com/dom/desktop');

db.once('value', function(data) {

  //console.log(_.chain(data.val()).pluck('name').uniq().valueOf());
  //console.log(_.chain(data.val()).pluck('browser').pluck('description').uniq().valueOf());

  data = data.val();

  var header = ['<th>&nbsp;</th>'];
  _.chain(data).pluck('browser').pluck('description').uniq().each(function(browser){
    header.push('<th><div data-content="'+browser+'">'+browser.split(' ')[0]+' '+browser.split(' ')[1].split('.')[0]+'</div></th>');
  });

  $('table thead').append('<tr>'+header.join('')+'</tr>');

  function generateRowData( category ) {
    var rows = [];
    _.chain(data).filter(function(item){
      return item.category === 'window';
    }).pluck('name').uniq().each(function(prop){

      var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

      _.chain(data).filter(function(item){
        return item.name === prop && item.category === category;
      }).forEach(function(z){
        row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
      });

      rows.push('<tr>'+row.join('')+'</tr>');
    });

    $('table#' + category + ' tbody').append(rows.join(''));
  }

  _.each([
    'window',
    'document-implementation',
    'document',
    'element',
    'text',
    'window-event',
    'document-event',
    'element-event'
  ], generateRowData);

  $('#tableLoader').hide();
  $('#tables').show();

  var win = $(window);

  win.on('resize',function(){

    $('div.stickyHeader').remove();

    var tables = $('table.stickyHeader');
    tables.each(function(i, table){
      table = $( table );

      var theadClone = table.find('thead').clone(true);
      var stickyHeader =  $('<div></div>').addClass('stickyHeader hide');

      stickyHeader.append($('<table class="table table-bordered"></table>')).find('table').append(theadClone);
      table.after(stickyHeader);

      var tableHeight = table.height();
      var tableWidth = table.width() + parseInt( table.outerWidth(), 10 );

      var headerCells = table.find('thead th');
      var headerCellHeight = headerCells.first().height();
      var noFixedSupport = stickyHeader.css('position') === 'absolute' ? true : false;
      var stickyHeaderCells = stickyHeader.find('th');

      stickyHeader.css('width', tableWidth);

      headerCells.each(function(j, headerCell) {
        var cellWidth = $(headerCell).width();
        stickyHeaderCells.eq(j).css('width', cellWidth);
      });

      var cutoffTop = table.offset().top;
      var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;

      win.scroll(function() {
        var currentPosition = win.scrollTop();

        if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
          stickyHeader.removeClass('hide');
          if (noFixedSupport) {
            stickyHeader.css('top', currentPosition + 'px');
          }
          return;
        }

        stickyHeader.addClass('hide');
      });
    });

  });

  win.trigger('resize');
  $('th div').popover({placement:'bottom',trigger:'hover',delay:100,title:'Browser Details',animation:false});

  $('table:first th').each(function(num,elm){
    if($(elm).find('div').data('content') === platform.description){
      $('table td:nth-child('+($(elm).index()+1)+')').addClass('yourbrowser');
    }
  });

});
