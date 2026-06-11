/* ==========================================================================
   Make Corner - About Us View (Company Story, Interactive Values, Team Grid)
   ========================================================================== */

import { Components } from '../components.js';
import { t } from '../i18n.js';

export default async function renderAbout(container, query) {
  container.innerHTML = `
    <!-- About Story Section -->
    <section class="section-padding" style="padding-bottom: 40px;">
      <div class="container about-hero-grid">
        <div class="about-story">
          <span class="section-subtitle">${t('about_subtitle')}</span>
          <h1 class="section-title" style="margin-bottom: 20px;">${t('about_title')}</h1>
          <p>
            ${t('about_desc1')}
          </p>
          <p>
            ${t('about_desc2')}
          </p>
          <p>
            ${t('about_desc3')}
          </p>
        </div>
        <div class="hero-image-wrapper">
          <div class="hero-image-container">
            <div class="hero-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <h3>${t('about_image_title')}</h3>
              <p>${t('about_image_desc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values Accordion Section -->
    <section class="section-padding" style="padding-top: 40px; padding-bottom: 40px; background: var(--color-surface); border-top: var(--glass-border); border-bottom: var(--glass-border);">
      <div class="container" style="max-width: 800px;">
        <div class="section-title-wrapper">
          <span class="section-subtitle">${t('about_principles_subtitle')}</span>
          <h2 class="section-title">${t('about_principles_title')}</h2>
          <p class="section-desc">${t('about_principles_desc')}</p>
        </div>

        <div class="about-values-accordion">
          <!-- Accordion Item 1 -->
          <div class="accordion-item active">
            <div class="accordion-header">
              <h3 class="accordion-title">${t('about_p1_title')}</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                ${t('about_p1_desc')}
              </p>
            </div>
          </div>

          <!-- Accordion Item 2 -->
          <div class="accordion-item">
            <div class="accordion-header">
              <h3 class="accordion-title">${t('about_p2_title')}</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                ${t('about_p2_desc')}
              </p>
            </div>
          </div>

          <!-- Accordion Item 3 -->
          <div class="accordion-item">
            <div class="accordion-header">
              <h3 class="accordion-title">${t('about_p3_title')}</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                ${t('about_p3_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="section-padding" style="padding-top: 40px;">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">${t('about_team_subtitle')}</span>
          <h2 class="section-title">${t('about_team_title')}</h2>
          <p class="section-desc">${t('about_team_desc')}</p>
        </div>

        <div class="team-grid">
          <!-- Member 1 -->
          <div class="team-card glass-card">
            <div class="team-avatar">JC</div>
            <h3 class="team-name">Jacob Chen</h3>
            <span class="team-role">${t('about_m1_role')}</span>
            <p class="team-bio">${t('about_m1_bio')}</p>
          </div>

          <!-- Member 2 -->
          <div class="team-card glass-card">
            <div class="team-avatar">MS</div>
            <h3 class="team-name">Marcus Sterling</h3>
            <span class="team-role">${t('about_m2_role')}</span>
            <p class="team-bio">${t('about_m2_bio')}</p>
          </div>

          <!-- Member 3 -->
          <div class="team-card glass-card">
            <div class="team-avatar">AL</div>
            <h3 class="team-name">Anna Lopez</h3>
            <span class="team-role">${t('about_m3_role')}</span>
            <p class="team-bio">${t('about_m3_bio')}</p>
          </div>
        </div>
      </div>
    </section>
  `;

  // Bind Accordion Interaction logic
  bindAccordionEvents(container);
}

function bindAccordionEvents(container) {
  const accordionItems = container.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all accordion items
      accordionItems.forEach(innerItem => {
        innerItem.classList.remove('active');
        const innerBody = innerItem.querySelector('.accordion-body');
        if (innerBody) innerBody.style.maxHeight = '0';
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        const body = item.querySelector('.accordion-body');
        if (body) {
          // Calculate height of body content dynamically
          body.style.maxHeight = body.scrollHeight + 'px';
        }
      }
    });

    // Make sure initial active item has its height set
    if (item.classList.contains('active')) {
      const body = item.querySelector('.accordion-body');
      if (body) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    }
  });
}
