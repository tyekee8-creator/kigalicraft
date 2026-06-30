const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'kigalicraft_secret_2026';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Auth middleware
function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ── AUTH ROUTES ──

app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }
  if (password.length < 8) return res.status(400).json({ error: 'Password must be at least 8 characters' });
  if (!emailRegex.test(email)) return res.status(400).json({ error: 'Invalid email format' });

  const existing = db.findOne('users', u => u.email === email);
  if (existing) return res.status(409).json({ error: 'Email already registered' });

  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = db.insert('users', {
    first_name: firstName, last_name: lastName, email, phone: phone || null,
    password: hashedPassword, role: 'customer'
  });

  const token = jwt.sign({ id: user.id, email, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, firstName, lastName, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  const user = db.findOne('users', u => u.email === email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, firstName: user.first_name, lastName: user.last_name, email: user.email } });
});

// ── PRODUCT ROUTES ──

app.get('/api/products', (req, res) => {
  const { category, search, sort, minPrice, maxPrice, limit, offset } = req.query;
  let results = db.findAll('products');

  if (category) results = results.filter(p => p.category === category);
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }
  if (minPrice) results = results.filter(p => p.price >= parseFloat(minPrice));
  if (maxPrice) results = results.filter(p => p.price <= parseFloat(maxPrice));

  if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
  else if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  else if (sort === 'name-asc') results.sort((a, b) => a.name.localeCompare(b.name));
  else results.sort((a, b) => a.id - b.id);

  const total = results.length;
  if (offset) results = results.slice(parseInt(offset));
  if (limit) results = results.slice(0, parseInt(limit));

  res.json({ products: results, total });
});

app.get('/api/products/:id', (req, res) => {
  const product = db.findById('products', req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// ── ORDER ROUTES ──

app.post('/api/orders', (req, res) => {
  const { customer, items, payment, subtotal, shipping, tax, total } = req.body;
  if (!customer || !items || !items.length) return res.status(400).json({ error: 'Invalid order data' });
  if (!customer.email || !emailRegex.test(customer.email)) return res.status(400).json({ error: 'Valid customer email required' });

  const orderRef = 'KC' + Date.now();

  const order = db.insert('orders', {
    order_ref: orderRef,
    customer_name: `${customer.firstName} ${customer.lastName}`,
    customer_email: customer.email,
    customer_phone: customer.phone,
    shipping_address: customer.address,
    shipping_city: customer.city,
    shipping_country: customer.country,
    payment_method: payment,
    subtotal, shipping_cost: shipping, tax, total,
    status: 'pending'
  });

  for (const item of items) {
    db.insert('order_items', {
      order_id: order.id, product_id: item.id, product_name: item.name,
      price: item.price, quantity: item.quantity
    });
  }

  res.json({ success: true, orderRef, orderId: order.id });
});

app.get('/api/orders', authenticate, (req, res) => {
  let orders;
  if (req.user.role === 'admin') {
    orders = db.findAll('orders');
  } else {
    orders = db.findAll('orders', o => o.customer_email === req.user.email);
  }
  res.json(orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

app.get('/api/orders/:ref', (req, res) => {
  const order = db.findOne('orders', o => o.order_ref === req.params.ref);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  const items = db.findAll('order_items', i => i.order_id === order.id);
  res.json({ ...order, items });
});

// ── HEALTH CHECK ──
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), app: 'KigaliCraft API' });
});

// Serve frontend for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🧺 KigaliCraft server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
