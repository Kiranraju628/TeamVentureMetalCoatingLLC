/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * Engineering Portfolio Filter & Interactive Lightbox Module
 */

(function () {
  'use strict';

  function initPortfolio() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    // 1. Category Filtering
    if (filterBtns.length && galleryCards.length) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filterVal = btn.getAttribute('data-filter');

          galleryCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterVal === 'all' || category === filterVal) {
              card.style.display = 'block';
              card.style.opacity = '0';
              setTimeout(() => {
                card.style.opacity = '1';
              }, 50);
            } else {
              card.style.display = 'none';
            }
          });
        });
      });
    }

    // 2. Interactive Lightbox Modal
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');

    const openLightbox = (imgSrc, title, category) => {
      if (!lightboxModal) return;
      if (lightboxImg) {
        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
      }
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightboxCategory) lightboxCategory.textContent = category;
      lightboxModal.classList.add('active');
      document.body.classList.add('modal-open');
    };

    const closeLightbox = () => {
      if (!lightboxModal) return;
      lightboxModal.classList.remove('active');
      document.body.classList.remove('modal-open');
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
          closeLightbox();
        }
      });
    }

    galleryCards.forEach(card => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        const title = card.querySelector('.gallery-title')?.textContent || 'Engineering Fabrication Work';
        const cat = card.querySelector('.gallery-tag')?.textContent || 'Project Track Record';
        if (img) {
          openLightbox(img.src, title, cat);
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
  } else {
    initPortfolio();
  }
})();
