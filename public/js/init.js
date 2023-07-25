/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */

   setTimeout(function () {
      $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
   }, 100);


   /*----------------------------------------------------*/
   /* Smooth Scrolling
   ------------------------------------------------------ */

   $('.smoothscroll').on('click', function (e) {
      e.preventDefault();

      const target = this.hash,
       $target = $(target);

       $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
         window.location.hash = '';
         window.location.hash = target;
      });
   });


   /*----------------------------------------------------*/
   /* Highlight the current section in the navigation bar
   ------------------------------------------------------*/

   const sections = $("section");
   const navigation_links = $("#nav-wrap a");

   sections.waypoint({

      handler: function (event, direction) {

         var active_section;

         active_section = $(this);
         if (direction === "up") active_section = active_section.prev();

         var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
         active_link.parent().addClass("current");

      },
      offset: '35%'

   });


   /*----------------------------------------------------*/
   /*	Make sure that #header-background-image height is
   /* equal to the browser height.
   ------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function () {

      $('header').css({ 'height': $(window).height() });
      $('body').css({ 'width': $(window).width() })
   });


   /*----------------------------------------------------*/
   /*	Fade In/Out Primary Navigation
   ------------------------------------------------------*/

   $(window).on('scroll', function () {

      const h = $('header').height();
      const y = $(window).scrollTop();
      const nav = $('#nav-wrap');

      if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
         nav.fadeOut('fast');
      }
      else {
         if (y < h * .20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

   });


   /*----------------------------------------------------*/
   /*	Modal Popup
   ------------------------------------------------------*/

   $('.item-wrap a').magnificPopup({

      type: 'inline',
      fixedContentPos: false,
      removalDelay: 200,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
   });


   /*----------------------------------------------------*/
   /*	Flexslider
   /*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

   /*----------------------------------------------------*/
   /*	contact form
   ------------------------------------------------------*/

   $('form#contactForm button.submit').click(function () {

      $('#image-loader').fadeIn();
      const contactName = $('#contactForm #contactName').val();
      const contactEmail = $('#contactForm #contactEmail').val();
      const contactSubject = $('#contactForm #contactSubject').val();
      const contactMessage = $('#contactForm #contactMessage').val();
      const honeypot = $('#contactForm #honeypot').val();
      const data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
         '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage + '&honeypot=' + honeypot;
      const validEmail = contactEmail.includes('@');

      $.ajax({
         type: "POST",
         url: "https://script.google.com/macros/s/AKfycbwmoKJwas9QQVOIg27eF5Ufy-HjQsH9P1J1bIjFak8E7nN9x2k/exec",
         data: data,
         success: function (msg) {
            // Spam protection
            if (honeypot !== "") {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-invalid-email').fadeOut();
               $('#message-incomplete-fields').fadeOut();
               $('#message-honeypot').fadeIn();
            }
            // Incomplete fields
            else if (contactName === "" || contactEmail === "" || contactMessage === "") {
               $('#message-incomplete-fields').fadeIn();
               $('#message-invalid-email').fadeOut();
            }
            // Invalid Email address
            else if (!validEmail) {
               $('#message-invalid-email').fadeIn();
               $('#message-incomplete-fields').fadeOut();
            }
            // Message was sent
            else if (msg.result === 'success') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();
               $('#message-invalid-email').fadeOut();
               $('#message-incomplete-fields').fadeOut();
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
               $('#message-warning').fadeIn();
            }
         }
      });
      return false;
      
   });


});








