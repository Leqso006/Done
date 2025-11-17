// assets/js/person_1.js
document.addEventListener('DOMContentLoaded', () => {

  /* ===== DARK MODE TOGGLE ===== */
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    if (toggle) toggle.innerHTML = '<i class="bx bx-sun"></i>';
  }

  if (toggle) {
    toggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      const isDark = body.classList.contains('dark-mode');
      toggle.innerHTML = isDark ? '<i class="bx bx-sun"></i>' : '<i class="bx bx-moon"></i>';
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    });
  }

  /* ===== GLOW ON ALL CARDS ===== */
  document.querySelectorAll('.back-btn, .tl-year, .card, .achievement, .icon').forEach(el => {
    el.classList.add('glow-hover');
  });

  /* ===== TESTIMONIAL CAROUSEL (IF MULTIPLE) ===== */
  const testimonials = document.querySelectorAll('.testimonial');
  if (testimonials.length > 1) {
    let current = 0;
    testimonials[0].classList.add('active');
    setInterval(() => {
      testimonials[current].classList.remove('active');
      current = (current + 1) % testimonials.length;
      testimonials[current].classList.add('active');
    }, 5000);
  }
});