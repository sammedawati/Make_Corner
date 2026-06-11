/* ==========================================================================
   Make Corner - Shop View (Rupees ₹ & Quantity Selectors Upgrade)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';
import { t } from '../i18n.js';

let activeCategory = 'All';
let currentSort = 'price-low'; // Options: price-low, price-high, name-az, name-za

const getSortLabel = (sortVal) => {
  return t(sortVal);
};

export default async function renderShop(container, query) {
  // Read category parameter from URL query if present (from home or footer category clicks)
  if (query && query.category) {
    activeCategory = query.category;
  } else {
    activeCategory = 'All'; // Reset on normal navigation
  }

  // Define Category stats
  const categories = [
    'All',
    'HDPE Pipes',
    'MDPE Pipes',
    'Electrofusion Fittings',
    'Moulded Fittings',
    'Fabricated Fittings',
    'Power Sprayers',
    'Knapsack Sprayers',
    'Battery Spray Pumps'
  ];

  const drawShopStructure = () => {
    const products = State.getProducts();

    // Get categories item count for premium count badges
    const getCount = (cat) => {
      if (cat === 'All') return products.length;
      return products.filter(p => p.category === cat).length;
    };

    container.innerHTML = `
      <section class="section-padding shop-section">
        <div class="container shop-container">
          <div class="shop-hero">
            <aside class="shop-filters-sidebar">
              <div class="glass-card">
                <h3 class="filter-group-title">${t('shop_categories_title')}</h3>
                <div class="category-select-wrapper" id="category-filter-dropdown">
                  <button class="category-filter-select" id="category-filter-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                    <span>${t(activeCategory)} (${getCount(activeCategory)})</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="category-options-list" id="category-filter-options" role="listbox">
                    ${categories.map(cat => `
                      <button class="category-option ${activeCategory === cat ? 'active' : ''}" type="button" role="option" aria-selected="${activeCategory === cat ? 'true' : 'false'}" data-category="${cat}">
                        <span>${t(cat)}</span>
                        <span class="category-count">${getCount(cat)}</span>
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            </aside>

            <div class="section-title-wrapper shop-title-wrapper">
              <span class="section-subtitle">${t('shop_subtitle')}</span>
              <h1 class="section-title">${t('shop_title')}</h1>
              <p class="section-desc">${t('shop_desc')}</p>
            </div>

            <!-- Repositioned Sort Dropdown -->
            <div class="shop-hero-sort">
              <div class="glass-card">
                <h3 class="filter-group-title">${t('shop_sort_title')}</h3>
                <div class="category-select-wrapper" id="sort-filter-dropdown">
                  <button class="category-filter-select" id="sort-filter-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
                    <span>${getSortLabel(currentSort)}</span>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </button>
                  <div class="category-options-list" id="sort-filter-options" role="listbox">
                    <button class="category-option ${currentSort === 'price-low' ? 'active' : ''}" type="button" role="option" aria-selected="${currentSort === 'price-low' ? 'true' : 'false'}" data-value="price-low">
                      ${t('price-low')}
                    </button>
                    <button class="category-option ${currentSort === 'price-high' ? 'active' : ''}" type="button" role="option" aria-selected="${currentSort === 'price-high' ? 'true' : 'false'}" data-value="price-high">
                      ${t('price-high')}
                    </button>
                    <button class="category-option ${currentSort === 'name-az' ? 'active' : ''}" type="button" role="option" aria-selected="${currentSort === 'name-az' ? 'true' : 'false'}" data-value="name-az">
                      ${t('name-az')}
                    </button>
                    <button class="category-option ${currentSort === 'name-za' ? 'active' : ''}" type="button" role="option" aria-selected="${currentSort === 'name-za' ? 'true' : 'false'}" data-value="name-za">
                      ${t('name-za')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="shop-layout">
            <!-- Products List Main Area -->
            <div class="shop-main-content">
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

    // 2. Sorting Logic
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
          <h3>${t('shop_no_results_title')}</h3>
          <p>${t('shop_no_results_desc')}</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(prod => renderShopProductCard(prod)).join('');
    bindProductCardActions(grid);
  };

  const bindControlListeners = () => {
    // Category dropdown trigger
    const categoryDropdown = document.getElementById('category-filter-dropdown');
    const categoryTrigger = document.getElementById('category-filter-trigger');
    const categoryOptions = document.getElementById('category-filter-options');
    if (categoryDropdown && categoryTrigger && categoryOptions) {
      const handleCategoryOutsideClick = (e) => {
        if (!categoryDropdown.contains(e.target)) {
          closeCategoryDropdown();
        }
      };

      const closeCategoryDropdown = () => {
        categoryDropdown.classList.remove('open');
        categoryTrigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', handleCategoryOutsideClick);
      };

      categoryTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !categoryDropdown.classList.contains('open');
        categoryDropdown.classList.toggle('open', willOpen);
        categoryTrigger.setAttribute('aria-expanded', String(willOpen));
        if (willOpen) {
          document.addEventListener('click', handleCategoryOutsideClick);
        } else {
          document.removeEventListener('click', handleCategoryOutsideClick);
        }
      });

      categoryOptions.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', (e) => {
          activeCategory = e.currentTarget.dataset.category;
          closeCategoryDropdown();
          drawShopStructure();
        });
      });

      categoryDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Sort dropdown trigger
    const sortDropdown = document.getElementById('sort-filter-dropdown');
    const sortTrigger = document.getElementById('sort-filter-trigger');
    const sortOptions = document.getElementById('sort-filter-options');
    if (sortDropdown && sortTrigger && sortOptions) {
      const handleSortOutsideClick = (e) => {
        if (!sortDropdown.contains(e.target)) {
          closeSortDropdown();
        }
      };

      const closeSortDropdown = () => {
        sortDropdown.classList.remove('open');
        sortTrigger.setAttribute('aria-expanded', 'false');
        document.removeEventListener('click', handleSortOutsideClick);
      };

      sortTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !sortDropdown.classList.contains('open');
        sortDropdown.classList.toggle('open', willOpen);
        sortTrigger.setAttribute('aria-expanded', String(willOpen));
        if (willOpen) {
          document.addEventListener('click', handleSortOutsideClick);
        } else {
          document.removeEventListener('click', handleSortOutsideClick);
        }
      });

      sortOptions.querySelectorAll('.category-option').forEach(option => {
        option.addEventListener('click', (e) => {
          currentSort = e.currentTarget.dataset.value;
          closeSortDropdown();
          drawShopStructure();
        });
      });

      sortDropdown.addEventListener('click', (e) => {
        e.stopPropagation();
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
      <div class="product-card" data-id="${product.id}" style="cursor: pointer;">
        <div class="product-card-img-container">
          ${imgTag}
        </div>
        <div class="product-card-content">
          <h3 class="product-card-title">${product.name}</h3>
          <p class="product-card-desc-snippet" title="${t(product.id + '_desc')}">${t(product.id + '_desc')}</p>
          <div class="product-card-specs">
            ${specsSnippet.map(([key, val]) => `<span class="spec-tag">${t(key)}: ${val}</span>`).join('')}
          </div>

          <div class="product-card-footer">
            <a href="#contact?product=${encodeURIComponent(product.name)}" class="btn btn-primary btn-card-add-primary" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none; padding: 8px 16px; font-size: 0.8rem; width: 100%;">
              ${t('btn_get_quote')}
            </a>
          </div>
        </div>
      </div>
    `;
  };

  const bindProductCardActions = (gridContainer) => {
    // Specs detail modal trigger on card click
    gridContainer.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Avoid launching modal when clicking buttons/links
        if (e.target.closest('a') || e.target.closest('button')) {
          return;
        }
        const id = card.dataset.id;
        const product = State.getProductById(id);
        if (product) {
          const categoryIcon = getCategoryIcon(product.category);
          const specsRows = Object.entries(product.specs)
            .map(([key, val]) => `<tr><td>${t(key)}</td><td>${val}</td></tr>`).join('');
            
          const detailImg = product.image 
            ? `<img src="${product.image}" alt="${product.name}">`
            : categoryIcon;

          Components.showModal(`
            <div class="product-detail-modal-layout">
              <div class="product-detail-img-wrapper">
                ${detailImg}
              </div>
              <div class="product-detail-info">
                <span class="product-detail-category">${t(product.category)}</span>
                <h2 class="product-detail-title">${product.name}</h2>
                <p class="product-detail-desc">${t(product.id + '_desc')}</p>
                
                <h4 style="margin-top: 12px; color: var(--color-primary);">${t('Technical Specifications')}</h4>
                <table class="product-detail-specs-table">
                  <tbody>
                    ${specsRows}
                    <tr><td>${t('Stock Status')}</td><td>${product.stock > 0 ? `${product.stock} ${t('units available')}` : `<span style="color: var(--color-error)">${t('Out of Stock')}</span>`}</td></tr>
                  </tbody>
                </table>

                <div class="product-detail-actions">
                  <a href="#contact?product=${encodeURIComponent(product.name)}" class="btn btn-primary" onclick="Components.hideModal()" style="display: inline-flex; align-items: center; justify-content: center; text-decoration: none;">
                    ${t('btn_get_quote')}
                  </a>
                  <button class="btn btn-secondary" onclick="Components.hideModal()">${t('btn_close')}</button>
                </div>
              </div>
            </div>
          `);
        }
      });
    });
  };

  // Run initial drawing
  drawShopStructure();
}
