$( document ).ready(function() {

	// add datepicker to all .datepicker classes
	$(".date").datepicker();

	// Load price in modal on item select
	$("#altar-flowers").on('change', function()	{
		if ($(this).prop('selectedIndex') != 0)	{
			var name = $("option:selected", this).text();
			var price = parseFloat(prices[name]).toFixed(2);
			$(this).siblings('#addPrice').val(price);
			$(this).siblings('#addQuantity').val(1);
		}
		else {
			$(this).siblings('#addPrice').val(price);
			$(this).siblings('#addQuantity').val(null);
		}
	});

});

// Display "add inventory" modal.
$(document).on("click", ".add-btn", function() {
		var tblID = $(this).next('table').attr('id');
		$('#modal-table-id').val(tblID);
		$("#mdlAddItem").modal();
});

// Load price in modal on item select
$(document).on("change", ".altar-flowers", function() {
	if ($(this).prop('selectedIndex') != 0)	{
		var name = $("option:selected", this).text();
		var price = parseFloat(prices[name]).toFixed(2);
		$(this).siblings('#addPrice').val(price);
		$(this).siblings('#addQuantity').val(1);
	}
	else {
		$(this).siblings('#addPrice').val(price);
		$(this).siblings('#addQuantity').val(null);
	}
});

// Add new item to recipe table
$(document).on("click", "#addItem", function() {
	if ($("#altar-flowers").prop("selectedIndex") != 0)	{
		event.preventDefault();

		var $form = $(this).closest('form');
		var item = $form.find('#altar-flowers option:selected').text();
		var qty = $form.find('#addQuantity').val();
		var price = $form.find('#addPrice').val();
		price = parseFloat(price);
		var tblID = $form.find('#modal-table-id').val();
		var tbl = $("#" + tblID);
		tbl.prepend("<tr><td>" + item + "</td><td style='text-align: right;'>" + qty + " x </td><td>$" + price.toFixed(2) + "</td><td><center><input type='button' class='increase-item-btn' value='+' /> <input type='button' class='decrease-item-btn' value='-' /> <input type='button' class='remove-item-btn' value='x' /></ center></td></tr>");
		var qtyPrice = parseFloat(qty) * parseFloat(price);
		var tblTotal = tbl.find('.price');
		var initPrice = tblTotal.text();
		initPrice = initPrice.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		totalToDisp = parseFloat(initPrice) + parseFloat(qtyPrice);
		tblTotal.html("<b>$" + totalToDisp.toFixed(2) + "</b>");
		$("#mdlAddItem").modal('hide');
		updateGrandTotal(totalToDisp, "add")
		var qtyTblToUpdate = tbl.closest('.itemTable');
		var tblID2 = qtyTblToUpdate.attr("id");
		var numRows = $("#" + tblID2 + " > tbody > tr").length;
		qtyVal = qtyTblToUpdate.parent().next().children('.form-control-num').val();
		if (qtyVal == null | qtyVal == "" | qtyVal == 0)
		{
			qtyTblToUpdate.parent().next().children('.form-control-num').defaultValue = 1;
			qtyTblToUpdate.parent().next().children('.form-control-num').val(1);
		}
	}
	else {
		event.preventDefault();
		alert("Please select a valid item.");
	}
});

// Check if value of input isn't set
function isEmpty(str) {
	if(str == "TBA") {
		return true;
	}
	return (!str || /^\s*$/.test(str));
}
