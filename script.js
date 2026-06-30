/* ============================================
   KRONOS - Luxury Men's Watch Website
   JavaScript: Animations, Interactions, Scroll Effects
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // INTRO LOADER ANIMATION (LOADING COUNTER)
  // ============================================
  const introLoader = document.getElementById('introLoader');
  const introLogo = document.getElementById('introLogo');
  const introCounter = document.getElementById('introCounter');
  const introProgressBar = document.getElementById('introProgressBar');

  let loadCount = 0;
  
  // Staggered word anim initialization
  const heroTitleEl = document.getElementById('heroTitle');
  if (heroTitleEl) {
    const textContent = heroTitleEl.querySelector('h1').innerHTML;
    // split by space, wrapped in word and word-inner spans
    const words = textContent.split(' ');
    const formatted = words.map(w => `<span class="word"><span class="word-inner">${w}</span></span>`).join(' ');
    heroTitleEl.querySelector('h1').innerHTML = formatted;
    heroTitleEl.querySelector('h1').classList.add('split-text');
  }

  // Preload and count progress
  const interval = setInterval(() => {
    loadCount += Math.floor(Math.random() * 4) + 1;
    if (loadCount >= 100) {
      loadCount = 100;
      clearInterval(interval);
      endLoader();
    }
    introCounter.textContent = loadCount;
    introProgressBar.style.width = loadCount + '%';
  }, 35);

  function endLoader() {
    setTimeout(() => {
      introLogo.style.transition = 'opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)';
      introLogo.style.opacity = '1';
      introLogo.style.transform = 'translateY(0)';
    }, 100);

    setTimeout(() => {
      introLogo.style.transition = 'opacity 0.6s ease';
      introLogo.style.opacity = '0';
      introCounter.style.transition = 'opacity 0.6s ease';
      introCounter.style.opacity = '0';
      introProgressBar.parentElement.style.transition = 'opacity 0.6s ease';
      introProgressBar.parentElement.style.opacity = '0';
    }, 1200);

    setTimeout(() => {
      introLoader.style.transition = 'transform 1s cubic-bezier(0.65, 0, 0.35, 1)';
      introLoader.style.transform = 'translateY(-100%)';
    }, 1600);

    setTimeout(() => {
      introLoader.style.display = 'none';
      animateHeroTitle();
      showNavLinks();
    }, 2600);
  }

  // ============================================
  // HERO TITLE ANIMATION (Split Text Anim)
  // ============================================
  function animateHeroTitle() {
    const heroTitle = document.getElementById('heroTitle');
    if (heroTitle) {
      heroTitle.style.opacity = '1';
      const heading = heroTitle.querySelector('h1');
      if (heading) {
        heading.classList.add('animate');
      }
    }
  }

  // ============================================
  // NAV LINKS FADE IN
  // ============================================
  function showNavLinks() {
    const navLinks = document.getElementById('navLinks');
    navLinks.style.transition = 'opacity 0.8s ease';
    navLinks.style.opacity = '1';
  }

  // ============================================
  // HERO SLIDER
  // ============================================
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let heroInterval;

  function goToSlide(index) {
    if (heroSlides.length === 0 || !heroSlides[index] || !heroDots[index]) return;
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    heroSlides[index].classList.add('active');
    heroDots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() {
    if (heroSlides.length === 0) return;
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  }

  function startHeroSlider() {
    if (heroSlides.length === 0) return;
    heroInterval = setInterval(nextSlide, 4500);
  }

  heroDots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(heroInterval);
      goToSlide(parseInt(dot.dataset.slide));
      startHeroSlider();
    });
  });

  startHeroSlider();

  // ============================================
  // NAVBAR SCROLL EFFECT
  // ============================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  });

  // ============================================
  // MENU TOGGLE & SIDE PANEL & MOBILE NAV
  // ============================================
  const menuToggle = document.getElementById('menuToggle');
  const menuOverlay = document.getElementById('menuOverlay');
  const sidePanel = document.getElementById('sidePanel');
  const panelClose = document.getElementById('panelClose');
  const mobileNav = document.getElementById('mobileNav');
  let menuOpen = false;

  function isMobile() {
    return window.innerWidth <= 991;
  }

  function openPanel() {
    menuToggle.classList.add('active');
    menuOverlay.classList.add('active');
    sidePanel.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    menuToggle.classList.remove('active');
    menuOverlay.classList.remove('active');
    sidePanel.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    menuOpen = true;
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    menuOpen = false;
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    // Reset link animations for next open
    setTimeout(() => {
      if (!mobileNav.classList.contains('active')) {
        mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.style.transitionDelay = '0s';
        });
        const footer = mobileNav.querySelector('.mobile-nav-footer');
        if (footer) footer.style.transitionDelay = '0s';
      }
    }, 500);
  }

  function closeAll() {
    closePanel();
    closeMobileNav();
  }

  menuToggle.addEventListener('click', () => {
    if (isMobile()) {
      // Mobile: toggle full-screen nav
      if (menuOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    } else {
      // Desktop: toggle side panel
      if (sidePanel.classList.contains('active')) {
        closePanel();
      } else {
        openPanel();
      }
    }
  });

  // Close mobile nav when a link is clicked
  if (mobileNav) {
    mobileNav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
      });
    });
  }

  // Handle resize: close menus if switching between mobile/desktop
  let prevMobile = isMobile();
  window.addEventListener('resize', () => {
    const nowMobile = isMobile();
    if (prevMobile !== nowMobile) {
      closeAll();
      prevMobile = nowMobile;
    }
  });

  // Overlay & panel close
  if (menuOverlay) menuOverlay.addEventListener('click', closePanel);
  if (panelClose) panelClose.addEventListener('click', closePanel);

  // "Watches" nav link opens panel on desktop
  const navWatches = document.getElementById('navWatches');
  if (navWatches) {
    navWatches.addEventListener('click', (e) => {
      e.preventDefault();
      openPanel();
    });
  }

  // ============================================
  // SCROLL REVEAL (Intersection Observer)
  // ============================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale, .product-card, .img-clip');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ============================================
  // PRODUCT CARDS STAGGER
  // ============================================
  const productCards = document.querySelectorAll('.product-card');
  const productObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger all cards
        productCards.forEach((card, i) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, i * 150);
        });
        productObserver.disconnect();
      }
    });
  }, { threshold: 0.1 });

  if (productCards.length > 0) {
    productObserver.observe(productCards[0]);
  }

  // ============================================
  // PRODUCT CAROUSEL DRAG SCROLL
  // ============================================
  const productsTrack = document.getElementById('productsTrack');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (productsTrack) {
    productsTrack.addEventListener('mousedown', (e) => {
      isDown = true;
      productsTrack.style.cursor = 'grabbing';
      startX = e.pageX - productsTrack.offsetLeft;
      scrollLeft = productsTrack.scrollLeft;
    });

    productsTrack.addEventListener('mouseleave', () => {
      isDown = false;
      productsTrack.style.cursor = 'grab';
    });

    productsTrack.addEventListener('mouseup', () => {
      isDown = false;
      productsTrack.style.cursor = 'grab';
    });

    productsTrack.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - productsTrack.offsetLeft;
      const walk = (x - startX) * 1.5;
      productsTrack.scrollLeft = scrollLeft - walk;
    });
  }

  // ============================================
  // STICKY SCROLL CATEGORIES (Desktop)
  // ============================================
  const stickySection = document.getElementById('stickySection');

  if (stickySection) {
    const categoryItems = stickySection.querySelectorAll('.category-item');
    const categoryImages = stickySection.querySelectorAll('.category-image');

    window.addEventListener('scroll', () => {
      if (window.innerWidth < 992) return;

      const rect = stickySection.getBoundingClientRect();
      const stickyHeight = stickySection.offsetHeight;
      const viewportHeight = window.innerHeight;

      // Calculate scroll progress within sticky section (0 to 1)
      const scrolled = -rect.top;
      const totalScroll = stickyHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));

      // Map progress to category index
      const numCategories = categoryItems.length;
      const activeIndex = Math.min(numCategories - 1, Math.floor(progress * numCategories));

      categoryItems.forEach((item, i) => {
        item.classList.toggle('active', i === activeIndex);
      });

      categoryImages.forEach((img, i) => {
        img.classList.toggle('active', i === activeIndex);
      });
    });
  }

  // ============================================
  // FEATURE ITEMS - CLICK TO OPEN PANEL
  // ============================================
  const featurePrecision = document.getElementById('featurePrecision');
  if (featurePrecision) {
    featurePrecision.addEventListener('click', () => {
      openPanel();
    });
  }

  // ============================================
  // PARALLAX ON HERO BRAND TEXT
  // ============================================
  const heroTexts = document.querySelectorAll('.hero-brand-text .super-text');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    heroTexts.forEach(text => {
      text.style.transform = `translateX(${-20 + scrollY * 0.02}%)`;
    });
  });

  // ============================================
  // TICKER CONTINUOUS ANIMATION
  // (Already handled via CSS keyframes, but we 
  //  ensure the ticker texts scroll smoothly)
  // ============================================

  // ============================================
  // CTA HOVER - PARALLAX EFFECT
  // ============================================
  const ctaBlock = document.getElementById('ctaBlock');
  if (ctaBlock) {
    ctaBlock.addEventListener('mousemove', (e) => {
      const rect = ctaBlock.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = ctaBlock.querySelector('.cta-image img');
      if (img) {
        img.style.transform = `scale(1.05) translate(${x * 10}px, ${y * 10}px)`;
      }
    });

    ctaBlock.addEventListener('mouseleave', () => {
      const img = ctaBlock.querySelector('.cta-image img');
      if (img) {
        img.style.transform = 'scale(1)';
      }
    });
  }

  // ============================================
  // SMOOTH BUTTON HOVER EFFECTS
  // ============================================
  document.querySelectorAll('.btn-shop, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const fill = btn.querySelector('.btn-fill');
      if (fill) {
        fill.style.height = '100%';
      }
    });
    btn.addEventListener('mouseleave', () => {
      const fill = btn.querySelector('.btn-fill');
      if (fill) {
        fill.style.height = '0%';
      }
    });
  });

  // ============================================
  // FOOTER LINK ANIMATIONS
  // ============================================
  document.querySelectorAll('.footer-link, .nav-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.color = '#ffffff';
    });
    link.addEventListener('mouseleave', function() {
      this.style.color = '';
    });
  });

  // ============================================
  // PRELOAD IMAGES FOR SMOOTH TRANSITIONS
  // ============================================
  function preloadImages() {
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
      const preload = new Image();
      preload.src = img.src;
    });
  }
  preloadImages();

  // ============================================
  // CUSTOM CURSOR
  // ============================================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');
  
  if (cursor && follower && !isMobile()) {
    // Show cursor elements
    cursor.classList.add('visible');
    follower.classList.add('visible');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Directly position the main cursor
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    // Smooth lerp animation for the follower circle
    function animateFollower() {
      const dx = mouseX - followerX;
      const dy = mouseY - followerY;
      
      followerX += dx * 0.15;
      followerY += dy * 0.15;
      
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover states for links & buttons
    const interactiveElements = document.querySelectorAll('a, button, .btn-shop, .btn-outline, .menu-toggle, .product-card, .feature-item, .cta-block');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
      });
    });
  }

  // ============================================
  // SCROLL PROGRESS BAR & BACK TO TOP
  // ============================================
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolledPercentage = (window.scrollY / windowHeight) * 100;
    
    // Update scroll progress bar width
    if (scrollProgress) {
      scrollProgress.style.width = scrolledPercentage + '%';
    }

    // Toggle back to top button visibility
    if (backToTop) {
      if (window.scrollY > window.innerHeight * 0.8) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  });

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ============================================
  // INTERACTIVE 3D WATCH SHOWCASE
  // ============================================
  const showcaseStage = document.getElementById('showcaseStage');
  const showcaseWatch = document.getElementById('showcaseWatch');

  if (showcaseStage && showcaseWatch && !isMobile()) {
    showcaseStage.addEventListener('mousemove', (e) => {
      const rect = showcaseStage.getBoundingClientRect();
      // Get normal coords (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;

      // Rotate watch on axis
      const rotateX = -y * 25; // pitch
      const rotateY = x * 25;  // yaw
      
      showcaseWatch.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    showcaseStage.addEventListener('mouseleave', () => {
      // Return back smoothly
      showcaseWatch.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      showcaseWatch.style.transition = 'transform 0.5s ease-out';
    });

    showcaseStage.addEventListener('mouseenter', () => {
      showcaseWatch.style.transition = 'none';
    });
  }

  // ============================================
  // MAGNETIC BUTTONS EFFECT
  // ============================================
  const magneticButtons = document.querySelectorAll('.magnetic-btn, .btn-shop, .btn-outline');
  
  if (!isMobile()) {
    magneticButtons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        // Mouse distance from center of button
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Pull button slightly towards mouse
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        // Snap back smoothly
        btn.style.transform = 'translate(0px, 0px)';
        btn.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
      });

      btn.addEventListener('mouseenter', () => {
        btn.style.transition = 'none';
      });
    });
  }

  // ============================================
  // NEWSLETTER FORM ACTION
  // ============================================
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterSuccess = document.getElementById('newsletterSuccess');

  if (newsletterForm && newsletterSuccess) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        newsletterSuccess.classList.add('show');
        emailInput.value = '';
        
        setTimeout(() => {
          newsletterSuccess.classList.remove('show');
        }, 5000);
      }
    });
  }

  // ============================================
  // SCROLL-DRIVEN PARALLAX DEPTH EFFECTS
  // ============================================
  window.addEventListener('scroll', () => {
    if (isMobile()) return;
    
    const scrolled = window.scrollY;
    
    // Slow items move down slightly, fast items move up
    document.querySelectorAll('.parallax-slow').forEach(el => {
      const depth = 0.08;
      const translate = scrolled * depth;
      el.style.transform = `translateY(${translate}px)`;
    });

    document.querySelectorAll('.parallax-fast').forEach(el => {
      const depth = -0.12;
      const translate = scrolled * depth;
      el.style.transform = `translateY(${translate}px)`;
    });
  });

  // ============================================
  // INITIALIZE ALL INTERACTIVE FUNCTIONS (MODULAR)
  // ============================================
  function initAll() {
    // 1. Re-run scroll indicators & cursor highlights
    initCursorHoverStates();
    initScrollProgress();
    initShowcase3D();
    initMagneticButtons();
    initNewsletterForm();
    initCatalogFilters();
    initTimelineObserver();
    initLetterFlipEffect();
    initWebGLDisplacement();
    initWatchConfigurator();
    initHorologySimulation();
    initGyroscopeEffects();
  }

  // ============================================
  // DYNAMIC 3D LETTER-FLIP EFFECTS
  // ============================================
  function initLetterFlipEffect() {
    const flipLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    flipLinks.forEach(link => {
      // Avoid double splitting
      if (link.querySelector('.letter-wrap')) return;
      
      const text = link.textContent.trim();
      let splitHTML = '';
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (char === ' ') {
          splitHTML += ' ';
        } else {
          splitHTML += `<span class="letter-wrap" data-letter="${char}"><span class="letter-char">${char}</span></span>`;
        }
      }
      link.innerHTML = splitHTML;
    });
  }

  // ============================================
  // WEBAUDIO MECHANICAL TICK SYNTHESIZER
  // ============================================
  let audioCtx = null;
  let isSoundActive = false;
  let tickInterval = null;

  function initWebAudio() {
    const audioToggle = document.getElementById('audioToggle');
    if (!audioToggle) return;

    audioToggle.addEventListener('click', () => {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }

      if (isSoundActive) {
        // Deactivate sound
        isSoundActive = false;
        audioToggle.classList.remove('active');
        clearInterval(tickInterval);
      } else {
        // Activate sound
        isSoundActive = true;
        audioToggle.classList.add('active');
        // Resume context if suspended
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        // Start continuous mechanical clock tick beat loop (120 bpm / 2 beats per second)
        tickInterval = setInterval(() => {
          playClockTick(800, 0.005, 0.05); // High freq escape wheel click
          setTimeout(() => {
            playClockTick(600, 0.005, 0.04); // Low freq escape wheel release click
          }, 250);
        }, 500);
      }
    });

    // Custom mechanical click synthesizer
    function playClockTick(freq, attack, decay) {
      if (!audioCtx || audioCtx.state === 'suspended') return;
      
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + decay);
      
      gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + attack);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + decay);
      
      // High pass noise filter spike for metallic escapement release sound
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2000, audioCtx.currentTime);

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + decay);
    }

    // Trigger micro click on UI interactions
    const clickElements = document.querySelectorAll('a, button, .filter-btn, .menu-toggle');
    clickElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        if (isSoundActive) {
          playClockTick(1200, 0.002, 0.015);
        }
      });
      el.addEventListener('click', () => {
        if (isSoundActive) {
          playClockTick(1800, 0.002, 0.03);
        }
      });
    });
  }

  // ============================================
  // GOLDEN DUST CURSOR PARTICLE TRAIL
  // ============================================
  function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5 - 0.3; // Upward drift
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.015;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.01; // Gravity pull
        this.alpha -= this.decay;
      }
      draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#c9a96e';
        ctx.fillStyle = '#e2c992';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let lastX = 0, lastY = 0;
    document.addEventListener('mousemove', (e) => {
      const dx = Math.abs(e.clientX - lastX);
      const dy = Math.abs(e.clientY - lastY);
      
      // Spawn sparks if mouse moves fast enough
      if (dx > 2 || dy > 2) {
        for (let i = 0; i < 2; i++) {
          particles.push(new Particle(e.clientX, e.clientY));
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    });

    function drawLoop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      requestAnimationFrame(drawLoop);
    }
    drawLoop();
  }

  // ============================================
  // WEBGL LIQUID HOVER DISTORTION SHADER
  // ============================================
  function initWebGLDisplacement() {
    const imagesToRipple = document.querySelectorAll('.card-image img, .mobile-cat-image img');
    
    imagesToRipple.forEach(img => {
      // Prevent double wrapping
      if (img.parentElement.querySelector('.liquid-canvas')) return;

      const parent = img.parentElement;
      const canvas = document.createElement('canvas');
      canvas.className = 'liquid-canvas';
      parent.appendChild(canvas);

      const gl = canvas.getContext('webgl');
      if (!gl) return;

      // Simple shaders mapping texture and sine coordinate distortion
      const vsSource = `
        attribute vec2 position;
        varying vec2 vUv;
        void main() {
          vUv = position * 0.5 + 0.5;
          vUv.y = 1.0 - vUv.y; // Flip Y
          gl_Position = vec4(position, 0.0, 1.0);
        }
      `;

      const fsSource = `
        precision mediump float;
        varying vec2 vUv;
        uniform sampler2D uTexture;
        uniform vec2 uMouse;
        uniform float uTime;
        uniform float uHover;
        void main() {
          vec2 uv = vUv;
          
          if (uHover > 0.0) {
            float dist = distance(uv, uMouse);
            // Ripple wave distortion relative to distance
            float ripple = sin(dist * 40.0 - uTime * 6.0) * 0.007 * uHover;
            uv += vec2(ripple);
          }
          
          gl_FragColor = texture2D(uTexture, uv);
        }
      `;

      // Compile shaders & build program
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vsSource);
      gl.compileShader(vs);

      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fsSource);
      gl.compileShader(fs);

      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Create vertex buffer quad (-1 to 1)
      const vertices = new Float32Array([
        -1, -1,   1, -1,  -1,  1,
        -1,  1,   1, -1,   1,  1
      ]);
      const buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      const position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(position);
      gl.vertexPointer(position, 2, gl.FLOAT, false, 0, 0);

      // Texture binding
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      
      // Set parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      // Wait for image load to bind texture
      function updateTexture() {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      }
      if (img.complete) {
        updateTexture();
      } else {
        img.onload = updateTexture;
      }

      // Shader uniforms
      const uMouse = gl.getUniformLocation(program, 'uMouse');
      const uTime = gl.getUniformLocation(program, 'uTime');
      const uHover = gl.getUniformLocation(program, 'uHover');

      let mouseX = 0.5, mouseY = 0.5;
      let hoverVal = 0;
      let time = 0;

      // Mouse listeners
      parent.addEventListener('mousemove', (e) => {
        const rect = parent.getBoundingClientRect();
        mouseX = (e.clientX - rect.left) / rect.width;
        mouseY = (e.clientY - rect.top) / rect.height;
      });

      parent.addEventListener('mouseenter', () => {
        hoverVal = 1;
        // Temporarily hide original image, reveal canvas
        img.style.opacity = '0';
      });

      parent.addEventListener('mouseleave', () => {
        hoverVal = 0;
        img.style.opacity = '1';
      });

      function render() {
        // Adjust canvas resolution dynamically
        if (canvas.width !== parent.clientWidth || canvas.height !== parent.clientHeight) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
          gl.viewport(0, 0, canvas.width, canvas.height);
        }

        gl.clear(gl.COLOR_BUFFER_BIT);
        
        time += 0.05;
        gl.uniform2f(uMouse, mouseX, mouseY);
        gl.uniform1f(uTime, time);
        gl.uniform1f(uHover, hoverVal);
        
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        requestAnimationFrame(render);
      }
      render();
    });
  }

  // ============================================
  // AJAX SEAMLESS PAGE TRANSITION ROUTER (PJAX)
  // ============================================
  function initPageTransitionRouter() {
    const transitionMask = document.getElementById('transitionMask');
    if (!transitionMask) return;

    // Attach click listener globally to intercept navigation
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const url = anchor.getAttribute('href');
      
      // Verify it's a local internal link
      if (url && url.endsWith('.html') && !url.startsWith('http') && !url.startsWith('#')) {
        e.preventDefault();
        
        // Trigger exit curtain animation
        transitionMask.classList.remove('active-out');
        transitionMask.classList.add('active-in');

        // Fetch page async
        setTimeout(() => {
          fetchPageContent(url);
        }, 600);
      }
    });

    function fetchPageContent(url) {
      fetch(url)
        .then(res => res.text())
        .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          
          // 1. Replace main content and title
          document.title = doc.title;
          
          // Find matching content wrappers in source & target
          const currentContent = document.getElementById('pageContent');
          const targetContent = doc.getElementById('pageContent');
          
          if (currentContent && targetContent) {
            currentContent.replaceWith(targetContent);
          } else {
            // Fallback replace full body elements
            window.location.href = url;
            return;
          }

          // Update URL in browser history
          history.pushState(null, '', url);
          
          // Re-bind interactive observers & events
          initAll();

          // Scroll page to top immediately
          window.scrollTo(0, 0);

          // Trigger entrance curtain animation
          transitionMask.classList.remove('active-in');
          transitionMask.classList.add('active-out');
        })
        .catch(err => {
          console.error('AJAX page transition failed: ', err);
          window.location.href = url;
        });
    }

    // Handle back/forward history navigation clicks
    window.addEventListener('popstate', () => {
      window.location.reload();
    });
  }

  // ============================================
  // CATALOG PAGE INTERACTIVE FILTERING & SORTING
  // ============================================
  function initCatalogFilters() {
    const catalogGrid = document.getElementById('catalogGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sortSelect');

    if (!catalogGrid || filterBtns.length === 0) return;

    const cards = Array.from(catalogGrid.querySelectorAll('.product-card'));

    function filterProducts(category) {
      cards.forEach(card => {
        const cardCat = card.dataset.category;
        if (category === 'all' || cardCat === category) {
          card.style.display = 'block';
          setTimeout(() => {
            card.classList.add('visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    }

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProducts(btn.dataset.filter);
      });
    });

    if (sortSelect) {
      sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        let sortedCards = [...cards];

        if (value === 'price-asc') {
          sortedCards.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
        } else if (value === 'price-desc') {
          sortedCards.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
        } else {
          sortedCards.sort((a, b) => parseInt(a.dataset.delay) - parseInt(b.dataset.delay));
        }
        sortedCards.forEach(card => catalogGrid.appendChild(card));
      });
    }

    // Read URL Parameters
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    if (categoryParam) {
      const activeBtn = Array.from(filterBtns).find(b => b.dataset.filter === categoryParam);
      if (activeBtn) {
        filterBtns.forEach(b => b.classList.remove('active'));
        activeBtn.classList.add('active');
        filterProducts(categoryParam);
      }
    }
  }

  // ============================================
  // BRAND HERITAGE TIMELINE ACTIVE SCROLL EFFECT
  // ============================================
  function initTimelineObserver() {
    const timelineNodes = document.querySelectorAll('.timeline-node');
    if (timelineNodes.length === 0) return;

    const nodeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.background = 'var(--color-accent)';
          entry.target.style.transform = 'translate(-50%, -50%) scale(1.2)';
        } else {
          entry.target.style.background = 'var(--color-bg)';
          entry.target.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    }, {
      threshold: 1.0,
      rootMargin: '-10% 0px -40% 0px'
    });

    timelineNodes.forEach(node => nodeObserver.observe(node));
  }

  // ============================================
  // BESPOKE WATCH CONFIGURATOR COMPOSITOR & AR
  // ============================================
  function initWatchConfigurator() {
    const watchStage = document.getElementById('configuratorWatchStage');
    const svgStrapTop = document.getElementById('svgStrapTop');
    const svgStrapBottom = document.getElementById('svgStrapBottom');
    const svgBezel = document.getElementById('svgBezel');
    const svgDial = document.getElementById('svgDial');

    const configChoices = document.querySelectorAll('.config-choice');
    
    // Pricing elements
    const summaryBezelCost = document.getElementById('summaryBezelCost');
    const summaryStrapCost = document.getElementById('summaryStrapCost');
    const summaryTotalCost = document.getElementById('summaryTotalCost');

    if (!watchStage || !configChoices.length) return;

    // 1. Composition updating logic
    let bezelPrice = 4500;
    let strapPrice = 1200;
    const basePrice = 6800;

    configChoices.forEach(choice => {
      choice.addEventListener('click', () => {
        const type = choice.dataset.type;
        const val = choice.dataset.value;
        const price = parseInt(choice.dataset.price);

        // Toggle active visual class in group
        const siblings = choice.parentElement.querySelectorAll('.config-choice');
        siblings.forEach(s => s.classList.remove('active'));
        choice.classList.add('active');

        // Apply composition changes
        if (type === 'bezel') {
          bezelPrice = price;
          summaryBezelCost.textContent = `$${price.toLocaleString()}`;
          svgBezel.setAttribute('fill', `url(#${val}Bezel)`);
        } else if (type === 'dial') {
          svgDial.setAttribute('fill', val);
        } else if (type === 'strap') {
          strapPrice = price;
          summaryStrapCost.textContent = `$${price.toLocaleString()}`;
          
          let strapColor = '#5c4033'; // Brown leather default
          if (val === 'steel') strapColor = '#a8a8a8';
          if (val === 'rubber') strapColor = '#1a1a1a';
          
          svgStrapTop.setAttribute('fill', strapColor);
          svgStrapBottom.setAttribute('fill', strapColor);
        }

        // Re-calculate total
        const total = basePrice + bezelPrice + strapPrice;
        summaryTotalCost.textContent = `$${total.toLocaleString()}`;
      });
    });

    // 2. Drive watch hands in real-time
    const hourHand = document.getElementById('hourHand');
    const minuteHand = document.getElementById('minuteHand');
    const secondHand = document.getElementById('secondHand');

    function tickWatchHands() {
      const now = new Date();
      const hr = now.getHours();
      const min = now.getMinutes();
      const sec = now.getSeconds();
      const ms = now.getMilliseconds();

      const hrAngle = (hr % 12) * 30 + min * 0.5;
      const minAngle = min * 6 + sec * 0.1;
      const secAngle = sec * 6 + ms * 0.006; // Smooth continuous sweeping second hand

      if (hourHand) hourHand.setAttribute('transform', `rotate(${hrAngle} 200 200)`);
      if (minuteHand) minuteHand.setAttribute('transform', `rotate(${minAngle} 200 200)`);
      if (secondHand) secondHand.setAttribute('transform', `rotate(${secAngle} 200 200)`);

      requestAnimationFrame(tickWatchHands);
    }
    tickWatchHands();

    // 3. Webcam Virtual Try-On toggler
    const arToggleBtn = document.getElementById('arToggleBtn');
    const arVideoContainer = document.getElementById('arVideoContainer');
    const webcamStream = document.getElementById('webcamStream');
    const arBtnText = document.getElementById('arBtnText');
    let isArActive = false;
    let streamRef = null;

    if (arToggleBtn && arVideoContainer && webcamStream) {
      arToggleBtn.addEventListener('click', () => {
        if (isArActive) {
          // Turn off camera
          isArActive = false;
          arBtnText.textContent = 'ACTIVATE TRY-ON';
          arVideoContainer.style.display = 'none';
          if (streamRef) {
            streamRef.getTracks().forEach(track => track.stop());
          }
        } else {
          // Request camera permission & start stream
          navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
            .then(stream => {
              isArActive = true;
              arBtnText.textContent = 'DISABLE TRY-ON';
              arVideoContainer.style.display = 'block';
              webcamStream.srcObject = stream;
              streamRef = stream;
            })
            .catch(err => {
              console.error('Camera access rejected: ', err);
              alert('Camera permission is required to enable Virtual Try-On.');
            });
        }
      });
    }
  }

  // ============================================
  // INTERACTIVE HOROLOGY GEAR TRAIN SIMULATOR
  // ============================================
  function initHorologySimulation() {
    const gearBarrel = document.getElementById('gearBarrel');
    const gearCenter = document.getElementById('gearCenter');
    const gearEscape = document.getElementById('gearEscape');
    const palletFork = document.getElementById('palletFork');
    const balanceWheel = document.getElementById('balanceWheel');

    const winderSlider = document.getElementById('winderSlider');
    const freqGroup = document.getElementById('freqGroup');
    const btnChronograph = document.getElementById('btnChronograph');
    const chronoBtnText = document.getElementById('chronoBtnText');
    const simDesc = document.getElementById('simDesc');

    if (!gearBarrel || !gearCenter || !gearEscape) return;

    let tension = 0.65; // Base tension multiplier
    let frequency = 4.0; // 4Hz base standard (28,800 VPH)
    let isChronoEngaged = false;
    
    // Rotations variables
    let barrelRot = 0;
    let centerRot = 0;
    let escapeRot = 0;
    let balanceRot = 0;
    let palletRot = 0;

    // Time tracks
    let lastTime = performance.now();

    // Winder adjustment
    if (winderSlider) {
      winderSlider.addEventListener('input', () => {
        tension = parseInt(winderSlider.value) / 100;
      });
    }

    // Frequency beat rate selectors
    if (freqGroup) {
      const btns = freqGroup.querySelectorAll('.config-choice');
      btns.forEach(btn => {
        btn.addEventListener('click', () => {
          btns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          
          frequency = parseFloat(btn.dataset.freq);
          const desc = btn.dataset.desc;
          if (simDesc) {
            simDesc.textContent = `Ticking Frequency: ${desc} balance wheel oscillations.`;
          }
        });
      });
    }

    // Chrono engagement toggle cogs
    if (btnChronograph) {
      btnChronograph.addEventListener('click', () => {
        if (isChronoEngaged) {
          isChronoEngaged = false;
          chronoBtnText.textContent = 'ENGAGE CHRONOGRAPH';
          btnChronograph.classList.remove('active');
        } else {
          isChronoEngaged = true;
          chronoBtnText.textContent = 'DISENGAGE CHRONOGRAPH';
          btnChronograph.classList.add('active');
        }
      });
    }

    // Main gear physics tick loops
    function loop(now) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Speed matches winder tension
      const speedMultiplier = tension * 45; // base speed

      if (tension > 0.02) {
        // Barrel cogs rotate very slow, drive center gear
        barrelRot += dt * speedMultiplier * 0.05;
        // Center gear cogs rotate moderate speed
        centerRot += dt * speedMultiplier * 0.3;
        
        // Escape gear rotates in high-speed ticks matching the pallet lever releases
        // Balance wheel swings back and forth in high speed waves (Sine oscillation)
        const balanceOsc = Math.sin(now * 0.002 * Math.PI * frequency) * 45; // osc degree
        balanceRot = balanceOsc;

        // Pallet fork coordinates with the balance wheel passings (tick/tock pivots)
        const palletOsc = Math.sin(now * 0.002 * Math.PI * frequency + (Math.PI / 2)) * 8;
        palletRot = palletOsc;

        // Escape wheel increments cogs dynamically in sync with pallet ticks
        escapeRot += dt * speedMultiplier * 1.5;

        // Rotate SVG layers
        gearBarrel.setAttribute('transform', `rotate(${barrelRot} 150 150)`);
        
        // Center cogs only rotate if chronograph is engaged (cogs mesh!)
        if (isChronoEngaged) {
          gearCenter.setAttribute('transform', `rotate(${centerRot} 240 220)`);
        } else {
          // Slow drift
          gearCenter.setAttribute('transform', `rotate(${centerRot * 0.1} 240 220)`);
        }

        gearEscape.setAttribute('transform', `rotate(${escapeRot} 330 260)`);
        palletFork.setAttribute('transform', `rotate(${palletRot} 310 320)`);
        balanceWheel.setAttribute('transform', `rotate(${balanceRot} 250 370)`);
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  // ============================================
  // GYROSCOPE SPECULAR REFLECTION EFFECTS (MOBILE)
  // ============================================
  function initGyroscopeEffects() {
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        // Tilt values: beta (front/back), gamma (left/right)
        const beta = e.beta || 0;
        const gamma = e.gamma || 0;

        // Normalize parameters (-1 to 1)
        const x = Math.max(-1, Math.min(1, gamma / 45));
        const y = Math.max(-1, Math.min(1, (beta - 45) / 45)); // assume holding phone at 45 degree tilt

        // Shift background gradients or watches
        const watchStage = document.getElementById('configuratorWatchStage');
        if (watchStage) {
          watchStage.style.transform = `rotateY(${x * 12}deg) rotateX(${y * -12}deg)`;
        }

        // Apply specular gloss shift to watch overlay layers
        const svgBezel = document.getElementById('svgBezel');
        if (svgBezel) {
          // Shift gold gradient centers dynamically based on phone orientation
          const gradient = document.getElementById('roseGoldBezel');
          if (gradient) {
            const shiftX = 50 + x * 20;
            const shiftY = 50 + y * 20;
            gradient.setAttribute('x1', `${shiftX - 50}%`);
            gradient.setAttribute('y1', `${shiftY - 50}%`);
            gradient.setAttribute('x2', `${shiftX + 50}%`);
            gradient.setAttribute('y2', `${shiftY + 50}%`);
          }
        }
      });
    }
  }

  // ============================================
  // START CONSTANT MOTIONS
  // ============================================
  initAll();
  initParticles();
  initWebAudio();
  initPageTransitionRouter();

  // ============================================
  // TESTIMONIAL CAROUSEL
  // ============================================
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  let currentTestimonial = 0;
  let testimonialInterval;

  function goToTestimonial(index) {
    if (testimonialSlides.length === 0) return;
    testimonialSlides.forEach(s => s.classList.remove('active'));
    testimonialDots.forEach(d => d.classList.remove('active'));
    if (testimonialSlides[index]) testimonialSlides[index].classList.add('active');
    if (testimonialDots[index]) testimonialDots[index].classList.add('active');
    currentTestimonial = index;
  }

  function nextTestimonial() {
    if (testimonialSlides.length === 0) return;
    const next = (currentTestimonial + 1) % testimonialSlides.length;
    goToTestimonial(next);
  }

  if (testimonialSlides.length > 0) {
    testimonialDots.forEach(dot => {
      dot.addEventListener('click', () => {
        clearInterval(testimonialInterval);
        goToTestimonial(parseInt(dot.dataset.slide));
        testimonialInterval = setInterval(nextTestimonial, 5000);
      });
    });
    testimonialInterval = setInterval(nextTestimonial, 5000);
  }

  // ============================================
  // ANIMATED STATS COUNTER (IntersectionObserver)
  // ============================================
  const statsGrid = document.getElementById('statsGrid');
  if (statsGrid) {
    const statNumbers = statsGrid.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounter(el) {
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const startTime = performance.now();

      function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing: ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(update);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach((el, i) => {
            setTimeout(() => animateCounter(el), i * 200);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.3 });

    statsObserver.observe(statsGrid);
  }

  // ============================================
  // INSTAGRAM GALLERY DRAG SCROLL
  // ============================================
  const instaTrack = document.getElementById('instagramTrack');
  if (instaTrack) {
    let instaDown = false;
    let instaStartX;
    let instaScrollLeft;

    instaTrack.addEventListener('mousedown', (e) => {
      instaDown = true;
      instaTrack.style.cursor = 'grabbing';
      instaStartX = e.pageX - instaTrack.offsetLeft;
      instaScrollLeft = instaTrack.scrollLeft;
    });
    instaTrack.addEventListener('mouseleave', () => {
      instaDown = false;
      instaTrack.style.cursor = 'grab';
    });
    instaTrack.addEventListener('mouseup', () => {
      instaDown = false;
      instaTrack.style.cursor = 'grab';
    });
    instaTrack.addEventListener('mousemove', (e) => {
      if (!instaDown) return;
      e.preventDefault();
      const x = e.pageX - instaTrack.offsetLeft;
      const walk = (x - instaStartX) * 1.5;
      instaTrack.scrollLeft = instaScrollLeft - walk;
    });
  }

  // ============================================
  // FOOTER REAL-TIME SVG CLOCK
  // ============================================
  const footerHourHand = document.getElementById('footerHourHand');
  const footerMinuteHand = document.getElementById('footerMinuteHand');
  const footerSecondHand = document.getElementById('footerSecondHand');

  function tickFooterClock() {
    if (!footerHourHand || !footerMinuteHand || !footerSecondHand) return;
    const now = new Date();
    const hr = now.getHours();
    const min = now.getMinutes();
    const sec = now.getSeconds();
    const ms = now.getMilliseconds();

    const hrAngle = (hr % 12) * 30 + min * 0.5;
    const minAngle = min * 6 + sec * 0.1;
    const secAngle = sec * 6 + ms * 0.006;

    footerHourHand.setAttribute('transform', `rotate(${hrAngle} 100 100)`);
    footerMinuteHand.setAttribute('transform', `rotate(${minAngle} 100 100)`);
    footerSecondHand.setAttribute('transform', `rotate(${secAngle} 100 100)`);

    requestAnimationFrame(tickFooterClock);
  }
  tickFooterClock();

  // ============================================
  // PRODUCT DETAIL MODAL & WATCH DATABASE
  // ============================================
  const watchDatabase = {
    'Chronograph Elite': {
      image: 'images/watch_01.png',
      price: '$12,500',
      specs: {
        case: 'Grade 5 Titanium',
        movement: 'Automatic Caliber K-200',
        diameter: '42mm',
        water: '100m / 330ft',
        power: '72 Hours',
        crystal: 'Sapphire, AR-coated'
      }
    },
    'Heritage Rose': {
      image: 'images/watch_02.png',
      price: '$18,900',
      specs: {
        case: '18K Rose Gold',
        movement: 'Caliber K-400 Tourbillon',
        diameter: '40mm',
        water: '50m / 165ft',
        power: '65 Hours',
        crystal: 'Domed Sapphire'
      }
    },
    'Diver Titan': {
      image: 'images/watch_03.png',
      price: '$9,800',
      specs: {
        case: 'Grade 2 Titanium',
        movement: 'Automatic Caliber K-150',
        diameter: '44mm',
        water: '300m / 1000ft',
        power: '70 Hours',
        crystal: 'Sapphire, Anti-glare'
      }
    },
    'Skeleton Grand': {
      image: 'images/watch_04.png',
      price: '$24,500',
      specs: {
        case: 'Platinum 950',
        movement: 'Hand-wound K-600 Skeleton',
        diameter: '41mm',
        water: '30m / 100ft',
        power: '96 Hours',
        crystal: 'Double-domed Sapphire'
      }
    },
    'Classic Gold': {
      image: 'images/watch_05.png',
      price: '$14,000',
      specs: {
        case: '18K Yellow Gold',
        movement: 'Caliber K-300 Automatic',
        diameter: '39mm',
        water: '50m / 165ft',
        power: '60 Hours',
        crystal: 'Sapphire, AR-coated'
      }
    },
    'Titanium Stealth': {
      image: 'images/watch_06.png',
      price: '$11,200',
      specs: {
        case: 'DLC-coated Titanium',
        movement: 'Caliber K-250 Chronograph',
        diameter: '43mm',
        water: '200m / 660ft',
        power: '72 Hours',
        crystal: 'Sapphire, AR-coated'
      }
    }
  };

  const productModalOverlay = document.getElementById('productModalOverlay');
  const productModalClose = document.getElementById('productModalClose');
  const productModalImg = document.getElementById('productModalImg');
  const productModalName = document.getElementById('productModalName');
  const productModalPrice = document.getElementById('productModalPrice');

  function openProductModal(name) {
    const watch = watchDatabase[name];
    if (!watch || !productModalOverlay) return;

    productModalImg.src = watch.image;
    productModalImg.alt = name;
    productModalName.textContent = name;
    productModalPrice.textContent = watch.price;

    // Fill specs
    const specCase = document.getElementById('specCase');
    const specMovement = document.getElementById('specMovement');
    const specDiameter = document.getElementById('specDiameter');
    const specWater = document.getElementById('specWater');
    const specPower = document.getElementById('specPower');
    const specCrystal = document.getElementById('specCrystal');

    if (specCase) specCase.textContent = watch.specs.case;
    if (specMovement) specMovement.textContent = watch.specs.movement;
    if (specDiameter) specDiameter.textContent = watch.specs.diameter;
    if (specWater) specWater.textContent = watch.specs.water;
    if (specPower) specPower.textContent = watch.specs.power;
    if (specCrystal) specCrystal.textContent = watch.specs.crystal;

    // Update wishlist button state
    const modalWishlistBtn = document.getElementById('productModalWishlist');
    if (modalWishlistBtn) {
      const wishlist = JSON.parse(localStorage.getItem('kronosWishlist') || '[]');
      if (wishlist.includes(name)) {
        modalWishlistBtn.classList.add('wishlisted');
        modalWishlistBtn.querySelector('span').textContent = 'IN WISHLIST';
      } else {
        modalWishlistBtn.classList.remove('wishlisted');
        modalWishlistBtn.querySelector('span').textContent = 'ADD TO WISHLIST';
      }
    }

    productModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProductModal() {
    if (!productModalOverlay) return;
    productModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (productModalClose) {
    productModalClose.addEventListener('click', closeProductModal);
  }
  if (productModalOverlay) {
    productModalOverlay.addEventListener('click', (e) => {
      if (e.target === productModalOverlay) closeProductModal();
    });
  }

  // Attach click to product cards
  document.querySelectorAll('.product-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Don't open modal if clicking wishlist button
      if (e.target.closest('.card-wishlist-btn')) return;
      const name = card.querySelector('h3')?.textContent;
      if (name) openProductModal(name);
    });
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProductModal();
      closeWishlistDrawer();
    }
  });

  // ============================================
  // WISHLIST SYSTEM (localStorage)
  // ============================================
  const wishlistNavBtn = document.getElementById('wishlistNavBtn');
  const wishlistCount = document.getElementById('wishlistCount');
  const wishlistOverlay = document.getElementById('wishlistOverlay');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistDrawerClose = document.getElementById('wishlistDrawerClose');
  const wishlistItems = document.getElementById('wishlistItems');
  const wishlistEmpty = document.getElementById('wishlistEmpty');

  function getWishlist() {
    return JSON.parse(localStorage.getItem('kronosWishlist') || '[]');
  }

  function saveWishlist(list) {
    localStorage.setItem('kronosWishlist', JSON.stringify(list));
    updateWishlistUI();
  }

  function toggleWishlistItem(name) {
    let list = getWishlist();
    if (list.includes(name)) {
      list = list.filter(n => n !== name);
    } else {
      list.push(name);
    }
    saveWishlist(list);
    return list.includes(name);
  }

  function updateWishlistUI() {
    const list = getWishlist();
    
    // Update count badge
    if (wishlistCount) {
      wishlistCount.textContent = list.length;
      if (list.length > 0) {
        wishlistCount.classList.add('visible');
      } else {
        wishlistCount.classList.remove('visible');
      }
    }

    // Update drawer contents
    if (wishlistItems && wishlistEmpty) {
      // Clear existing items (keep empty state)
      wishlistItems.querySelectorAll('.wishlist-item').forEach(el => el.remove());

      if (list.length === 0) {
        wishlistEmpty.style.display = 'flex';
      } else {
        wishlistEmpty.style.display = 'none';
        list.forEach(name => {
          const watch = watchDatabase[name];
          if (!watch) return;

          const item = document.createElement('div');
          item.className = 'wishlist-item';
          item.innerHTML = `
            <div class="wishlist-item-image">
              <img src="${watch.image}" alt="${name}" />
            </div>
            <div class="wishlist-item-info">
              <div class="wishlist-item-name">${name}</div>
              <div class="wishlist-item-price">${watch.price}</div>
            </div>
            <button class="wishlist-item-remove" data-name="${name}" title="Remove">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><line x1="4" y1="4" x2="20" y2="20"/><line x1="20" y1="4" x2="4" y2="20"/></svg>
            </button>
          `;
          wishlistItems.appendChild(item);

          // Remove button
          item.querySelector('.wishlist-item-remove').addEventListener('click', () => {
            toggleWishlistItem(name);
            updateCardWishlistButtons();
          });
        });
      }
    }

    // Update card wishlist buttons
    updateCardWishlistButtons();
  }

  function updateCardWishlistButtons() {
    const list = getWishlist();
    document.querySelectorAll('.card-wishlist-btn').forEach(btn => {
      const name = btn.dataset.name;
      if (list.includes(name)) {
        btn.classList.add('wishlisted');
      } else {
        btn.classList.remove('wishlisted');
      }
    });
  }

  function openWishlistDrawer() {
    if (wishlistDrawer) wishlistDrawer.classList.add('active');
    if (wishlistOverlay) wishlistOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlistDrawer() {
    if (wishlistDrawer) wishlistDrawer.classList.remove('active');
    if (wishlistOverlay) wishlistOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (wishlistNavBtn) {
    wishlistNavBtn.addEventListener('click', openWishlistDrawer);
  }
  if (wishlistDrawerClose) {
    wishlistDrawerClose.addEventListener('click', closeWishlistDrawer);
  }
  if (wishlistOverlay) {
    wishlistOverlay.addEventListener('click', closeWishlistDrawer);
  }

  // Modal wishlist button
  const modalWishlistBtn = document.getElementById('productModalWishlist');
  if (modalWishlistBtn) {
    modalWishlistBtn.addEventListener('click', () => {
      const name = productModalName?.textContent;
      if (!name) return;
      const isAdded = toggleWishlistItem(name);
      if (isAdded) {
        modalWishlistBtn.classList.add('wishlisted');
        modalWishlistBtn.querySelector('span').textContent = 'IN WISHLIST';
      } else {
        modalWishlistBtn.classList.remove('wishlisted');
        modalWishlistBtn.querySelector('span').textContent = 'ADD TO WISHLIST';
      }
    });
  }

  // Add wishlist heart buttons to all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    const cardImage = card.querySelector('.card-image');
    const cardName = card.querySelector('h3')?.textContent;
    if (!cardImage || !cardName) return;

    const heartBtn = document.createElement('button');
    heartBtn.className = 'card-wishlist-btn';
    heartBtn.dataset.name = cardName;
    heartBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>';
    
    heartBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleWishlistItem(cardName);
    });

    cardImage.appendChild(heartBtn);
  });

  // Initialize wishlist UI on page load
  updateWishlistUI();

  // ============================================
  // BOUTIQUE FORM HANDLER
  // ============================================
  const boutiqueForm = document.getElementById('boutiqueForm');
  if (boutiqueForm) {
    boutiqueForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = boutiqueForm.querySelector('button[type="submit"]');
      if (btn) {
        const originalText = btn.querySelector('span')?.textContent;
        btn.querySelector('span').textContent = 'APPOINTMENT REQUESTED ✓';
        btn.style.borderColor = 'var(--color-accent)';
        btn.style.color = 'var(--color-accent)';
        setTimeout(() => {
          btn.querySelector('span').textContent = originalText;
          btn.style.borderColor = '';
          btn.style.color = '';
          boutiqueForm.reset();
        }, 3000);
      }
    });
  }

});
