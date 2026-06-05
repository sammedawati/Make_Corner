/* ==========================================================================
   Make Corner - About Us View (Company Story, Interactive Values, Team Grid)
   ========================================================================== */

import { Components } from '../components.js';

export default async function renderAbout(container, query) {
  container.innerHTML = `
    <!-- About Story Section -->
    <section class="section-padding">
      <div class="container about-hero-grid">
        <div class="about-story">
          <span class="section-subtitle">Our Heritage</span>
          <h1 class="section-title" style="margin-bottom: 20px;">Specialized in Crop Protection Since 2011</h1>
          <p>
            Make Corner (originally established as Mech Corner) was founded with a single mission: to provide farmers with durable, highly-efficient agricultural spraying equipment that withstands the test of time. Over the last decade, we have established ourselves as the premier distributor of Lu Shyoung pressure pumps and spray accessories.
          </p>
          <p>
            Whether it's custom power sprayer rigs with multiple outlets, comfortable motorized backpack knapsacks, or rechargeable eco-friendly battery sprayers, our solutions are engineered to minimize pesticide and herbicide waste while maximizing crop surface area penetration.
          </p>
          <p>
            We operate out of our state-of-the-art training and repair facilities, offering local growers hands-on workshops, repair calibrations, and immediate access to original spares to ensure zero downtime during critical spraying seasons.
          </p>
        </div>
        <div class="hero-image-wrapper">
          <div class="hero-image-container" style="height: 380px;">
            <div class="hero-image-fallback">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <h3>Make Corner Care & Spares</h3>
              <p>Certified Technicians & Maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Core Values Accordion Section -->
    <section class="section-padding" style="background: var(--color-surface); border-top: var(--glass-border); border-bottom: var(--glass-border);">
      <div class="container" style="max-width: 800px;">
        <div class="section-title-wrapper">
          <span class="section-subtitle">What Guides Us</span>
          <h2 class="section-title">Our Guiding Principles</h2>
          <p class="section-desc">We base our daily business and custom assemblies on these core commitments to our grower community.</p>
        </div>

        <div class="about-values-accordion">
          <!-- Accordion Item 1 -->
          <div class="accordion-item active">
            <div class="accordion-header">
              <h3 class="accordion-title">1. Engineered Precision & Quality</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                We refuse to deal in substandard materials. Every plunger pump, nozzle body, and delivery hose we sell is tested in-house. We maintain a full inventory of original Lu Shyoung stainless steel plungers, valve kits, and leather gaskets to guarantee your equipment works season after season.
              </p>
            </div>
          </div>

          <!-- Accordion Item 2 -->
          <div class="accordion-item">
            <div class="accordion-header">
              <h3 class="accordion-title">2. Environmental Sustainability</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                Over-spraying degrades soils and wastes valuable chemicals. By focusing on adjustable nozzles and flow control valves, we assist farmers in calibrating sprayer pressure to deliver optimal droplet size (microns), reducing chemical runoffs and drift.
              </p>
            </div>
          </div>

          <!-- Accordion Item 3 -->
          <div class="accordion-item">
            <div class="accordion-header">
              <h3 class="accordion-title">3. Absolute Farmer Support</h3>
              <svg class="accordion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
            <div class="accordion-body">
              <p style="padding-top: 8px;">
                Farming doesn't wait for office hours. We offer active technical support guides, free maintenance inspections, and step-by-step videos on packing washer replacements to keep you spraying without interruption.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Members Section -->
    <section class="section-padding">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">The Experts</span>
          <h2 class="section-title">Meet Our Spraying Specialists</h2>
          <p class="section-desc">Our dedicated team has decades of combined experience in agricultural machinery, fluid dynamics, and customer support.</p>
        </div>

        <div class="team-grid">
          <!-- Member 1 -->
          <div class="team-card glass-card">
            <div class="team-avatar">JC</div>
            <h3 class="team-name">Jacob Chen</h3>
            <span class="team-role">Founder & Chief Engineer</span>
            <p class="team-bio">With over 20 years in mechanical pump systems, Jacob custom-builds all tractor and engine-driven sprayer systems for local clients.</p>
          </div>

          <!-- Member 2 -->
          <div class="team-card glass-card">
            <div class="team-avatar">MS</div>
            <h3 class="team-name">Marcus Sterling</h3>
            <span class="team-role">Head of Technical Support</span>
            <p class="team-bio">Marcus oversees parts testing and organizes our seasonal maintenance workshops. If you have plunger leaks, Marcus knows the fix.</p>
          </div>

          <!-- Member 3 -->
          <div class="team-card glass-card">
            <div class="team-avatar">AL</div>
            <h3 class="team-name">Anna Lopez</h3>
            <span class="team-role">Customer Care & Logistics</span>
            <p class="team-bio">Anna coordinates fast orders dispatch and catalog deliveries, making sure farms receive knapsack sprayers and replacement parts overnight.</p>
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
