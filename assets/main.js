$(document).ready(function () {
  $('.toggle-data').click(function (e) {
    $(this).find('.caret').toggleClass("rotate");
    $(this).next('.data').toggle();
  });
});
