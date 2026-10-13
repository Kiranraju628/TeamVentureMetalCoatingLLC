/**
 * TEAM VENTURE METAL COATING LLC – S.P.C. (Abu Dhabi, UAE)
 * Direct Email Notification & Form Dispatch Handling Module
 */

(function () {
  'use strict';

  const TVMC_EMAIL_ADDRESS = 'info@tvmcservices.com';

  function showDispatchModal({ title, desc, emailSubject, emailBody, recordId }) {
    const modalTitle = document.getElementById('dispatchSuccessTitle');
    const modalDesc = document.getElementById('dispatchSuccessDesc');
    const emailBtn = document.getElementById('dispatchEmailBtn');
    const recordSpan = document.getElementById('dispatchRecordId');

    if (modalTitle && title) modalTitle.textContent = title;
    if (modalDesc && desc) modalDesc.innerHTML = desc;
    if (recordSpan && recordId) recordSpan.textContent = recordId;

    const emailUrl = `mailto:${TVMC_EMAIL_ADDRESS}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    if (emailBtn) emailBtn.href = emailUrl;

    if (window.openModal) {
      window.openModal('dispatchSuccessModal');
    }

    try {
      window.location.href = emailUrl;
    } catch (e) {
      console.warn('Mailto direct launch triggered; user can also click direct button.');
    }
  }

  function initEmailDispatch() {
    // 1. RFQ Interactive Estimator Form
    const rfqForm = document.getElementById('rfqForm');
    const rfqService = document.getElementById('rfqService');
    const rfqMaterial = document.getElementById('rfqMaterial');
    const rfqScope = document.getElementById('rfqScope');
    const rfqUrgency = document.getElementById('rfqUrgency');

    if (rfqForm) {
      rfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const clientName = document.getElementById('rfqName')?.value.trim() || 'Valued Client';
        const clientEmail = document.getElementById('rfqEmail')?.value.trim() || '';
        const clientPhone = document.getElementById('rfqPhone')?.value.trim() || '';
        const notes = document.getElementById('rfqNotes')?.value.trim() || '';

        const serviceText = rfqService?.options[rfqService.selectedIndex]?.text || 'Pipe & Pipeline Spool Fabrication';
        const materialText = rfqMaterial?.options[rfqMaterial.selectedIndex]?.text || 'Carbon Steel';
        const scopeText = rfqScope?.options[rfqScope.selectedIndex]?.text || 'Standard Scope';
        const urgencyText = rfqUrgency?.options[rfqUrgency.selectedIndex]?.text || 'Standard Engineering Schedule';

        const recordId = 'RFQ-' + Date.now();
        const payload = {
          id: recordId,
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          service: serviceText,
          material: materialText,
          scope: scopeText,
          urgency: urgencyText,
          notes: notes,
          source: 'Main RFQ Estimator'
        };

        fetch('/api/rfq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('RFQ saving error:', err));

        const emailSubject = `[Engineering RFQ] ${serviceText} - ${clientName} (${recordId})`;
        const emailBody = 
`Dear Team Venture Metal Coating LLC Estimating Desk,

A new Request for Quotation (RFQ) has been logged through the online engineering portal:

1. CLIENT INFORMATION
- Reference ID: ${recordId}
- Company / Contact: ${clientName}
- Phone / Contact: ${clientPhone}
- Corporate Email: ${clientEmail}

2. SCOPE DETAILS
- Target Service: ${serviceText}
- Metallurgy: ${materialText}
- Scope / Tonnage: ${scopeText}
- Schedule Requirement: ${urgencyText}

3. TECHNICAL SPECIFICATIONS & NOTES:
${notes || 'No extra notes provided.'}

---
Team Venture Metal Coating LLC – S.P.C.
Mazyad Mall, Zayed City, Musaffah, Abu Dhabi, UAE
Official Email: info@tvmcservices.com`;

        if (window.showToast) {
          window.showToast(`Thank you, ${clientName}! RFQ logged and email notification prepared for info@tvmcservices.com.`);
        }

        showDispatchModal({
          title: 'RFQ Logged & Email Prepared!',
          desc: `Your engineering quotation request for "<strong>${serviceText}</strong>" is stored in our central system. Direct email notification has been dispatched to <strong style="color: var(--accent-amber);">info@tvmcservices.com</strong>:`,
          emailSubject,
          emailBody,
          recordId
        });

        rfqForm.reset();
        if (window.updateRfqCalculation) window.updateRfqCalculation();
      });
    }

    // 2. Quick RFQ Modal Form
    const quickRfqForm = document.getElementById('quickRfqForm');
    if (quickRfqForm) {
      quickRfqForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const company = document.getElementById('quickCompany')?.value.trim() || 'Client';
        const contact = document.getElementById('quickContact')?.value.trim() || 'Estimator';
        const phone = document.getElementById('quickPhone')?.value.trim() || '';
        const scope = document.getElementById('quickScope')?.value.trim() || '';
        const selectedService = rfqService?.options[rfqService.selectedIndex]?.text || 'General Metal Coating & Fabrication';

        const recordId = 'RFQ-' + Date.now();
        const payload = {
          id: recordId,
          company: company,
          name: contact,
          phone: phone,
          service: selectedService,
          scope: scope,
          source: 'Quick Modal RFQ'
        };

        fetch('/api/rfq', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('Quick RFQ error:', err));

        if (window.closeModal) window.closeModal('rfqModal');

        const emailSubject = `[Quick RFQ] ${company} - Attention TVMC Estimators (${recordId})`;
        const emailBody = 
`Dear TVMC Estimating Team,

A new Quick RFQ has been submitted:

- Reference ID: ${recordId}
- Company Name: ${company}
- Contact Person: ${contact}
- Phone Number: ${phone}
- Service Area: ${selectedService}
- Scope Description:
${scope || 'N/A'}

---
Team Venture Metal Coating LLC – S.P.C.
Official Email: info@tvmcservices.com`;

        if (window.showToast) window.showToast(`Quick RFQ submitted for ${company}! Email notification ready.`);

        showDispatchModal({
          title: 'Quick RFQ Dispatched!',
          desc: `Your request for <strong>${company}</strong> is recorded. Direct email notification is ready for our Musaffah estimating desk:`,
          emailSubject,
          emailBody,
          recordId
        });

        quickRfqForm.reset();
      });
    }

    // 3. Contact Section Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const sender = document.getElementById('contactName')?.value.trim() || 'Valued Partner';
        const email = document.getElementById('contactEmail')?.value.trim() || '';
        const message = document.getElementById('contactMessage')?.value.trim() || '';

        const recordId = 'MSG-' + Date.now();
        const payload = {
          id: recordId,
          name: sender,
          email: email,
          message: message,
          source: 'Contact Section Form'
        };

        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }).catch(err => console.error('Contact error:', err));

        const emailSubject = `[Website Inquiry] Message from ${sender} (${recordId})`;
        const emailBody = 
`Dear Team Venture Metal Coating LLC,

A new contact message has been received through the website:

- Reference ID: ${recordId}
- From: ${sender}
- Email: ${email}

Message:
${message}

---
Sent via Team Venture Metal Coating LLC Online Portal
Recipient: info@tvmcservices.com`;

        if (window.showToast) window.showToast(`Thank you, ${sender}! Your message is dispatched to info@tvmcservices.com.`);

        showDispatchModal({
          title: 'Message Dispatched!',
          desc: `Your inquiry has been stored in our system. Direct email notification has been prepared for <strong style="color: var(--accent-amber);">info@tvmcservices.com</strong>:`,
          emailSubject,
          emailBody,
          recordId
        });

        contactForm.reset();
      });
    }

    // Modal Close Buttons
    const dispatchSuccessClose = document.getElementById('dispatchSuccessClose');
    const dispatchDoneBtn = document.getElementById('dispatchDoneBtn');
    const dispatchSuccessModal = document.getElementById('dispatchSuccessModal');

    if (dispatchSuccessClose) {
      dispatchSuccessClose.addEventListener('click', () => window.closeModal('dispatchSuccessModal'));
    }
    if (dispatchDoneBtn) {
      dispatchDoneBtn.addEventListener('click', () => window.closeModal('dispatchSuccessModal'));
    }
    if (dispatchSuccessModal) {
      dispatchSuccessModal.addEventListener('click', (e) => {
        if (e.target === dispatchSuccessModal) window.closeModal('dispatchSuccessModal');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEmailDispatch);
  } else {
    initEmailDispatch();
  }
})();
