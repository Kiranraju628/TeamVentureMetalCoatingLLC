/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * Master Client Application Script (Modular Architecture Entry Point)
 *
 * Modular Components:
 * - navigation.js:     Header scroll effect, mobile menu drawer, modal triggers & utility methods
 * - counters.js:       Animated KPI metric counters
 * - portfolio.js:      Portfolio category filters & interactive project lightbox modal
 * - rfq-calculator.js: Interactive scope, material & schedule turnaround calculator
 * - email-dispatch.js: Direct Email notification & form submission handlers for info@tvmcservices.com
 */

(function () {
  'use strict';
  
  // Master initialization confirmation
  document.addEventListener('DOMContentLoaded', () => {
    // Ensure smooth accessibility and state checks
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  });
})();
