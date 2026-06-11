/* ==========================================================================
   Make Corner - Admin View (Rupees ₹ & Image Thumbnails Upgrade)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';
import { t } from '../i18n.js';

let activeAdminTab = 'dashboard'; // Options: dashboard, products, orders, customers, events, enquiries

export default async function renderAdmin(container, query) {
  const currentUser = State.getCurrentUser();
  const drawAdminStructure = () => {
    container.innerHTML = `
      <!-- Admin Mobile Header -->
      <div class="admin-mobile-header">
        <button id="admin-menu-toggle" class="admin-menu-toggle" aria-label="Toggle Navigation">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <span class="admin-mobile-brand">${t('admin_brand_mobile')}</span>
        <a href="#home" class="admin-mobile-back-store-btn" aria-label="Back to Store">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        </a>
      </div>

      <div class="admin-sidebar-backdrop" id="admin-sidebar-backdrop"></div>

      <section class="section-padding">
        <div class="container admin-layout">
          <!-- Sidebar Navigation -->
          <aside class="admin-sidebar glass-card" id="admin-sidebar">
            <div class="admin-user-profile">
              <div class="admin-avatar">
                ${currentUser ? currentUser.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <div class="admin-username">${currentUser ? currentUser.username : 'Administrator'}</div>
                <div style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                  <span class="admin-role-badge">${t('admin_role')}</span>
                  <select id="admin-lang-select" style="background: #fff; border: 1px solid rgba(0,0,0,0.12); border-radius: 4px; font-size: 0.7rem; padding: 1px 3px; cursor: pointer; color: var(--color-text); font-weight: 500;">
                    <option value="en" ${State.getLanguage() === 'en' ? 'selected' : ''}>EN</option>
                    <option value="mr" ${State.getLanguage() === 'mr' ? 'selected' : ''}>मराठी</option>
                    <option value="hi" ${State.getLanguage() === 'hi' ? 'selected' : ''}>हिंदी</option>
                  </select>
                </div>
              </div>
            </div>

            <nav class="admin-nav">
              <button class="admin-nav-btn ${activeAdminTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
                ${Icons.dashboard} ${t('admin_tab_overview')}
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'products' ? 'active' : ''}" data-tab="products">
                ${Icons.powerSprayer} ${t('admin_tab_products')}
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'customers' ? 'active' : ''}" data-tab="customers">
                ${Icons.users} ${t('admin_tab_customers')}
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'events' ? 'active' : ''}" data-tab="events">
                ${Icons.calendar} ${t('admin_tab_events')}
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'enquiries' ? 'active' : ''}" data-tab="enquiries">
                ${Icons.mail} ${t('admin_tab_enquiries')}
              </button>
            </nav>

            <div class="admin-sidebar-footer">
              <a href="#home" class="admin-footer-btn back-store-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-btn-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>${t('admin_view_store')}</span>
              </a>
              <button class="admin-footer-btn logout-btn" id="admin-sidebar-logout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-btn-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>${t('admin_sign_out')}</span>
              </button>
            </div>
          </aside>

          <!-- Main Viewport -->
          <div class="admin-main-viewport" id="admin-main-viewport">
            <!-- Content will be drawn dynamically based on active tab -->
          </div>
        </div>
      </section>
    `;

    bindSidebarEvents();
    drawActiveTab();
  };

  const drawActiveTab = () => {
    const mainViewport = document.getElementById('admin-main-viewport');
    if (!mainViewport) return;

    if (activeAdminTab === 'dashboard') drawDashboardTab(mainViewport);
    if (activeAdminTab === 'products') drawProductsTab(mainViewport);
    if (activeAdminTab === 'customers') drawCustomersTab(mainViewport);
    if (activeAdminTab === 'events') drawEventsTab(mainViewport);
    if (activeAdminTab === 'enquiries') drawEnquiriesTab(mainViewport);
  };

  const bindBackToDashboardEvent = (viewport) => {
    const btn = viewport.querySelector('.admin-back-dashboard-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        activeAdminTab = 'dashboard';
        // Highlight overview tab in sidebar
        const sidebarBtn = container.querySelector('.admin-nav-btn[data-tab="dashboard"]');
        if (sidebarBtn) {
          container.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
          sidebarBtn.classList.add('active');
        }
        drawActiveTab();
      });
    }
  };

  // 1. Dashboard Overview Tab
  const drawDashboardTab = (viewport) => {
    const productsCount = State.getProducts().length;
    const usersCount = State.getUsers().length;
    const eventsCount = State.getEvents().length;
    const enquiriesCount = State.getEnquiries().length;

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">${t('admin_dash_title')}</h2>
      </div>

      <!-- Metrics Cards -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.powerSprayer}</div>
          <div class="admin-stat-details">
            <h4>${t('admin_dash_models')}</h4>
            <div class="admin-stat-value">${productsCount} ${t('admin_suffix_sprayers')}</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.users}</div>
          <div class="admin-stat-details">
            <h4>${t('admin_dash_farmers')}</h4>
            <div class="admin-stat-value">${usersCount} ${t('admin_suffix_accounts')}</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.calendar}</div>
          <div class="admin-stat-details">
            <h4>${t('admin_dash_events')}</h4>
            <div class="admin-stat-value">${eventsCount} ${t('admin_suffix_scheduled')}</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.mail}</div>
          <div class="admin-stat-details">
            <h4>${t('admin_dash_enquiries')}</h4>
            <div class="admin-stat-value">${enquiriesCount} ${t('admin_suffix_inquiries')}</div>
          </div>
        </div>
      </div>
    `;
  };

  // 2. Products Tab (Inventory Manager with Pricing Adjustments & Thumbnail Previews)
  const drawProductsTab = (viewport) => {
    const products = State.getProducts();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">${t('admin_prod_title')}</h2>
        <div class="admin-view-header-actions" style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-secondary admin-back-dashboard-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            ${t('btn_back')}
          </button>
          <button class="btn btn-primary" id="admin-add-product-btn">
            ${Icons.plus} ${t('admin_prod_add')}
          </button>
        </div>
      </div>

      <!-- Bulk Price Adjustment Card -->
      <div class="glass-card" style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; color: var(--color-primary); margin-bottom: 16px;">${t('admin_prod_bulk_title')}</h3>
        <div class="admin-bulk-adjust-row">
          <div class="form-group" style="margin: 0; min-width: 200px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">${t('admin_prod_bulk_filter_cat')}</label>
            <select id="bulk-adjust-category" class="form-select" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;">
              <option value="all">${t('All')}</option>
              <option value="Power Sprayers">${t('Power Sprayers')}</option>
              <option value="Knapsack Sprayers">${t('Knapsack Sprayers')}</option>
              <option value="Battery Spray Pumps">${t('Battery Spray Pumps')}</option>
            </select>
          </div>
          <div class="form-group" style="margin: 0; min-width: 180px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">${t('admin_prod_bulk_adjust_type')}</label>
            <select id="bulk-adjust-type" class="form-select" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;">
              <option value="percent-inc">${t('percent-inc')}</option>
              <option value="percent-dec">${t('percent-dec')}</option>
              <option value="fixed-inc">${t('fixed-inc')}</option>
              <option value="fixed-dec">${t('fixed-dec')}</option>
            </select>
          </div>
          <div class="form-group" style="margin: 0; max-width: 120px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">${t('admin_prod_bulk_val')}</label>
            <input type="number" id="bulk-adjust-value" class="form-input" placeholder="e.g. 5" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;" min="0">
          </div>
          <button class="btn btn-primary" id="btn-apply-bulk-price" style="height: 38px; padding: 0 20px; font-size: 0.85rem; border-radius: 8px;">
            ${t('admin_prod_bulk_apply')}
          </button>
        </div>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${t('admin_prod_th_name')}</th>
                <th>${t('admin_prod_th_cat')}</th>
                <th style="width: 160px;">${t('admin_prod_th_price')}</th>
                <th>${t('admin_prod_th_stock')}</th>
                <th>${t('admin_prod_th_actions')}</th>
              </tr>
            </thead>
            <tbody id="admin-products-table-body">
              ${products.map(p => {
                const imgThumb = p.image 
                  ? `<img src="${p.image}" alt="${p.name}">`
                  : getCategoryIcon(p.category);
                
                return `
                  <tr data-id="${p.id}">
                    <td data-label="${t('admin_prod_th_name')}">
                      <div class="admin-table-product-cell">
                        <div class="admin-table-product-icon">${imgThumb}</div>
                        <div>
                          <strong>${p.name}</strong>
                          ${p.badge ? `<span style="background: var(--color-accent); color: #fff; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 20px; margin-left: 6px;">${t(p.badge) || p.badge}</span>` : ''}
                        </div>
                      </div>
                    </td>
                    <td data-label="${t('admin_prod_th_cat')}">${t(p.category) || p.category}</td>
                    <td data-label="${t('admin_prod_th_price')}">
                      <input type="number" class="form-input admin-price-adjust-field" data-id="${p.id}" value="${p.price}" style="padding: 6px 10px; font-size: 0.85rem; width: 110px; text-align: right; font-weight: 700;" step="1">
                    </td>
                    <td data-label="${t('admin_prod_th_stock')}">
                      <input type="number" class="form-input admin-stock-adjust-field" data-id="${p.id}" value="${p.stock}" style="padding: 6px 10px; font-size: 0.85rem; width: 70px; text-align: center;">
                    </td>
                    <td data-label="${t('admin_prod_th_actions')}">
                      <div class="admin-actions-cell">
                        <button class="btn-action btn-save-price" data-id="${p.id}" title="Save Changes" style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary);">
                          ${Icons.check}
                        </button>
                        <button class="btn-action btn-action-delete btn-delete-product" data-id="${p.id}" title="Delete Sprayer">
                          ${Icons.trash}
                        </button>
                      </div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind pricing adjustment actions
    viewport.querySelectorAll('.btn-save-price').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const row = e.currentTarget.closest('tr');
        const priceInput = row.querySelector('.admin-price-adjust-field');
        const stockInput = row.querySelector('.admin-stock-adjust-field');

        const newPrice = parseFloat(priceInput.value);
        const newStock = parseInt(stockInput.value);

        if (isNaN(newPrice) || newPrice <= 0) {
          Components.showToast(t('admin_prod_toast_price_err'), 'error');
          return;
        }
        if (isNaN(newStock) || newStock < 0) {
          Components.showToast(t('admin_prod_toast_stock_err'), 'error');
          return;
        }

        const product = State.getProductById(id);
        if (product) {
          product.price = newPrice;
          product.stock = newStock;
          State.saveProduct(product);
          Components.showToast(t('admin_prod_toast_update_success').replace('{name}', product.name).replace('{price}', newPrice.toLocaleString('en-IN')).replace('{stock}', newStock), 'success');
        }
      });
    });

    // Bind Bulk Price Adjustment Actions
    const btnApplyBulk = viewport.querySelector('#btn-apply-bulk-price');
    if (btnApplyBulk) {
      btnApplyBulk.addEventListener('click', () => {
        const catSelect = viewport.querySelector('#bulk-adjust-category').value;
        const typeSelect = viewport.querySelector('#bulk-adjust-type').value;
        const valInput = parseFloat(viewport.querySelector('#bulk-adjust-value').value);

        if (isNaN(valInput) || valInput <= 0) {
          Components.showToast(t('admin_prod_toast_bulk_val_err'), 'error');
          return;
        }

        const allProducts = State.getProducts();
        let affectedCount = 0;

        allProducts.forEach(p => {
          if (catSelect !== 'all' && p.category !== catSelect) {
            return;
          }

          let newPrice = p.price;
          if (typeSelect === 'percent-inc') {
            newPrice = p.price * (1 + valInput / 100);
          } else if (typeSelect === 'percent-dec') {
            newPrice = p.price * (1 - valInput / 100);
          } else if (typeSelect === 'fixed-inc') {
            newPrice = p.price + valInput;
          } else if (typeSelect === 'fixed-dec') {
            newPrice = p.price - valInput;
          }

          // Round to nearest Rupee
          newPrice = Math.max(0, Math.round(newPrice));
          
          if (newPrice !== p.price) {
            p.price = newPrice;
            State.saveProduct(p);
            affectedCount++;
          }
        });

        if (affectedCount > 0) {
          Components.showToast(t('admin_prod_toast_bulk_success').replace('{count}', affectedCount), 'success');
          drawProductsTab(viewport); // Refresh table
        } else {
          Components.showToast(t('admin_prod_toast_bulk_no_match'), 'info');
        }
      });
    }

    // Bind delete sprayer
    viewport.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const product = State.getProductById(id);
        if (product && confirm(t('admin_prod_confirm_delete').replace('{name}', product.name))) {
          State.deleteProduct(id);
          Components.showToast(t('admin_prod_toast_delete_success').replace('{name}', product.name), 'info');
          drawProductsTab(viewport);
        }
      });
    });

    // Bind Add Product Overlay modal opener
    const addProductBtn = document.getElementById('admin-add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', () => {
        Components.showModal(`
          <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 24px;">${t('admin_modal_add_title')}</h2>
          <form id="admin-create-product-form" class="auth-form">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">${t('admin_modal_add_name')}</label>
                <input type="text" id="new-prod-name" class="form-input" placeholder="e.g. Lu Shyoung LS-30N" required>
              </div>
              <div class="form-group">
                <label class="form-label">${t('admin_modal_add_cat')}</label>
                <select id="new-prod-category" class="form-select">
                  <option value="Power Sprayers">${t('Power Sprayers')}</option>
                  <option value="Knapsack Sprayers">${t('Knapsack Sprayers')}</option>
                  <option value="Battery Spray Pumps">${t('Battery Spray Pumps')}</option>
                </select>
              </div>
            </div>

            <div class="form-grid-2" style="margin-top: 16px;">
              <div class="form-group">
                <label class="form-label">${t('admin_modal_add_price')}</label>
                <input type="number" id="new-prod-price" class="form-input" placeholder="28000" required>
              </div>
              <div class="form-group">
                <label class="form-label">${t('admin_modal_add_stock')}</label>
                <input type="number" id="new-prod-stock" class="form-input" placeholder="10" required>
              </div>
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">${t('admin_modal_add_flow')}</label>
              <input type="text" id="new-prod-spec-flow" class="form-input" placeholder="e.g. 30 L/min">
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">${t('admin_modal_add_press')}</label>
              <input type="text" id="new-prod-spec-press" class="form-input" placeholder="e.g. 15-45 kgf/cm²">
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">${t('admin_modal_add_desc')}</label>
              <textarea id="new-prod-desc" class="form-textarea" rows="4" placeholder="Enter full specifications and suitability..." required></textarea>
            </div>

            <div style="display: flex; gap: 16px; margin-top: 24px;">
              <button type="submit" class="btn btn-primary">${t('admin_modal_add_btn_create')}</button>
              <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">${t('admin_modal_add_btn_cancel')}</button>
            </div>
          </form>
        `);

        // Bind form submit inside modal
        const form = document.getElementById('admin-create-product-form');
        if (form) {
          form.addEventListener('submit', (ev) => {
            ev.preventDefault();
            
            const name = document.getElementById('new-prod-name').value;
            const category = document.getElementById('new-prod-category').value;
            const price = parseFloat(document.getElementById('new-prod-price').value);
            const stock = parseInt(document.getElementById('new-prod-stock').value);
            const flow = document.getElementById('new-prod-spec-flow').value;
            const press = document.getElementById('new-prod-spec-press').value;
            const desc = document.getElementById('new-prod-desc').value;

            if (!name || isNaN(price) || isNaN(stock) || !desc) {
              Components.showToast(t('admin_modal_add_toast_incomplete'), 'error');
              return;
            }

            // Assign matching generated category image
            let imagePath = "/images/power_sprayer.png";
            if (category === "Knapsack Sprayers") imagePath = "/images/knapsack_sprayer.png";
            if (category === "Battery Spray Pumps") imagePath = "/images/battery_sprayer.png";

            const newProduct = {
              id: "prod-" + Date.now(),
              name,
              category,
              price,
              stock,
              image: imagePath,
              specs: {
                "Flow Rate": flow || "N/A",
                "Working Pressure": press || "N/A"
              },
              description: desc,
              badge: "New"
            };

            State.saveProduct(newProduct);
            Components.showToast(t('admin_modal_add_toast_success').replace('{name}', name), 'success');
            Components.hideModal();
            drawProductsTab(viewport);
          });
        }
      });
    }
    bindBackToDashboardEvent(viewport);
  };

  // 4. Customers List Tab
  const drawCustomersTab = (viewport) => {
    const users = State.getUsers();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">${t('admin_cust_title')}</h2>
        <button class="btn btn-secondary admin-back-dashboard-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          ${t('btn_back')}
        </button>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${t('admin_cust_th_username')}</th>
                <th>${t('admin_cust_th_email')}</th>
                <th>${t('admin_cust_th_date')}</th>
                <th>${t('admin_cust_th_role')}</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td data-label="${t('admin_cust_th_username')}"><strong>${u.username}</strong></td>
                  <td data-label="${t('admin_cust_th_email')}">${u.email}</td>
                  <td data-label="${t('admin_cust_th_date')}">${u.joinedDate || '2026-01-01'}</td>
                  <td data-label="${t('admin_cust_th_role')}">
                    <span style="background: ${u.role === 'admin' ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.05)'}; 
                                 color: ${u.role === 'admin' ? 'var(--color-accent)' : 'var(--color-text-muted)'};
                                 padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                      ${u.role === 'admin' ? t('admin_role') : u.role}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
    bindBackToDashboardEvent(viewport);
  };

  // 5. Marketing Events Tab
  const drawEventsTab = (viewport) => {
    const events = State.getEvents();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">${t('admin_ev_title')}</h2>
        <div class="admin-view-header-actions" style="display: flex; gap: 8px; align-items: center;">
          <button class="btn btn-secondary admin-back-dashboard-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            ${t('btn_back')}
          </button>
          <button class="btn btn-primary" id="admin-add-event-btn">
            ${Icons.plus} ${t('admin_ev_btn_schedule')}
          </button>
        </div>
      </div>

      <div class="glass-card" style="margin-bottom: 32px;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${t('admin_ev_th_title')}</th>
                <th>${t('admin_ev_th_date')}</th>
                <th>${t('admin_ev_th_loc')}</th>
                <th>${t('admin_ev_th_desc')}</th>
                <th>${t('admin_prod_th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${events.map(ev => `
                <tr>
                  <td data-label="${t('admin_ev_th_title')}"><strong>${ev.title}</strong></td>
                  <td data-label="${t('admin_ev_th_date')}">${ev.date}</td>
                  <td data-label="${t('admin_ev_th_loc')}">${ev.location}</td>
                  <td data-label="${t('admin_ev_th_desc')}" style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${ev.description}</td>
                  <td data-label="${t('admin_prod_th_actions')}">
                    <div class="admin-actions-cell">
                      <button class="btn-action btn-action-delete btn-delete-event" data-id="${ev.id}" title="Remove Event">
                        ${Icons.trash}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${events.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">${t('admin_ev_empty')}</td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind Event deletion
    viewport.querySelectorAll('.btn-delete-event').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const event = events.find(ev => ev.id === id);
        if (event && confirm(t('admin_ev_confirm_delete').replace('{title}', event.title))) {
          State.deleteEvent(id);
          Components.showToast(t('admin_ev_toast_delete_success').replace('{title}', event.title), 'info');
          drawEventsTab(viewport);
        }
      });
    });

    // Bind Event add modal
    const addEventBtn = document.getElementById('admin-add-event-btn');
    if (addEventBtn) {
      addEventBtn.addEventListener('click', () => {
        Components.showModal(`
          <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 24px;">${t('admin_modal_ev_title')}</h2>
          <form id="admin-create-event-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">${t('admin_modal_ev_name')}</label>
              <input type="text" id="new-ev-title" class="form-input" placeholder="e.g. Agri-Showroom Live Demonstration" required>
            </div>
            <div class="form-grid-2" style="margin-top: 16px;">
              <div class="form-group">
                <label class="form-label">${t('admin_modal_ev_date')}</label>
                <input type="date" id="new-ev-date" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">${t('admin_modal_ev_loc')}</label>
                <input type="text" id="new-ev-loc" class="form-input" placeholder="e.g. Hub Center / Virtual" required>
              </div>
            </div>
            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">${t('admin_modal_ev_desc')}</label>
              <textarea id="new-ev-desc" class="form-textarea" rows="4" placeholder="Enter information about the exposition, training sessions, or product focus..." required></textarea>
            </div>

            <div style="display: flex; gap: 16px; margin-top: 24px;">
              <button type="submit" class="btn btn-primary">${t('admin_modal_ev_btn_publish')}</button>
              <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">${t('admin_modal_add_btn_cancel')}</button>
            </div>
          </form>
        `);

        const form = document.getElementById('admin-create-event-form');
        if (form) {
          form.addEventListener('submit', (ev) => {
            ev.preventDefault();

            const title = document.getElementById('new-ev-title').value;
            const date = document.getElementById('new-ev-date').value;
            const location = document.getElementById('new-ev-loc').value;
            const description = document.getElementById('new-ev-desc').value;

            if (!title || !date || !location || !description) {
              Components.showToast(t('admin_modal_ev_toast_incomplete'), 'error');
              return;
            }

            const newEvent = {
              id: "ev-" + Date.now(),
              title,
              date,
              location,
              description,
              badge: "Promo"
            };

            State.saveEvent(newEvent);
            Components.showToast(t('admin_modal_ev_toast_success').replace('{title}', title), 'success');
            Components.hideModal();
            drawEventsTab(viewport);
          });
        }
      });
    }
    bindBackToDashboardEvent(viewport);
  };

  // 6. Customer Enquiries Tab
  const drawEnquiriesTab = (viewport) => {
    const enquiries = State.getEnquiries();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">${t('admin_enq_title')}</h2>
        <button class="btn btn-secondary admin-back-dashboard-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          ${t('btn_back')}
        </button>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>${t('admin_enq_th_name')}</th>
                <th>${t('admin_enq_th_contact')}</th>
                <th>${t('admin_enq_th_interest')}</th>
                <th>${t('admin_enq_th_msg')}</th>
                <th>${t('admin_enq_th_date')}</th>
                <th>${t('admin_prod_th_actions')}</th>
              </tr>
            </thead>
            <tbody>
              ${enquiries.map(e => `
                <tr data-id="${e.id}">
                  <td data-label="${t('admin_enq_th_name')}"><strong>${e.name}</strong></td>
                  <td data-label="${t('admin_enq_th_contact')}">
                    <div style="font-size: 0.85rem; color: var(--color-text);">
                      <div>${e.email}</div>
                      <div style="color: var(--color-text-muted);">${e.phone}</div>
                    </div>
                  </td>
                  <td data-label="${t('admin_enq_th_interest')}">
                    <span style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">
                      ${t(e.interest) || e.interest}
                    </span>
                  </td>
                  <td data-label="${t('admin_enq_th_msg')}" style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    ${e.message}
                  </td>
                  <td data-label="${t('admin_enq_th_date')}">${e.date}</td>
                  <td data-label="${t('admin_prod_th_actions')}">
                    <div class="admin-actions-cell">
                      <button class="btn-action btn-view-enquiry" data-id="${e.id}" title="View Full Message" style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary);">
                        ${Icons.info}
                      </button>
                      <button class="btn-action btn-action-delete btn-delete-enquiry" data-id="${e.id}" title="Delete Enquiry">
                        ${Icons.trash}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${enquiries.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--color-text-muted);">${t('admin_enq_empty')}</td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind view details action
    viewport.querySelectorAll('.btn-view-enquiry').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id = ev.currentTarget.dataset.id;
        const enquiry = enquiries.find(e => e.id === id);
        if (enquiry) {
          Components.showModal(`
            <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 16px;">${t('admin_modal_enq_title')}</h2>
            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.95rem; line-height: 1.5; color: var(--color-text);">
              <div>
                <strong>${t('admin_modal_enq_from')}</strong> ${enquiry.name}
              </div>
              <div class="enquiry-details-meta-grid">
                <div>
                  <strong>${t('admin_modal_enq_email')}</strong> <a href="mailto:${enquiry.email}" style="color: var(--color-accent); text-decoration: underline;">${enquiry.email}</a>
                </div>
                <div>
                  <strong>${t('admin_modal_enq_phone')}</strong> ${enquiry.phone}
                </div>
              </div>
              <div>
                <strong>${t('admin_modal_enq_interest')}</strong> <span style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">${t(enquiry.interest) || enquiry.interest}</span>
              </div>
              <div>
                <strong>${t('admin_modal_enq_date')}</strong> ${enquiry.date}
              </div>
              <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.08); margin: 8px 0;">
              <div>
                <strong>${t('admin_modal_enq_msg')}</strong>
                <p style="background: var(--color-bg); padding: 16px; border-radius: 8px; border: var(--glass-border); margin-top: 8px; white-space: pre-wrap; word-break: break-word;">${enquiry.message}</p>
              </div>
              <div class="enquiry-details-actions">
                <a href="mailto:${enquiry.email}?subject=Re: Mech Corner Enquiry regarding ${encodeURIComponent(t(enquiry.interest) || enquiry.interest)}" class="btn btn-primary">
                  ${Icons.mail} ${t('admin_modal_enq_btn_reply')}
                </a>
                <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">${t('btn_close')}</button>
              </div>
            </div>
          `);
        }
      });
    });

    // Bind delete action
    viewport.querySelectorAll('.btn-delete-enquiry').forEach(btn => {
      btn.addEventListener('click', (ev) => {
        const id = ev.currentTarget.dataset.id;
        const enquiry = enquiries.find(e => e.id === id);
        if (enquiry && confirm(t('admin_enq_confirm_delete').replace('{name}', enquiry.name))) {
          State.deleteEnquiry(id);
          Components.showToast(t('admin_enq_toast_delete_success').replace('{name}', enquiry.name), 'info');
          drawEnquiriesTab(viewport);
        }
      });
    });
    bindBackToDashboardEvent(viewport);
  };

  // Bind sidebar button tab clicks
  const bindSidebarEvents = () => {
    const menuToggle = document.getElementById('admin-menu-toggle');
    const sidebar = document.getElementById('admin-sidebar');
    const backdrop = document.getElementById('admin-sidebar-backdrop');

    const toggleMenu = (open) => {
      if (sidebar && backdrop) {
        sidebar.classList.toggle('open', open);
        backdrop.classList.toggle('open', open);
      }
    };

    if (menuToggle) {
      menuToggle.addEventListener('click', () => toggleMenu(true));
    }
    if (backdrop) {
      backdrop.addEventListener('click', () => toggleMenu(false));
    }

    container.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        activeAdminTab = tab;

        // Reset highlight
        container.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        toggleMenu(false);
        drawActiveTab();
      });
    });

    // Language switcher handler in sidebar
    const adminLangSelect = document.getElementById('admin-lang-select');
    if (adminLangSelect) {
      adminLangSelect.addEventListener('change', (e) => {
        const newLang = e.target.value;
        State.setLanguage(newLang);
        
        // Update global language select dropdown in outer app view (header)
        const globalLangSelect = document.getElementById('lang-select');
        if (globalLangSelect) {
          globalLangSelect.value = newLang;
        }
        
        // Re-render admin dashboard immediately
        drawAdminStructure();
      });
    }

    const logoutBtn = document.getElementById('admin-sidebar-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        toggleMenu(false);
        State.logoutUser();
        Components.showToast(t('admin_toast_signout'), 'info');
        window.location.hash = '#home';
      });
    }
  };

  // Draw core structure and load the current tab viewport
  drawAdminStructure();
}
