/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * Animated KPI Metric Counters Module
 */

(function () {
  'use strict';

  function initCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    let hasCounted = false;

    const runCounters = () => {
      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.ceil(current);
          }
        }, stepTime);
      });
    };

    if ('IntersectionObserver' in window) {
      const statsBar = document.querySelector('.hero-stats-bar, .kpi-banner');
      if (statsBar) {
        const observer = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting && !hasCounted) {
            hasCounted = true;
            runCounters();
            observer.disconnect();
          }
        }, { threshold: 0.2 });
        observer.observe(statsBar);
      } else {
        runCounters();
      }
    } else {
      runCounters();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCounters);
  } else {
    initCounters();
  }
})();
