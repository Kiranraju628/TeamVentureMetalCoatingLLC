/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * RFQ Scope Estimator & Live Engineering Turnaround Calculator Module
 */

(function () {
  'use strict';

  function initRfqCalculator() {
    const rfqService = document.getElementById('rfqService');
    const rfqMaterial = document.getElementById('rfqMaterial');
    const rfqScope = document.getElementById('rfqScope');
    const rfqUrgency = document.getElementById('rfqUrgency');

    const sumService = document.getElementById('sumService');
    const sumMaterial = document.getElementById('sumMaterial');
    const sumCompliance = document.getElementById('sumCompliance');
    const sumTimeline = document.getElementById('sumTimeline');

    window.updateRfqCalculation = function () {
      if (!rfqService) return;

      const serviceText = rfqService.options[rfqService.selectedIndex]?.text || 'Pipe Spool Fabrication';
      const matVal = rfqMaterial ? rfqMaterial.value : 'cs';
      const urgencyVal = rfqUrgency ? rfqUrgency.value : 'standard';
      const scopeVal = rfqScope ? rfqScope.value : 'medium';

      if (sumService) sumService.textContent = serviceText;

      let matLabel = 'Carbon Steel (ASTM A106 / A516)';
      let compliance = 'ASME B31.3, ADNOC Standard';
      let timelineDays = 14;

      if (matVal === 'ss') {
        matLabel = 'Stainless Steel (316L / 304)';
        compliance = 'ASME Sec IX, AWS D1.6';
        timelineDays = 16;
      } else if (matVal === 'duplex') {
        matLabel = 'Duplex / Super Duplex 2205/2507';
        compliance = 'Norsok M-601, ADNOC Approved';
        timelineDays = 21;
      } else if (matVal === 'specialty') {
        matLabel = 'Inconel / Specialized Alloys';
        compliance = 'Global Sourcing Grade, API 5L';
        timelineDays = 28;
      }

      if (scopeVal === 'small') timelineDays = Math.round(timelineDays * 0.6);
      if (scopeVal === 'large') timelineDays = Math.round(timelineDays * 1.5);
      if (urgencyVal === 'urgent') {
        timelineDays = Math.max(3, Math.round(timelineDays * 0.5));
      }

      if (sumMaterial) sumMaterial.textContent = matLabel;
      if (sumCompliance) sumCompliance.textContent = compliance;
      if (sumTimeline) {
        sumTimeline.textContent = urgencyVal === 'urgent'
          ? `${timelineDays} - ${timelineDays + 3} Days (Priority Expedited)`
          : `${timelineDays} - ${timelineDays + 5} Days (Standard)`;
      }
    };

    [rfqService, rfqMaterial, rfqScope, rfqUrgency].forEach(element => {
      if (element) {
        element.addEventListener('change', window.updateRfqCalculation);
      }
    });

    window.updateRfqCalculation();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRfqCalculator);
  } else {
    initRfqCalculator();
  }
})();
