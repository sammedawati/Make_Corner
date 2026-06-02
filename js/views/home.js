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
          <div class="hero-image-container">
            <img src="images/power_sprayer.png" alt="Lu Shyoung LS-30 Plunger Pump on stand">
            <div class="hero-badge">
              <span class="hero-badge-number">45</span>
              <span class="hero-badge-text">Bar Max Working Pressure</span>
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
}

function renderFeaturedProductCard(product) {
  const categoryIcon = getCategoryIcon(product.category);
  const specsSnippet = Object.entries(product.specs).slice(0, 3);
  
  // Render generated image tags
  const imgTag = product.image 
    ? `<img src="${product.image}" alt="${product.name}">`
    : categoryIcon;

  return `
    <div class="product-card">
      <div class="product-card-img-container">
        ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
        ${imgTag}
      </div>
      <div class="product-card-content">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-desc-snippet" title="${product.description}">${product.description}</p>
        <div class="product-card-specs">
          ${specsSnippet.map(([key, val]) => `<span class="spec-tag">${key}: ${val}</span>`).join('')}
        </div>

        <!-- Quantity Selector Widget -->
        <div class="product-card-qty-wrapper">
          <span class="card-qty-label">Quantity:</span>
          <div class="card-qty-selector">
            <button class="qty-btn card-dec-qty" data-id="${product.id}">-</button>
            <input type="number" class="card-qty-input" id="qty-input-${product.id}" value="1" min="1" max="${product.stock}" readonly aria-label="Select quantity">
            <button class="qty-btn card-inc-qty" data-id="${product.id}">+</button>
          </div>
        </div>

        <div class="product-card-footer">
          <span class="product-card-price">₹${product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-secondary btn-view-details" data-id="${product.id}" style="padding: 8px 16px; font-size: 0.8rem;">Specs</button>
            <button class="btn btn-primary btn-card-add-primary btn-add-cart" data-id="${product.id}">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function bindFeaturedProductEvents(container) {
  // Quantity buttons events on cards
  container.querySelectorAll('.card-dec-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const input = document.getElementById(`qty-input-${id}`);
      if (input) {
        let val = parseInt(input.value);
        if (val > 1) {
          input.value = val - 1;
        }
      }
    });
  });

  container.querySelectorAll('.card-inc-qty').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      const input = document.getElementById(`qty-input-${id}`);
      const product = State.getProductById(id);
      if (input && product) {
        let val = parseInt(input.value);
        if (val < product.stock) {
          input.value = val + 1;
        } else {
          Components.showToast(`Cannot select more. Only ${product.stock} units in stock.`, 'warning');
        }
      }
    });
  });

  // Detail button handler
  container.querySelectorAll('.btn-view-details').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
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
              <span class="product-detail-price">₹${product.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              <p class="product-detail-desc">${product.description}</p>
              
              <h4 style="margin-top: 12px; color: var(--color-primary);">Technical Specifications</h4>
              <table class="product-detail-specs-table">
                <tbody>
                  ${specsRows}
                  <tr><td>Stock Status</td><td>${product.stock > 0 ? `${product.stock} units available` : `<span style="color: var(--color-error)">Out of Stock</span>`}</td></tr>
                </tbody>
              </table>

              <div class="product-detail-actions">
                <button class="btn btn-primary modal-add-to-cart-btn" data-id="${product.id}" ${product.stock === 0 ? 'disabled' : ''}>
                  Add to Cart
                </button>
                <button class="btn btn-secondary" onclick="document.getElementById('modal-overlay').classList.remove('open')">Close</button>
              </div>
            </div>
          </div>
        `);

        // Bind inner modal click
        const modalAddBtn = document.querySelector('.modal-add-to-cart-btn');
        if (modalAddBtn) {
          modalAddBtn.addEventListener('click', (ev) => {
            const prodId = ev.target.dataset.id;
            State.addToCart(prodId, 1);
            Components.showToast(`${product.name} added to cart!`, 'success');
            Components.hideModal();
            // Fast slide drawer open
            setTimeout(() => {
              Components.toggleCartDrawer(true);
            }, 100);
          });
        }
      }
    });
  });

  // Direct Cart addition button
  container.querySelectorAll('.btn-add-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const product = State.getProductById(id);
      const input = document.getElementById(`qty-input-${id}`);
      const qty = input ? parseInt(input.value) : 1;

      if (product) {
        if (product.stock <= 0) {
          Components.showToast('Sorry, this product is currently out of stock.', 'warning');
          return;
        }
        if (qty > product.stock) {
          Components.showToast(`Only ${product.stock} units available.`, 'warning');
          return;
        }
        State.addToCart(id, qty);
        Components.showToast(`${qty}x ${product.name} added to cart!`, 'success');
        
        // Reset card input qty to 1
        if (input) input.value = 1;

        // Slide open the cart drawer instantly to verify speed!
        setTimeout(() => {
          Components.toggleCartDrawer(true);
        }, 100);
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
