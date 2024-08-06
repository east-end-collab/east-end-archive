$(document).ready(function () {
  $('.toggle-data').click(function (e) {
    $(this).find('.caret').toggleClass("rotate");
    $(this).next('.data').toggle();
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.getElementById('sidebar');
  const scrollArrow = document.getElementById('scrollArrow');

  // Function to check if the sidebar is scrollable
  function checkScrollable() {
    if (sidebar.scrollHeight > sidebar.clientHeight) {
      scrollArrow.style.display = 'block';
    } else {
      scrollArrow.style.display = 'none';
    }
  }

  // Function to handle the arrow click
  function scrollDown() {
    sidebar.scrollBy({
      top: 100, // Adjust the scroll amount as needed
      behavior: 'smooth'
    });
  }

  // Event listener for sidebar scroll
  sidebar.addEventListener('scroll', function () {
    if (sidebar.scrollTop + sidebar.clientHeight >= sidebar.scrollHeight) {
      scrollArrow.style.display = 'none';
    } else {
      scrollArrow.style.display = 'block';
    }
  });

  // Initial check
  checkScrollable();

  // Event listener for window resize
  window.addEventListener('resize', checkScrollable);

  // Event listener for arrow click
  scrollArrow.addEventListener('click', scrollDown);
});