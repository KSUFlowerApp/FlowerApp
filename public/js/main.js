$( document ).ready(function() {

  $(".currency").on('change', function() {
    // no characters can be typed
    // price is always 2 decminal points
    var sanitized = parseFloat($(this).val().replace(/,/g, ""))
                    .toFixed(2);
                    //.toString()
                    //.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $(this).val(sanitized);
  });
});
