$( document ).ready(function() {
  $("input[type='number']").on('change keyup', function() {
    var sanitized = $(this).val().replace(/[^0-9.]/g, '');
    sanitized = sanitized.replace(/\.(?=.*\.)/, '');
    $(this).val(sanitized);
  });
});
