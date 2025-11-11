
// order.js - cart behavior for order.html
const cart = { items: [] };

function addToCart(id, name, price){
  const existing = cart.items.find(i=>i.id===id);
  if(existing){ existing.qty++; } else { cart.items.push({id,name,price,qty:1}); }
  renderCart();
}

function renderCart(){
  const el = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!el) return;
  el.innerHTML = '';
  let total = 0;
  cart.items.forEach(it=>{
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `<div>${it.qty}x ${it.name}</div><div>₱${it.price*it.qty}</div>`;
    el.appendChild(div);
    total += it.price*it.qty;
  });
  totalEl.textContent = '₱' + total;
}


function proceedCheckout() {
  const name = document.querySelector('[name="name"]').value.trim();
  const contact = document.querySelector('[name="contact"]').value.trim();
  const address = document.querySelector('[name="address"]').value.trim();
  const payment = document.querySelector('[name="payment"]').value;

  if (!name || !contact || !address) {
    alert("Please fill out all fields before confirming your order 🌿");
    return;
  }

  // Optional: show order summary
  alert(
    `Thank you, ${name}! 🌸\n\nYour order will be delivered to:\n${address}\n\nPayment Method: ${payment}\n\nWe’ll contact you at ${contact} for confirmation.`
  );

  // Clear cart & form after submit
  clearCart();
  document.getElementById("checkout-form").reset();
}
