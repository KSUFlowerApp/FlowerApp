// format currency on keyup
/*$(document).on("keyup", ".currency", function ()	{
  // no characters can be typed
  // price is always 2 decminal points
  var sanitized = parseFloat($(this).val().replace(/,/g, "")).toFixed(2);
  $(this).val(sanitized);
});*/

$(document).on("change", ".currency", function ()	{
  // no characters can be typed
  // price is always 2 decminal points
  var sanitized = parseFloat($(this).val().replace(/,/g, "")).toFixed(2);
  $(this).val(sanitized);
});

// scroll page to location of tags
var navigationFn = {
    goToSection: function(id) {
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 0);
    }
}
