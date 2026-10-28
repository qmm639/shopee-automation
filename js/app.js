/**
 * SHOPEE AUTOMATION AI — MASTERCLASS INTERACTIVE ENGINE
 * By Q Money Mentor (@qmm639)
 */

document.addEventListener('DOMContentLoaded', () => {
  initCountdownTimer();
  initCalculator();
  initVideoModal();
  initCheckoutModal();
  initFaqAccordion();
  initProofFilter();
  initStickyHeader();
  initCopyCodeButtons();
});

// 1. Countdown Timer (9 Minutes Urgency)
function initCountdownTimer() {
  const timerElements = document.querySelectorAll('.countdown-timer-inline, #floating-timer');
  if (!timerElements.length) return;

  let totalSeconds = 9 * 60; // 9 minutes

  setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
    } else {
      totalSeconds = 9 * 60; // evergreen reset
    }
    const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    const timeStr = `${m}:${s}`;

    timerElements.forEach(el => {
      el.textContent = timeStr;
    });
  }, 1000);
}

// 2. Interactive Commission ROI Calculator
function initCalculator() {
  const sliderClips = document.getElementById('calc-slider-clips');
  const sliderCommission = document.getElementById('calc-slider-commission');
  const valClips = document.getElementById('val-clips-display');
  const valCommission = document.getElementById('val-commission-display');

  const outDaily = document.getElementById('calc-out-daily');
  const outMonthly = document.getElementById('calc-out-monthly');
  const outHours = document.getElementById('calc-out-hours');
  const outOrders = document.getElementById('calc-out-orders');

  if (!sliderClips || !sliderCommission) return;

  function calculate() {
    const clips = parseInt(sliderClips.value, 10);
    const commPerOrder = parseInt(sliderCommission.value, 10);

    valClips.textContent = `${clips} คลิป/วัน`;
    valCommission.textContent = `฿${commPerOrder} / ออเดอร์*`;

    // Algorithm: Conservative avg 2.2 orders per AI clip posted across platforms
    const estimatedOrders = Math.round(clips * 2.2);
    const dailyIncome = estimatedOrders * commPerOrder;
    const monthlyIncome = dailyIncome * 30;
    // Manual editing takes approx 35 mins per video; AI takes 2 mins -> saves ~33 mins/clip
    const hoursSaved = Math.round((clips * 33) / 60);

    animateCounter(outDaily, dailyIncome, '฿', '*');
    animateCounter(outMonthly, monthlyIncome, '฿', '*');
    if (outOrders) outOrders.textContent = `~${estimatedOrders.toLocaleString()} ออเดอร์*`;
    if (outHours) outHours.textContent = `~${hoursSaved} ชม./วัน`;
  }

  sliderClips.addEventListener('input', calculate);
  sliderCommission.addEventListener('input', calculate);

  // Initial calculation
  calculate();
}

function animateCounter(element, target, prefix = '', suffix = '') {
  if (!element) return;
  const current = parseInt(element.getAttribute('data-value') || '0', 10);
  const diff = target - current;
  const steps = 15;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const value = Math.round(current + (diff * (step / steps)));
    element.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
    if (step >= steps) {
      clearInterval(timer);
      element.setAttribute('data-value', target);
      element.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }, 20);
}

// 3. YouTube Video Modal Player (Video ID: mJF5QTWHms4)
function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const openBtns = document.querySelectorAll('.js-open-video');
  const closeBtn = document.getElementById('close-video-modal');
  const iframe = document.getElementById('youtube-iframe');

  const ytVideoId = 'mJF5QTWHms4';

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (iframe) {
        iframe.src = `https://www.youtube.com/embed/${ytVideoId}?autoplay=1&rel=0`;
      }
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (iframe) iframe.src = '';
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// 4. Checkout & Order Modal
function initCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  const openBtns = document.querySelectorAll('.js-open-checkout');
  const closeBtn = document.getElementById('close-checkout-modal');
  const form = document.getElementById('checkout-order-form');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCheckout() {
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeCheckout);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCheckout();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const lineId = document.getElementById('order-line').value.trim();

      const text = encodeURIComponent(
        `สวัสดีครับโค้ชคิว ขอแจ้งลงทะเบียนคอร์ส Shopee Automation AI (สิทธิ์ 20 ท่านแรก โค้ด SA01 ราคา 1,590.-)\nชื่อ: ${name}\nเบอร์โทร: ${phone}\nLINE: ${lineId}\nแนบสลิปชำระเงินเรียบร้อยครับ`
      );

      // Open LINE URL according to AGENTS.md rules (@qmm639)
      window.open(`https://line.me/R/ti/p/@qmm639?text=${text}`, '_blank');
      closeCheckout();
    });
  }
}

// 5. FAQ Accordion
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all
      faqItems.forEach(other => {
        other.classList.remove('active');
        const otherAns = other.querySelector('.faq-answer');
        if (otherAns) otherAns.style.maxHeight = null;
      });

      // If wasn't active, open current
      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first item by default
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAns = faqItems[0].querySelector('.faq-answer');
    if (firstAns) firstAns.style.maxHeight = firstAns.scrollHeight + 'px';
  }
}

// 6. Proof Filter
function initProofFilter() {
  const tabs = document.querySelectorAll('.proof-tab-btn');
  const cards = document.querySelectorAll('.proof-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 7. Sticky Header
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// 8. 1-Click Copy Voucher Code
function initCopyCodeButtons() {
  const copyBtns = document.querySelectorAll('.js-copy-code');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.getAttribute('data-code') || 'SA01';
      navigator.clipboard.writeText(code).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '✓ คัดลอกโค้ด SA01 แล้ว!';
        setTimeout(() => {
          btn.innerHTML = origText;
        }, 2000);
      });
    });
  });
}
