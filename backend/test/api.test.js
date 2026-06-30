// Basic smoke tests for the KigaliCraft API
// Run with: node test/api.test.js (requires server running on PORT or 5000)

const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:5000';
let passed = 0;
let failed = 0;

function request(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: { 'Content-Type': 'application/json' }
    };
    const req = http.request(options, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, body: raw });
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function assert(condition, message) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passed++;
  } else {
    console.log(`❌ FAIL: ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('🧪 Running KigaliCraft API Tests...\n');

  try {
    // Health check
    const health = await request('/api/health');
    assert(health.status === 200, 'Health check returns 200');
    assert(health.body.status === 'ok', 'Health check status is ok');

    // Get all products
    const products = await request('/api/products');
    assert(products.status === 200, 'GET /api/products returns 200');
    assert(Array.isArray(products.body.products), 'Products response is an array');
    assert(products.body.products.length > 0, 'Products list is not empty');

    // Filter by category
    const filtered = await request('/api/products?category=baskets');
    assert(filtered.status === 200, 'Category filter returns 200');
    if (filtered.body.products.length > 0) {
      assert(filtered.body.products.every(p => p.category === 'baskets'), 'All filtered products match category');
    }

    // Search
    const searched = await request('/api/products?search=basket');
    assert(searched.status === 200, 'Search query returns 200');

    // Get single product
    if (products.body.products.length > 0) {
      const firstId = products.body.products[0].id;
      const single = await request(`/api/products/${firstId}`);
      assert(single.status === 200, 'GET single product returns 200');
      assert(single.body.id === firstId, 'Single product ID matches');
    }

    // 404 for invalid product
    const notFound = await request('/api/products/99999');
    assert(notFound.status === 404, 'Invalid product ID returns 404');

    // Register new user
    const testEmail = `test${Date.now()}@kigalicraft.test`;
    const register = await request('/api/auth/register', 'POST', {
      firstName: 'Test', lastName: 'User', email: testEmail, phone: '+250780000000', password: 'testpass123'
    });
    assert(register.status === 200, 'User registration succeeds');
    assert(register.body.token, 'Registration returns a token');

    // Duplicate registration should fail
    const dupRegister = await request('/api/auth/register', 'POST', {
      firstName: 'Test', lastName: 'User', email: testEmail, password: 'testpass123'
    });
    assert(dupRegister.status === 409, 'Duplicate email registration returns 409');

    // Login
    const login = await request('/api/auth/login', 'POST', { email: testEmail, password: 'testpass123' });
    assert(login.status === 200, 'Login with correct credentials succeeds');
    assert(login.body.token, 'Login returns a token');

    // Login with wrong password
    const badLogin = await request('/api/auth/login', 'POST', { email: testEmail, password: 'wrongpassword' });
    assert(badLogin.status === 401, 'Login with wrong password returns 401');

    // Place an order
    const order = await request('/api/orders', 'POST', {
      customer: { firstName: 'Test', lastName: 'User', email: testEmail, phone: '+250780000000', address: 'KG 12 Ave', city: 'Kigali', country: 'RW' },
      items: [{ id: 1, name: 'Agaseke Peace Basket', price: 45.0, quantity: 2 }],
      payment: 'mtn', subtotal: 90, shipping: 15, tax: 7.2, total: 112.2
    });
    assert(order.status === 200, 'Order placement succeeds');
    assert(order.body.orderRef, 'Order returns a reference number');

  } catch (err) {
    console.error('Test run failed with error:', err.message);
    failed++;
  }

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
