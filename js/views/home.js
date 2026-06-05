/* ==========================================================================
   Make Corner - Home View (Rupees ₹ & Image Upgrades)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';

export default async function renderHome(container, query) {
  // Pull top 3 products to feature
  const allProducts = State.getProducts();
  const featured = allProducts.slice(0, 3);

  // Set up Page HTML
  container.innerHTML = `
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-bg"></div>
      <div class="container hero-grid">
        <div class="hero-content">
          <div class="hero-subtitle">World Class Spraying Systems</div>
          <h1 class="hero-title">
            Precision Agricultural <span>Spraying Solutions</span>
          </h1>
          <p class="hero-desc">
            Make Corner specializes in supplying industrial-grade power sprayers, knapsack sprayers, and battery spray pumps. Enhance your crop protection, reduce wastage, and secure optimal yields with Lu Shyoung equipment.
          </p>
          <div class="hero-actions">
            <a href="#shop" class="btn btn-primary">Explore Products</a>
            <a href="#about" class="btn btn-secondary">Learn Our Story</a>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <div class="hero-slider-container">
            <div class="hero-slider-track" id="hero-slider-track">
              <!-- Slide 1: Power Sprayer -->
              <div class="hero-slide active">
                <img src="/images/power_sprayer.png" alt="Lu Shyoung LS-30 Power Sprayer">
                <div class="hero-badge">
                  <span class="hero-badge-number">45</span>
                  <span class="hero-badge-text">Bar Max Working Pressure</span>
                </div>
              </div>
              <!-- Slide 2: Knapsack Sprayer -->
              <div class="hero-slide">
                <img src="/images/knapsack_sprayer.png" alt="Manual Backpack Sprayer">
                <div class="hero-badge">
                  <span class="hero-badge-number">16</span>
                  <span class="hero-badge-text">Liters Tank Capacity</span>
                </div>
              </div>
              <!-- Slide 3: Battery Sprayer -->
              <div class="hero-slide">
                <img src="/images/battery_sprayer.png" alt="12V Battery Spray Pump">
                <div class="hero-badge">
                  <span class="hero-badge-number">12V</span>
                  <span class="hero-badge-text">High Capacity Battery</span>
                </div>
              </div>
              <!-- Slide 4: HDPE Pipes -->
              <div class="hero-slide">
                <img src="/images/hdpe_pipe.avif" alt="HDPE Agricultural Pipes">
                <div class="hero-badge">
                  <span class="hero-badge-number">DN20</span>
                  <span class="hero-badge-text">to DN315 Diameter Range</span>
                </div>
              </div>
              <!-- Slide 5: MDPE Pipes -->
              <div class="hero-slide">
                <img src="/images/mdpe_pipe.png" alt="MDPE Utility Pipe">
                <div class="hero-badge">
                  <span class="hero-badge-number">12</span>
                  <span class="hero-badge-text">Bar Max Working Pressure</span>
                </div>
              </div>
              <!-- Slide 6: Fabricated Fittings -->
              <div class="hero-slide">
                <img src="/images/fabricated_pipe.png" alt="Fabricated HDPE Fittings">
                <div class="hero-badge">
                  <span class="hero-badge-number">ISO</span>
                  <span class="hero-badge-text">Certified Fabricated Fittings</span>
                </div>
              </div>
              <!-- Slide 7: Modular HDPE -->
              <div class="hero-slide">
                <img src="/images/moduled_hdpe.png" alt="Moulded HDPE Pipe Fittings">
                <div class="hero-badge">
                  <span class="hero-badge-number">100%</span>
                  <span class="hero-badge-text">Virgin HDPE Grade Material</span>
                </div>
              </div>
            </div>
            <!-- Slider Navigation Arrows -->
            <button class="hero-slide-nav prev" id="hero-slide-prev" aria-label="Previous Slide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <button class="hero-slide-nav next" id="hero-slide-next" aria-label="Next Slide">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
            <!-- Slide Indicators/Dots -->
            <div class="hero-slider-dots" id="hero-slider-dots">
              <span class="hero-dot active" data-slide="0"></span>
              <span class="hero-dot" data-slide="1"></span>
              <span class="hero-dot" data-slide="2"></span>
              <span class="hero-dot" data-slide="3"></span>
              <span class="hero-dot" data-slide="4"></span>
              <span class="hero-dot" data-slide="5"></span>
              <span class="hero-dot" data-slide="6"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stat Counter Section -->
    <section class="stats-section">
      <div class="container stats-grid">
        <div class="stat-card">
          <div class="stat-number">10k+</div>
          <div class="stat-label">Farms Empowered</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">100%</div>
          <div class="stat-label">Genuine Parts Warranty</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">24/7</div>
          <div class="stat-label">Expert Technical Support</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">0.3s</div>
          <div class="stat-label">Instant Shut-off Valves</div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="section-padding">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">Premium Selections</span>
          <h2 class="section-title">Featured Spraying Solutions</h2>
          <p class="section-desc">Handpicked agricultural sprayers optimized for reliability, spray range, and pressure consistency.</p>
        </div>

        <div class="featured-grid">
          ${featured.map(prod => renderFeaturedProductCard(prod)).join('')}
        </div>

        <div class="featured-actions">
          <a href="#shop" class="btn btn-secondary">View Complete Shop Catalog</a>
        </div>
      </div>
    </section>

    <!-- Interactive Crop Care Features Section -->
    <section class="section-padding" style="background: var(--color-surface); border-top: var(--glass-border);">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">Engineered for Farms</span>
          <h2 class="section-title">Why Professionals Trust Lu Shyoung</h2>
          <p class="section-desc">Our spraying equipment features unmatched craftsmanship and technical enhancements to make pest and disease management simpler.</p>
        </div>

        <div class="features-grid">
          <div class="feature-card glass-card">
            <div class="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 class="feature-title">High Pressure Plungers</h3>
            <p class="feature-desc">Fitted with ceramic-coated cylinders that resist corrosion and wear from heavy chemical applications, maintaining output pressure year after year.</p>
          </div>

          <div class="feature-card glass-card">
            <div class="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <h3 class="feature-title">Consistent Flow Distribution</h3>
            <p class="feature-desc">Engineered relief valves prevent pressure surges, ensuring spray droplets remain at a uniform micron size for maximum leaf coverage.</p>
          </div>

          <div class="feature-card glass-card">
            <div class="feature-icon-wrapper">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
            </div>
            <h3 class="feature-title">Low-Emission Motors</h3>
            <p class="feature-desc">Our power and knapsack engine variations exceed environmental emission targets, reducing fuel consumption while keeping pump flow high.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="section-padding testimonials-section">
      <div class="container">
        <div class="section-title-wrapper">
          <span class="section-subtitle">Success Stories</span>
          <h2 class="section-title">Trusted By Growers</h2>
          <p class="section-desc">Hear how agricultural operations improved efficiency using our spraying units.</p>
        </div>

        <div class="testimonials-carousel-wrapper">
          <div class="testimonials-track" id="testimonials-track">
            <!-- Slide 1 -->
            <div class="testimonial-slide">
              <div class="testimonial-card">
                <p class="testimonial-quote">"The Lu Shyoung LS-30 plunger pump has transformed our orchard spraying program. We run three nozzles on a single pump and the pressure stays absolutely steady. Outstanding reliability."</p>
                <div class="testimonial-author">
                  <div class="author-avatar">AM</div>
                  <span class="author-name">Arthur Miller</span>
                  <span class="author-role">Commercial Vineyard Owner</span>
                </div>
              </div>
            </div>
            <!-- Slide 2 -->
            <div class="testimonial-slide">
              <div class="testimonial-card">
                <p class="testimonial-quote">"As a smallholder, the SM-16 Samarat was exactly what I needed. It is lightweight, the straps are padded, and pumping takes very little effort compared to my old manual sprayers."</p>
                <div class="testimonial-author">
                  <div class="author-avatar">RP</div>
                  <span class="author-name">Raj Patel</span>
                  <span class="author-role">Organic Vegetable Farmer</span>
                </div>
              </div>
            </div>
            <!-- Slide 3 -->
            <div class="testimonial-slide">
              <div class="testimonial-card">
                <p class="testimonial-quote">"Upgraded to the LS-16E-3 battery sprayer last season. The 12V battery lasts for hours, allowing us to cover three greenhouse blocks without recharging. Saved us hours of labor."</p>
                <div class="testimonial-author">
                  <div class="author-avatar">SL</div>
                  <span class="author-name">Sarah Lindqvist</span>
                  <span class="author-role">Greenhouse Manager</span>
                </div>
              </div>
            </div>
          </div>

          <div class="carousel-controls">
            <button class="carousel-control-btn" id="prev-testimonial-btn" aria-label="Previous Testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="carousel-indicators" id="carousel-indicators">
              <span class="carousel-dot active" data-index="0"></span>
              <span class="carousel-dot" data-index="1"></span>
              <span class="carousel-dot" data-index="2"></span>
            </div>
            <button class="carousel-control-btn" id="next-testimonial-btn" aria-label="Next Testimonial">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `;

  // Attach interactive features and product listeners
  bindFeaturedProductEvents(container);
  bindTestimonialsCarousel();
  bindHeroSlider();
}

function renderFeaturedProductCard(product) {
  const categoryIcon = getCategoryIcon(product.category);
  const specsSnippet = Object.entries(product.specs).slice(0, 3);
  
  // Render generated image tags
  const imgTag = product.image 
    ? `<img src="${product.image}" alt="${product.name}">`
    : categoryIcon;

  return `
    <div class="product-card" data-id="${product.id}" style="cursor: pointer;">
      <div class="product-card-img-container">
        ${imgTag}
      </div>
      <div class="product-card-content">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-desc-snippet" title="${product.description}">${product.description}</p>
        <div class="product-card-specs">
          ${specsSnippet.map(([key, val]) => `<span class="spec-tag">${key}: ${val}</span>`).join('')}
        </div>

        <div class="product-card-footer">
          <a href="#contact?product=${encodeURIComponent(product.name)}" class="btn btn-primary btn-card-add-primary" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px 16px; font-size: 0.8rem; width: 100%;">
            Get Quote
          </a>
        </div>
      </div>
    </div>
  `;
}

function bindFeaturedProductEvents(container) {
  // Detail card click handler
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      // Avoid triggering when clicking child links or buttons
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }
      const id = card.dataset.id;
      const product = State.getProductById(id);
      if (product) {
        const categoryIcon = getCategoryIcon(product.category);
        const specsRows = Object.entries(product.specs)
          .map(([key, val]) => `<tr><td>${key}</td><td>${val}</td></tr>`).join('');
          
        const detailImg = product.image 
          ? `<img src="${product.image}" alt="${product.name}">`
          : categoryIcon;

        Components.showModal(`
          <div class="product-detail-modal-layout">
            <div class="product-detail-img-wrapper">
              ${detailImg}
            </div>
            <div class="product-detail-info">
              <span class="product-detail-category">${product.category}</span>
              <h2 class="product-detail-title">${product.name}</h2>
              <p class="product-detail-desc">${product.description}</p>
              
              <h4 style="margin-top: 12px; color: var(--color-primary);">Technical Specifications</h4>
              <table class="product-detail-specs-table">
                <tbody>
                  ${specsRows}
                  <tr><td>Stock Status</td><td>${product.stock > 0 ? `${product.stock} units available` : `<span style="color: var(--color-error)">Out of Stock</span>`}</td></tr>
                </tbody>
              </table>

              <div class="product-detail-actions">
                <a href="#contact?product=${encodeURIComponent(product.name)}" class="btn btn-primary" onclick="Components.hideModal()" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
                  Inquire About Product
                </a>
                <button class="btn btn-secondary" onclick="Components.hideModal()">Close</button>
              </div>
            </div>
          </div>
        `);
      }
    });
  });
}

// Testimonials Carousel Controls
function bindTestimonialsCarousel() {
  const track = document.getElementById('testimonials-track');
  const prevBtn = document.getElementById('prev-testimonial-btn');
  const nextBtn = document.getElementById('next-testimonial-btn');
  const indicators = document.getElementById('carousel-indicators');

  if (!track || !prevBtn || !nextBtn) return;

  const slides = Array.from(track.children);
  let currentIndex = 0;

  const updateCarousel = (index) => {
    // Bounds check
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    // Shift track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Highlight indicator dots
    if (indicators) {
      Array.from(indicators.children).forEach((dot, dIdx) => {
        if (dIdx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }
  };

  // Click Controls
  prevBtn.addEventListener('click', () => updateCarousel(currentIndex - 1));
  nextBtn.addEventListener('click', () => updateCarousel(currentIndex + 1));

  if (indicators) {
    Array.from(indicators.children).forEach(dot => {
      dot.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        updateCarousel(index);
      });
    });
  }

  // Auto-play timer
  const autoPlay = setInterval(() => {
    // Only advance if track is still attached in DOM (prevents leaks when navigated away)
    if (document.getElementById('testimonials-track')) {
      updateCarousel(currentIndex + 1);
    } else {
      clearInterval(autoPlay);
    }
  }, 7000);
}

// Hero Image Slider Controls
function bindHeroSlider() {
  const track = document.getElementById('hero-slider-track');
  const dotsContainer = document.getElementById('hero-slider-dots');
  const prevBtn = document.getElementById('hero-slide-prev');
  const nextBtn = document.getElementById('hero-slide-next');
  if (!track) return;

  const slides = Array.from(track.children);
  const dots = dotsContainer ? Array.from(dotsContainer.children) : [];
  let currentIndex = 0;
  let slideInterval;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    currentIndex = index;
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    showSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  };

  const startAutoPlay = () => {
    stopAutoPlay();
    slideInterval = setInterval(nextSlide, 3500); // Auto-slide every 3.5 seconds
  };

  const stopAutoPlay = () => {
    if (slideInterval) clearInterval(slideInterval);
  };

  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevSlide();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextSlide();
      startAutoPlay();
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', (e) => {
      e.stopPropagation();
      showSlide(i);
      startAutoPlay();
    });
  });

  const sliderContainer = track.closest('.hero-slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', stopAutoPlay);
    sliderContainer.addEventListener('mouseleave', startAutoPlay);
  }

  startAutoPlay();
}
