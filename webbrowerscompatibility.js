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

	/**********************************************************************************
	//window
	**********************************************************************************/

	var allWindowRows = [];

	_.chain(data).filter(function(item){return item.category === 'window'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'window'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allWindowRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#window tbody').append(allWindowRows.join(''));

	/**********************************************************************************
	//document.implementation
	**********************************************************************************/

	var allDocumentImplementationRows = [];

	_.chain(data).filter(function(item){return item.category === 'document-implementation'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'document-implementation'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allDocumentImplementationRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#document-implementation tbody').append(allDocumentImplementationRows.join(''));

	/**********************************************************************************
	//document
	**********************************************************************************/

	var allDocumentRows = [];

	_.chain(data).filter(function(item){return item.category === 'document'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'document'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allDocumentRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#document tbody').append(allDocumentRows.join(''));

	/**********************************************************************************
	//element
	**********************************************************************************/

	var allElementRows = [];

	_.chain(data).filter(function(item){return item.category === 'element'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'element'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allElementRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#element tbody').append(allElementRows.join(''));

	/**********************************************************************************
	//text
	**********************************************************************************/

	var allTextRows = [];

	_.chain(data).filter(function(item){return item.category === 'text'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'text'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allTextRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#text tbody').append(allTextRows.join(''));

	/**********************************************************************************
	//window-event
	**********************************************************************************/

	var allWindowEventsRows = [];

	_.chain(data).filter(function(item){return item.category === 'window-event'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'window-event'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allWindowEventsRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#window-event tbody').append(allWindowEventsRows.join(''));

	/**********************************************************************************
	//document-event
	**********************************************************************************/

	var allDocumentEventsRows = [];

	_.chain(data).filter(function(item){return item.category === 'document-event'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'document-event'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allDocumentEventsRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#document-event tbody').append(allDocumentEventsRows.join(''));

	/**********************************************************************************
	//element-event
	**********************************************************************************/

	var allElementEventsRows = [];

	_.chain(data).filter(function(item){return item.category === 'element-event'}).pluck('name').uniq().each(function(prop){

		var row = ['<td><a href="https://developer.mozilla.org/en-US/search?q='+prop+'" target="_blank">'+prop+'</a></td>'];

		_.chain(data).filter(function(item){return item.name === prop && item.category === 'element-event'}).forEach(function(z){
			row.push('<td class="'+z.supported+'">'+z.supported+'</td>');
		});

		allElementEventsRows.push('<tr>'+row.join('')+'</tr>');

	});

	$('table#element-event tbody').append(allElementEventsRows.join(''));

	$('#tableLoader').hide();
	$('#tables').show();

	$(window).on('resize',function(){

		$('div.stickyHeader').remove();

		var tables = $('table.stickyHeader');
		tables.each(function(i){
			var table = tables[i];
			var theadClone = $(table).find('thead').clone(true);
			var stickyHeader =  $('<div></div>').addClass('stickyHeader hide');
			stickyHeader.append($('<table class="table table-bordered"></table>')).find('table').append(theadClone);
			$(table).after(stickyHeader);

			var tableHeight = $(table).height();
			var tableWidth = $(table).width() + Number($(table).css('padding-left').replace(/px/ig,"")) + Number($(table).css('padding-right').replace(/px/ig,"")) + Number($(table).css('border-left-width').replace(/px/ig,"")) + Number($(table).css('border-right-width').replace(/px/ig,""));

			var headerCells = $(table).find('thead th');
			var headerCellHeight = $(headerCells[0]).height();

			var no_fixed_support = false;
			if (stickyHeader.css('position') == "absolute") {
				no_fixed_support = true;
			}

			var stickyHeaderCells = stickyHeader.find('th');
			stickyHeader.css('width', tableWidth);

			for (i=0; i<headerCells.length; i++) {
				var headerCell = $(headerCells[i]);
				var cellWidth = headerCell.width();
				$(stickyHeaderCells[i]).css('width', cellWidth);
			}

			var cutoffTop = $(table).offset().top;
			var cutoffBottom = tableHeight + cutoffTop - headerCellHeight;

			$(window).scroll(function() {
			var currentPosition = $(window).scrollTop();
				if (currentPosition > cutoffTop && currentPosition < cutoffBottom) {
					stickyHeader.removeClass('hide');
					if (no_fixed_support) {
						stickyHeader.css('top', currentPosition + 'px');
					}
				}
				else {
					stickyHeader.addClass('hide');
				}
			});
		});

	});

	$(window).trigger('resize');
	$('th div').popover({placement:'bottom',trigger:'hover',delay:100,title:'Browser Details',animation:false});

	$('table:first th').each(function(num,elm){
		if($(elm).find('div').data('content') === platform.description){
			$('table td:nth-child('+($(elm).index()+1)+')').addClass('yourbrowser');
		}
	});

});
