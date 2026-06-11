/* ==========================================================================
   Make Corner - Contact View (Validation Forms & Interactive Map Canvas)
   ========================================================================== */

import { Components, Icons } from '../components.js';
import { State } from '../state.js';
import { t } from '../i18n.js';

export default async function renderContact(container, query) {
  let initialMessage = '';
  let interestVal = 'general';

  if (query && query.product) {
    const prodName = decodeURIComponent(query.product);
    initialMessage = t('contact_initial_msg').replace('{product}', prodName);
    
    const products = State.getProducts();
    const product = products.find(p => p.name.toLowerCase() === prodName.toLowerCase() || p.id.toLowerCase() === prodName.toLowerCase());
    if (product) {
      if (product.category === "Power Sprayers") interestVal = "power";
      else if (product.category === "Knapsack Sprayers") interestVal = "knapsack";
      else if (product.category === "Battery Spray Pumps") interestVal = "battery";
    }
  }
  container.innerHTML = `
    <section class="section-padding">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">${t('contact_subtitle')}</span>
          <h1 class="section-title">${t('contact_title')}</h1>
          <p class="section-desc">${t('contact_desc')}</p>
        </div>

        <div class="contact-layout">
          <!-- Form Section -->
          <div class="glass-card contact-form-wrapper">
            <h3 style="color: #fff; font-size: 1.5rem; margin-bottom: 12px;">${t('contact_form_title')}</h3>
            <form id="contact-inquiry-form" class="contact-form" novalidate>
              <div class="form-grid-2">
                <div class="form-group">
                  <label for="contact-name" class="form-label">${t('contact_name')}</label>
                  <input type="text" id="contact-name" class="form-input" placeholder="e.g. John Doe" required>
                  <div class="form-error-msg" id="err-name" style="display: none;">${t('contact_err_name')}</div>
                </div>
                <div class="form-group">
                  <label for="contact-email" class="form-label">${t('contact_email')}</label>
                  <input type="email" id="contact-email" class="form-input" placeholder="e.g. john@farm.com" required>
                  <div class="form-error-msg" id="err-email" style="display: none;">${t('contact_err_email')}</div>
                </div>
              </div>

              <div class="form-grid-2" style="margin-top: 16px;">
                <div class="form-group">
                  <label for="contact-phone" class="form-label">${t('contact_phone')}</label>
                  <input type="tel" id="contact-phone" class="form-input" placeholder="e.g. +1 (555) 019-2834">
                </div>
                <div class="form-group">
                  <label for="contact-interest" class="form-label">${t('contact_interest')}</label>
                  <select id="contact-interest" class="form-select" aria-label="Select equipment of interest">
                    <option value="general" ${interestVal === 'general' ? 'selected' : ''}>${t('contact_interest_general')}</option>
                    <option value="power" ${interestVal === 'power' ? 'selected' : ''}>${t('contact_interest_power')}</option>
                    <option value="knapsack" ${interestVal === 'knapsack' ? 'selected' : ''}>${t('contact_interest_knapsack')}</option>
                    <option value="battery" ${interestVal === 'battery' ? 'selected' : ''}>${t('contact_interest_battery')}</option>
                  </select>
                </div>
              </div>

              <div class="form-group" style="margin-top: 16px;">
                <label for="contact-message" class="form-label">${t('contact_message')}</label>
                <textarea id="contact-message" class="form-textarea" rows="5" placeholder="Specify model questions or custom sprayer setups..." required>${initialMessage}</textarea>
                <div class="form-error-msg" id="err-message" style="display: none;">${t('contact_err_message')}</div>
              </div>

              <button type="submit" class="btn btn-primary" style="margin-top: 24px; align-self: flex-start;">
                ${t('btn_submit')}
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
                <h4>${t('contact_card_phone_title')}</h4>
                <p>+1 (555) 309-8080</p>
                <p style="font-size: 0.85rem;">${t('contact_card_phone_hours')}</p>
              </div>
            </div>

            <div class="contact-info-card glass-card">
              <div class="contact-card-icon">
                ${Icons.mail}
              </div>
              <div class="contact-card-info">
                <h4>${t('contact_card_email_title')}</h4>
                <p>support@mechcorner.com</p>
                <p style="font-size: 0.85rem;">${t('contact_card_email_hours')}</p>
              </div>
            </div>

            <div class="contact-info-card glass-card">
              <div class="contact-card-icon">
                ${Icons.map}
              </div>
              <div class="contact-card-info">
                <h4>${t('contact_card_map_title')}</h4>
                <p>102 Orchard Lane, Agri Industrial Hub, TX 75001</p>
                <p style="font-size: 0.85rem;">${t('contact_card_map_desc')}</p>
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
                  <div class="map-popup-title">Mech Corner HQ</div>
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
      const interestInput = document.getElementById('contact-interest');
      const phoneInput = document.getElementById('contact-phone');
      const selectedInterestText = interestInput ? interestInput.options[interestInput.selectedIndex].text : 'General Support / Parts';

      const newEnquiry = {
        id: "enq-" + Date.now(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput ? (phoneInput.value.trim() || "N/A") : "N/A",
        interest: selectedInterestText,
        message: messageInput.value.trim(),
        date: new Date().toISOString().split('T')[0]
      };

      State.saveEnquiry(newEnquiry);

      // Success toast
      Components.showToast(t('contact_toast_success').replace('{name}', nameInput.value), 'success');
      form.reset();
    } else {
      Components.showToast(t('contact_toast_error'), 'error');
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
