-- KigaliCraft Database Schema (Reference)
-- This SQL DDL documents the relational structure implemented by
-- backend/db.js (a JSON-file store with identical table/relationship
-- semantics, chosen to avoid native module build dependencies).
-- This script can be used directly if migrating to SQLite/MySQL/PostgreSQL.

CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password VARCHAR(255) NOT NULL,       -- bcrypt hash
    role VARCHAR(20) DEFAULT 'customer',  -- 'customer' | 'admin'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,         -- baskets | pottery | textiles | jewelry | woodwork | paintings
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    artisan VARCHAR(150),
    origin VARCHAR(100),
    material VARCHAR(150),
    stock INTEGER DEFAULT 0,
    rating DECIMAL(2,1) DEFAULT 0,
    reviews INTEGER DEFAULT 0,
    emoji VARCHAR(10),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_ref VARCHAR(50) UNIQUE NOT NULL,
    user_id INTEGER NULL,
    customer_name VARCHAR(200) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    shipping_address VARCHAR(255) NOT NULL,
    shipping_city VARCHAR(100) NOT NULL,
    shipping_country VARCHAR(100) NOT NULL,
    payment_method VARCHAR(20) NOT NULL,   -- mtn | airtel | card
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',  -- pending | confirmed | shipped | delivered | cancelled
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE order_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    product_name VARCHAR(255) NOT NULL,    -- denormalized snapshot at time of purchase
    price DECIMAL(10,2) NOT NULL,          -- price snapshot at time of purchase
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Relationships:
-- users (1) ----< (N) orders          [via user_id, nullable for guest checkout]
-- orders (1) ----< (N) order_items    [via order_id]
-- products (1) ----< (N) order_items  [via product_id]
