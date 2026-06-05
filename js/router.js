/* ==========================================================================
   Make Corner - Single Page Application Router (Checkout Addition)
   ========================================================================== */

import { State } from './state.js';
import { Components } from './components.js';
import renderHome from './views/home.js';
import renderAbout from './views/about.js';
import renderShop from './views/shop.js';
import renderContact from './views/contact.js';
import renderAuth from './views/auth.js';
import renderAdmin from './views/admin.js';

// Route Handlers Container
const routes = {
  '#home': renderHome,
  '#about': renderAbout,
  '#shop': renderShop,
  '#contact': renderContact,
  '#auth': renderAuth,
  '#admin': renderAdmin
};

const LAST_ROUTE_KEY = 'mc_last_route';

// Register a view renderer for a path
export function registerRoute(path, renderFunction) {
  routes[path] = renderFunction;
}

// Router main driver
export async function navigate() {
  const { path, query, fullRoute } = parseHash();
  const viewport = document.getElementById('app-viewport');
  
  if (!viewport) return;

  // Show loading indicator briefly for premium transition feel
  Components.showLoader();

  // Authentication guards
  const currentUser = State.getCurrentUser();
  if (path === '#admin') {
    if (!currentUser || currentUser.role !== 'admin') {
      Components.showToast('Access denied. Administrator privileges required.', 'error');
      window.location.hash = '#auth';
      Components.hideLoader();
      return;
    }
  }



  // Toggle body class for styling admin panel layout
  if (path === '#admin') {
    document.body.classList.add('admin-mode');
  } else {
    document.body.classList.remove('admin-mode');
  }

  // Fallback to home if route not found
  const routeExists = Boolean(routes[path]);
  const activePath = routeExists ? path : '#home';
  const renderer = routes[activePath];
  
  try {
    // Render the view
    if (renderer) {
      await renderer(viewport, query);
      rememberRoute(routeExists ? fullRoute : '#home');
    } else {
      viewport.innerHTML = `<div class="container section-padding text-center"><h2>Page Not Found</h2><p>The page you are looking for does not exist.</p><a href="#home" class="btn btn-primary mt-4">Return Home</a></div>`;
    }
    
    // Update Header Navigation Active State
    updateActiveNavLink(activePath);
    
    // Smooth scroll to top on routing
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // SEO optimization: update page titles
    updateSEO(activePath);
  } catch (error) {
    console.error("Routing error:", error);
    viewport.innerHTML = `<div class="container section-padding text-center"><h2>Execution Error</h2><p>Failed to render this section. Check console logs.</p></div>`;
  } finally {
    // Hide loading screen after render completes
    setTimeout(() => {
      Components.hideLoader();
    }, 300);
  }
}

// Helper to parse URL hashes and queries (e.g. #shop?category=Power Sprayers)
function parseHash() {
  const hash = getInitialRoute();
  const [pathWithHash, queryString] = hash.split('?');
  const routeExists = Boolean(routes[pathWithHash]);
  const path = routeExists ? pathWithHash : '#home';
  const fullRoute = routeExists ? hash : '#home';
  const query = {};

  if (queryString) {
    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key) {
        query[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });
  }

  return { path, query, fullRoute };
}

function getInitialRoute() {
  if (window.location.hash && window.location.hash !== '#') {
    return window.location.hash;
  }

  const pathRoute = `#${window.location.pathname.replace(/^\/+|\/+$/g, '')}`;
  if (routes[pathRoute]) {
    return pathRoute;
  }

  try {
    const savedRoute = localStorage.getItem(LAST_ROUTE_KEY);
    if (savedRoute) return savedRoute;
  } catch (error) {
    console.warn('Unable to restore last route:', error);
  }

  return '#home';
}

function rememberRoute(route) {
  if (!route || route === '#logout') return;

  try {
    localStorage.setItem(LAST_ROUTE_KEY, route);
  } catch (error) {
    console.warn('Unable to save current route:', error);
  }
}

// Update Active Link highlight in header
function updateActiveNavLink(currentPath) {
  // Reset all nav links
  document.querySelectorAll('.nav-menu .nav-link').forEach(link => {
    link.classList.remove('active');
  });

  // Highlight specific page link
  const linkIdMap = {
    '#home': 'nav-link-home',
    '#shop': 'nav-link-shop',
    '#about': 'nav-link-about',
    '#contact': 'nav-link-contact',
    '#auth': 'nav-link-auth',
    '#admin': 'floating-admin-btn'
  };

  const activeLinkId = linkIdMap[currentPath];
  if (activeLinkId) {
    const activeLink = document.getElementById(activeLinkId);
    if (activeLink) activeLink.classList.add('active');
  }

  // Update dynamic Authentication Link in Navbar based on login state
  const authLink = document.getElementById('nav-link-auth');
  const adminLink = document.getElementById('floating-admin-btn');
  const currentUser = State.getCurrentUser();

  if (authLink) {
    if (currentUser) {
      authLink.textContent = `Sign Out (${currentUser.username})`;
      authLink.href = '#logout'; // Handled via global event listener
    } else {
      authLink.textContent = 'Sign In';
      authLink.href = '#auth';
    }
  }

  if (adminLink) {
    if (currentUser && currentUser.role === 'admin') {
      adminLink.classList.remove('hidden');
    } else {
      adminLink.classList.add('hidden');
    }
  }
}

// Update Page Title and Meta description for SEO
function updateSEO(path) {
  const seoDetails = {
    '#home': {
      title: 'Make Corner | Premium Agricultural Spraying Solutions',
      description: 'Discover agricultural sprayers from Make Corner: power sprayers, knapsack sprayers, and battery spray pumps.'
    },
    '#shop': {
      title: 'Shop Agricultural Sprayers & Equipment | Make Corner',
      description: 'Explore the Lu Shyoung LS series. High quality power sprayers, manual knapsack sprayers, and 12V battery pumps.'
    },
    '#about': {
      title: 'Our Story & Team | Make Corner Agricultural Equipment',
      description: 'Learn about Make Corner, our mission to support local farmers, and our line of high efficiency spray equipment.'
    },
    '#contact': {
      title: 'Contact Us | Make Corner Customer Support',
      description: 'Get in touch with agricultural spraying experts. Access our address, simulated map, and quick support forms.'
    },
    '#auth': {
      title: 'Sign In / Sign Up | Make Corner Storefront',
      description: 'Access your Make Corner user portal to manage purchases and browse catalog products.'
    },
    '#admin': {
      title: 'System Admin Panel | Make Corner',
      description: 'Management portal for Make Corner catalog pricing, product inventory, and customer sales order ledgers.'
    }
  };

  const seo = seoDetails[path] || seoDetails['#home'];
  document.title = seo.title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', seo.description);
  }
}

// Router Initializer
export function initRouter() {
  window.addEventListener('hashchange', navigate);
  
  // Custom hash handler for sign out
  window.addEventListener('click', (e) => {
    const target = e.target.closest('a');
    if (target && target.getAttribute('href') === '#logout') {
      e.preventDefault();
      State.logoutUser();
      Components.showToast('You have successfully signed out.', 'success');
      window.location.hash = '#home';
    }
  });

  restoreRouteHash();

  // Run navigation immediately for current landing hash
  navigate();
}

function restoreRouteHash() {
  if (window.location.hash && window.location.hash !== '#') return;

  try {
    const savedRoute = localStorage.getItem(LAST_ROUTE_KEY);
    if (savedRoute && savedRoute !== '#home' && savedRoute !== '#logout') {
      window.location.hash = savedRoute;
    }
  } catch (error) {
    console.warn('Unable to restore saved route hash:', error);
  }
}
