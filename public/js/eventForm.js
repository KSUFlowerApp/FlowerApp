$( document ).ready(function() {
	prices = {}
	InsertTaxDropdown();
	InsertCustomersDropdown();
	InsertTimesDropdown();
	SelectFirstInventoryTypeByDefault();
	updateGrandTotal();

	// remove hasDatepicker class from all date inputs on page load
	$(".date").each(function() {
		$(this).removeClass('hasDatepicker');
	});
	// add datepicker to all .date classes
	$(".date").datepicker({ dateFormat: 'yy-mm-dd' });
	// update grand total on page load
});

// Display "add inventory" modal.
$(document).on("click", ".add-btn", function() {
		var tblID = $(this).next('table').attr('id');
		$('#modal-table-id').val(tblID);
		$("#mdlAddItem").modal();
});

$(document).on("shown.bs.modal", "#mdlAddItem", function() {
	$(this).find('#altar-inventory').prop('selectedIndex', 0);
	$(this).find('#addQuantity').val(null);
	$(this).find("#addPrice").val(null);
});

// Load price in modal on item select
$(document).on("change", "[name=altar-inventory]", function() {
	if ($(this).prop('selectedIndex') != 0)	{
		var name = $("option:selected", this).text();
		var price = parseFloat(prices[name]).toFixed(2);
		$(this).siblings('#addPrice').val(null);
		$(this).siblings('#addQuantity').val(1);
	}
	else {
		$(this).siblings('#addPrice').val(null);
		$(this).siblings('#addQuantity').val(null);
	}
});

// Add new item to recipe table
$(document).on("click", "#addItem", function() {
	if ($("#altar-inventory").prop("selectedIndex") != 0)	{
		event.preventDefault();
		var addRow = true;
		var $form = $(this).closest('form');
		var item = $form.find('#altar-inventory option:selected').text();
		var qty = $form.find('#addQuantity').val();
		var price = $form.find('#addPrice').val();
		price = parseFloat(price);
		qty = parseFloat(qty)
		if (isNaN(price) || isNaN(qty)) {
			alert("Price or quantity is invalid.");
			$form.find('#addPrice').val(prices[item].toFixed(2));
			$form.find('#addQuantity').val(1);
		}
		else {
			var tblID = $form.find('#modal-table-id').val();
			var tbl = $("#" + tblID);
			tbl.find("tbody > tr:not(:last)").each(function() {
				var item_name = $(this).children().eq(0).text();
				var item_qty = $(this).children().eq(1).text().replace(" x","");
				var item_price = $(this).children().eq(2).text();
				item_qty = parseFloat(item_qty);
				item_price = parseFloat(item_price.substring(1, item_price.length));
				if (item == item_name && price == item_price) {
					addRow = false;
					item_qty = item_qty + qty;
					$(this).children().eq(1).text(item_qty + " x");
				}
			});
			if (addRow) {
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
		}
	}
	else {
		event.preventDefault();
		alert("Please select a valid item.");
	}
		var qtyPrice = parseFloat(qty) * parseFloat(price);
		var tblTotal = tbl.find('.price');
		var initPrice = tblTotal.text();
		initPrice = initPrice.replace(/[,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
		totalToDisp = parseFloat(initPrice) + parseFloat(qtyPrice);
		tblTotal.html("$" + totalToDisp.toFixed(2));
		$("#mdlAddItem").modal('hide');
		updateGrandTotal();
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
	parentTbl.find('.price').html('$' + newTotal.toFixed(2));
	updateGrandTotal();
	if (initQty > 1)	{
		var newQty = initQty - 1;
		$(this).closest('td').prev('td').prev('td').text(newQty + ' x');
	}
	else {
		rowClicked.remove();
	}
});

$(document).on("change", ".inventory-btn", function()	{
	var checkVal = $(this).val();
	var qtyBox = $(this).siblings('#addQuantity');
	qtyBox.val(1);
	if (checkVal == "Flower")	{
		$("select[name=altar-inventory]").html(flwOptions);
	}
	else if (checkVal == "Hard Good")	{
		$("select[name=altar-inventory]").html(hgOptions);
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
	parentTbl.find('.price').html('$' + newTotal.toFixed(2));
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
	parentTbl.find('.price').html('$' + newTotal.toFixed(2));
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
	var tax_rate = $("select[name=tax-information] option:selected").attr("data-val");
	if(isNaN(tax_rate)) {
		tax_rate = 0;
	}
	tax_rate = 1 + parseFloat(tax_rate);
	grand_total *= tax_rate;
	$('#grand-total').html('$' + grand_total.toFixed(2));
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
	var form_html = $("#main-form").html().replace(/^\s+|\r\n|\n|\r|(>)\s+(<)|\s+$/gm, '$1$2').replace(/<option value="TBA".+?\/select>/g, '</select>');
	var form_json = GetPDFJSON();
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
				form_html: form_html,
				form_json: form_json
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

// parse current form out into a json object
function GetPDFJSON() {
	var pdf = {}

	var customer_name = $("select[name=customer] option:selected").text();
	pdf["customer_name"] = customer_name;

	var brides_name = $("input[name=brides-name]").val();
	pdf["brides_name"] = brides_name;

	var grooms_name = $("input[name=grooms-name]").val();
	pdf["grooms_name"] = grooms_name;

	var ceremony_date = $("input[name=ceremony-date]").val();
	pdf["ceremony_date"] = ceremony_date;

	var ceremony_start_time = $("select[name=ceremony-start-time] option:selected").text();
	pdf["ceremony_start_time"] = ceremony_start_time;

	var ceremony_address = $("input[name=ceremony-address]").val();
	pdf["ceremony_address"] = ceremony_address;

	var ceremony_city = $("input[name=ceremony-city]").val();
	pdf["ceremony_city"] = ceremony_city;

	var ceremony_state = $("input[name=ceremony-state]").val();
	pdf["ceremony_state"] = ceremony_state;

	var ceremony_zip = $("input[name=ceremony-zip]").val();
	pdf["ceremony_zip"] = ceremony_zip;

	var ceremony_colors = $("textarea[name=color-notes]").val();
	pdf["ceremony_colors"] = ceremony_colors;

	var ceremony_theme = $("textarea[name=theme-notes]").val();
	pdf["ceremony_theme"] = ceremony_theme;

	var reception_date = $("input[name=reception-date]").val();
	pdf["reception_date"] = reception_date;

	var reception_start_time = $("select[name=reception-start-time] option:selected").text();
	pdf["reception_start_time"] = reception_start_time;

	var reception_address = $("input[name=reception-address]").val();
	pdf["reception_address"] = reception_address;

	var reception_city = $("input[name=reception-city]").val();
	pdf["reception_city"] = reception_city;

	var reception_state = $("input[name=reception-state]").val();
	pdf["reception_state"] = reception_state;

	var reception_zip = $("input[name=reception-zip]").val();
	pdf["reception_zip"] = reception_zip;

	var photographers = $("input[name=photographers]").val();
	pdf["photographers"] = photographers;

	var photograph_start_time = $("select[name=photograph-start-time] option:selected").text();
	pdf["photograph_start_time"] = photograph_start_time;

	var wedding_planner = $("input[name=wedding-planner]").val();
	pdf["wedding_planner"] = wedding_planner;

	var delivery_time = $("select[name=delivery-time] option:selected").text();
	pdf["delivery_time"] = delivery_time;

	var tax_information = $("select[name=tax-information] option:selected").text();
	pdf["tax_information"] = tax_information;

	var grand_total = $("#grand-total").text();
	pdf["grand_total"] = grand_total;

	var recipe_headers = ["Bouquets", "Boutonnieres", "Corsages", "Ceremony Decorations", "Reception Decorations"];
	$("h2").each(function() {
		// header text
		var header = $(this).text();
		// if that header is in the recipe_headers, we want to parse recipe information
		if($.inArray(header, recipe_headers) > -1) {
			// initialize json object for current header
			pdf[header] = {}
			// iterate through each element until the next h2 tag
			$(this).nextUntil("h2").each(function() {
				// if the element has row class, that means its a div holding the recipe information
				if($(this).hasClass("row")) {
					// this is the row div
					var row = $(this);
					// first child of row div holds the sub heading and the recipe table
					var recipe_table_div = row.children().eq(0);
					// get sub heading of the row div
					var sub_heading = recipe_table_div.find("label").text();
					// initialize the subheading json object
					pdf[header][sub_heading] = {}
					// initialize the recipe object for the current sub heading
					var recipe = {"items": [], "total": 0}
					// all flower rows in the table except the last one which holds the recipe total
					recipe_table_div.find("table > tbody > tr:not(:last)").each(function() {
						// item name is first child in the table row
						var item_name = $(this).children().eq(0).text();
						// item qty is second child in the table row
						var item_qty = $(this).children().eq(1).text().replace(" x","");
						// item price is the third child in the table row
						var item_price = $(this).children().eq(2).text();
						// add this row to the recipe items array
						recipe["items"].push({
							"item_name": item_name,
							"item_qty": item_qty,
							"item_price": item_price
						});
					});
					// last row of the table that holds the total price
					var total_row = recipe_table_div.find("table > tbody > tr:last");
					// get the recipe total
					var recipe_total = total_row.children().eq(1).text();
					// put the recipe total into the recipe object
					recipe["total"] = recipe_total;
					// put the recipe object into the sub heading object
					pdf[header][sub_heading]["recipe"] = recipe;

					// second child of row div holds the qty box
					var qty_div = row.children().eq(1);
					// get recipe qty
					var recipe_qty = qty_div.find(".recipeQty").val();
					// put recipe qty into sub heading object
					pdf[header][sub_heading]["recipe_qty"] = recipe_qty;

					// third child of row div holds the notes box
					var notes_div = row.children().eq(2);
					// get notes
					var notes = notes_div.find("textarea").val();
					// put notes into the sub heading object
					pdf[header][sub_heading]["notes"] = notes;
				}
			});
		}
	});
	return JSON.stringify(pdf);
}

// ajax call to update the inventory dropdown and the prices object whenever a new inventory type is selected
$(document).on("change", "input[name=inventory-type]", function() {
	var inventory_type = $(this).val();
	$.ajax({
		url: '/staff/eventForm/getInventory/'+inventory_type,
		method: 'GET',
		async: false,
		success: function(response) {
			$("select[name=altar-inventory]").html(response.options);
			prices = response.prices;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + textStatus); alert("Error: " + errorThrown);
		}
	});
});

// puts qty 1 and the price on change from inventory dropdown in add item modal
$(document).on("change", "#altar-inventory", function() {
	if($(this).prop('selectedIndex') != 0)	{
		var name = $("option:selected", this).text();
		var price = parseFloat(prices[name]).toFixed(2);
		$('#addPrice').val(price);
		$('#addQuantity').val(1);
	}
	else {
		$('#addPrice').val(price);
		$('#addQuantity').val(null);
	}
});

// insert the customer dropdowns from the ajax call and select current data-val
function InsertCustomersDropdown() {
	var customer_id = $("select[name=customer]").attr('data-val');
	$.ajax({
		url: '/staff/eventForm/getCustomers/'+customer_id,
		method: 'GET',
		async: false,
		success: function(response) {
			$("select[name=customer]").html(response);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + textStatus); alert("Error: " + errorThrown);
		}
	});
}

// insert the customer dropdowns from the ajax call and select current data-val
function InsertTaxDropdown() {
	var tax_id = $("select[name=tax-information]").attr('data-val');
	$.ajax({
		url: '/staff/eventForm/getTaxes/'+tax_id,
		method: 'GET',
		async: false,
		success: function(response) {
			$("select[name=tax-information]").html(response);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("Status: " + textStatus); alert("Error: " + errorThrown);
		}
	});
}

// insert all time dropdowns and select the current data-val
function InsertTimesDropdown() {
	$(".TimeSelect").each(function() {
		var data_val = $(this).attr('data-val');
		var html = "";
		if(data_val == "TBA") {
			html += "<option value=\"TBA\" selected=\"selected\">--</option>";
		} else {
			html += "<option value=\"TBA\">--</option>"
		}
		var minutes = ["00","15","30","45"];
		for(var i = 0; i <=23; i++) {
			for(var j = 0; j < minutes.length; j++) {
				var suffix = (i >= 12)? 'pm' : 'am';
				var hours = (i > 12) ? i - 12 : i;
				if(hours == 0) {
					hours = 12;
				}
				var val = String(hours) + String(minutes[j]) + suffix;
				if(data_val == val) {
					html += "<option value=\""+val+"\" selected=\"selected\">" + hours + ":" + minutes[j] + " " + suffix + "</option>";
				} else {
					html += "<option value=\""+val+"\">" + hours + ":" + minutes[j] + " " + suffix + "</option>";
				}
			}
		}
		$(this).html(html);
	});
}

// select first inventory item by default in add modal
function SelectFirstInventoryTypeByDefault() {
	$("input:radio[name=inventory-type]:first").click();
}
