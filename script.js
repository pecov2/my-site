document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-ready');
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuToggleLabel = document.querySelector('.menu-toggle-label');
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
  const menuCloseDuration = 1050;
  let menuCloseTimer = null;
  let scrollToKamishibaiScene = null;

  const menuLabel = (isOpen) => {
    if (currentLang === 'en') return isOpen ? 'Close menu' : 'Open menu';
    return isOpen ? 'メニューを閉じる' : 'メニューを開く';
  };

  const menuOpenTextLabel = () => (currentLang === 'en' ? 'Menu' : 'メニュー');
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
    if (menuToggleLabel) {
      menuToggleLabel.textContent = menuOpenTextLabel();
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
    document.body.classList.remove('nav-lock');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', menuLabel(false));
    menuCloseTimer = window.setTimeout(() => {
      header.classList.remove('nav-closing');
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
      window.setTimeout(buildKamishibaiStage, 0);
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

  const currentYear = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((yearEl) => {
    yearEl.textContent = currentYear;
  });

  // ナビゲーションのスムーススクロール（ヘッダー分のオフセット付き）
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      const scrollToTarget = () => {
        const kamishibaiIndexById = {
          hero: 0,
          about: 1,
          features: 1,
          schedule: 2,
          pricing: 2,
          contact: 3
        };
        if (document.body.classList.contains('has-kamishibai-stage') && targetId in kamishibaiIndexById) {
          if (scrollToKamishibaiScene?.(kamishibaiIndexById[targetId])) return;
          return;
        }

        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;
        smoothScrollTo(Math.max(0, targetTop));
      };

      const wasMenuOpen = header?.classList.contains('nav-open');
      closeMenu();
      window.setTimeout(scrollToTarget, wasMenuOpen ? 180 : 0);
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

  let kamishibaiCleanup = null;

  function buildKamishibaiStage() {
    kamishibaiCleanup?.();
    kamishibaiCleanup = null;

    const existing = document.querySelector('.kamishibai-stage');
    existing?.remove();
    const existingTrack = document.querySelector('.kamishibai-scroll-track');
    existingTrack?.remove();

    const sceneGroups = [
      ['#hero .hero-inner'],
      ['#about .section-inner', '#features .section-inner'],
      ['#schedule .section-inner', '#pricing .section-inner'],
      ['#contact .section-inner']
    ];
    const sources = sceneGroups.map((selectors) => selectors
      .map((selector) => document.querySelector(selector))
      .filter(Boolean));
    if (sources.some((group) => !group.length)) return;

    const stage = document.createElement('div');
    stage.className = 'kamishibai-stage';
    stage.setAttribute('aria-hidden', 'true');
    sources.forEach((group, index) => {
      const scene = document.createElement('section');
      scene.className = 'kamishibai-scene';
      scene.style.zIndex = String(index + 1);
      const container = document.createElement('div');
      container.className = 'container';
      const stack = document.createElement('div');
      stack.className = index === 0 ? '' : 'kamishibai-card-stack';

      group.forEach((source) => {
        const clone = source.cloneNode(true);
        clone.querySelectorAll('[id]').forEach((el) => el.removeAttribute('id'));
        clone.querySelectorAll('.reveal-on-scroll').forEach((el) => {
          el.classList.remove('reveal-on-scroll');
          el.classList.remove('is-visible');
          el.style.removeProperty('--reveal-delay');
        });
        stack.appendChild(clone);
      });

      container.appendChild(stack);
      scene.appendChild(container);
      stage.appendChild(scene);
    });

    document.body.appendChild(stage);
    document.body.classList.add('has-kamishibai-stage');
    document.documentElement.classList.add('has-kamishibai-stage');

    const scenes = [...stage.querySelectorAll('.kamishibai-scene')];
    document.documentElement.style.setProperty('--kamishibai-scenes', String(scenes.length));

    const scrollTrack = document.createElement('div');
    scrollTrack.className = 'kamishibai-scroll-track';
    scrollTrack.setAttribute('aria-hidden', 'true');
    scenes.forEach(() => {
      const marker = document.createElement('div');
      marker.className = 'kamishibai-scroll-marker';
      scrollTrack.appendChild(marker);
    });
    document.body.insertBefore(scrollTrack, stage);

    let ticking = false;
    let scrollSettleTimer = null;
    let snapReleaseTimer = null;
    let sceneAnimationFrame = null;
    let renderedScenePosition = 0;
    const listenerController = new AbortController();
    const listenerOptions = { signal: listenerController.signal };
    const maxSceneIndex = scenes.length - 1;
    const sceneTransitionDuration = 760;
    const sceneAnimationDelay = 360;

    const fitKamishibaiScenes = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      scenes.forEach((scene) => {
        const stack = scene.querySelector('.kamishibai-card-stack');
        const container = scene.querySelector('.container');
        if (!stack || !container) return;

        stack.style.removeProperty('--scene-fit');
        if (!isMobile) return;

        const containerStyle = window.getComputedStyle(container);
        const paddingY = parseFloat(containerStyle.paddingTop) + parseFloat(containerStyle.paddingBottom);
        const availableHeight = window.innerHeight - headerHeight - paddingY - 12;
        const contentHeight = stack.scrollHeight;
        if (contentHeight <= 0 || availableHeight <= 0) return;

        const scale = Math.min(1, Math.max(0.76, availableHeight / contentHeight));
        stack.style.setProperty('--scene-fit', scale.toFixed(3));
      });
    };

    const setCurrentScene = (sceneIndex) => {
      scenes.forEach((scene, index) => {
        const isCurrent = index === sceneIndex;
        scene.classList.toggle('is-current', isCurrent);
        if (!isCurrent || scene.classList.contains('scene-animated')) return;
        window.setTimeout(() => {
          if (!scene.classList.contains('is-current') || scene.classList.contains('scene-animated')) return;
          scene.classList.add('scene-animate');
          scene.classList.add('scene-animated');
        }, index === 0 ? 0 : sceneAnimationDelay);
        window.setTimeout(() => {
          scene.classList.remove('scene-animate');
        }, sceneAnimationDelay + 1600);
      });
    };

    const renderScene = (scenePosition) => {
      renderedScenePosition = scenePosition;
      stage.classList.add('is-active');
      document.body.classList.remove('kamishibai-ending');
      scenes.forEach((scene, index) => {
        const offset = Math.max(-100, Math.min(100, (index - scenePosition) * 100));
        scene.style.transform = `translate3d(0, ${offset.toFixed(2)}%, 0)`;
      });
    };

    const animateToScene = (targetIndex) => {
      window.cancelAnimationFrame(sceneAnimationFrame);
      const startPosition = renderedScenePosition;
      const distance = targetIndex - startPosition;
      const startedAt = performance.now();

      const animate = (now) => {
        const elapsed = now - startedAt;
        const progress = Math.min(1, elapsed / sceneTransitionDuration);
        const easedProgress = 1 - Math.pow(1 - progress, 4);
        renderScene(startPosition + distance * easedProgress);
        if (progress < 1) {
          sceneAnimationFrame = window.requestAnimationFrame(animate);
          return;
        }
        renderScene(targetIndex);
        sceneAnimationFrame = null;
      };

      sceneAnimationFrame = window.requestAnimationFrame(animate);
    };

    const getKamishibaiEnd = () => window.innerHeight * maxSceneIndex;

    const getIndexFromScroll = () => {
      const end = getKamishibaiEnd();
      const y = Math.max(0, Math.min(end, window.scrollY || window.pageYOffset));
      return Math.max(0, Math.min(maxSceneIndex, Math.round((y / Math.max(1, end)) * maxSceneIndex)));
    };

    let currentSceneIndex = getIndexFromScroll();
    setCurrentScene(currentSceneIndex);
    renderScene(currentSceneIndex);

    const update = () => {
      ticking = false;
      stage.classList.add('is-active');
      document.body.classList.remove('kamishibai-ending');
    };

    const requestUpdate = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    let isSnapping = false;
    let touchStartY = null;
    let touchPendingDirection = 0;

    const isMenuActive = () => header?.classList.contains('nav-open')
      || document.body.classList.contains('nav-lock');

    const scrollToKamishibaiY = (targetY) => {
      window.scrollTo({ top: targetY, left: 0, behavior: 'auto' });
    };

    const releaseSnap = () => {
      window.clearTimeout(snapReleaseTimer);
      snapReleaseTimer = window.setTimeout(() => {
        isSnapping = false;
      }, 0);
    };

    const snapToNearestScene = ({ force = false, immediate = false } = {}) => {
      if (isMenuActive()) return;
      if (isSnapping && !force) return;
      const end = getKamishibaiEnd();
      const y = window.scrollY || window.pageYOffset;
      if (y < -2 || y > end + 2) return;

      const clampedY = Math.max(0, Math.min(end, y));
      const nearestIndex = Math.round((clampedY / Math.max(1, end)) * maxSceneIndex);
      const targetY = (end / maxSceneIndex) * nearestIndex;
      if (Math.abs(clampedY - targetY) < 2) {
        currentSceneIndex = nearestIndex;
        setCurrentScene(currentSceneIndex);
        renderScene(currentSceneIndex);
        return;
      }

      isSnapping = true;
      currentSceneIndex = nearestIndex;
      setCurrentScene(currentSceneIndex);
      animateToScene(currentSceneIndex);
      scrollToKamishibaiY(targetY);
      releaseSnap();
    };

    const scheduleSettleSnap = (delay = 0, options = {}) => {
      if (isMenuActive()) return;
      if (isSnapping) return;
      window.clearTimeout(scrollSettleTimer);
      scrollSettleTimer = window.setTimeout(() => snapToNearestScene(options), delay);
    };

    const snapKamishibai = (direction) => {
      if (isMenuActive()) return;
      const end = getKamishibaiEnd();
      const y = window.scrollY || window.pageYOffset;
      if ((direction < 0 && y <= 2) || (direction > 0 && y >= end - 2)) return;

      const nextIndex = Math.max(0, Math.min(maxSceneIndex, currentSceneIndex + direction));
      const targetY = (end / maxSceneIndex) * nextIndex;
      if (nextIndex === currentSceneIndex) return;

      isSnapping = true;
      currentSceneIndex = nextIndex;
      setCurrentScene(currentSceneIndex);
      animateToScene(currentSceneIndex);
      scrollToKamishibaiY(targetY);
      releaseSnap();
    };

    scrollToKamishibaiScene = (targetIndex) => {
      if (isMenuActive()) return false;
      if (targetIndex < 0 || targetIndex > maxSceneIndex) return false;
      const end = getKamishibaiEnd();
      const targetY = (end / maxSceneIndex) * targetIndex;
      if (targetIndex === currentSceneIndex && Math.abs((window.scrollY || window.pageYOffset) - targetY) < 2) {
        return true;
      }

      isSnapping = true;
      currentSceneIndex = targetIndex;
      setCurrentScene(currentSceneIndex);
      animateToScene(currentSceneIndex);
      scrollToKamishibaiY(targetY);
      releaseSnap();
      return true;
    };
    const handleWheelSnap = (event) => {
      if (isMenuActive()) return;
      const end = getKamishibaiEnd();
      const y = window.scrollY || window.pageYOffset;
      if (y < -2 || y > end + 2) return;
      if (Math.abs(event.deltaY) < 8) return;
      event.preventDefault();
      snapKamishibai(event.deltaY > 0 ? 1 : -1);
    };

    const handleTouchStart = (event) => {
      if (isMenuActive()) return;
      touchStartY = event.touches[0]?.clientY ?? null;
      touchPendingDirection = 0;
    };

    const handleTouchMove = (event) => {
      if (isMenuActive()) return;
      if (touchStartY === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY;
      const delta = touchStartY - currentY;
      if (Math.abs(delta) < 36) return;
      const end = getKamishibaiEnd();
      const y = window.scrollY || window.pageYOffset;
      if ((delta < 0 && y <= 2) || (delta > 0 && y >= end - 2)) return;
      event.preventDefault();
      touchPendingDirection = delta > 0 ? 1 : -1;
    };

    const handleTouchEnd = () => {
      if (isMenuActive()) {
        touchStartY = null;
        touchPendingDirection = 0;
        return;
      }
      touchStartY = null;
      if (touchPendingDirection) {
        const direction = touchPendingDirection;
        touchPendingDirection = 0;
        snapKamishibai(direction);
        return;
      }
      scheduleSettleSnap(0, { force: true });
    };

    const handleInteractionEnd = () => {
      if (isMenuActive()) return;
      scheduleSettleSnap(0, { force: true });
    };

    const handleScroll = () => {
      if (isMenuActive()) return;
      requestUpdate();
    };

    fitKamishibaiScenes();
    update();
    window.addEventListener('scroll', handleScroll, { passive: true, ...listenerOptions });
    window.addEventListener('scrollend', snapToNearestScene, { passive: true, ...listenerOptions });
    window.addEventListener('resize', () => {
      fitKamishibaiScenes();
      requestUpdate();
      scheduleSettleSnap();
    }, listenerOptions);
    window.addEventListener('load', () => {
      fitKamishibaiScenes();
      renderScene(currentSceneIndex);
    }, listenerOptions);
    window.addEventListener('wheel', handleWheelSnap, { passive: false, ...listenerOptions });
    window.addEventListener('touchstart', handleTouchStart, { passive: true, ...listenerOptions });
    window.addEventListener('touchmove', handleTouchMove, { passive: false, ...listenerOptions });
    window.addEventListener('touchend', handleTouchEnd, { passive: true, ...listenerOptions });
    window.addEventListener('touchcancel', handleTouchEnd, { passive: true, ...listenerOptions });
    window.addEventListener('mouseup', handleInteractionEnd, { passive: true, ...listenerOptions });
    window.addEventListener('keyup', handleInteractionEnd, { passive: true, ...listenerOptions });

    kamishibaiCleanup = () => {
      scrollToKamishibaiScene = null;
      listenerController.abort();
      window.cancelAnimationFrame(sceneAnimationFrame);
      window.clearTimeout(scrollSettleTimer);
      window.clearTimeout(snapReleaseTimer);
    };
  }

  buildKamishibaiStage();

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
