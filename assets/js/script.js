(function ($, window) {
  "use strict";

  // Main object
  var ecommerceJs = {
    // Main initialization method
    m: function () {
      ecommerceJs.d(); // DOM caching
      ecommerceJs.methods(); // Function calls
    },

    // DOM caching for performance
    d: function () {
      ecommerceJs._window = $(window);
      ecommerceJs._document = $(document);
      ecommerceJs._body = $("body");
      ecommerceJs._html = $("html");
    },

    // Entry point to initialize all features
    methods: function () {
      ecommerceJs.inlineCssActivation();
      ecommerceJs.swiperActivation();
      ecommerceJs.headerSticky();
      ecommerceJs.topBarTextSlide();
      ecommerceJs.animationActivation();
      ecommerceJs.productTabActivation();
      ecommerceJs.imgHotSpotActivation();
    },

    imgHotSpotActivation: function () {
      $(".hotspot").on("click", function (e) {
        e.stopPropagation(); // Prevent bubbling

        const id = $(this).data("popup");
        const $targetPopup = $("#" + id);

        // Hide other popups with animation
        $(".hotspot-popup").not($targetPopup).removeClass("active");

        // Toggle clicked popup
        $targetPopup.toggleClass("active");
      });

      // Hide popups when clicked outside
      $(document).on("click", function (e) {
        if (!$(e.target).closest(".hotspot, .hotspot-popup").length) {
          $(".hotspot-popup").removeClass("active");
        }
      });
    },

    topBarTextSlide: function () {
      const textEl = document.getElementById("text");
      const spans = document.querySelectorAll("#text-container span");
      const nextBtn = document.getElementById("next-btn");
      const prevBtn = document.getElementById("prev-btn");

      if (!textEl || spans.length === 0 || !nextBtn || !prevBtn) {
        console.warn("Top bar elements not found. Skipping text slider.");
        return;
      }

      const texts = Array.from(spans).map((span) => span.innerHTML);
      let index = 0;

      function showText(i) {
        textEl.classList.remove("show");

        setTimeout(() => {
          index = i;
          if (index < 0) index = texts.length - 1;
          if (index >= texts.length) index = 0;
          textEl.innerHTML = texts[index];
          textEl.classList.add("show");
        }, 150);
      }

      nextBtn.addEventListener("click", () => showText(index + 1));
      prevBtn.addEventListener("click", () => showText(index - 1));
      showText(0);
    },

    animationActivation: function () {
      scrollCue.init({
        percentage: 0.99,
        duration: 900,
      });
    },

    productTabActivation: function () {
      $(".tab-menu ul li a").on("click", function () {
        var tabId = $(this).data("tab");

        // active button style
        $(".tab-menu ul li a").removeClass("active");
        $(this).addClass("active");

        // show corresponding content
        $(".tab-content1, .tab-content2, .tab-content3").removeClass("active");
        $(".tab-content" + tabId).addClass("active");
      });
    },

    headerSticky: function () {
      $(document).ready(function () {
        $(window).on("scroll", function () {
          var scrollTop = $(window).scrollTop();
          $(".ecommerce__header").toggleClass("sticky", scrollTop > 100);
        });
      });
    },

    inlineCssActivation: function () {
      const elements = document.querySelectorAll("[data-background]");
      if (!elements.length) {
        console.warn("No elements found with [data-background] attribute.");
        return;
      }

      elements.forEach((el) => {
        const bg = el.getAttribute("data-background");
        if (bg) {
          el.style.backgroundImage = `url("${bg}")`;
        }
      });
    },

    /**
     * SwiperJS slider/carousel activation
     */
    swiperActivation: function () {
      // Hero slider
      if ($(".hero-slider").length > 0) {
        new Swiper(".hero-slider", {
          slidesPerView: 1,
          loop: true,
          speed: 1500,
          effect: "creative",
          creativeEffect: {
            prev: {
              shadow: true,
              translate: ["-20%", 0, -1],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          },
          autoplay: {
            delay: 4000,
            disableOnInteraction: false,
          },
          pagination: {
            el: ".hero-slider-pagination",
            clickable: true,
          },
        });
      }

      // Tab Product
      if ($(".tab-product-slider").length > 0) {
        new Swiper(".tab-product-slider", {
          slidesPerView: 4,
          loop: true,
          spaceBetween: 24,
          freeMode: true,
          breakpoints: {
            210: {
              slidesPerView: 1,
            },
            600: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1025: {
              slidesPerView: 4,
            },
          },
          navigation: {
            nextEl: ".tab-product-button-next",
            prevEl: ".tab-product-button-prev",
          },
        });
      }

      // Text - Image
      if ($(".text-img-slider").length > 0) {
        const swiper = new Swiper(".text-img-slider", {
          slidesPerView: 1,
          loop: true,
          spaceBetween: 30,
          effect: "fade",
        });

        let currentIndex = 0;
        let timer;

        function activateTab(index) {
          $(".tab-btn").removeClass("active auto-fill");
          const $btn = $(".tab-btn").eq(index);
          $btn.addClass("active auto-fill");

          swiper.slideToLoop(index);

          clearTimeout(timer);
          timer = setTimeout(() => {
            currentIndex = (index + 1) % $(".tab-btn").length;
            activateTab(currentIndex);
          }, 4000);
        }

        $(".tab-btn").on("click", function () {
          const index = $(this).data("slide");
          activateTab(index);
        });

        // Start autoplay
        activateTab(0);
      }

      // Image HotSpot
      if ($(".img-hotspot-slider").length > 0) {
        new Swiper(".img-hotspot-slider", {
          slidesPerView: 1,
          loop:true,
          navigation: {
            nextEl: ".img-hotspot-button-next",
            prevEl: ".img-hotspot-button-prev",
          },
          pagination: {
            el: ".swiper-pagination-fraction",
            type: "fraction",
            formatFractionCurrent: function (number) {
              return ("" + number).padStart(1, "0");
            },
            formatFractionTotal: function (number) {
              return ("" + number).padStart(1, "0");
            },
            renderFraction: function (currentClass, totalClass) {
              return (
                '<span class="' +
                currentClass +
                '"></span>' +
                " / " +
                '<span class="' +
                totalClass +
                '"></span>'
              );
            },
          },
        });
      }
    },
  };

  // Bootstrap/init call
  ecommerceJs.m();
})(jQuery, window);
