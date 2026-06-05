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
    image: "/images/power_sprayer.png",
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
    image: "/images/power_sprayer.png",
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
    image: "/images/power_sprayer.png",
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
    image: "/images/power_sprayer.png",
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
    image: "/images/power_sprayer.png",
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
    image: "/images/power_sprayer.png",
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
    image: "/images/knapsack_sprayer.png",
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
    image: "/images/knapsack_sprayer.png",
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
    image: "/images/knapsack_sprayer.png",
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
    image: "/images/battery_sprayer.png",
    specs: {
      "Battery Type": "12V 8Ah Sealed Lead-Acid",
      "Tank Capacity": "16 Liters",
      "Work Time": "4-6 Hours on single charge",
      "Pump Type": "12V Diaphragm Micro Pump",
      "Max Flow": "3.1 L/min"
    },
    description: "The Lu Shyoung LS-16E-3 is a battery-powered sprayer that eliminates manual pumping fatigue. It runs on a rechargeable 12V battery, operating quietly with an auto-cut pressure switch. Features adjustable pressure dial and multi-hole nozzle attachments.",
    badge: "Eco Pick"
  },
  {
    id: "prod-hdpe-agri-pipe",
    name: "HDPE Agri Pipe",
    category: "HDPE Pipes",
    price: 118.00,
    stock: 500,
    image: "/images/hdpe_pipe.avif",
    specs: {
      "Material": "PE100 high-density polyethylene",
      "Diameter Range": "32-110 mm",
      "Pressure Rating": "PN 6 to PN 12.5",
      "Supply Form": "Coil or straight length",
      "Application": "Irrigation and water transfer"
    },
    description: "Durable HDPE agricultural pipes designed for water supply, drip irrigation mains, borewell discharge, and farm distribution lines. UV-stabilized material and smooth inner walls help reduce friction loss and maintenance.",
    badge: "Irrigation Grade"
  },
  {
    id: "prod-mdpe-utility-pipe",
    name: "MDPE Utility Pipe",
    category: "MDPE Pipes",
    price: 96.00,
    stock: 420,
    image: "/images/mdpe_pipe.png",
    specs: {
      "Material": "Medium-density polyethylene",
      "Diameter Range": "20-90 mm",
      "Flexibility": "High bend tolerance",
      "Jointing": "Compression or fusion fittings",
      "Application": "Water and utility distribution"
    },
    description: "Flexible MDPE pipes for reliable underground and surface utility networks. The pipe body is easy to route around farm layouts and supports dependable flow for water distribution and service lines.",
    badge: "Flexible Line"
  },
  {
    id: "prod-electrofusion-coupler-kit",
    name: "Coupler 63mm to 400mm",
    category: "Electrofusion Fittings",
    price: 850.00,
    stock: 140,
    image: "/images/cupler.png",
    specs: {
      "Fitting Type": "Coupler",
      "Size Range": "63-400 mm",
      "Welding Type": "Electrofusion",
      "Compatibility": "HDPE and MDPE pipe systems",
      "Use Case": "Straight pipe jointing"
    },
    description: "Electrofusion couplers for joining HDPE and MDPE pipe runs with a permanent, leak-resistant welded connection. Available from 63mm to 400mm for irrigation mains and utility pipe networks.",
    badge: "Leak Tight"
  },
  {
    id: "prod-electrofusion-reducing-tee",
    name: "Reducing Tee 63mm to 315mm",
    category: "Electrofusion Fittings",
    price: 1250.00,
    stock: 85,
    image: "/images/electrofusion.png",
    specs: {
      "Fitting Type": "Reducing tee",
      "Size Range": "63-315 mm",
      "Reducing Sizes": "All reducing sizes",
      "Welding Type": "Electrofusion",
      "Application": "Branch line reduction"
    },
    description: "Electrofusion reducing tees for creating reduced branch connections from main HDPE or MDPE pipelines. Available in all reducing sizes from 63mm to 315mm for farm and utility distribution layouts.",
    badge: "All Sizes"
  },
  {
    id: "prod-electrofusion-equal-tee",
    name: "Equal Tee 63mm to 315mm",
    category: "Electrofusion Fittings",
    price: 1180.00,
    stock: 90,
    image: "/images/equal_tee.png",
    specs: {
      "Fitting Type": "Equal tee",
      "Size Range": "63-315 mm",
      "Branch Size": "Equal to main line",
      "Welding Type": "Electrofusion",
      "Application": "Three-way pipe branching"
    },
    description: "Equal tee electrofusion fittings for same-diameter branch connections in HDPE and MDPE pipe networks. Designed for secure three-way joints across irrigation, water supply, and utility systems.",
    badge: "Branch Joint"
  },
  {
    id: "prod-electrofusion-end-cap",
    name: "End Cap 63mm to 315mm",
    category: "Electrofusion Fittings",
    price: 520.00,
    stock: 130,
    image: "/images/end_cap.png",
    specs: {
      "Fitting Type": "End cap",
      "Size Range": "63-315 mm",
      "Welding Type": "Electrofusion",
      "Use Case": "Pipeline termination",
      "Compatibility": "HDPE and MDPE pipes"
    },
    description: "Electrofusion end caps for sealing pipeline ends during installation, expansion, or maintenance. Built for dependable pressure-holding performance in HDPE and MDPE systems.",
    badge: "Pipe Seal"
  },
  {
    id: "prod-electrofusion-reducers",
    name: "Reducers 63mm to 315mm",
    category: "Electrofusion Fittings",
    price: 780.00,
    stock: 110,
    image: "/images/reducers.png",
    specs: {
      "Fitting Type": "Reducer",
      "Size Range": "63-315 mm",
      "Purpose": "Diameter transition",
      "Welding Type": "Electrofusion",
      "Application": "Flow line size change"
    },
    description: "Electrofusion reducers for transitioning between pipe diameters without compromising joint quality. Suitable for irrigation distribution, pumping lines, and utility pipe networks.",
    badge: "Size Change"
  },
  {
    id: "prod-electrofusion-elbow-90",
    name: "Elbow",
    category: "Electrofusion Fittings",
    price: 980.00,
    stock: 95,
    image: "/images/elbow.png",
    specs: {
      "Fitting Type": "Elbow",
      "Size Range": "All",
      "Angle": "All",
      "Welding Type": "Electrofusion",
      "Application": "Right-angle pipe turns"
    },
    description: "90 degree electrofusion elbows for compact right-angle direction changes in HDPE and MDPE pipe layouts. Designed for strong welded turns in buried or surface installations.",
    badge: "90 Degree"
  },
  // {
  //   id: "prod-electrofusion-elbow-45",
  //   name: "45 Degree Elbow 63mm to 200mm",
  //   category: "Electrofusion Fittings",
  //   price: 720.00,
  //   stock: 100,
  //   image: "/images/elbow_45.svg",
  //   specs: {
  //     "Fitting Type": "45 degree elbow",
  //     "Size Range": "63-200 mm",
  //     "Angle": "45 degrees",
  //     "Welding Type": "Electrofusion",
  //     "Application": "Moderate pipe turns"
  //   },
  //   description: "45 degree electrofusion elbows for smoother pipe direction changes and reduced layout stress. Available from 63mm to 200mm for HDPE and MDPE systems.",
  //   badge: "45 Degree"
  // },
  // {
  //   id: "prod-electrofusion-elbow-225",
  //   name: "22.5 Degree Elbow 63mm to 200mm",
  //   category: "Electrofusion Fittings",
  //   price: 690.00,
  //   stock: 100,
  //   image: "/images/elbow_225.svg",
  //   specs: {
  //     "Fitting Type": "22.5 degree elbow",
  //     "Size Range": "63-200 mm",
  //     "Angle": "22.5 degrees",
  //     "Welding Type": "Electrofusion",
  //     "Application": "Fine alignment changes"
  //   },
  //   description: "22.5 degree electrofusion elbows for gentle alignment corrections in pipeline runs. Useful where the network needs a controlled bend without a sharp direction change.",
  //   badge: "22.5 Degree"
  // },
  {
    id: "prod-electrofusion-saddle",
    name: "Saddle 63mm to 315mm",
    category: "Electrofusion Fittings",
    price: 940.00,
    stock: 80,
    image: "/images/saddle.png",
    specs: {
      "Fitting Type": "Saddle",
      "Size Range": "63-315 mm",
      "Welding Type": "Electrofusion",
      "Use Case": "Branch outlet tapping",
      "Compatibility": "HDPE and MDPE pipes"
    },
    description: "Electrofusion saddles for creating branch outlets on main pipe runs with a secure welded interface. Suitable for irrigation zones, service take-offs, and utility tapping points.",
    badge: "Outlet Tap"
  },
  {
    id: "prod-moulded-hdpe-fittings",
    name: "Moulded HDPE Fittings",
    category: "Moulded Fittings",
    price: 420.00,
    stock: 220,
    image: "/images/moduled_hdpe.png",
    specs: {
      "Fitting Types": "Elbow, tee, reducer, end cap",
      "Material": "Injection moulded HDPE",
      "Size Range": "32-160 mm",
      "Pressure Rating": "PN 6 to PN 16",
      "Application": "Branching and direction changes"
    },
    description: "Factory moulded HDPE fittings for clean pipe routing, branch connections, and size transitions. Built for dimensional consistency and dependable pressure performance in agricultural piping systems.",
    badge: "Precision Fit"
  },
  {
    id: "prod-fabricated-pipe-fittings",
    name: "Fabricated Pipe Fittings",
    category: "Fabricated Fittings",
    price: 1650.00,
    stock: 75,
    image: "/images/fabricated_pipe.png",
    specs: {
      "Fitting Types": "Long bend, tee, manifold, custom spool",
      "Build": "Workshop fabricated HDPE",
      "Size Range": "110-315 mm",
      "Customization": "Project-specific angles and branches",
      "Application": "Large farm and industrial networks"
    },
    description: "Heavy-duty fabricated fittings for large irrigation layouts, manifolds, and custom pipe networks. Built to match site requirements where standard moulded fittings do not cover the needed angle, branch, or diameter.",
    badge: "Custom Build"
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

const INITIAL_ORDERS = [];

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

const INITIAL_ENQUIRIES = [
  {
    id: "enq-1",
    name: "Rajesh Kumar",
    email: "rajesh@agrifarm.in",
    phone: "+91 98765 43210",
    interest: "Lu Shyoung Power Sprayers",
    message: "Interested in LS-30 model. Do you ship to Maharashtra? Please provide a quote for 2 units.",
    date: "2026-06-02"
  },
  {
    id: "enq-2",
    name: "Amit Patel",
    email: "amit.patel@gujaratagri.org",
    phone: "+91 87654 32109",
    interest: "Battery Spray Pumps",
    message: "Can the LS-16E-3 battery pump spray chemical weedicides? How long is the battery warranty?",
    date: "2026-06-04"
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
let enquiries = getStorage("mc_enquiries", INITIAL_ENQUIRIES);
let currentUser = getStorage("mc_current_user", null);
let cart = getStorage("mc_cart", []);

const seedSyncProductIds = [
  "prod-hdpe-agri-pipe",
  "prod-mdpe-utility-pipe",
  "prod-electrofusion-coupler-kit",
  "prod-electrofusion-reducing-tee",
  "prod-electrofusion-equal-tee",
  "prod-electrofusion-end-cap",
  "prod-electrofusion-reducers",
  "prod-electrofusion-elbow-90",
  "prod-electrofusion-elbow-45",
  "prod-electrofusion-elbow-225",
  "prod-electrofusion-saddle",
  "prod-moulded-hdpe-fittings",
  "prod-fabricated-pipe-fittings"
];
// Filter out products that are defined in seedSyncProductIds but are no longer in INITIAL_PRODUCTS
products = products.filter(product => {
  if (seedSyncProductIds.includes(product.id)) {
    return INITIAL_PRODUCTS.some(seedProduct => seedProduct.id === product.id);
  }
  return true;
});

products = products.map(product => {
  if (!seedSyncProductIds.includes(product.id)) return product;
  return INITIAL_PRODUCTS.find(seedProduct => seedProduct.id === product.id) || product;
});

const missingSeedProducts = INITIAL_PRODUCTS.filter(seedProduct => (
  !products.some(product => product.id === seedProduct.id)
));

products = [...products, ...missingSeedProducts];
localStorage.setItem("mc_products", JSON.stringify(products));

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

  // Cart / Orders APIs retired in catalog mode
  getCart() {
    return [];
  },
  getOrders() {
    return [];
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
  },

  // Enquiries API
  getEnquiries() {
    return enquiries;
  },
  saveEnquiry(enquiry) {
    const existingIndex = enquiries.findIndex(e => e.id === enquiry.id);
    if (existingIndex > -1) {
      enquiries[existingIndex] = enquiry;
    } else {
      enquiries.push(enquiry);
    }
    setStorage("mc_enquiries", enquiries);
  },
  deleteEnquiry(id) {
    enquiries = enquiries.filter(e => e.id !== id);
    setStorage("mc_enquiries", enquiries);
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
    } catch (e) { }
  }
})();
