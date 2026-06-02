/* ==========================================================================
   Make Corner - Checkout Page View (Invoices & Payment Selectors)
   ========================================================================== */

import { State } from '../state.js';
import { Components, Icons } from '../components.js';

let selectedPaymentMethod = 'upi'; // Options: upi, card, cod

export default async function renderCheckout(container, query) {
  const cart = State.getCart();
  const subtotal = State.getCartSubtotal();
  const shipping = subtotal > 15000 ? 0 : 350; // Free shipping over ₹15,000
  const total = subtotal + shipping;

  const drawCheckout = () => {
    container.innerHTML = `
      <section class="section-padding">
        <div class="container">
          <div class="section-title-wrapper" style="margin-bottom: 40px; text-align: left;">
            <span class="section-subtitle">Secure Dispatch</span>
            <h1 class="section-title" style="margin-bottom: 8px;">Order Checkout</h1>
            <p style="color: var(--color-text-muted);">Please review your items, enter delivery details, and select a payment method.</p>
          </div>

          <div class="checkout-layout">
            <!-- Left Side: Shipping & Payments Forms -->
            <div class="glass-card" style="display: flex; flex-direction: column; gap: 32px;">
              
              <!-- Shipping Address Segment -->
              <div>
                <h3 class="checkout-section-title">1. Delivery Address</h3>
                <form id="checkout-shipping-form" class="auth-form" style="gap: 16px;">
                  <div class="form-grid-2">
                    <div class="form-group">
                      <label class="form-label">Full Name *</label>
                      <input type="text" id="chk-shipping-name" class="form-input" placeholder="e.g. Ramesh Kumar" required>
                      <div class="form-error-msg" id="err-chk-name" style="display: none;">Name is required (min 3 characters).</div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Phone Number *</label>
                      <input type="tel" id="chk-shipping-phone" class="form-input" placeholder="e.g. 9876543210" required>
                      <div class="form-error-msg" id="err-chk-phone" style="display: none;">Enter a valid 10-digit phone number.</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Email Address *</label>
                    <input type="email" id="chk-shipping-email" class="form-input" placeholder="e.g. ramesh@farm.com" required>
                    <div class="form-error-msg" id="err-chk-email" style="display: none;">Enter a valid email address.</div>
                  </div>

                  <div class="form-group">
                    <label class="form-label">Address Line 1 (Street/Village) *</label>
                    <input type="text" id="chk-shipping-addr" class="form-input" placeholder="House No, Street, Village Name" required>
                    <div class="form-error-msg" id="err-chk-addr" style="display: none;">Address details are required.</div>
                  </div>

                  <div class="form-grid-2">
                    <div class="form-group">
                      <label class="form-label">City *</label>
                      <input type="text" id="chk-shipping-city" class="form-input" placeholder="e.g. Nagpur" required>
                      <div class="form-error-msg" id="err-chk-city" style="display: none;">City is required.</div>
                    </div>
                    <div class="form-group">
                      <label class="form-label">State *</label>
                      <input type="text" id="chk-shipping-state" class="form-input" placeholder="e.g. Maharashtra" required>
                      <div class="form-error-msg" id="err-chk-state" style="display: none;">State is required.</div>
                    </div>
                  </div>

                  <div class="form-group" style="width: 50%;">
                    <label class="form-label">PIN Code *</label>
                    <input type="text" id="chk-shipping-pin" class="form-input" placeholder="e.g. 440001" maxlength="6" required>
                    <div class="form-error-msg" id="err-chk-pin" style="display: none;">Enter a valid 6-digit PIN code.</div>
                  </div>
                </form>
              </div>

              <!-- Payment Method Segment -->
              <div>
                <h3 class="checkout-section-title">2. Payment Method</h3>
                <div class="payment-methods-list">
                  <!-- UPI Option -->
                  <div class="payment-method-card ${selectedPaymentMethod === 'upi' ? 'selected' : ''}" data-method="upi">
                    <input type="radio" name="pay-method" id="pay-upi" value="upi" ${selectedPaymentMethod === 'upi' ? 'checked' : ''}>
                    <div class="payment-method-details">
                      <label for="pay-upi" style="font-weight: 700; cursor: pointer;">UPI / Google Pay / PhonePe</label>
                      <p>Instant transfer using any UPI application.</p>
                    </div>
                  </div>

                  <!-- Card Option -->
                  <div class="payment-method-card ${selectedPaymentMethod === 'card' ? 'selected' : ''}" data-method="card">
                    <input type="radio" name="pay-method" id="pay-card" value="card" ${selectedPaymentMethod === 'card' ? 'checked' : ''}>
                    <div class="payment-method-details">
                      <label for="pay-card" style="font-weight: 700; cursor: pointer;">Credit or Debit Card</label>
                      <p>Secure payment via Visa, Mastercard, or RuPay cards.</p>
                    </div>
                  </div>

                  <!-- COD Option -->
                  <div class="payment-method-card ${selectedPaymentMethod === 'cod' ? 'selected' : ''}" data-method="cod">
                    <input type="radio" name="pay-method" id="pay-cod" value="cod" ${selectedPaymentMethod === 'cod' ? 'checked' : ''}>
                    <div class="payment-method-details">
                      <label for="pay-cod" style="font-weight: 700; cursor: pointer;">Cash on Delivery (COD)</label>
                      <p>Pay cash when equipment is delivered at your farm.</p>
                    </div>
                  </div>
                </div>

                <!-- Dynamic Payment Inputs Container -->
                <div class="payment-details-input-box" id="checkout-payment-details-box">
                  ${renderPaymentInputBox()}
                </div>
              </div>

            </div>

            <!-- Right Side: Order Summary Card -->
            <div class="glass-card checkout-summary-card">
              <h3 style="color: var(--color-primary); font-size: 1.4rem; margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 12px;">Order Summary</h3>
              
              <!-- Items list -->
              <div class="checkout-items-list">
                ${cart.map(item => `
                  <div class="checkout-summary-item">
                    <span>${item.quantity}x ${item.name}</span>
                    <span style="font-weight: 700; color: var(--color-primary);">₹${(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                  </div>
                `).join('')}
              </div>

              <!-- Price breakdown -->
              <div class="checkout-summary-row">
                <span style="color: var(--color-text-muted)">Subtotal:</span>
                <span style="font-weight: 600;">₹${subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div class="checkout-summary-row">
                <span style="color: var(--color-text-muted)">Shipping Charges:</span>
                <span style="font-weight: 600;">${shipping === 0 ? '<span style="color: var(--color-success)">FREE</span>' : `₹${shipping.toFixed(2)}`}</span>
              </div>
              
              <div class="checkout-summary-row total">
                <span>Grand Total:</span>
                <span>₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>

              <button class="btn btn-primary btn-full-width" id="checkout-place-order-btn" style="margin-top: 24px; font-size: 1.05rem; padding: 14px 28px;">
                Confirm & Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
    `;

    bindCheckoutEvents();
  };

  const renderPaymentInputBox = () => {
    if (selectedPaymentMethod === 'upi') {
      return `
        <div class="form-group">
          <label class="form-label">UPI ID *</label>
          <input type="text" id="pay-input-upi-id" class="form-input" placeholder="e.g. grower@ybl" required>
          <div class="form-error-msg" id="err-chk-upi" style="display: none;">Please enter a valid UPI address (e.g. user@bank).</div>
        </div>
      `;
    }
    if (selectedPaymentMethod === 'card') {
      return `
        <div class="form-group">
          <label class="form-label">Cardholder Name *</label>
          <input type="text" id="pay-input-card-name" class="form-input" placeholder="e.g. Ramesh Kumar" required>
          <div class="form-error-msg" id="err-chk-card-name" style="display: none;">Name on card is required.</div>
        </div>
        <div class="form-group" style="margin-top: 12px;">
          <label class="form-label">Card Number *</label>
          <input type="text" id="pay-input-card-num" class="form-input" placeholder="1234 5678 9101 1121" maxlength="19" required>
          <div class="form-error-msg" id="err-chk-card-num" style="display: none;">Enter a valid 16-digit card number.</div>
        </div>
        <div class="form-grid-2" style="margin-top: 12px;">
          <div class="form-group">
            <label class="form-label">Expiry (MM/YY) *</label>
            <input type="text" id="pay-input-card-exp" class="form-input" placeholder="MM/YY" maxlength="5" required>
            <div class="form-error-msg" id="err-chk-card-exp" style="display: none;">Enter format MM/YY.</div>
          </div>
          <div class="form-group">
            <label class="form-label">CVV *</label>
            <input type="password" id="pay-input-card-cvv" class="form-input" placeholder="•••" maxlength="3" required>
            <div class="form-error-msg" id="err-chk-card-cvv" style="display: none;">Required.</div>
          </div>
        </div>
      `;
    }
    // Cash on Delivery
    return `
      <div style="color: var(--color-text-muted); font-size: 0.9rem; display: flex; align-items: center; gap: 8px;">
        <span style="color: var(--color-success); font-size: 1.2rem; font-weight: 700;">✓</span> 
        Cash on Delivery enabled. You will pay <strong>₹${total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</strong> in cash upon equipment handover.
      </div>
    `;
  };

  const bindCheckoutEvents = () => {
    // Payment method cards click selector
    container.querySelectorAll('.payment-method-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const method = card.dataset.method;
        selectedPaymentMethod = method;
        
        // Highlight card selection
        container.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        // Check radio button
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;

        // Redraw payment box
        const payBox = document.getElementById('checkout-payment-details-box');
        if (payBox) payBox.innerHTML = renderPaymentInputBox();
      });
    });

    // Place Order Button click handler
    const placeOrderBtn = document.getElementById('checkout-place-order-btn');
    if (placeOrderBtn) {
      placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Shipping Fields
        const nameVal = document.getElementById('chk-shipping-name').value;
        const phoneVal = document.getElementById('chk-shipping-phone').value;
        const emailVal = document.getElementById('chk-shipping-email').value;
        const addrVal = document.getElementById('chk-shipping-addr').value;
        const cityVal = document.getElementById('chk-shipping-city').value;
        const stateVal = document.getElementById('chk-shipping-state').value;
        const pinVal = document.getElementById('chk-shipping-pin').value;

        // Error Fields
        const errName = document.getElementById('err-chk-name');
        const errPhone = document.getElementById('err-chk-phone');
        const errEmail = document.getElementById('err-chk-email');
        const errAddr = document.getElementById('err-chk-addr');
        const errCity = document.getElementById('err-chk-city');
        const errState = document.getElementById('err-chk-state');
        const errPin = document.getElementById('err-chk-pin');

        let isValid = true;

        // Validations
        if (!nameVal || nameVal.trim().length < 3) {
          document.getElementById('chk-shipping-name').classList.add('error');
          errName.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-name').classList.remove('error');
          errName.style.display = 'none';
        }

        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneVal || !phoneRegex.test(phoneVal)) {
          document.getElementById('chk-shipping-phone').classList.add('error');
          errPhone.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-phone').classList.remove('error');
          errPhone.style.display = 'none';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal || !emailRegex.test(emailVal)) {
          document.getElementById('chk-shipping-email').classList.add('error');
          errEmail.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-email').classList.remove('error');
          errEmail.style.display = 'none';
        }

        if (!addrVal || addrVal.trim() === '') {
          document.getElementById('chk-shipping-addr').classList.add('error');
          errAddr.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-addr').classList.remove('error');
          errAddr.style.display = 'none';
        }

        if (!cityVal || cityVal.trim() === '') {
          document.getElementById('chk-shipping-city').classList.add('error');
          errCity.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-city').classList.remove('error');
          errCity.style.display = 'none';
        }

        if (!stateVal || stateVal.trim() === '') {
          document.getElementById('chk-shipping-state').classList.add('error');
          errState.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-state').classList.remove('error');
          errState.style.display = 'none';
        }

        const pinRegex = /^\d{6}$/;
        if (!pinVal || !pinRegex.test(pinVal)) {
          document.getElementById('chk-shipping-pin').classList.add('error');
          errPin.style.display = 'block';
          isValid = false;
        } else {
          document.getElementById('chk-shipping-pin').classList.remove('error');
          errPin.style.display = 'none';
        }

        // Payment Val
        let paymentData = { method: selectedPaymentMethod };
        if (selectedPaymentMethod === 'upi') {
          const upiId = document.getElementById('pay-input-upi-id').value;
          const errUpi = document.getElementById('err-chk-upi');
          const upiRegex = /^[\w.-]+@[\w.-]+$/;
          if (!upiId || !upiRegex.test(upiId)) {
            document.getElementById('pay-input-upi-id').classList.add('error');
            errUpi.style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('pay-input-upi-id').classList.remove('error');
            errUpi.style.display = 'none';
            paymentData.upiId = upiId;
          }
        } else if (selectedPaymentMethod === 'card') {
          const cardName = document.getElementById('pay-input-card-name').value;
          const cardNum = document.getElementById('pay-input-card-num').value.replace(/\s+/g, '');
          const cardExp = document.getElementById('pay-input-card-exp').value;
          const cardCvv = document.getElementById('pay-input-card-cvv').value;

          const errCardName = document.getElementById('err-chk-card-name');
          const errCardNum = document.getElementById('err-chk-card-num');
          const errCardExp = document.getElementById('err-chk-card-exp');
          const errCardCvv = document.getElementById('err-chk-card-cvv');

          if (!cardName || cardName.trim().length < 3) {
            document.getElementById('pay-input-card-name').classList.add('error');
            errCardName.style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('pay-input-card-name').classList.remove('error');
            errCardName.style.display = 'none';
          }

          if (!cardNum || cardNum.length < 15 || cardNum.length > 16 || isNaN(cardNum)) {
            document.getElementById('pay-input-card-num').classList.add('error');
            errCardNum.style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('pay-input-card-num').classList.remove('error');
            errCardNum.style.display = 'none';
          }

          const expRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
          if (!cardExp || !expRegex.test(cardExp)) {
            document.getElementById('pay-input-card-exp').classList.add('error');
            errCardExp.style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('pay-input-card-exp').classList.remove('error');
            errCardExp.style.display = 'none';
          }

          if (!cardCvv || cardCvv.length < 3 || isNaN(cardCvv)) {
            document.getElementById('pay-input-card-cvv').classList.add('error');
            errCardCvv.style.display = 'block';
            isValid = false;
          } else {
            document.getElementById('pay-input-card-cvv').classList.remove('error');
            errCardCvv.style.display = 'none';
          }

          paymentData.cardHolder = cardName;
          paymentData.cardNumberMask = '•••• •••• •••• ' + cardNum.slice(-4);
        }

        if (isValid) {
          try {
            const shippingData = {
              name: nameVal,
              phone: phoneVal,
              email: emailVal,
              address: addrVal,
              city: cityVal,
              state: stateVal,
              pin: pinVal
            };

            const order = State.createOrder(shippingData, paymentData);
            
            // Show custom success confirmation modal
            Components.showModal(`
              <div style="text-align: center; padding: 20px;">
                <div style="width: 72px; height: 72px; background: rgba(25, 103, 62, 0.08); border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 24px auto; color: var(--color-primary);">
                  ${Icons.check}
                </div>
                <h2 style="font-family: var(--font-headings); font-size: 2rem; margin-bottom: 12px; color: var(--color-primary);">Order Successfully Placed!</h2>
                <p style="color: var(--color-text-muted); margin-bottom: 24px; font-size: 1rem; line-height: 1.6;">
                  Thank you for shopping at Make Corner. Your order reference id is <strong>${order.id}</strong>.<br>
                  A confirmation summary has been sent to <strong>${emailVal}</strong>. Our logistics division will contact you at <strong>${phoneVal}</strong> to coordinate dispatch.
                </p>
                <button class="btn btn-primary" onclick="document.getElementById('modal-overlay').classList.remove('open'); window.location.hash='#home';">Return to Home</button>
              </div>
            `);
            Components.showToast('Order confirmed!', 'success');
          } catch (err) {
            Components.showToast(err.message, 'error');
          }
        } else {
          Components.showToast('Form validation errors. Please check address details.', 'error');
        }
      });
    }

  };

  // Start rendering
  drawCheckout();
}
