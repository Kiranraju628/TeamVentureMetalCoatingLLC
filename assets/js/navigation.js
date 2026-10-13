/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * Navigation, Header Controls & Modal Utilities Module
 */

(function () {
  'use strict';

  // Global Modal Helpers
  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.classList.add('modal-open');
    }
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.classList.remove('modal-open');
    }
  };

  // Toast Notice Helper
  window.showToast = function (message) {
    const toast = document.getElementById('toastNotice');
    if (!toast) return;
    const msgSpan = toast.querySelector('.toast-text');
    if (msgSpan) msgSpan.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 1. Sticky Header on Scroll
    if (header) {
      const handleScroll = () => {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();
    }

    // 2. Mobile Drawer Navigation Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isOpen);
        document.body.classList.toggle('modal-open', isOpen);
      });

      navLinks.forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('modal-open');
        });
      });
    }

    // 3. Services Section Tabs Switching
    const serviceTabBtns = document.querySelectorAll('.service-tab-btn');
    const servicePanes = document.querySelectorAll('.service-pane');

    serviceTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-target');
        serviceTabBtns.forEach(b => b.classList.remove('active'));
        servicePanes.forEach(pane => pane.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });

    // 4. Quick RFQ Modal Triggers (.trigger-rfq-modal)
    const rfqTriggers = document.querySelectorAll('.trigger-rfq-modal');
    const rfqModal = document.getElementById('rfqModal');
    const rfqCloseBtn = document.getElementById('rfqModalClose');

    rfqTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // If we are on rfq.html, allow normal link or open modal
        const prefillService = btn.getAttribute('data-service');
        const rfqService = document.getElementById('rfqService');
        if (prefillService && rfqService) {
          rfqService.value = prefillService;
          if (window.updateRfqCalculation) window.updateRfqCalculation();
        }
        if (rfqModal) {
          e.preventDefault();
          window.openModal('rfqModal');
        }
      });
    });

    if (rfqCloseBtn) {
      rfqCloseBtn.addEventListener('click', () => window.closeModal('rfqModal'));
    }
    if (rfqModal) {
      rfqModal.addEventListener('click', (e) => {
        if (e.target === rfqModal) window.closeModal('rfqModal');
      });
    }

    // 5. Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // 6. Global Escape Key Listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        window.closeModal('rfqModal');
        window.closeModal('dispatchSuccessModal');
        window.closeModal('lightboxModal');
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          mobileToggle?.classList.remove('active');
          document.body.classList.remove('modal-open');
        }
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavigation);
  } else {
    initNavigation();
  }
})();
