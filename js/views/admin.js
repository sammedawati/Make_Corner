/* ==========================================================================
   Make Corner - Admin View (Rupees ₹ & Image Thumbnails Upgrade)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';

let activeAdminTab = 'dashboard'; // Options: dashboard, products, orders, customers, events, enquiries

export default async function renderAdmin(container, query) {
  const currentUser = State.getCurrentUser();

  const drawAdminStructure = () => {
    container.innerHTML = `
      <section class="section-padding">
        <div class="container admin-layout">
          <!-- Sidebar Navigation -->
          <aside class="admin-sidebar glass-card">
            <div class="admin-user-profile">
              <div class="admin-avatar">
                ${currentUser ? currentUser.username.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <div class="admin-username">${currentUser ? currentUser.username : 'Administrator'}</div>
                <span class="admin-role-badge">System Admin</span>
              </div>
            </div>

            <nav class="admin-nav">
              <button class="admin-nav-btn ${activeAdminTab === 'dashboard' ? 'active' : ''}" data-tab="dashboard">
                ${Icons.dashboard} Overview
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'products' ? 'active' : ''}" data-tab="products">
                ${Icons.powerSprayer} Products Manager
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'customers' ? 'active' : ''}" data-tab="customers">
                ${Icons.users} Customers List
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'events' ? 'active' : ''}" data-tab="events">
                ${Icons.calendar} Marketing Events
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'enquiries' ? 'active' : ''}" data-tab="enquiries">
                ${Icons.mail} Customer Enquiries
              </button>
            </nav>

            <div class="admin-sidebar-footer">
              <a href="#home" class="admin-footer-btn back-store-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-btn-icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                <span>View Store</span>
              </a>
              <button class="admin-footer-btn logout-btn" id="admin-sidebar-logout-btn">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="footer-btn-icon"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                <span>Sign Out</span>
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

  // 1. Dashboard Overview Tab
  const drawDashboardTab = (viewport) => {
    const productsCount = State.getProducts().length;
    const usersCount = State.getUsers().length;
    const eventsCount = State.getEvents().length;
    const enquiriesCount = State.getEnquiries().length;

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Overview Dashboard</h2>
        <a href="#home" class="btn btn-secondary admin-mobile-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Store
        </a>
      </div>

      <!-- Metrics Cards -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.powerSprayer}</div>
          <div class="admin-stat-details">
            <h4>Total Models</h4>
            <div class="admin-stat-value">${productsCount} Sprayers</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.users}</div>
          <div class="admin-stat-details">
            <h4>Registered Farmers</h4>
            <div class="admin-stat-value">${usersCount} Accounts</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.calendar}</div>
          <div class="admin-stat-details">
            <h4>Scheduled Events</h4>
            <div class="admin-stat-value">${eventsCount} Scheduled</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.mail}</div>
          <div class="admin-stat-details">
            <h4>Active Enquiries</h4>
            <div class="admin-stat-value">${enquiriesCount} Inquiries</div>
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
        <h2 class="admin-view-title">Products Inventory Manager</h2>
        <div class="admin-view-header-actions" style="display: flex; gap: 8px; align-items: center;">
          <a href="#home" class="btn btn-secondary admin-mobile-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Store
          </a>
          <button class="btn btn-primary" id="admin-add-product-btn">
            ${Icons.plus} Add New Sprayer
          </button>
        </div>
      </div>

      <!-- Bulk Price Adjustment Card -->
      <div class="glass-card" style="margin-bottom: 24px;">
        <h3 style="font-size: 1.1rem; color: var(--color-primary); margin-bottom: 16px;">Bulk Price Adjustment</h3>
        <div class="admin-bulk-adjust-row">
          <div class="form-group" style="margin: 0; min-width: 200px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">Filter by Category</label>
            <select id="bulk-adjust-category" class="form-select" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;">
              <option value="all">All Categories</option>
              <option value="Power Sprayers">Power Sprayers</option>
              <option value="Knapsack Sprayers">Knapsack Sprayers</option>
              <option value="Battery Spray Pumps">Battery Spray Pumps</option>
            </select>
          </div>
          <div class="form-group" style="margin: 0; min-width: 180px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">Adjustment Type</label>
            <select id="bulk-adjust-type" class="form-select" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;">
              <option value="percent-inc">Increase by Percentage (%)</option>
              <option value="percent-dec">Decrease by Percentage (%)</option>
              <option value="fixed-inc">Increase by Fixed Amount (₹)</option>
              <option value="fixed-dec">Decrease by Fixed Amount (₹)</option>
            </select>
          </div>
          <div class="form-group" style="margin: 0; max-width: 120px;">
            <label class="form-label" style="font-size: 0.8rem; margin-bottom: 6px; display: block;">Value</label>
            <input type="number" id="bulk-adjust-value" class="form-input" placeholder="e.g. 5" style="height: 38px; padding: 0 12px; font-size: 0.85rem; border: 1px solid rgba(0,0,0,0.08); border-radius: 6px; width: 100%; background: #fff;" min="0">
          </div>
          <button class="btn btn-primary" id="btn-apply-bulk-price" style="height: 38px; padding: 0 20px; font-size: 0.85rem; border-radius: 8px;">
            Apply Adjustments
          </button>
        </div>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th style="width: 160px;">Price Adjust (₹)</th>
                <th>Stock Units</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="admin-products-table-body">
              ${products.map(p => {
                const imgThumb = p.image 
                  ? `<img src="${p.image}" alt="${p.name}">`
                  : getCategoryIcon(p.category);
                
                return `
                  <tr data-id="${p.id}">
                    <td>
                      <div class="admin-table-product-cell">
                        <div class="admin-table-product-icon">${imgThumb}</div>
                        <div>
                          <strong>${p.name}</strong>
                          ${p.badge ? `<span style="background: var(--color-accent); color: #fff; font-size: 0.65rem; font-weight: 700; padding: 2px 6px; border-radius: 20px; margin-left: 6px;">${p.badge}</span>` : ''}
                        </div>
                      </div>
                    </td>
                    <td>${p.category}</td>
                    <td>
                      <input type="number" class="form-input admin-price-adjust-field" data-id="${p.id}" value="${p.price}" style="padding: 6px 10px; font-size: 0.85rem; width: 110px; text-align: right; font-weight: 700;" step="1">
                    </td>
                    <td>
                      <input type="number" class="form-input admin-stock-adjust-field" data-id="${p.id}" value="${p.stock}" style="padding: 6px 10px; font-size: 0.85rem; width: 70px; text-align: center;">
                    </td>
                    <td>
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
          Components.showToast('Invalid price amount entered.', 'error');
          return;
        }
        if (isNaN(newStock) || newStock < 0) {
          Components.showToast('Invalid stock units entered.', 'error');
          return;
        }

        const product = State.getProductById(id);
        if (product) {
          product.price = newPrice;
          product.stock = newStock;
          State.saveProduct(product);
          Components.showToast(`Updated ${product.name} (Price: ₹${newPrice.toLocaleString('en-IN')}, Stock: ${newStock}).`, 'success');
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
          Components.showToast('Please enter a valid positive adjustment value.', 'error');
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
          Components.showToast(`Successfully adjusted price for ${affectedCount} product(s).`, 'success');
          drawProductsTab(viewport); // Refresh table
        } else {
          Components.showToast('No matching products found to update.', 'info');
        }
      });
    }

    // Bind delete sprayer
    viewport.querySelectorAll('.btn-delete-product').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        const product = State.getProductById(id);
        if (product && confirm(`Are you sure you want to remove ${product.name} from the catalog?`)) {
          State.deleteProduct(id);
          Components.showToast(`${product.name} removed from store catalog.`, 'info');
          drawProductsTab(viewport);
        }
      });
    });

    // Bind Add Product Overlay modal opener
    const addProductBtn = document.getElementById('admin-add-product-btn');
    if (addProductBtn) {
      addProductBtn.addEventListener('click', () => {
        Components.showModal(`
          <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 24px;">Add New Spraying Equipment</h2>
          <form id="admin-create-product-form" class="auth-form">
            <div class="form-grid-2">
              <div class="form-group">
                <label class="form-label">Sprayer Name *</label>
                <input type="text" id="new-prod-name" class="form-input" placeholder="e.g. Lu Shyoung LS-30N" required>
              </div>
              <div class="form-group">
                <label class="form-label">Category *</label>
                <select id="new-prod-category" class="form-select">
                  <option value="Power Sprayers">Power Sprayers</option>
                  <option value="Knapsack Sprayers">Knapsack Sprayers</option>
                  <option value="Battery Spray Pumps">Battery Spray Pumps</option>
                </select>
              </div>
            </div>

            <div class="form-grid-2" style="margin-top: 16px;">
              <div class="form-group">
                <label class="form-label">Retail Price (₹) *</label>
                <input type="number" id="new-prod-price" class="form-input" placeholder="28000" required>
              </div>
              <div class="form-group">
                <label class="form-label">Initial Stock *</label>
                <input type="number" id="new-prod-stock" class="form-input" placeholder="10" required>
              </div>
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">Specs: Flow Rate</label>
              <input type="text" id="new-prod-spec-flow" class="form-input" placeholder="e.g. 30 L/min">
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">Specs: Working Pressure</label>
              <input type="text" id="new-prod-spec-press" class="form-input" placeholder="e.g. 15-45 kgf/cm²">
            </div>

            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">Description *</label>
              <textarea id="new-prod-desc" class="form-textarea" rows="4" placeholder="Enter full specifications and suitability..." required></textarea>
            </div>

            <div style="display: flex; gap: 16px; margin-top: 24px;">
              <button type="submit" class="btn btn-primary">Create Product</button>
              <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">Cancel</button>
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
              Components.showToast('Please complete all required fields.', 'error');
              return;
            }

            // Assign matching generated category image
            let imagePath = "images/power_sprayer.png";
            if (category === "Knapsack Sprayers") imagePath = "images/knapsack_sprayer.png";
            if (category === "Battery Spray Pumps") imagePath = "images/battery_sprayer.png";

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
            Components.showToast(`Successfully added ${name} to store!`, 'success');
            Components.hideModal();
            drawProductsTab(viewport);
          });
        }
      });
    }
  };



  // 4. Customers List Tab
  const drawCustomersTab = (viewport) => {
    const users = State.getUsers();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Registered Customer Ledger</h2>
        <a href="#home" class="btn btn-secondary admin-mobile-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Store
        </a>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email Address</th>
                <th>Registered Date</th>
                <th>Account Role</th>
              </tr>
            </thead>
            <tbody>
              ${users.map(u => `
                <tr>
                  <td><strong>${u.username}</strong></td>
                  <td>${u.email}</td>
                  <td>${u.joinedDate || '2026-01-01'}</td>
                  <td>
                    <span style="background: ${u.role === 'admin' ? 'rgba(212,175,55,0.15)' : 'rgba(0,0,0,0.05)'}; 
                                 color: ${u.role === 'admin' ? 'var(--color-accent)' : 'var(--color-text-muted)'};
                                 padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase;">
                      ${u.role}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

  // 5. Marketing Events Tab
  const drawEventsTab = (viewport) => {
    const events = State.getEvents();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Marketing Events Manager</h2>
        <div class="admin-view-header-actions" style="display: flex; gap: 8px; align-items: center;">
          <a href="#home" class="btn btn-secondary admin-mobile-back-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            Back to Store
          </a>
          <button class="btn btn-primary" id="admin-add-event-btn">
            ${Icons.plus} Schedule Event
          </button>
        </div>
      </div>

      <div class="glass-card" style="margin-bottom: 32px;">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Event Title</th>
                <th>Scheduled Date</th>
                <th>Location / Outlet</th>
                <th>Short Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${events.map(ev => `
                <tr>
                  <td><strong>${ev.title}</strong></td>
                  <td>${ev.date}</td>
                  <td>${ev.location}</td>
                  <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${ev.description}</td>
                  <td>
                    <div class="admin-actions-cell">
                      <button class="btn-action btn-action-delete btn-delete-event" data-id="${ev.id}" title="Remove Event">
                        ${Icons.trash}
                      </button>
                    </div>
                  </td>
                </tr>
              `).join('')}
              ${events.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">No marketing events scheduled.</td></tr>` : ''}
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
        if (event && confirm(`Are you sure you want to delete ${event.title}?`)) {
          State.deleteEvent(id);
          Components.showToast(`${event.title} has been deleted.`, 'info');
          drawEventsTab(viewport);
        }
      });
    });

    // Bind Event add modal
    const addEventBtn = document.getElementById('admin-add-event-btn');
    if (addEventBtn) {
      addEventBtn.addEventListener('click', () => {
        Components.showModal(`
          <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 24px;">Schedule Marketing Event</h2>
          <form id="admin-create-event-form" class="auth-form">
            <div class="form-group">
              <label class="form-label">Event Title *</label>
              <input type="text" id="new-ev-title" class="form-input" placeholder="e.g. Agri-Showroom Live Demonstration" required>
            </div>
            <div class="form-grid-2" style="margin-top: 16px;">
              <div class="form-group">
                <label class="form-label">Scheduled Date *</label>
                <input type="date" id="new-ev-date" class="form-input" required>
              </div>
              <div class="form-group">
                <label class="form-label">Location / Hub *</label>
                <input type="text" id="new-ev-loc" class="form-input" placeholder="e.g. Hub Center / Virtual" required>
              </div>
            </div>
            <div class="form-group" style="margin-top: 16px;">
              <label class="form-label">Event Description *</label>
              <textarea id="new-ev-desc" class="form-textarea" rows="4" placeholder="Enter information about the exposition, training sessions, or product focus..." required></textarea>
            </div>

            <div style="display: flex; gap: 16px; margin-top: 24px;">
              <button type="submit" class="btn btn-primary">Publish Event</button>
              <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">Cancel</button>
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
              Components.showToast('All fields are required.', 'error');
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
            Components.showToast(`Published Event: ${title}.`, 'success');
            Components.hideModal();
            drawEventsTab(viewport);
          });
        }
      });
    }
  };

  // 6. Customer Enquiries Tab
  const drawEnquiriesTab = (viewport) => {
    const enquiries = State.getEnquiries();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Customer Enquiries & Leads</h2>
        <a href="#home" class="btn btn-secondary admin-mobile-back-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back to Store
        </a>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Contact Info</th>
                <th>Interest</th>
                <th>Message Snippet</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${enquiries.map(e => `
                <tr data-id="${e.id}">
                  <td><strong>${e.name}</strong></td>
                  <td>
                    <div style="font-size: 0.85rem; color: var(--color-text);">
                      <div>${e.email}</div>
                      <div style="color: var(--color-text-muted);">${e.phone}</div>
                    </div>
                  </td>
                  <td>
                    <span style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700;">
                      ${e.interest}
                    </span>
                  </td>
                  <td style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">
                    ${e.message}
                  </td>
                  <td>${e.date}</td>
                  <td>
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
              ${enquiries.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--color-text-muted);">No enquiries found.</td></tr>` : ''}
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
            <h2 style="font-family: var(--font-headings); color: var(--color-primary); margin-bottom: 16px;">Enquiry Details</h2>
            <div style="display: flex; flex-direction: column; gap: 16px; font-size: 0.95rem; line-height: 1.5; color: var(--color-text);">
              <div>
                <strong>From:</strong> ${enquiry.name}
              </div>
              <div class="enquiry-details-meta-grid">
                <div>
                  <strong>Email:</strong> <a href="mailto:${enquiry.email}" style="color: var(--color-accent); text-decoration: underline;">${enquiry.email}</a>
                </div>
                <div>
                  <strong>Phone:</strong> ${enquiry.phone}
                </div>
              </div>
              <div>
                <strong>Interest:</strong> <span style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700;">${enquiry.interest}</span>
              </div>
              <div>
                <strong>Received Date:</strong> ${enquiry.date}
              </div>
              <hr style="border: 0; border-top: 1px solid rgba(0,0,0,0.08); margin: 8px 0;">
              <div>
                <strong>Message:</strong>
                <p style="background: var(--color-bg); padding: 16px; border-radius: 8px; border: var(--glass-border); margin-top: 8px; white-space: pre-wrap; word-break: break-word;">${enquiry.message}</p>
              </div>
              <div class="enquiry-details-actions">
                <a href="mailto:${enquiry.email}?subject=Re: Make Corner Enquiry regarding ${encodeURIComponent(enquiry.interest)}" class="btn btn-primary">
                  ${Icons.mail} Reply by Email
                </a>
                <button type="button" class="btn btn-secondary" onclick="Components.hideModal()">Close</button>
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
        if (enquiry && confirm(`Are you sure you want to remove the enquiry from ${enquiry.name}?`)) {
          State.deleteEnquiry(id);
          Components.showToast(`Enquiry from ${enquiry.name} deleted.`, 'info');
          drawEnquiriesTab(viewport);
        }
      });
    });
  };

  // Bind sidebar button tab clicks
  const bindSidebarEvents = () => {
    container.querySelectorAll('.admin-nav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.dataset.tab;
        activeAdminTab = tab;

        // Reset highlight
        container.querySelectorAll('.admin-nav-btn').forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');

        drawActiveTab();
      });
    });

    const logoutBtn = document.getElementById('admin-sidebar-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        State.logoutUser();
        Components.showToast('Signed out of admin portal.', 'info');
        window.location.hash = '#home';
      });
    }
  };

  // Draw core structure and load the current tab viewport
  drawAdminStructure();
}
