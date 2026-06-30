// db.js — A lightweight, dependency-free JSON-file database.
// Provides persistent storage with simple table/relation semantics,
// avoiding native-module builds (better-sqlite3, etc.) so the app
// runs identically across all environments and CI runners.

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'kigalicraft.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    const initial = { users: [], products: [], orders: [], order_items: [], _seq: { users: 0, products: 0, orders: 0, order_items: 0 } };
    fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

function nextId(db, table) {
  db._seq[table] = (db._seq[table] || 0) + 1;
  return db._seq[table];
}

const db = {
  // Generic insert
  insert(table, row) {
    const data = loadDB();
    const id = nextId(data, table);
    const record = { id, ...row, created_at: new Date().toISOString() };
    data[table].push(record);
    saveDB(data);
    return record;
  },

  // Find all matching a predicate
  findAll(table, predicate = () => true) {
    const data = loadDB();
    return data[table].filter(predicate);
  },

  // Find one matching a predicate
  findOne(table, predicate) {
    const data = loadDB();
    return data[table].find(predicate) || null;
  },

  // Find by id
  findById(table, id) {
    const data = loadDB();
    return data[table].find(r => r.id === Number(id)) || null;
  },

  // Update a record by id
  update(table, id, updates) {
    const data = loadDB();
    const idx = data[table].findIndex(r => r.id === Number(id));
    if (idx === -1) return null;
    data[table][idx] = { ...data[table][idx], ...updates };
    saveDB(data);
    return data[table][idx];
  },

  // Delete a record by id
  remove(table, id) {
    const data = loadDB();
    const before = data[table].length;
    data[table] = data[table].filter(r => r.id !== Number(id));
    saveDB(data);
    return data[table].length < before;
  },

  // Count rows in a table
  count(table) {
    return loadDB()[table].length;
  },

  // Raw access (used by seed script)
  raw() { return loadDB(); },
  saveRaw(data) { saveDB(data); }
};

module.exports = db;
