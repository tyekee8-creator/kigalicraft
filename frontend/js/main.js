// Main JS utilities for KigaliCraft

// Sticky navbar
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
function toggleNav() {
  const links = document.getElementById('navLinks');
  if (links) links.classList.toggle('open');
}

// Toast notifications
function showToast(message, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('visible'));
  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Render a product card (grid view)
function renderProductCard(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  return `
    <div class="product-card">
      <a href="product-detail.html?id=${product.id}" class="product-card-link">
        <div class="product-img-area">
          <div class="product-emoji">${product.emoji}</div>
          <span class="product-category-tag">${product.category}</span>
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-artisan">by ${product.artisan}</p>
          <div class="product-rating">
            <span class="stars">${stars}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>
          <div class="product-price">$${product.price.toFixed(2)}</div>
        </div>
      </a>
      <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">
        🛒 Add to Cart
      </button>
    </div>`;
}

// Render product list item (list view)
function renderProductListItem(product) {
  const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
  return `
    <div class="product-list-item">
      <div class="list-emoji">${product.emoji}</div>
      <div class="list-info">
        <h3><a href="product-detail.html?id=${product.id}">${product.name}</a></h3>
        <p class="product-artisan">by ${product.artisan} · ${product.origin}</p>
        <p class="list-desc">${product.description.substring(0, 120)}...</p>
        <div class="product-rating"><span class="stars">${stars}</span><span class="rating-count">(${product.reviews})</span></div>
      </div>
      <div class="list-actions">
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id})">🛒 Add to Cart</button>
      </div>
    </div>`;
}

// Handle add to cart from cards
function handleAddToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;
  addToCart(product);
  showToast(`"${product.name}" added to cart! 🛒`);
}

// Update auth button state
function updateAuthState() {
  const user = JSON.parse(localStorage.getItem('kc_user') || 'null');
  const authBtn = document.getElementById('authBtn');
  if (authBtn && user) {
    authBtn.textContent = `👤 ${user.name.split(' ')[0]}`;
    authBtn.href = '#';
    authBtn.onclick = () => {
      if (confirm(`Sign out, ${user.name}?`)) {
        localStorage.removeItem('kc_user');
        window.location.reload();
      }
    };
  }
}

window.addEventListener('DOMContentLoaded', updateAuthState);

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('animate-in');
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.product-card, .category-card, .value-card, .testimonial-card').forEach(el => {
    el.classList.add('animate-pending');
    observer.observe(el);
  });
});
