const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.5, 
});

const labItemsLeft = document.querySelectorAll('.lab-items-left .lab-item');
const labItemsRight = document.querySelectorAll('.lab-items-right .lab-item');

labItemsLeft.forEach(item => observer.observe(item)); 
labItemsRight.forEach(item => observer.observe(item)); 



$(document).ready(function() {
    $('.counter').counterUp({
      delay: 20,
      time: 2000
    });
  });

 
  (function($) {
  $(window).on('load', function() {
    $('.preloader').addClass('preloader-deactivate');
  });
})(jQuery);

document.getElementById("menu-toggle").addEventListener("click", function () {
  document.querySelector(".main-menu").classList.toggle("active");
});

