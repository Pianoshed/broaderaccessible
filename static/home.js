document.addEventListener("DOMContentLoaded", function () {
  // -------------------------------------------------------------
  // 1. Mobile Menu Toggle
  // -------------------------------------------------------------
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      mobileMenu.classList.toggle("is-open");
    });
  }

  // -------------------------------------------------------------
  // 2. Hero Slider
  // -------------------------------------------------------------
  const slider = document.getElementById("homeSlider");
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");

  if (slider && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let slideInterval = null;

    function renderSlide(index) {
      if (index < 0) {
        currentIndex = totalSlides - 1;
      } else if (index >= totalSlides) {
        currentIndex = 0;
      } else {
        currentIndex = index;
      }
      slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    function advanceSlide() {
      renderSlide(currentIndex + 1);
    }

    function reverseSlide() {
      renderSlide(currentIndex - 1);
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        advanceSlide();
        restartTimer();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        reverseSlide();
        restartTimer();
      });
    }

    function startTimer() {
      slideInterval = setInterval(advanceSlide, 5500);
    }

    function restartTimer() {
      clearInterval(slideInterval);
      startTimer();
    }

    startTimer();
  }

  // -------------------------------------------------------------
  // 3. Modals Management (Privacy, Terms, Contact)
  // -------------------------------------------------------------
  const modalTriggers = [
    { triggerId: "openPrivacy", modalId: "privacyModal" },
    { triggerId: "openTerms", modalId: "termsModal" },
    { triggerId: "openContact", modalId: "contactModal" },
  ];

  function openModal(modal) {
    if (!modal) return;
    modal.classList.add("is-visible");
    document.body.style.overflow = "hidden"; // Prevent page scrolling under modal
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-visible");
    document.body.style.overflow = "";
  }

  modalTriggers.forEach(({ triggerId, modalId }) => {
    const btn = document.getElementById(triggerId);
    const modal = document.getElementById(modalId);

    if (btn && modal) {
      btn.addEventListener("click", () => openModal(modal));

      // Close button inside card
      const closeBtn = modal.querySelector(".close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", () => closeModal(modal));
      }

      // Close by clicking backdrop
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Close open modal via Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".modal-overlay.is-visible");
      if (activeModal) closeModal(activeModal);
    }
  });

  // -------------------------------------------------------------
  // 4. Back To Top
  // -------------------------------------------------------------
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // -------------------------------------------------------------
  // 5. Cookie Consent Banner
  // -------------------------------------------------------------
  const cookieBanner = document.getElementById("cookieBanner");
  const acceptCookiesBtn = document.getElementById("acceptCookiesBtn");

  function getCookie(name) {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [key, val] = cookie.trim().split("=");
      if (key === name) return val;
    }
    return null;
  }

  if (cookieBanner && !getCookie("cookieConsent")) {
    // Show after a brief delay
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 1000);
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener("click", () => {
      // Set 30-day cookie
      const expiry = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000,
      ).toUTCString();
      document.cookie = `cookieConsent=true; expires=${expiry}; path=/`;
      cookieBanner.classList.remove("show");
    });
  }
});
