// Tamil Nadu-Based Coffee Co. - Interaction Logic

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Initialize Lucide Icons ---
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // --- 2. Shopping Cart Logic ---
  const cartBtn = document.getElementById('cart-btn');
  const cartCountEl = document.getElementById('cart-count');
  const mobileCartBtn = document.getElementById('mobile-cart-btn');
  const mobileCartCountEl = document.getElementById('mobile-cart-count');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');
  let cartCount = 0;

  addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const name = btn.getAttribute('data-name');
      
      // Increment Count
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount;
      if (mobileCartCountEl) mobileCartCountEl.textContent = cartCount;

      // Header Cart Link Micro-animation (Desktop)
      if (cartBtn) {
        cartBtn.style.transform = 'scale(1.15)';
        cartBtn.style.color = '#c89f65';
        setTimeout(() => {
          cartBtn.style.transform = 'scale(1)';
          cartBtn.style.color = '';
        }, 250);
      }

      // Header Cart Link Micro-animation (Mobile)
      if (mobileCartBtn) {
        mobileCartBtn.style.transform = 'scale(1.15)';
        mobileCartBtn.style.color = '#c89f65';
        setTimeout(() => {
          mobileCartBtn.style.transform = 'scale(1)';
          mobileCartBtn.style.color = '';
        }, 250);
      }

      // Show Toast Notification
      showToast(`Added ${name} to your cart!`);
    });
  });

  if (mobileCartBtn) {
    mobileCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      mobileCartBtn.style.transform = 'scale(1.15)';
      mobileCartBtn.style.color = '#c89f65';
      setTimeout(() => {
        mobileCartBtn.style.transform = 'scale(1)';
        mobileCartBtn.style.color = '';
      }, 250);
      showToast(`Your cart has ${cartCount} items.`);
    });
  }

  // --- 3. Toast Notifications ---
  const toast = document.getElementById('notification-toast');
  const toastMsg = document.getElementById('notification-msg');
  let toastTimeout;

  function showToast(message) {
    clearTimeout(toastTimeout);
    toastMsg.textContent = message;
    toast.classList.add('show');

    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  // --- 4. Search Modal Overlay ---
  const searchTrigger = document.getElementById('search-trigger');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('modal-search-input');
  const suggestionTags = document.querySelectorAll('.suggestion-tag');

  if (searchTrigger && searchOverlay && searchClose) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      searchOverlay.classList.add('open');
      setTimeout(() => searchInput.focus(), 300);
    });

    searchClose.addEventListener('click', () => {
      searchOverlay.classList.remove('open');
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
        searchOverlay.classList.remove('open');
      }
    });

    // Suggestion tags helper
    suggestionTags.forEach(tag => {
      tag.addEventListener('click', () => {
        searchInput.value = tag.textContent;
        searchInput.focus();
      });
    });

    // Search execute simulation
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim() !== '') {
        const query = searchInput.value.trim();
        searchOverlay.classList.remove('open');
        showToast(`Searching for: "${query}"...`);
        searchInput.value = '';
      }
    });
  }

  // --- 4b. Mobile Search Logic ---
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const mobileSearchSubmit = document.getElementById('mobile-search-submit');

  function executeMobileSearch() {
    if (mobileSearchInput && mobileSearchInput.value.trim() !== '') {
      const query = mobileSearchInput.value.trim();
      showToast(`Searching for: "${query}"...`);
      mobileSearchInput.value = '';
    }
  }

  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeMobileSearch();
      }
    });
  }

  if (mobileSearchSubmit) {
    mobileSearchSubmit.addEventListener('click', () => {
      executeMobileSearch();
    });
  }

  // --- 5. Hero Carousel Slider Simulator ---
  const heroPrevBtn = document.getElementById('hero-prev');
  const heroNextBtn = document.getElementById('hero-next');
  const heroTitle = document.querySelector('.hero-title');
  const heroDesc = document.querySelector('.hero-description');
  const heroProgress = document.getElementById('hero-progress');
  const heroImgTrack = document.getElementById('hero-image-track');

  let currentSlide = 0;
  const slides = [
    {
      title: 'Awaken Your Senses<br><span class="gold-text">Elevate Your Day</span>',
      description: 'Discover the perfect balance of rich flavors and aromas, crafted from the world\'s finest beans.',
      progress: '25%'
    },
    {
      title: 'Expertly Roasted<br><span class="gold-text">Freshly Brewed</span>',
      description: 'Carefully roasted in small batches to preserve and extract the unique characteristics of each harvest.',
      progress: '50%'
    },
    {
      title: 'Ethically Sourced<br><span class="gold-text">Sustainably Grown</span>',
      description: 'Supporting local farming communities and preserving the ecosystem through direct trade relationships.',
      progress: '75%'
    },
    {
      title: 'Crafted With Care<br><span class="gold-text">For True Connoisseurs</span>',
      description: 'Bringing you the authentic taste of South India with premium, hand-picked coffee beans.',
      progress: '100%'
    }
  ];

  function updateSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentSlide = index;

    // Apply fade out effect
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(10px)';
    heroDesc.style.opacity = '0';
    heroDesc.style.transform = 'translateY(10px)';

    // Slide carousel track
    if (heroImgTrack) {
      heroImgTrack.style.transform = `translateX(-${currentSlide * 25}%)`;
    }

    setTimeout(() => {
      // Update Content
      heroTitle.innerHTML = slides[currentSlide].title;
      heroDesc.textContent = slides[currentSlide].description;
      heroProgress.style.width = slides[currentSlide].progress;

      // Fade In Content
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
      heroDesc.style.opacity = '1';
      heroDesc.style.transform = 'translateY(0)';
    }, 250);
  }

  // Set initial smooth transition styles for slide contents
  if (heroTitle && heroDesc && heroImgTrack) {
    heroTitle.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    heroDesc.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

    heroPrevBtn.addEventListener('click', () => {
      updateSlide(currentSlide - 1);
      resetAutoplay();
    });

    heroNextBtn.addEventListener('click', () => {
      updateSlide(currentSlide + 1);
      resetAutoplay();
    });

    // Auto Play Hero Slides
    let autoplayInterval = setInterval(() => {
      updateSlide(currentSlide + 1);
    }, 7000);

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      autoplayInterval = setInterval(() => {
        updateSlide(currentSlide + 1);
      }, 7000);
    }
  }

  // --- 6. Newsletter Form Submit ---
  const newsletterFormMain = document.getElementById('newsletter-signup-form-main');
  if (newsletterFormMain) {
    newsletterFormMain.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterFormMain.querySelector('.newsletter-signup-input');
      const email = emailInput.value.trim();
      
      if (email !== '') {
        showToast('Thank you for subscribing! Watch your inbox for a 15% welcome coupon.');
        emailInput.value = '';
      }
    });
  }

  // --- 7. Navbar Active State ---
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // --- 8. Autoplay Ice Coffee Carousel (without controls) ---
  const iceTrack = document.getElementById('ice-carousel-track');
  const iceSlides = document.querySelectorAll('.ice-carousel-slide');
  let currentIceSlide = 0;

  if (iceTrack && iceSlides.length > 0) {
    // Set first slide active initially
    iceSlides[0].classList.add('active-slide');

    setInterval(() => {
      // Remove active class from current slide
      iceSlides[currentIceSlide].classList.remove('active-slide');

      // Increment slide index
      currentIceSlide = (currentIceSlide + 1) % iceSlides.length;

      // Translate track
      iceTrack.style.transform = `translateX(-${currentIceSlide * 33.3333}%)`;

      // Set next slide active
      iceSlides[currentIceSlide].classList.add('active-slide');
    }, 4000); // Autoplay slide duration
  }

  // --- 9. FAQ Accordions ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const panel = item.querySelector('.faq-panel');

    if (trigger && panel) {
      trigger.addEventListener('click', () => {
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions first for clean UX
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            const otherTrigger = otherItem.querySelector('.faq-trigger');
            const otherPanel = otherItem.querySelector('.faq-panel');
            if (otherTrigger && otherPanel) {
              otherTrigger.setAttribute('aria-expanded', 'false');
              otherPanel.style.maxHeight = null;
            }
          }
        });

        // Toggle current accordion
        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          panel.style.maxHeight = null;
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  });

  // --- 10. Mobile Offcanvas Menu Logic ---
  const menuToggleBtn = document.getElementById('menu-toggle-btn');
  const menuCloseBtn = document.getElementById('menu-close-btn');
  const navbar = document.querySelector('.navbar');
  const menuBackdrop = document.getElementById('menu-backdrop');

  if (menuToggleBtn && menuCloseBtn && navbar && menuBackdrop) {
    const openMenu = () => {
      navbar.classList.add('open');
      menuBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      navbar.classList.remove('open');
      menuBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    menuToggleBtn.addEventListener('click', openMenu);
    menuCloseBtn.addEventListener('click', closeMenu);
    menuBackdrop.addEventListener('click', closeMenu);

    // Also close menu if any navigation link is clicked (e.g. hash navigation)
    const links = navbar.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
});

