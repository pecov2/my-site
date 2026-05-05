document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuCloseText = document.querySelector('.menu-close-text');
  const nav = document.getElementById('site-nav');
  const langToggle = document.querySelector('[data-lang-toggle]');
  const page = document.body.dataset.page || 'kendo';
  const translations = {
    kendo: {
      ja: {
        title: '住吉武道館｜大人の剣道教室',
        logoMain: '住吉武道館',
        navAbout: '教室について',
        navFeatures: '教室の特徴',
        navSchedule: '稽古日・場所',
        navPricing: '料金',
        navContact: '体験・お問い合わせ',
        heroTitle: '大人の剣道教室',
        heroTagline: '大人のための、心と体を整える剣道。',
        heroText: '休日のリフレッシュや、しばらく離れていた方の再開にも。<br>住吉の静かな空間で、あらためて自分と向き合う時間を過ごしてみませんか。',
        heroImageAlt: '住吉武道館 大人の剣道教室の集合写真',
        aboutTitle: '教室について',
        aboutLead: '一人ひとりの目的や体力に合わせて、無理のないペースで稽古を行います。<br>剣道を通して、姿勢・呼吸・心の持ち方を少しずつ整えていくことを大切にしています。',
        featuresTitle: '教室の特徴',
        badge1: '初心者歓迎',
        badge2: '幅広い年代が参加',
        badge3: '再開の方も歓迎',
        featuresLead: 'それぞれの経験や状態に応じて、内容を調整しながら指導を行います。<br>初めての方も、安心してご参加いただけます。',
        scheduleTitle: '稽古日時・場所',
        scheduleDate: '<strong>日時：</strong>毎週土曜日 11:30〜13:00',
        schedulePlace: '<strong>場所：</strong>住吉武道館　大阪市住吉区住吉2-9-89',
        scheduleStation: '<strong>最寄駅：</strong>南海本線「住吉大社駅」から徒歩5分',
        belongingsTitle: '持ち物',
        belonging1: '剣道着・袴（お持ちの方）',
        belonging2: '飲み物、タオル',
        belonging3: '替えのTシャツ（必要に応じて）',
        belonging4: '防具一式（お持ちの方のみ）',
        pricingTitle: '料金のご案内',
        pricingLead: '月額4,400円（税込）',
        pricingNote: '※入会金、保険料、防具購入の目安などは、お問い合わせ時にご案内いたします。',
        contactTitle: '体験・お問い合わせ',
        contactLead: '見学・体験のお申し込みやご質問は、下記よりお気軽にご連絡ください。',
        contactName: '住吉武道館',
        contactAddressBlock: '〒558-0045<br>大阪市住吉区住吉2-9-89',
        emailLabel: 'メール',
        officialSiteLabel: '公式HP',
        hoursLabel: '営業時間',
        hoursText: '9:00〜20:00（月〜土）<br>9:00〜17:00（日・祝）<br>毎週火曜日休館日',
        relatedLink: '子供と大人のなぎなた教室はこちら',
        footerText: '住吉武道館 大人の剣道教室. All rights reserved.'
      },
      en: {
        title: 'Sumiyoshi Budokan | Adult Kendo Class',
        logoMain: 'Sumiyoshi Budokan',
        navAbout: 'About',
        navFeatures: 'Features',
        navSchedule: 'Schedule & Place',
        navPricing: 'Fees',
        navContact: 'Trial & Contact',
        heroTitle: 'Adult Kendo Class',
        heroTagline: 'Kendo for adults, to steady both body and mind.',
        heroText: 'A class for refreshing your weekend or returning to kendo after time away.<br>Spend time facing yourself again in the calm atmosphere of Sumiyoshi.',
        heroImageAlt: 'Group photo of Sumiyoshi Budokan adult kendo class',
        aboutTitle: 'About',
        aboutLead: 'Practice is adjusted to each person’s goals and physical condition at a comfortable pace.<br>Through kendo, we value gradually developing posture, breathing, and a steady mindset.',
        featuresTitle: 'Class Features',
        badge1: 'Beginners welcome',
        badge2: 'A wide range of ages',
        badge3: 'Returning practitioners welcome',
        featuresLead: 'Instruction is adjusted according to each participant’s experience and condition.<br>First-time participants can join with confidence.',
        scheduleTitle: 'Schedule & Place',
        scheduleDate: '<strong>Date:</strong> Every Saturday, 11:30-13:00',
        schedulePlace: '<strong>Place:</strong> Sumiyoshi Budokan, 2-9-89 Sumiyoshi, Sumiyoshi-ku, Osaka',
        scheduleStation: '<strong>Nearest station:</strong> 5-minute walk from Sumiyoshi Taisha Station on the Nankai Main Line',
        belongingsTitle: 'What to Bring',
        belonging1: 'Kendogi and hakama, if you have them',
        belonging2: 'Drink and towel',
        belonging3: 'Spare T-shirt, if needed',
        belonging4: 'Armor set, only if you have one',
        pricingTitle: 'Fees',
        pricingLead: '4,400 yen per month, tax included',
        pricingNote: 'Enrollment fees, insurance fees, and estimated equipment costs will be explained when you contact us.',
        contactTitle: 'Trial & Contact',
        contactLead: 'For trial lessons, visits, or questions, please contact us using the information below.',
        contactName: 'Sumiyoshi Budokan',
        contactAddressBlock: '2-9-89 Sumiyoshi, Sumiyoshi-ku, Osaka 558-0045',
        emailLabel: 'Email',
        officialSiteLabel: 'Official Website',
        hoursLabel: 'Hours',
        hoursText: '9:00-20:00 (Mon-Sat)<br>9:00-17:00 (Sun and holidays)<br>Closed every Tuesday',
        relatedLink: 'Naginata Classes for Children and Adults',
        footerText: 'Sumiyoshi Budokan Adult Kendo Class. All rights reserved.'
      }
    }
  };
  let currentLang = localStorage.getItem('sumiyoshiLanguage') === 'en' ? 'en' : 'ja';
  const menuCloseDuration = 1550;
  let menuCloseTimer = null;

  const menuLabel = (isOpen) => {
    if (currentLang === 'en') return isOpen ? 'Close menu' : 'Open menu';
    return isOpen ? 'メニューを閉じる' : 'メニューを開く';
  };

  const menuCloseTextLabel = () => (currentLang === 'en' ? 'Close' : '閉じる');

  const applyLanguage = (lang) => {
    currentLang = lang;
    const dict = translations[page]?.[lang];
    if (!dict) return;
    document.documentElement.lang = lang;
    document.title = dict.title;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (dict[key]) el.innerHTML = dict[key];
    });
    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(',').forEach((entry) => {
        const [attr, key] = entry.split(':');
        if (attr && key && dict[key]) el.setAttribute(attr, dict[key]);
      });
    });
    if (langToggle) {
      langToggle.textContent = lang === 'ja' ? 'English' : '日本語';
      langToggle.setAttribute('aria-label', lang === 'ja' ? 'Switch to English' : '日本語に切り替え');
    }
    if (menuToggle) {
      const isOpen = header?.classList.contains('nav-open') || false;
      menuToggle.setAttribute('aria-label', menuLabel(isOpen));
    }
    if (menuCloseText) {
      menuCloseText.textContent = menuCloseTextLabel();
    }
    prepareHeroCopy();
    localStorage.setItem('sumiyoshiLanguage', lang);
  };

  const prepareHeroCopy = () => {
    const heroCopy = document.querySelector('[data-i18n="heroText"]');
    if (!heroCopy) return;
    const lines = heroCopy.innerHTML
      .split(/<br\s*\/?>/i)
      .map((line) => line.trim())
      .filter(Boolean);
    if (!lines.length) return;
    heroCopy.innerHTML = lines
      .map((line) => `<span class="hero-copy-line">${line}</span>`)
      .join('');
  };

  const closeMenu = (onClosed) => {
    if (!header || !menuToggle) {
      onClosed?.();
      return;
    }
    if (!header.classList.contains('nav-open')) {
      onClosed?.();
      return;
    }
    window.clearTimeout(menuCloseTimer);
    header.classList.remove('nav-open');
    header.classList.add('nav-closing');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', menuLabel(false));
    menuCloseTimer = window.setTimeout(() => {
      header.classList.remove('nav-closing');
      document.body.classList.remove('nav-lock');
      onClosed?.();
    }, menuCloseDuration);
  };

  if (menuToggle && header && nav) {
    menuToggle.addEventListener('click', () => {
      if (header.classList.contains('nav-open')) {
        closeMenu();
        return;
      }

      window.clearTimeout(menuCloseTimer);
      header.classList.remove('nav-closing');
      header.classList.add('nav-open');
      document.body.classList.add('nav-lock');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuToggle.setAttribute('aria-label', menuLabel(true));
    });
  }

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      applyLanguage(currentLang === 'ja' ? 'en' : 'ja');
    });
  }

  applyLanguage(currentLang);

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
    // CSS閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.4s ease-out';
      document.body.classList.add('loader-revealing');
      setTimeout(() => {
        loader.style.display = 'none';
      }, 400);
    }, 3300);
  } else {
    document.body.classList.add('loader-revealing');
  }

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
      const scrollToTarget = () => {
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        smoothScrollTo(Math.max(0, targetTop));
      };

      closeMenu();
      window.setTimeout(scrollToTarget, 180);
    });
  });

  // 閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる閉じる
  const revealTargets = document.querySelectorAll(
    '.section-title, .belongings-title, .section-lead, .section-note, .badge-row, .cards .card, .schedule-simple, .belongings-list, .contact-methods'
  );
  const revealDelayFor = (el) => {
    if (el.classList.contains('section-title') || el.classList.contains('belongings-title')) return 0;
    if (el.classList.contains('section-lead')) return 240;
    return 420;
  };

  if (!('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${revealDelayFor(el)}ms`);
      requestAnimationFrame(() => el.classList.add('is-visible'));
    });
  } else {
    revealTargets.forEach((el) => {
      el.classList.add('reveal-on-scroll');
      el.style.setProperty('--reveal-delay', `${revealDelayFor(el)}ms`);
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

