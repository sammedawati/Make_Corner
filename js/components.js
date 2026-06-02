/* ==========================================================================
   Make Corner - Shared Components, Modals, Toasts, and SVGs (Rupees Upgrade)
   ========================================================================== */

import { State } from './state.js';

// SVG Icon Pack - Inline Vector rendering for instant load & custom colors
export const Icons = {
  powerSprayer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6M2 12h20"></path></svg>`,
  knapsack: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><path d="M9 9h6v6H9zM12 2v2M8 22h8"></path></svg>`,
  battery: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><rect x="2" y="7" width="16" height="12" rx="2" ry="2"></rect><path d="M6 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M22 11h-4M22 15h-4"></path></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`,
  trash: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>`,
  edit: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  dashboard: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`,
  users: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
  orders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`,
  calendar: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
  map: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon><line x1="9" y1="3" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="21"></line></svg>`,
  phone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
  mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
};

export const Components = {
  // Loading Screen Loader
  showLoader() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.remove('fade-out');
    }
  },
  hideLoader() {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('fade-out');
    }
  },

  // Toast Notifications System
  showToast(message, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    let iconSVG = Icons.info;
    if (type === 'success') iconSVG = Icons.check;
    if (type === 'error') iconSVG = Icons.alert;

    toast.innerHTML = `
      <div class="toast-icon">${iconSVG}</div>
      <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Trigger reflow for slide transition
    toast.offsetHeight;
    toast.classList.add('show');

    // Auto dispose toast
    setTimeout(() => {
      toast.classList.remove('show');
      toast.addEventListener('transitionend', () => {
        toast.remove();
      });
    }, duration);
  },

  // Modal Dialog UI
  showModal(contentHTML) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-content-body');
    if (!overlay || !body) return;

    body.innerHTML = contentHTML;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  },
  hideModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
    }
    document.body.style.overflow = '';
  },

  // Drawer Shopping Cart overlay
  toggleCartDrawer(open = true) {
    const overlay = document.getElementById('cart-drawer-overlay');
    if (!overlay) return;
    if (open) {
      this.updateCartDrawer();
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  },

  // Redraws the contents of the Cart Drawer overlay
  updateCartDrawer() {
    const cartItemsContainer = document.getElementById('cart-drawer-items');
    const badgeCount = document.getElementById('cart-badge-count');
    const itemsCount = document.getElementById('cart-items-count');
    const subtotalText = document.getElementById('cart-subtotal-price');

    if (!cartItemsContainer) return;

    const cart = State.getCart();
    const subtotal = State.getCartSubtotal();
    const count = State.getCartCount();

    // Update headers and badges
    if (badgeCount) badgeCount.textContent = count;
    if (itemsCount) itemsCount.textContent = count;
    if (subtotalText) subtotalText.textContent = `₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Render Items
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          ${Icons.cart}
          <p>Your agricultural cart is empty.</p>
          <a href="#shop" class="btn btn-secondary mt-2" id="cart-drawer-browse-btn">Browse Shop</a>
        </div>
      `;
      // Close drawer on click browse
      const browseBtn = document.getElementById('cart-drawer-browse-btn');
      if (browseBtn) {
        browseBtn.addEventListener('click', () => this.toggleCartDrawer(false));
      }
      return;
    }

    let itemsHTML = '';
    cart.forEach(item => {
      const prod = State.getProductById(item.productId);
      
      // Load generated image or use SVG fallback
      const iconOrImage = prod && prod.image 
        ? `<img src="${prod.image}" alt="${item.name}">`
        : getCategoryIcon(prod ? prod.category : '');
      
      itemsHTML += `
        <div class="cart-item" data-id="${item.productId}">
          <div class="cart-item-icon">
            ${iconOrImage}
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">₹${item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
            <div class="cart-item-qty-control">
              <button class="qty-btn dec-qty" data-id="${item.productId}">-</button>
              <span class="qty-val">${item.quantity}</span>
              <button class="qty-btn inc-qty" data-id="${item.productId}">+</button>
            </div>
          </div>
          <button class="cart-item-remove-btn" data-id="${item.productId}" aria-label="Remove item">
            ${Icons.trash}
          </button>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = itemsHTML;

    // Attach listeners dynamically
    cartItemsContainer.querySelectorAll('.dec-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const currentItem = cart.find(item => item.productId === id);
        if (currentItem) {
          State.updateCartQty(id, currentItem.quantity - 1);
        }
      });
    });

    cartItemsContainer.querySelectorAll('.inc-qty').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        const currentItem = cart.find(item => item.productId === id);
        const product = State.getProductById(id);
        if (currentItem && product) {
          if (currentItem.quantity >= product.stock) {
            this.showToast(`Cannot add more. Only ${product.stock} units available in stock.`, 'warning');
            return;
          }
          State.updateCartQty(id, currentItem.quantity + 1);
        }
      });
    });

    cartItemsContainer.querySelectorAll('.cart-item-remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.dataset.id;
        State.removeFromCart(id);
        this.showToast('Item removed from cart.', 'info');
      });
    });
  }
};

// Global helper to select matching category icon SVG
export function getCategoryIcon(category) {
  if (category === "Power Sprayers") return Icons.powerSprayer;
  if (category === "Knapsack Sprayers") return Icons.knapsack;
  if (category === "Battery Spray Pumps") return Icons.battery;
  return Icons.powerSprayer;
}

// Bind Global Modals and Drawer Handlers
document.addEventListener('DOMContentLoaded', () => {
  // Cart Drawer open/close triggers
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartCloseBtn = document.getElementById('cart-drawer-close-btn');
  const cartOverlay = document.getElementById('cart-drawer-overlay');

  if (cartToggleBtn) {
    cartToggleBtn.addEventListener('click', () => Components.toggleCartDrawer(true));
  }
  if (cartCloseBtn) {
    cartCloseBtn.addEventListener('click', () => Components.toggleCartDrawer(false));
  }
  if (cartOverlay) {
    cartOverlay.addEventListener('click', (e) => {
      if (e.target === cartOverlay) {
        Components.toggleCartDrawer(false);
      }
    });
  }

  // Modal close trigger
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => Components.hideModal());
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        Components.hideModal();
      }
    });
  }

  // Checkout trigger - Updated to redirect to #checkout page
  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = State.getCart();
      if (cart.length === 0) {
        Components.showToast('Your cart is empty. Add sprayers to checkout.', 'warning');
        return;
      }
      Components.toggleCartDrawer(false);
      window.location.hash = '#checkout';
    });
  }

  // Newsletter Form handler
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value) {
        Components.showToast(`Thank you for subscribing with ${emailInput.value}!`, 'success');
        emailInput.value = '';
      }
    });
  }

  // Mobile Menu navigation toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Global header shadow adjustments on scroll
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  // Keep cart drawer sync'd up
  State.subscribe(() => {
    Components.updateCartDrawer();
  });

  // Initial draw of drawer
  Components.updateCartDrawer();
});
