((window, document) => {
  "use strict";

  const app = {
    init() {
      try {
        this.topBarTextSlide();
        this.swiperSliderActivation();
        this.setBackgroundImages();
        this.scrollAnimateInit();
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    },

    topBarTextSlide() {

    },

    swiperSliderActivation() {
      const heroSlider = document.querySelector(".hero-slider");

      if (!heroSlider || typeof Swiper === "undefined") {
        console.warn("Swiper or .hero-slider not found. Skipping slider.");
        return;
      }

      new Swiper(".hero-slider", {
        slidesPerView: 1,
        loop: true,
        effect: "fade",
        speed: 4000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".hero-slider-pagination",
          clickable: true,
        },
      });
    },

    setBackgroundImages() {
      const elements = document.querySelectorAll('[data-background]');
      if (!elements.length) {
        console.warn('No elements found with [data-background] attribute.');
        return;
      }

      elements.forEach(el => {
        const bg = el.getAttribute('data-background');
        if (bg) {
          el.style.backgroundImage = `url("${bg}")`;
        }
      });
    },

    scrollAnimateInit() {
      const elements = document.querySelectorAll('[data-animate]');

      const isVisible = (el) => {
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight - 100;
      };

      const animateElement = (el) => {
        if (el.classList.contains('animated')) return;

        const animation = el.dataset.animate;
        const delay = el.dataset.delay || '0s';
        const duration = el.dataset.duration || '0.8s';

        el.style.transitionDelay = delay;
        el.style.transitionDuration = duration;
        el.style.transitionTimingFunction = 'ease';

        void el.offsetWidth;
        el.classList.add(animation);
        el.classList.add('animated');
      };

      const handleScroll = () => {
        elements.forEach(el => {
          if (isVisible(el)) animateElement(el);
        });
      };

      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      window.addEventListener('load', handleScroll);
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    app.init();
  });

})(window, document);
