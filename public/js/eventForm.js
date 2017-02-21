$( document ).ready(function() {
	$(".date").datepicker();

	// Display "add inventory" modal.
	$(".add-btn").on('click', function() {
			var tblID = $(this).next('table').attr('id');
			$('#modal-table-id').val(tblID);
			$("#mdlAddItem").modal();
	});

	// Load price on item select
	$("#altar-flowers").on('change', function()	{
		if ($(this).prop('selectedIndex') != 0)	{
			var name = $("option:selected", this).text();
			var price = prices[name];
			$(this).siblings('#addPrice').val(price);
			$(this).siblings('#addQuantity').val(1);
		}
		else {
			$(this).siblings('#addPrice').val(price);
			$(this).siblings('#addQuantity').val(null);
		}
	});
});

	// Add new item to recipe table
	$("#addItem").on('click', function()	{
		if ($("#altar-flowers").prop("selectedIndex") != 0)	{
			event.preventDefault();

			var $form = $(this).closest('form');
			var item = $form.find('#altar-flowers option:selected').text();
			var qty = $form.find('#addQuantity').val();
			var price = $form.find('#addPrice').val();
			var tblID = $form.find('#modal-table-id').val();
			var tbl = $("#" + tblID);
			tbl.prepend("<tr><td>" + item + "</td><td style='text-align: right;'>" + qty + " x </td><td>$" + price + "</td><td><center><input type='button' class='remove-item-btn' value='x' /></ center></td></tr>");
			var qtyPrice = parseFloat(qty) * parseFloat(price);
			var tblTotal = tbl.find('.price');
			var initPrice = tblTotal.text();
			initPrice = initPrice.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
			totalToDisp = parseFloat(initPrice) + parseFloat(qtyPrice);
			tblTotal.html("<b>$" + totalToDisp.toFixed(2) + "</b>");
			$("#mdlAddItem").modal('hide');
		}
		else {
			event.preventDefault();
			alert("Please select a valid item.");
		}
	});

	// Remove item from recipe table
	$(document).on("click", ".remove-item-btn", function ()	{
		event.preventDefault();
		var parentTbl = $(this).closest('table');
		var rowClicked = $(this).closest('tr');
		var initQty = $(this).closest('td').prev('td').prev('td').text();
		initQty = initQty.substr(0, 1);
		initQty = parseFloat(initQty);
		var pricePerItem = $(this).closest('td').prev('td').text();
		pricePerItem = pricePerItem.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		pricePerItem = parseFloat(pricePerItem);
		var currTblTotal = parentTbl.find('.price').text();
		currTblTotal = currTblTotal.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		currTblTotal = parseFloat(currTblTotal);
		var newTotal = currTblTotal - pricePerItem;
		parentTbl.find('.price').html('<b>$' + newTotal.toFixed(2) + '</b>');
		if (initQty > 1)	{
			var newQty = initQty - 1;
			$(this).closest('td').prev('td').prev('td').text(newQty + ' x');
		}
		else {
			rowClicked.remove();
		}
	});
