// ============== CONFIGURATION ==============
const EMAILJS_CONFIG = {
  serviceID: 'service_fluvsuq',      // From EmailJS dashboard
  templateID: 'template_44gylil',   // From EmailJS templates
  userID: 'NoteFlare'      // From EmailJS account
};
// ============== END CONFIG ==============

document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  emailjs.init(EMAILJS_CONFIG.userID);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      // UI Loading State
      const submitBtn = contactForm.querySelector('.submit-btn');
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
      submitBtn.disabled = true;

      try {
        // Prepare form data for EmailJS
        const templateParams = {
          first_name: contactForm.querySelector('[name="First Name"]').value,
          last_name: contactForm.querySelector('[name="Last Name"]').value,
          email: contactForm.querySelector('[name="Email"]').value,
          phone: contactForm.querySelector('[name="Mobile Number"]').value,
          message: contactForm.querySelector('[name="Message"]').value
        };

        // Send email via EmailJS
        const response = await emailjs.send(
          EMAILJS_CONFIG.serviceID,
          EMAILJS_CONFIG.templateID,
          templateParams
        );

        // Verify successful delivery
        if (response.status !== 200) {
          throw new Error('Email service returned error');
        }

        // Success handling
        showSuccessModal();
        contactForm.reset();

      } catch (error) {
        console.error('Email failed:', error);
        showError('Message not sent. Please email us directly at edu.noteflare@gmail.com');
      } finally {
        submitBtn.innerHTML = originalContent;
        submitBtn.disabled = false;
      }
    });
  }
});

// Error display function
function showError(message) {
  const errorDiv = document.getElementById('form-error') || document.createElement('div');
  errorDiv.id = 'form-error';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-triangle"></i>
    ${message}
    <a href="mailto:edu.noteflare@gmail.com" class="error-link">
      <i class="fas fa-paper-plane"></i> Send manually
    </a>
  `;
  
  if (!document.getElementById('form-error')) {
    contactForm.appendChild(errorDiv);
    setTimeout(() => errorDiv.classList.add('show'), 10);
  }
}
