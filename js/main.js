// 🌸 main.js - shared behaviors
document.addEventListener('DOMContentLoaded', () => {

  // 🍃 Mobile nav toggle
  const navToggle = document.querySelector('#nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (navLinks.classList.contains('open')) {
        navLinks.style.display = 'flex';
      } else {
        navLinks.style.display = '';
      }
    });
  }

  // 🌿 Floating leaf on click (cute effect)
  document.addEventListener('click', (e) => {
    if (['INPUT', 'TEXTAREA', 'BUTTON'].includes(e.target.tagName)) return;
    const span = document.createElement('div');
    span.className = 'leaf-anim';
    span.textContent = '🍃';
    span.style.left = e.pageX + 'px';
    span.style.top = e.pageY + 'px';
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 1400);
  });

});

// 🌼 Lightbox popup for menu images
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightbox.style.display = "block";
  lightboxImg.src = img.src; 
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// 🍵 Slideshow logic
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");

  if (slides.length === 0) return; // safety check

  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Optional: Auto-slide every 3 seconds
setInterval(() => {
  plusSlides(1);
}, 3000);
// initialize cart
let cart = [];

// function to update cart display
function updateCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalElement = document.getElementById("cart-total");
  
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      ${item.name} - ₱${item.price}
      <span onclick="removeFromCart(${index})" style="color:#c96b6b;cursor:pointer;margin-left:8px;">×</span>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price;
  });

  cartTotalElement.textContent = `₱${total}`;
}

// function to add item
function addToCart(id, name, price) {
  cart.push({ id, name, price });
  updateCart();
}

// function to remove single item
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// ✅ function to clear all items
function clearCart() {
  cart = [];
  updateCart();
}
// 🌸 Checkout / Confirm Order - with Cute Modal Popup
function proceedCheckout() {
  const name = document.getElementById('name')?.value.trim();
  const contact = document.getElementById('contact')?.value.trim();
  const address = document.getElementById('address')?.value.trim();
  const payment = document.getElementById('payment')?.value;
  const total = document.getElementById('cart-total')?.textContent || "₱0";

  if (!name || !contact || !address) {
    showPopup("Please fill out all fields before confirming 🌿");
    return;
  }

  if (total === "₱0") {
    showPopup("Your cart is empty 🍃 Add something first!");
    return;
  }

  showPopup(`Thank you, <strong>${name}</strong>! 🌸<br>Your order of <strong>${total}</strong> has been confirmed.<br>Payment method: <strong>${payment}</strong>`);
  clearCart();
  document.getElementById("checkout-form")?.reset();
}

// 🌷 Cute Popup Function
function showPopup(message) {
  const popup = document.createElement("div");
  popup.className = "cute-popup";
  popup.innerHTML = `
    <div class="popup-box">
      <div class="popup-leaf">🍃</div>
      <p>${message}</p>
      <button class="popup-btn" onclick="this.parentElement.parentElement.remove()">Okay</button>
    </div>
  `;
  document.body.appendChild(popup);
}


