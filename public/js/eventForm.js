$( document ).ready(function() {
	// update grand total on page load
	updateGrandTotal();

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
		tbl.prepend("<tr><td>" + item + "</td><td style='text-align: right;'>" + qty + " x </td><td>$" + price.toFixed(2) + "</td><td><center>" +
		"<button class='increase-item-btn btn-success'>"+
  		"<span class='glyphicon glyphicon-plus'></span>"+
		"</button>"+
		"<button class='decrease-item-btn btn-warning'>"+
  		"<span class='glyphicon glyphicon-minus'></span>"+
		"</button>"+
		"<button class='remove-item-btn btn-danger'>"+
  		"<span class='glyphicon glyphicon-remove'></span>"+
		"</button>"+
		"</ center></td></tr>");
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

// Decrease item from recipe table
$(document).on("click", ".decrease-item-btn", function ()	{
	event.preventDefault();
	var parentTbl = $(this).closest('table');
	var rowClicked = $(this).closest('tr');
	var initQty = $(this).closest('td').prev('td').prev('td').text().replace(" x","");
	initQty = parseFloat(initQty);
	var pricePerItem = $(this).closest('td').prev('td').text();
	pricePerItem = pricePerItem.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	pricePerItem = parseFloat(pricePerItem);
	var currTblTotal = parentTbl.find('.price').text();
	currTblTotal = currTblTotal.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	currTblTotal = parseFloat(currTblTotal);
	var newTotal = currTblTotal - pricePerItem;
	parentTbl.find('.price').html('<b>$' + newTotal.toFixed(2) + '</b>');
	updateGrandTotal();
	if (initQty > 1)	{
		var newQty = initQty - 1;
		$(this).closest('td').prev('td').prev('td').text(newQty + ' x');
	}
	else {
		rowClicked.remove();
	}
});

// Increase item from recipe table
$(document).on("click", ".increase-item-btn", function ()	{
	event.preventDefault();
	var parentTbl = $(this).closest('table');
	var rowClicked = $(this).closest('tr');
	var initQty = $(this).closest('td').prev('td').prev('td').text().replace(" x","");
	initQty = parseFloat(initQty);
	var pricePerItem = $(this).closest('td').prev('td').text();
	pricePerItem = pricePerItem.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	pricePerItem = parseFloat(pricePerItem);
	var currTblTotal = parentTbl.find('.price').text();
	currTblTotal = currTblTotal.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	currTblTotal = parseFloat(currTblTotal);
	var newTotal = currTblTotal + pricePerItem;
	parentTbl.find('.price').html('<b>$' + newTotal.toFixed(2) + '</b>');
	updateGrandTotal();
	if (initQty > 0)	{
		var newQty = initQty + 1;
		$(this).closest('td').prev('td').prev('td').text(newQty + ' x');
	}
	else {
		rowClicked.remove();
	}
});

// Remove item from recipe table
$(document).on("click", ".remove-item-btn", function ()	{
	event.preventDefault();
	var parentTbl = $(this).closest('table');
	var rowClicked = $(this).closest('tr');
	var initQty = $(this).closest('td').prev('td').prev('td').text().replace(" x","");
	initQty = parseFloat(initQty);
	var pricePerItem = $(this).closest('td').prev('td').text();
	pricePerItem = pricePerItem.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	pricePerItem = parseFloat(pricePerItem);
	var currTblTotal = parentTbl.find('.price').text();
	currTblTotal = currTblTotal.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
	currTblTotal = parseFloat(currTblTotal);
	var newTotal = currTblTotal - initQty*pricePerItem;
	parentTbl.find('.price').html('<b>$' + newTotal.toFixed(2) + '</b>');
	updateGrandTotal();
	rowClicked.remove();
});

// Update Grand Total whenever qty is changed for a recipe
$(document).on("change", ".recipeQty", function ()	{
	updateGrandTotal();
});

$(document).on("change", ".taxes", function ()	{
	updateGrandTotal();
});

// update Grand Total
function updateGrandTotal() {
	grand_total = 0;
	$(".recipeQty").each(function() {
		var recipe_qty = $(this).val();
		var recipe_price = $(this).parent().prev().children('.itemTable').find('.recipeTotal').find('.price').text();
		recipe_price = parseFloat(recipe_price.substring(1, recipe_price.length));
		recipe_total = recipe_price*recipe_qty;
		grand_total += recipe_total;
	});
	tax_rate = $("select[name=tax-information] option:selected").attr("data-val");
	tax_rate = 1 + parseFloat(tax_rate);
	grand_total *= tax_rate;
	$('#grand-total').html('<b>$' + grand_total.toFixed(2) + '</b>');
}

$(document).on("change","input, number", function() {
	$(this).attr("value", $(this).val());
});

$(document).on("change", "textarea", function() {
	$(this).text($(this).val());
});

$(document).on("change","select", function() {
	var val = $(this).val();
	$(this).attr('data-val', val);
});

$(document).on("click", "#save-btn", function() {
	event.preventDefault();
	var form_id = $("#form-id").val();
	var customer = $("select[name=customer]").val();
	if(isEmpty(form_id)) { form_id = undefined }
	var brides_name = $("input[name=brides-name]").val();
	var grooms_name = $("input[name=grooms-name]").val();
	var ceremony_date = $("input[name=ceremony-date]").val();
	// replace all white space and strip out time dropdowns
	var form_text = $("#main-form").html().replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2').replace(/<option value="TBA".+?\/select>/g, '</select>');
	if(isEmpty(customer) || isEmpty(brides_name) || isEmpty(grooms_name) || isEmpty(ceremony_date)) {
		alert("Customer, Bride's Name, Groom's Name, and Ceremony Date must be filled out in order to save.");
	} else {
		$.ajax({
			url: '/staff/eventForm',
			data: {
				form_id: form_id,
				customer: customer,
				brides_name: brides_name,
				grooms_name: grooms_name,
				ceremony_date: ceremony_date,
				form_text: form_text
			},
			method: 'POST',
			success: function(response) {
				res = JSON.parse(response);
				$("#form-id").val(res.form_id);
				alert(res.message);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				alert("Status: " + textStatus); alert("Error: " + errorThrown);
			}
		});
	}
});

// Check if value of input isn't set
function isEmpty(str) {
	if(str == "TBA") {
		return true;
	}
	return (!str || /^\s*$/.test(str));
}
