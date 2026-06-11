/* ==========================================================================
   Make Corner - Authentication View (Sign In Only)
   ========================================================================== */

import { State } from '../state.js';
import { Components } from '../components.js';

export default async function renderAuth(container, query) {
  // If user is already logged in, redirect them home
  if (State.getCurrentUser()) {
    window.location.hash = '#home';
    return;
  }

  const drawAuth = () => {
    container.innerHTML = `
      <section class="section-padding">
        <div class="container">
          <div class="auth-wrapper glass-card">
            <!-- Sign In Header -->
            <div class="auth-tabs">
              <button class="auth-tab-btn active" id="tab-btn-signin">Sign In</button>
            </div>

            <!-- Sign In Form -->
            <div id="auth-forms-container">
              ${renderSignInForm()}
            </div>

            <div class="auth-footer" id="auth-tip-box">
              <strong style="color: var(--color-accent)">Welcome to Mech Corner</strong>
            </div>
          </div>
        </div>
      </section>
    `;

    bindFormSubmitEvents();
  };

  const renderSignInForm = () => `
    <form id="signin-form" class="auth-form" novalidate>
      <div class="form-group">
        <label for="signin-email" class="form-label">Email Address</label>
        <input type="email" id="signin-email" class="form-input" placeholder="e.g. farmer@gmail.com" required>
        <div class="form-error-msg" id="err-signin-email" style="display: none;">Enter a valid email address.</div>
      </div>
      <div class="form-group">
        <label for="signin-password" class="form-label">Password</label>
        <input type="password" id="signin-password" class="form-input" placeholder="••••••••" required>
        <div class="form-error-msg" id="err-signin-pass" style="display: none;">Password cannot be empty.</div>
      </div>
      <button type="submit" class="btn btn-primary btn-full-width" style="margin-top: 10px;">Sign In</button>
    </form>
  `;

  const bindFormSubmitEvents = () => {
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
      signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('signin-email');
        const passInput = document.getElementById('signin-password');
        const errEmail = document.getElementById('err-signin-email');
        const errPass = document.getElementById('err-signin-pass');

        let isValid = true;

        // Email Validate
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value || !emailRegex.test(emailInput.value)) {
          emailInput.classList.add('error');
          errEmail.style.display = 'block';
          isValid = false;
        } else {
          emailInput.classList.remove('error');
          errEmail.style.display = 'none';
        }

        // Pass Validate
        if (!passInput.value) {
          passInput.classList.add('error');
          errPass.style.display = 'block';
          isValid = false;
        } else {
          passInput.classList.remove('error');
          errPass.style.display = 'none';
        }

        if (isValid) {
          try {
            const user = State.loginUser(emailInput.value, passInput.value);
            Components.showToast(`Welcome back, ${user.username}!`, 'success');

            // Redirect based on role
            if (user.role === 'admin') {
              window.location.hash = '#admin';
            } else {
              window.location.hash = '#shop';
            }
          } catch (err) {
            Components.showToast(err.message, 'error');
          }
        }
      });
    }
  };

  // Run draw
  drawAuth();
}
