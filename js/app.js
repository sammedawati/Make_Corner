/* ==========================================================================
   Make Corner - Main Application Glue Code & Bootstrap (Simplified)
   ========================================================================== */

import { initRouter } from './router.js';

// Bootstrap router listeners
document.addEventListener('DOMContentLoaded', () => {
  initRouter();
});
