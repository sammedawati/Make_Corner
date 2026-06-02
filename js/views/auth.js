/* ==========================================================================
   Make Corner - Authentication View (Sign In & Sign Up Tab Forms)
   ========================================================================== */

import { State } from '../state.js';
import { Components } from '../components.js';

let activeTab = 'signin'; // Options: signin, signup

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
            <!-- Tabs -->
            <div class="auth-tabs">
              <button class="auth-tab-btn ${activeTab === 'signin' ? 'active' : ''}" id="tab-btn-signin">Sign In</button>
              <button class="auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}" id="tab-btn-signup">Sign Up</button>
            </div>

            <!-- View Forms -->
            <div id="auth-forms-container">
              ${activeTab === 'signin' ? renderSignInForm() : renderSignUpForm()}
            </div>

            <div class="auth-footer" id="auth-tip-box">
              ${activeTab === 'signin' ?
        `<strong style="color: var(--color-accent)">Welcome to Make Corner</strong>` :
        `Standard customer accounts default to Farmer shop access.`
      }
            </div>
          </div>
        </div>
      </section>
    `;

    bindTabEvents();
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

  const renderSignUpForm = () => `
    <form id="signup-form" class="auth-form" novalidate>
      <div class="form-group">
        <label for="signup-username" class="form-label">Farmer / Business Name</label>
        <input type="text" id="signup-username" class="form-input" placeholder="e.g. John Farmer" required>
        <div class="form-error-msg" id="err-signup-user" style="display: none;">Name must be at least 3 characters.</div>
      </div>
      <div class="form-group">
        <label for="signup-email" class="form-label">Email Address</label>
        <input type="email" id="signup-email" class="form-input" placeholder="e.g. grower@gmail.com" required>
        <div class="form-error-msg" id="err-signup-email" style="display: none;">Enter a valid email address.</div>
      </div>
      <div class="form-group">
        <label for="signup-password" class="form-label">Password</label>
        <input type="password" id="signup-password" class="form-input" placeholder="Min 6 characters" required>
        <div class="form-error-msg" id="err-signup-pass" style="display: none;">Password must be at least 6 characters.</div>
      </div>
      <button type="submit" class="btn btn-primary btn-full-width" style="margin-top: 10px;">Create Account</button>
    </form>
  `;

  const bindTabEvents = () => {
    const btnSignin = document.getElementById('tab-btn-signin');
    const btnSignup = document.getElementById('tab-btn-signup');

    if (btnSignin) {
      btnSignin.addEventListener('click', () => {
        if (activeTab !== 'signin') {
          activeTab = 'signin';
          drawAuth();
        }
      });
    }

    if (btnSignup) {
      btnSignup.addEventListener('click', () => {
        if (activeTab !== 'signup') {
          activeTab = 'signup';
          drawAuth();
        }
      });
    }
  };

  const bindFormSubmitEvents = () => {
    // 1. Sign In Submit Handler
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

    // 2. Sign Up Submit Handler
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userInput = document.getElementById('signup-username');
        const emailInput = document.getElementById('signup-email');
        const passInput = document.getElementById('signup-password');

        const errUser = document.getElementById('err-signup-user');
        const errEmail = document.getElementById('err-signup-email');
        const errPass = document.getElementById('err-signup-pass');

        let isValid = true;

        // Username check
        if (!userInput.value || userInput.value.trim().length < 3) {
          userInput.classList.add('error');
          errUser.style.display = 'block';
          isValid = false;
        } else {
          userInput.classList.remove('error');
          errUser.style.display = 'none';
        }

        // Email check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value || !emailRegex.test(emailInput.value)) {
          emailInput.classList.add('error');
          errEmail.style.display = 'block';
          isValid = false;
        } else {
          emailInput.classList.remove('error');
          errEmail.style.display = 'none';
        }

        // Pass check
        if (!passInput.value || passInput.value.length < 6) {
          passInput.classList.add('error');
          errPass.style.display = 'block';
          isValid = false;
        } else {
          passInput.classList.remove('error');
          errPass.style.display = 'none';
        }

        if (isValid) {
          try {
            State.registerUser(userInput.value, emailInput.value, passInput.value);
            Components.showToast('Account successfully created! Please log in.', 'success');

            // Switch to sign in tab
            activeTab = 'signin';
            drawAuth();
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
