document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');

  const closeMenu = () => {
    if (!header || !menuToggle) return;
    header.classList.remove('nav-open');
    document.body.classList.remove('nav-lock');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'メニューを開く');
  };

  if (menuToggle && header && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = header.classList.toggle('nav-open');
      document.body.classList.toggle('nav-lock', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    });
  }

  const smoothScrollTo = (targetY, duration = 650) => {
    const startY = window.scrollY || window.pageYOffset;
    const distance = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t) => {
      if (t < 0.5) return 4 * t * t * t;
      return 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  // ロードアニメーションを隠す
  const loader = document.getElementById('page-loader');
  if (loader) {
    // CSSアニメーションが終わる頃に非表示にする
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.4s ease-out';
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }, 2600);
  }

  // 年号を自動で更新
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ナビゲーションのスムーススクロール（ヘッダー分のオフセット付き）
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
      smoothScrollTo(Math.max(0, targetTop));
      closeMenu();
    });
  });

  // スクロール時にコンテンツをふわっと表示
  const revealTargets = document.querySelectorAll(
    '.hero-text, .hero-visual, .section-title, .section-lead, .badge-row, .cards .card, .schedule-simple, .belongings-section, .contact-methods'
  );

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${Math.min(index * 35, 220)}ms`);
      requestAnimationFrame(() => el.classList.add('is-visible'));
    });
  } else {
    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${Math.min(index * 35, 220)}ms`);
    });
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.05
      }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    // 念のため初期表示範囲は即時表示（端末差の吸収）
    requestAnimationFrame(() => {
      revealTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-visible');
        }
      });
    });
  }

  // 簡易的なお問い合わせフォームのダミー送信処理
  const form = document.querySelector('.contact-form');
  const messageEl = document.getElementById('form-message');

  if (form && messageEl) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      if (!name || !email || !message) return;

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        messageEl.textContent = '未入力の項目があります。';
        messageEl.classList.remove('success');
        messageEl.classList.add('error');
        return;
      }

      // 本来ここでサーバーに送信処理を行う
      messageEl.textContent = '送信ありがとうございます！（ダミー処理です）';
      messageEl.classList.remove('error');
      messageEl.classList.add('success');

      form.reset();
    });
  }
});

