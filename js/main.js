// Vườn Sang - Main JavaScript Interactions

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCategoryFilter();
  initProjectGallery();
  initDetailTabs();
  initContactForm();
  initScrollAnimations();
  initSliderControls();
});

// 1. Mobile Navbar Toggle & Header Scroll Effect
function initNavbar() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const header = document.querySelector('.site-header');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      toggleBtn.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // Header scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });
}

// 2. Project Category Filtering (du-an.html)
function initCategoryFilter() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectItems = document.querySelectorAll('.project-filter-item');

  if (!filterTabs.length || !projectItems.length) return;

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filterValue = tab.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// 3. Project Detail Image Gallery Switcher (du-an-chi-tiet.html)
function initProjectGallery() {
  const heroMediaImg = document.querySelector('#detail-main-img');
  const thumbs = document.querySelectorAll('.gallery-thumb');

  if (!heroMediaImg || !thumbs.length) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbs.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');

      const newSrc = thumb.getAttribute('data-src') || thumb.querySelector('img').src;
      heroMediaImg.style.opacity = '0';
      setTimeout(() => {
        heroMediaImg.src = newSrc;
        heroMediaImg.style.opacity = '1';
      }, 150);
    });
  });
}

// 4. Project Detail Tabs (du-an-chi-tiet.html)
function initDetailTabs() {
  const tabBtns = document.querySelectorAll('.detail-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(targetId);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

// 5. Contact Form Submission with Toast Notification (lien-he.html)
function initContactForm() {
  const form = document.querySelector('#consultation-form');
  const toast = document.querySelector('#toast-notification');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="fullname"]')?.value.trim();
    const phone = form.querySelector('input[name="phone"]')?.value.trim();

    if (!name || !phone) {
      showToast('Vui lòng nhập đầy đủ họ tên và số điện thoại!', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Đang gửi thông tin...';
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Gửi yêu cầu &rarr;';
      }
      form.reset();
      showToast('Cảm ơn bạn! Vườn Sang đã nhận được thông tin và sẽ liên hệ sớm nhất.', 'success');
    }, 800);
  });
}

function showToast(message, type = 'success') {
  let toast = document.querySelector('#toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }

  const iconSvg = type === 'success' 
    ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#52b788" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e63946" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// 6. Project Slider Controls (index.html)
function initSliderControls() {
  const prevBtn = document.querySelector('#prev-project');
  const nextBtn = document.querySelector('#next-project');
  const sliderGrid = document.querySelector('.projects-grid');

  if (!prevBtn || !nextBtn || !sliderGrid) return;

  nextBtn.addEventListener('click', () => {
    sliderGrid.scrollBy({ left: 320, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    sliderGrid.scrollBy({ left: -320, behavior: 'smooth' });
  });
}

// 7. Scroll Reveal Animations
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}
