$(document).ready(function() {
	$('#background').fsslider({
		spw : 5,
		sph : 4,
		delay : 6000,
		sDelay : 50,
		effect : '', // rand, diagonal, lineal
		texture : 'strip1',
		navigation : true
	});
	$('#dc_jqfloatingmenu_widget-3-item').dcFloater({
		event : 'click',
		width : 180,
		location : 'top',
		align : 'left',
		speedMenu : 600,
		speedFloat : 1500,
		offsetLocation : 100,
		offsetAlign : 10,
		autoClose : false,
		tabClose : false,
		tabText : '  ',
		idWrapper : 'dc-floater-3',
		classOpen : 'dcfl-open',
		classClose : 'dcfl-close',
		classToggle : 'dcfl-link'
	});
});