/* ==========================================================================
   Make Corner - Contact View (Validation Forms & Interactive Map Canvas)
   ========================================================================== */

import { Components, Icons } from '../components.js';

export default async function renderContact(container, query) {
  container.innerHTML = `
    <section class="section-padding">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">Get In Touch</span>
          <h1 class="section-title">We're Here to Help</h1>
          <p class="section-desc">Connect with agricultural spraying experts. Get pricing quotes, technical advice, or service scheduling.</p>
        </div>

        <div class="contact-layout">
          <!-- Form Section -->
          <div class="glass-card contact-form-wrapper">
            <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 12px;">Send an Inquiry</h3>
            <form id="contact-inquiry-form" class="contact-form" novalidate>
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="contact-name" class="form-label">Full Name *</label>
                  <input type="text" id="contact-name" class="form-input" placeholder="e.g. John Doe" required>
                  <div class="form-error-msg" id="err-name" style="display: none;">Name is required (minimum 3 characters).</div>
                </div>
                <div class="form-group">
                  <label for="contact-email" class="form-label">Email Address *</label>
                  <input type="email" id="contact-email" class="form-input" placeholder="e.g. john@farm.com" required>
                  <div class="form-error-msg" id="err-email" style="display: none;">Please enter a valid email address.</div>
                </div>
              </div>

              <div class="form-grid-2" style="margin-top: 16px;">
                <div class="form-group">
                  <label for="contact-phone" class="form-label">Phone Number</label>
                  <input type="tel" id="contact-phone" class="form-input" placeholder="e.g. +1 (555) 019-2834">
                </div>
                <div class="form-group">
                  <label for="contact-interest" class="form-label">Equipment of Interest</label>
                  <select id="contact-interest" class="form-select" aria-label="Select equipment of interest">
                    <option value="general">General Support / Parts</option>
                    <option value="power">Lu Shyoung Power Sprayers</option>
                    <option value="knapsack">Knapsack Sprayers (Manual / Power)</option>
                    <option value="battery">Battery Spray Pumps</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-top: 16px;">
                <label for="contact-message" class="form-label">Your Message *</label>
                <textarea id="contact-message" class="form-textarea" rows="5" placeholder="Specify model questions or custom sprayer setups..." required></textarea>
                <div class="form-error-msg" id="err-message" style="display: none;">Message is required (minimum 10 characters).</div>
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top: 24px; align-self: flex-start;">
                Submit Message
              </button>
            </form>
          </div>

          <!-- Info & Interactive Map Section -->
          <div class="contact-info-cards">
            <div class="contact-info-card glass-card">
              <div class="contact-card-icon">
                ${Icons.phone}
              </div>
              <div class="contact-card-info">
                <h4>Call Our Service Hub</h4>
                <p>+1 (555) 309-8080</p>
                <p style="font-size: 0.85rem;">Mon - Sat: 8:00 AM - 6:00 PM</p>
              </div>
            </div>

            <div class="contact-info-card glass-card">
              <div class="contact-card-icon">
                ${Icons.mail}
              </div>
              <div class="contact-card-info">
                <h4>Email Support Desk</h4>
                <p>support@makecorner.com</p>
                <p style="font-size: 0.85rem;">We reply within 12 business hours</p>
              </div>
            </div>

            <div class="contact-info-card glass-card">
              <div class="contact-card-icon">
                ${Icons.map}
              </div>
              <div class="contact-card-info">
                <h4>Main Headquarters</h4>
                <p>102 Orchard Lane, Agri Industrial Hub, TX 75001</p>
                <p style="font-size: 0.85rem;">Visit us for live flow tests and parts matching</p>
              </div>
            </div>

            <!-- Simulated Map -->
            <div class="map-canvas-container">
              <div class="simulated-map" id="simulated-map-container">
                <div class="map-grid-lines"></div>
                
                <!-- Pulsing Pin -->
                <div class="map-pin" id="map-interactive-pin">
                  <div class="map-pin-pulse"></div>
                  <div class="map-pin-dot"></div>
                </div>

                <!-- Info Box Overlay -->
                <div class="map-popup" id="map-tooltip-popup" style="display: none;">
                  <div class="map-popup-title">Make Corner HQ</div>
                  <div>102 Orchard Lane</div>
                  <div style="font-size: 0.75rem; color: var(--color-accent); font-weight: 600; margin-top: 4px;">Click to Hide</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach Form validation and Map interaction events
  bindContactFormEvents(container);
  bindMapEvents(container);
}

function bindContactFormEvents(container) {
  const form = document.getElementById('contact-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');

    // Error blocks
    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    const errMessage = document.getElementById('err-message');

    let isValid = true;

    // Name Validate (min 3 chars)
    if (!nameInput.value || nameInput.value.trim().length < 3) {
      nameInput.classList.add('error');
      errName.style.display = 'block';
      isValid = false;
    } else {
      nameInput.classList.remove('error');
      errName.style.display = 'none';
    }

    // Email Validate
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value || !emailRegex.test(emailInput.value)) {
      emailInput.classList.add('error');
      errEmail.style.display = 'block';
      isValid = false;
    } else {
      emailInput.classList.remove('error');
      errEmail.style.display = 'none';
    }

    // Message Validate (min 10 chars)
    if (!messageInput.value || messageInput.value.trim().length < 10) {
      messageInput.classList.add('error');
      errMessage.style.display = 'block';
      isValid = false;
    } else {
      messageInput.classList.remove('error');
      errMessage.style.display = 'none';
    }

    if (isValid) {
      // Success toast
      Components.showToast(`Thank you, ${nameInput.value}! Your message has been sent to our tech team.`, 'success');
      form.reset();
    } else {
      Components.showToast('Please correct form validation errors.', 'error');
    }
  });
}

function bindMapEvents(container) {
  const pin = document.getElementById('map-interactive-pin');
  const popup = document.getElementById('map-tooltip-popup');

  if (!pin || !popup) return;

  pin.addEventListener('click', (e) => {
    e.stopPropagation();
    if (popup.style.display === 'none') {
      popup.style.display = 'block';
    } else {
      popup.style.display = 'none';
    }
  });

  // Clicking anywhere else on map closes tooltip
  const mapContainer = document.getElementById('simulated-map-container');
  if (mapContainer) {
    mapContainer.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  }
}
