/* ==========================================================================
   Make Corner - Shop View (Rupees ₹ & Quantity Selectors Upgrade)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';

let activeCategory = 'All';
let searchKeyword = '';
let minPrice = '';
let maxPrice = '';
let currentSort = 'price-low'; // Options: price-low, price-high, name-az, name-za

export default async function renderShop(container, query) {
  // Read category parameter from URL query if present (from home or footer category clicks)
  if (query && query.category) {
    activeCategory = query.category;
  } else if (!query) {
    activeCategory = 'All'; // Reset on normal navigation
  }

  // Define Category stats
  const categories = ['All', 'Power Sprayers', 'Knapsack Sprayers', 'Battery Spray Pumps'];

  const drawShopStructure = () => {
    const products = State.getProducts();

    // Get categories item count for premium count badges
    const getCount = (cat) => {
      if (cat === 'All') return products.length;
      return products.filter(p => p.category === cat).length;
    };

    container.innerHTML = `
      <section class="section-padding">
        <div class="container">
          <div class="section-title-wrapper" style="margin-bottom: 40px;">
            <span class="section-subtitle">Store Catalog</span>
            <h1 class="section-title">Professional Spraying Solutions</h1>
            <p class="section-desc">Find premium high pressure, motorized backpack, and battery spray pumps with factory-backed support.</p>
          </div>

          <div class="shop-layout">
            <!-- Sidebar Filters -->
            <aside class="shop-filters-sidebar">
              <div class="glass-card">
                <h3 class="filter-group-title">Equipment Categories</h3>
                <ul class="category-filter-list">
                  ${categories.map(cat => `
                    <li>
                      <button class="category-filter-btn ${activeCategory === cat ? 'active' : ''}" data-category="${cat}">
                        <span>${cat}</span>
                        <span class="category-count">${getCount(cat)}</span>
                      </button>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <div class="glass-card">
                <h3 class="filter-group-title">Price Range (₹)</h3>
                <div class="price-range-container">
                  <div class="price-inputs">
                    <div class="price-input-wrapper">
                      <span>₹</span>
                      <input type="number" id="min-price-filter" class="price-field" placeholder="Min" value="${minPrice}">
                    </div>
                    <span style="color: var(--color-text-muted)">to</span>
                    <div class="price-input-wrapper">
                      <span>₹</span>
                      <input type="number" id="max-price-filter" class="price-field" placeholder="Max" value="${maxPrice}">
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Products List Main Area -->
            <div class="shop-main-content">
              <div class="shop-controls">
                <!-- Search -->
                <div class="shop-search-bar">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                  <input type="text" id="shop-search-input" class="shop-search-input" placeholder="Search sprayers, e.g. LS-30..." value="${searchKeyword}">
                </div>

                <!-- Sort Dropdown -->
                <select id="shop-sort-select" class="shop-sort-dropdown" aria-label="Sort products list">
                  <option value="price-low" ${currentSort === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-high" ${currentSort === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="name-az" ${currentSort === 'name-az' ? 'selected' : ''}>Alphabetical: A-Z</option>
                  <option value="name-za" ${currentSort === 'name-za' ? 'selected' : ''}>Alphabetical: Z-A</option>
                </select>
              </div>

              <!-- Product Grid -->
              <div class="shop-products-grid" id="shop-products-grid">
                <!-- Filled dynamically via drawProducts() -->
              </div>
            </div>
          </div>
        </div>
      </section>
    `;

    // Bind controls event listeners
    bindControlListeners();
    drawProducts();
  };

  const drawProducts = () => {
    const grid = document.getElementById('shop-products-grid');
    if (!grid) return;

    let filtered = State.getProducts();

    // 1. Category Filter
    if (activeCategory !== 'All') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // 2. Search Keyword Filter
    if (searchKeyword.trim() !== '') {
      const keyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(keyword) || 
        p.category.toLowerCase().includes(keyword) || 
        p.description.toLowerCase().includes(keyword)
      );
    }

    // 3. Price Filter
    if (minPrice !== '') {
      filtered = filtered.filter(p => p.price >= parseFloat(minPrice));
    }
    if (maxPrice !== '') {
      filtered = filtered.filter(p => p.price <= parseFloat(maxPrice));
    }

    // 4. Sorting Logic
    filtered.sort((a, b) => {
      if (currentSort === 'price-low') return a.price - b.price;
      if (currentSort === 'price-high') return b.price - a.price;
      if (currentSort === 'name-az') return a.name.localeCompare(b.name);
      if (currentSort === 'name-za') return b.name.localeCompare(a.name);
      return 0;
    });

    // Render Grid
    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="shop-no-results">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/><line x1="8" y1="12" x2="16" y2="12"/>
          </svg>
          <h3>No Equipment Found</h3>
          <p>We couldn't find any sprayers matching your criteria. Try adjusting your filters or search keywords.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => renderShopProductCard(prod)).join('');
    bindProductCardActions(grid);
  };

  const bindControlListeners = () => {
    // Category click triggers
    container.querySelectorAll('.category-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catBtn = e.currentTarget;
        activeCategory = catBtn.dataset.category;
        
        // Highlight active btn
        container.querySelectorAll('.category-filter-btn').forEach(b => b.classList.remove('active'));
        catBtn.classList.add('active');
        
        drawProducts();
      });
    });

    // Search query keyup
    const searchInput = document.getElementById('shop-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchKeyword = e.target.value;
        drawProducts();
      });
    }

    // Min & Max Price field triggers
    const minInput = document.getElementById('min-price-filter');
    const maxInput = document.getElementById('max-price-filter');

    if (minInput) {
      minInput.addEventListener('input', (e) => {
        minPrice = e.target.value;
        drawProducts();
      });
    }
    if (maxInput) {
      maxInput.addEventListener('input', (e) => {
        maxPrice = e.target.value;
        drawProducts();
      });
    }

    // Sort select change
    const sortSelect = document.getElementById('shop-sort-select');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        drawProducts();
      });
    }
  };

  const renderShopProductCard = (product) => {
    const categoryIcon = getCategoryIcon(product.category);
    const specsSnippet = Object.entries(product.specs).slice(0, 3);
    
    // Load generated image or use SVG fallback
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
              <button class="btn btn-secondary btn-shop-view-details" data-id="${product.id}" style="padding: 8px 16px; font-size: 0.8rem;">Specs</button>
              <button class="btn btn-primary btn-card-add-primary btn-shop-add-cart" data-id="${product.id}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const bindProductCardActions = (gridContainer) => {
    // Quantity controls on cards
    gridContainer.querySelectorAll('.card-dec-qty').forEach(btn => {
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

    gridContainer.querySelectorAll('.card-inc-qty').forEach(btn => {
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

    // Specs detail modal trigger
    gridContainer.querySelectorAll('.btn-shop-view-details').forEach(btn => {
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
              // Slide open drawer fast
              setTimeout(() => {
                Components.toggleCartDrawer(true);
              }, 100);
            });
          }
        }
      });
    });

    // Add to cart trigger (with custom selected quantity on card)
    gridContainer.querySelectorAll('.btn-shop-add-cart').forEach(btn => {
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
          
          // Reset card quantity input to 1
          if (input) input.value = 1;

          // Slide open the cart drawer instantly to show fast update speed!
          setTimeout(() => {
            Components.toggleCartDrawer(true);
          }, 100);
        }
      });
    });
  };

  // Run initial drawing
  drawShopStructure();
}
