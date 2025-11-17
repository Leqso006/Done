/*===== MENU SHOW & TOGGLE =====*/
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
};
showMenu('nav-toggle', 'nav-menu');

/*===== SMOOTH SCROLL & ACTIVE LINK =====*/
const navLinks = document.querySelectorAll('.nav__link');
const navMenu = document.getElementById('nav-menu');
const sections = document.querySelectorAll('section[id]');

function getHeaderOffset() {
    return document.querySelector('.l-header').offsetHeight;
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        const targetId = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        const headerOffset = getHeaderOffset();

        if (targetSection) {
            const offsetTop = targetSection.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
        }

        navMenu.classList.remove('show');
        navLinks.forEach(l => l.classList.remove('active-link'));
        link.classList.add('active-link');
    });
});

/*===== SCROLL ACTIVE LINK =====*/
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const headerOffset = getHeaderOffset();

    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerOffset;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const link = document.querySelector(`.nav__menu a[href="#${sectionId}"]`);

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
});

/*===== COUNTER ANIMATION =====*/
const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats-section');
    if (!statsSection) return;

    let animated = false;
    return () => {
        if (animated) return;

        const sectionPos = statsSection.getBoundingClientRect().top;
        const screenPos = window.innerHeight / 1.3;

        if (sectionPos < screenPos) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const suffix = counter.nextElementSibling?.classList.contains('currency') ? 'M+' : 
                              counter.nextElementSibling?.classList.contains('percent') ? '%' : '+';
                
                let count = 0;
                const increment = target / 80;
                const timer = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        counter.textContent = target + (suffix === 'M+' ? 'M' : suffix);
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count) + (suffix === 'M+' ? 'M' : suffix === '%' ? '%' : '');
                    }
                }, 25);
                counter.classList.add('animate');
            });
            animated = true;
        }
    };
};

/*===== INITIALIZE ANIMATIONS ON LOAD & SCROLL =====*/
document.addEventListener('DOMContentLoaded', () => {
    const runCounters = animateCounters();
    const runProcess = animateProcessSteps();

    const handleScroll = () => {
        runCounters();
        runProcess();
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on load
});

/*===== SCROLL REVEAL (Optional) =====*/
const sr = ScrollReveal?.default?.({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200
});

if (sr) {
    sr.reveal('.hero-content, .team-preview, .map-section, .services, .cta', { interval: 200 });
}

document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav__menu');

    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
      });
    });

    // Language toggle (from lang.js)
    setLanguage(detectLanguage());
  });
// PROGRESS BAR ANIMATION — TESTED & WORKING
document.addEventListener('DOMContentLoaded', () => {
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');
  const steps = document.querySelectorAll('.progress-steps .step');
  const section = document.querySelector('.progress-section');

  if (!fill || !label || !section) {
    console.warn('Progress bar elements not found');
    return;
  }

  let hasAnimated = false;

  const animate = () => {
    if (hasAnimated) return;

    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.75) {
      hasAnimated = true;

      let progress = 0;
      const target = 100;
      const duration = 2000; // 2 seconds
      const stepsCount = steps.length;
      const stepThreshold = target / stepsCount;

      const interval = setInterval(() => {
        progress += (target / duration) * 16; // ~60fps
        if (progress >= target) {
          progress = target;
          clearInterval(interval);
        }

        // Update bar
        fill.style.width = `${progress}%`;
        label.textContent = `${Math.floor(progress)}%`;

        // Activate steps
        const activeStep = Math.min(
          Math.floor(progress / stepThreshold),
          stepsCount - 1
        );
        steps.forEach((step, i) => {
          step.classList.toggle('active', i <= activeStep);
        });
      }, 16);
    }
  };

  window.addEventListener('scroll', animate);
  animate(); // Check if already in view
});
  