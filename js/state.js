/* ==========================================================================
   Make Corner - State Management System (Rupees ₹ & Image Paths)
   ========================================================================== */

// Initial Seed Data with Indian Rupees pricing and custom generated image paths
const INITIAL_PRODUCTS = [
  {
    id: "prod-ls30",
    name: "Lu Shyoung LS-30",
    category: "Power Sprayers",
    price: 28500.00,
    stock: 12,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "30 L/min",
      "Working Pressure": "20-45 kgf/cm²",
      "Required Power": "2.0-3.0 HP",
      "Revolution": "800-1200 rpm",
      "Plunger Diameter": "30 mm"
    },
    description: "The Lu Shyoung LS-30 is a high-performance horizontal triple plunger pump designed for heavy-duty spraying applications. Featuring anti-corrosive stainless steel plungers and an iron pump body, it offers high durability, consistent pressure, and is ideal for large orchards, crop protection, and industrial cleaning.",
    badge: "Best Seller"
  },
  {
    id: "prod-ls22n",
    name: "Lu Shyoung LS-22N",
    category: "Power Sprayers",
    price: 21500.00,
    stock: 15,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "22 L/min",
      "Working Pressure": "15-35 kgf/cm²",
      "Required Power": "1.5-2.0 HP",
      "Revolution": "800-1000 rpm",
      "Plunger Diameter": "22 mm"
    },
    description: "Compact and highly efficient, the LS-22N is perfect for small to medium farms. It provides excellent pressure control with low power consumption. Made with precision ceramic-coated plungers to withstand abrasive agrochemicals.",
    badge: ""
  },
  {
    id: "prod-ls26a1",
    name: "Lu Shyoung LS-26A1",
    category: "Power Sprayers",
    price: 24800.00,
    stock: 8,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "26 L/min",
      "Working Pressure": "15-40 kgf/cm²",
      "Required Power": "2.0 HP",
      "Revolution": "800-1100 rpm",
      "Pressure Control": "Automatic Relief Valve"
    },
    description: "The LS-26A1 features an automatic pressure relief system that safety-bypasses flow when the spray gun is closed, preventing motor burnout and hose damage. Perfect for solo operations.",
    badge: "New Arrival"
  },
  {
    id: "prod-ls36a1",
    name: "Lu Shyoung LS-36A1",
    category: "Power Sprayers",
    price: 34200.00,
    stock: 5,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "36 L/min",
      "Working Pressure": "20-50 kgf/cm²",
      "Required Power": "3.0-4.0 HP",
      "Revolution": "800-1200 rpm",
      "Plunger Material": "Chrome Plated Stainless"
    },
    description: "Commercial grade power sprayer designed to run multiple spray guns simultaneously. Ideal for high canopy trees, extensive vineyards, and large agricultural fields.",
    badge: ""
  },
  {
    id: "prod-ls523",
    name: "Lu Shyoung LS-523",
    category: "Power Sprayers",
    price: 44500.00,
    stock: 4,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "45 L/min",
      "Working Pressure": "20-50 kgf/cm²",
      "Required Power": "5.0-6.0 HP",
      "Revolution": "900-1100 rpm",
      "Weight": "16.5 kg"
    },
    description: "High capacity, premium power sprayer featuring an integrated pressure control cylinder. Designed for high volume spraying, chemical dispersion, and dust suppression.",
    badge: "Premium"
  },
  {
    id: "prod-ls533f",
    name: "Lu Shyoung LS-533F",
    category: "Power Sprayers",
    price: 56000.00,
    stock: 3,
    image: "images/power_sprayer.png",
    specs: {
      "Flow Rate": "50 L/min",
      "Working Pressure": "20-60 kgf/cm²",
      "Required Power": "5.5-7.5 HP",
      "Base Mount": "Heavy steel frame",
      "Drive System": "Double Belt pulley"
    },
    description: "The flagship power sprayer model. The LS-533F is engineered for extreme agricultural environments, delivering up to 50 L/min at 60 kgf/cm². Highly recommended for commercial farm contractors.",
    badge: "Top Spec"
  },
  {
    id: "prod-ls93745",
    name: "Lu Shyoung LS-937-45",
    category: "Knapsack Sprayers",
    price: 14500.00,
    stock: 20,
    image: "images/knapsack_sprayer.png",
    specs: {
      "Engine Type": "2-Stroke Petrol Engine",
      "Tank Capacity": "20 Liters",
      "Fuel Tank": "0.6 Liters",
      "Pump Output": "8 L/min",
      "Pressure Range": "15-25 kgf/cm²"
    },
    description: "The LS-937-45 motorized knapsack sprayer provides back-portable mobility with a robust 2-stroke petrol engine. Features ergonomic padded shoulder straps, low vibration mounts, and an adjustable spray nozzle for uniform leaf coverage.",
    badge: "Popular"
  },
  {
    id: "prod-ls927",
    name: "Lu Shyoung LS-927",
    category: "Knapsack Sprayers",
    price: 17200.00,
    stock: 14,
    image: "images/knapsack_sprayer.png",
    specs: {
      "Engine Type": "4-Stroke Low Emission",
      "Tank Capacity": "25 Liters",
      "Fuel Type": "Unleaded Petrol (Separate oil)",
      "Pump Output": "8.5 L/min",
      "Dry Weight": "9.8 kg"
    },
    description: "Upgraded 4-stroke engine knapsack sprayer offering quiet operation, low emissions, and no fuel-oil mixing. The large 25-liter chemical tank allows longer operation times with comfortable posture pads.",
    badge: ""
  },
  {
    id: "prod-sm16",
    name: "SM-16 Samarat",
    category: "Knapsack Sprayers",
    price: 3200.00,
    stock: 45,
    image: "images/knapsack_sprayer.png",
    specs: {
      "Operation": "Manual Lever Pump",
      "Tank Capacity": "16 Liters",
      "Chamber Material": "High-Grade Polyethylene",
      "Lance Length": "60 cm",
      "Nozzle": "Brass adjustable"
    },
    description: "The SM-16 Samarat is a rugged, lightweight manual knapsack sprayer. Features a reversible left/right pump handle, heavy-duty pressure cylinder, and high-impact plastic tank built to last.",
    badge: "Budget Friendly"
  },
  {
    id: "prod-ls16e3",
    name: "Lu Shyoung LS-16E-3",
    category: "Battery Spray Pumps",
    price: 7800.00,
    stock: 30,
    image: "images/battery_sprayer.png",
    specs: {
      "Battery Type": "12V 8Ah Sealed Lead-Acid",
      "Tank Capacity": "16 Liters",
      "Work Time": "4-6 Hours on single charge",
      "Pump Type": "12V Diaphragm Micro Pump",
      "Max Flow": "3.1 L/min"
    },
    description: "The Lu Shyoung LS-16E-3 is a battery-powered sprayer that eliminates manual pumping fatigue. It runs on a rechargeable 12V battery, operating quietly with an auto-cut pressure switch. Features adjustable pressure dial and multi-hole nozzle attachments.",
    badge: "Eco Pick"
  }
];

const INITIAL_USERS = [
  {
    email: "admin@makecorner.com",
    password: "admin123",
    username: "Admin Manager",
    role: "admin",
    joinedDate: "2026-01-10"
  },
  {
    email: "farmer@gmail.com",
    password: "farmer123",
    username: "John Farmer",
    role: "customer",
    joinedDate: "2026-05-15"
  }
];

const INITIAL_ORDERS = [
  {
    id: "ord-1001",
    customerEmail: "farmer@gmail.com",
    customerName: "John Farmer",
    date: "2026-05-15",
    items: [
      {
        productId: "prod-ls30",
        name: "Lu Shyoung LS-30",
        price: 28500.00,
        quantity: 1
      }
    ],
    total: 28500.00,
    status: "delivered"
  },
  {
    id: "ord-1002",
    customerEmail: "farmer@gmail.com",
    customerName: "John Farmer",
    date: "2026-06-01",
    items: [
      {
        productId: "prod-ls16e3",
        name: "Lu Shyoung LS-16E-3",
        price: 7800.00,
        quantity: 2
      },
      {
        productId: "prod-sm16",
        name: "SM-16 Samarat",
        price: 3200.00,
        quantity: 1
      }
    ],
    total: 18800.00,
    status: "pending"
  }
];

const INITIAL_EVENTS = [
  {
    id: "ev-1",
    title: "Agri-Tech Expo 2026",
    date: "2026-07-10",
    location: "Hall A, Agricultural Convention Center",
    description: "Join us at our stall to view the complete lineup of Lu Shyoung LS-series heavy-duty power plunger sprayers. Live demonstrations and exclusive event-only discounts will be available.",
    badge: "Exhibition"
  },
  {
    id: "ev-2",
    title: "Sprayer Maintenance Workshop",
    date: "2026-06-25",
    location: "Make Corner Training Facility / Virtual Stream",
    description: "Learn how to clean plungers, replace pressure packings, and service 2-stroke engines. Perfect for maintaining peak efficiency and extending equipment life.",
    badge: "Training"
  }
];

// LocalStorage Helper
function getStorage(key, defaultValue) {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Error parsing localstorage key:", key, e);
    return defaultValue;
  }
}

function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
  notifyListeners();
}

// App State Holders
let products = getStorage("mc_products", INITIAL_PRODUCTS);
let users = getStorage("mc_users", INITIAL_USERS);
let orders = getStorage("mc_orders", INITIAL_ORDERS);
let events = getStorage("mc_events", INITIAL_EVENTS);
let currentUser = getStorage("mc_current_user", null);
let cart = getStorage("mc_cart", []);

// Callbacks Subscriptions
const changeListeners = [];

export function subscribe(callback) {
  changeListeners.push(callback);
}

export function unsubscribe(callback) {
  const index = changeListeners.indexOf(callback);
  if (index > -1) {
    changeListeners.splice(index, 1);
  }
}

function notifyListeners() {
  changeListeners.forEach(listener => {
    try {
      listener();
    } catch (err) {
      console.error("Error in state change listener", err);
    }
  });
}

// State Operations API
export const State = {
  // Products API
  getProducts() {
    return products;
  },
  getProductById(id) {
    return products.find(p => p.id === id);
  },
  saveProduct(product) {
    const existingIndex = products.findIndex(p => p.id === product.id);
    if (existingIndex > -1) {
      products[existingIndex] = product;
    } else {
      products.push(product);
    }
    setStorage("mc_products", products);
  },
  deleteProduct(id) {
    products = products.filter(p => p.id !== id);
    setStorage("mc_products", products);
  },
  adjustPrice(id, newPrice) {
    const product = products.find(p => p.id === id);
    if (product) {
      product.price = parseFloat(newPrice);
      setStorage("mc_products", products);
    }
  },

  // Users API
  getUsers() {
    return users;
  },
  registerUser(username, email, password) {
    const userExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (userExists) {
      throw new Error("A user with this email is already registered.");
    }
    const newUser = {
      username,
      email,
      password,
      role: "customer",
      joinedDate: new Date().toISOString().split('T')[0]
    };
    users.push(newUser);
    setStorage("mc_users", users);
    return newUser;
  },
  loginUser(email, password) {
    const matchedUser = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!matchedUser) {
      throw new Error("Invalid email or password.");
    }
    currentUser = matchedUser;
    setStorage("mc_current_user", currentUser);
    return currentUser;
  },
  logoutUser() {
    currentUser = null;
    cart = [];
    setStorage("mc_current_user", null);
    setStorage("mc_cart", []);
  },
  getCurrentUser() {
    return currentUser;
  },

  // Cart API
  getCart() {
    return cart;
  },
  addToCart(productId, qty = 1) {
    const product = this.getProductById(productId);
    if (!product) return;
    
    const cartItemIndex = cart.findIndex(item => item.productId === productId);
    if (cartItemIndex > -1) {
      cart[cartItemIndex].quantity += qty;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: qty
      });
    }
    setStorage("mc_cart", cart);
  },
  updateCartQty(productId, qty) {
    if (qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.quantity = qty;
      setStorage("mc_cart", cart);
    }
  },
  removeFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    setStorage("mc_cart", cart);
  },
  clearCart() {
    cart = [];
    setStorage("mc_cart", cart);
  },
  getCartSubtotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
  getCartCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
  },

  // Orders API
  getOrders() {
    return orders;
  },
  createOrder(shippingDetails, paymentDetails) {
    if (cart.length === 0) {
      throw new Error("Cannot checkout an empty cart.");
    }
    
    // Deduct stock
    cart.forEach(item => {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
      }
    });
    setStorage("mc_products", products);

    const activeUser = currentUser || { email: shippingDetails.email, username: shippingDetails.name };
    const newOrder = {
      id: "ord-" + Math.floor(1000 + Math.random() * 9000),
      customerEmail: activeUser.email,
      customerName: activeUser.username,
      shipping: shippingDetails,
      payment: paymentDetails,
      date: new Date().toISOString().split('T')[0],
      items: [...cart],
      total: this.getCartSubtotal(),
      status: "pending"
    };

    orders.push(newOrder);
    setStorage("mc_orders", orders);
    this.clearCart();
    return newOrder;
  },
  updateOrderStatus(orderId, status) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status;
      setStorage("mc_orders", orders);
    }
  },

  // Events API
  getEvents() {
    return events;
  },
  saveEvent(event) {
    const existingIndex = events.findIndex(e => e.id === event.id);
    if (existingIndex > -1) {
      events[existingIndex] = event;
    } else {
      events.push(event);
    }
    setStorage("mc_events", events);
  },
  deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    setStorage("mc_events", events);
  }
};

// Force clear localstorage keys to trigger pre-seed overrides with rupees and images
(function checkMigration() {
  const productsKey = "mc_products";
  const rawProducts = localStorage.getItem(productsKey);
  if (rawProducts) {
    try {
      const parsed = JSON.parse(rawProducts);
      // Migration check: if price is less than 1000, it's dollar. Clear local storage to reload rupees.
      if (parsed.length > 0 && parsed[0].price < 1000) {
        console.log("Migrating database currency from USD to INR...");
        localStorage.removeItem("mc_products");
        localStorage.removeItem("mc_orders");
        localStorage.removeItem("mc_cart");
        // Reload page to re-seed
        window.location.reload();
      }
    } catch(e){}
  }
})();
