/* ==========================================================================
   Make Corner - Admin View (Rupees ₹ & Image Thumbnails Upgrade)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons, getCategoryIcon } from '../components.js';

let activeAdminTab = 'dashboard'; // Options: dashboard, products, orders, customers, events

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
              <button class="admin-nav-btn ${activeAdminTab === 'orders' ? 'active' : ''}" data-tab="orders">
                ${Icons.orders} Orders Ledger
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'customers' ? 'active' : ''}" data-tab="customers">
                ${Icons.users} Customers List
              </button>
              <button class="admin-nav-btn ${activeAdminTab === 'events' ? 'active' : ''}" data-tab="events">
                ${Icons.calendar} Marketing Events
              </button>
            </nav>

            <button class="btn btn-secondary btn-full-width admin-logout-btn" id="admin-sidebar-logout-btn">
              Sign Out
            </button>
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
    if (activeAdminTab === 'orders') drawOrdersTab(mainViewport);
    if (activeAdminTab === 'customers') drawCustomersTab(mainViewport);
    if (activeAdminTab === 'events') drawEventsTab(mainViewport);
  };

  // 1. Dashboard Overview Tab
  const drawDashboardTab = (viewport) => {
    const ordersList = State.getOrders();
    const productsCount = State.getProducts().length;
    const usersCount = State.getUsers().length;
    
    // Compute total sales revenue
    const totalSales = ordersList.reduce((acc, order) => acc + order.total, 0);
    const pendingOrders = ordersList.filter(o => o.status === 'pending').length;

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Overview Dashboard</h2>
      </div>

      <!-- Metrics Cards -->
      <div class="admin-stats-grid">
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.orders}</div>
          <div class="admin-stat-details">
            <h4>Total Sales</h4>
            <div class="admin-stat-value">₹${totalSales.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</div>
          </div>
        </div>
        <div class="admin-stat-card glass-card">
          <div class="admin-stat-icon">${Icons.check}</div>
          <div class="admin-stat-details">
            <h4>Active Orders</h4>
            <div class="admin-stat-value">${pendingOrders} Pending</div>
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
          <div class="admin-stat-icon">${Icons.powerSprayer}</div>
          <div class="admin-stat-details">
            <h4>Total Models</h4>
            <div class="admin-stat-value">${productsCount} Sprayers</div>
          </div>
        </div>
      </div>

      <!-- Recent Orders Section -->
      <div class="glass-card">
        <h3 style="color: var(--color-primary); margin-bottom: 20px;">Recent Purchases Log</h3>
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Grower Name</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${ordersList.slice(-5).reverse().map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>${o.customerName}</td>
                  <td>${o.date}</td>
                  <td style="font-weight: 700;">₹${o.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td><span class="badge-status ${o.status}">${o.status}</span></td>
                </tr>
              `).join('')}
              ${ordersList.length === 0 ? `<tr><td colspan="5" style="text-align: center; color: var(--color-text-muted);">No sales recorded yet.</td></tr>` : ''}
            </tbody>
          </table>
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
        <button class="btn btn-primary" id="admin-add-product-btn">
          ${Icons.plus} Add New Sprayer
        </button>
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
                      <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number" class="form-input admin-price-adjust-field" data-id="${p.id}" value="${p.price}" style="padding: 6px 10px; font-size: 0.85rem; width: 100px; text-align: right; font-weight: 700;" step="1">
                        <button class="btn-action btn-save-price" data-id="${p.id}" title="Save Price" style="background: rgba(25, 103, 62, 0.05); color: var(--color-primary);">
                          ${Icons.check}
                        </button>
                      </div>
                    </td>
                    <td>
                      <input type="number" class="form-input admin-stock-adjust-field" data-id="${p.id}" value="${p.stock}" style="padding: 6px 10px; font-size: 0.85rem; width: 70px; text-align: center;">
                    </td>
                    <td>
                      <div class="admin-actions-cell">
                        <button class="btn-action btn-delete-product" data-id="${p.id}" title="Delete Sprayer">
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
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal-overlay').classList.remove('open')">Cancel</button>
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

  // 3. Orders Ledger Tab (with Status Dropdowns)
  const drawOrdersTab = (viewport) => {
    const orders = State.getOrders();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Sales Orders Ledger</h2>
      </div>

      <div class="glass-card">
        <div class="admin-table-wrapper">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Farmer Name</th>
                <th>Purchase Date</th>
                <th>Items Ordered</th>
                <th>Total Value</th>
                <th>Dispatch Status</th>
              </tr>
            </thead>
            <tbody>
              ${orders.map(o => `
                <tr>
                  <td><strong>${o.id}</strong></td>
                  <td>
                    <div>${o.customerName}</div>
                    <div style="font-size: 0.75rem; color: var(--color-text-muted);">${o.customerEmail}</div>
                  </td>
                  <td>${o.date}</td>
                  <td>
                    <ul style="list-style: none; padding: 0; font-size: 0.8rem; color: var(--color-text-muted);">
                      ${o.items.map(item => `<li>${item.quantity}x ${item.name}</li>`).join('')}
                    </ul>
                  </td>
                  <td style="font-weight: 700;">₹${o.total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td>
                    <select class="form-select admin-order-status-select" data-id="${o.id}" aria-label="Change status for order ${o.id}" style="padding: 6px 10px; font-size: 0.8rem; background: var(--color-bg); width: 130px; box-shadow: none;">
                      <option value="pending" ${o.status === 'pending' ? 'selected' : ''}>Pending</option>
                      <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                      <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    </select>
                  </td>
                </tr>
              `).join('')}
              ${orders.length === 0 ? `<tr><td colspan="6" style="text-align: center; color: var(--color-text-muted);">No sales orders recorded yet.</td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // Bind order status selector modifications
    viewport.querySelectorAll('.admin-order-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const id = e.target.dataset.id;
        const newStatus = e.target.value;
        State.updateOrderStatus(id, newStatus);
        Components.showToast(`Order ${id} status set to ${newStatus}.`, 'success');
      });
    });
  };

  // 4. Customers List Tab
  const drawCustomersTab = (viewport) => {
    const users = State.getUsers();

    viewport.innerHTML = `
      <div class="admin-view-header">
        <h2 class="admin-view-title">Registered Customer Ledger</h2>
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
        <button class="btn btn-primary" id="admin-add-event-btn">
          ${Icons.plus} Schedule Event
        </button>
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
                      <button class="btn-action btn-delete-event" data-id="${ev.id}" title="Remove Event">
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
              <button type="button" class="btn btn-secondary" onclick="document.getElementById('modal-overlay').classList.remove('open')">Cancel</button>
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
