// Seed script — populates the JSON database with initial product catalog.
const db = require('./db');

const products = [
  ["Agaseke Peace Basket", "baskets", 45.00, "The iconic Rwandan agaseke peace basket, handwoven by skilled artisans using sisal and sweetgrass.", "Marie Uwimana", "Musanze", "Sisal & Sweetgrass", 23, 4.9, 128, "🧺"],
  ["Ibyansi Market Basket", "baskets", 32.00, "A traditional ibyansi basket, perfect for daily use at the market or as a decorative piece.", "Consolée Nyiraneza", "Huye", "Sisal & Palm Leaf", 15, 4.7, 84, "🧺"],
  ["Large Storage Basket", "baskets", 68.00, "A large, sturdy basket ideal for storage and organization, woven with natural dyes.", "Vestine Mukandoli", "Ruhengeri", "Banana Fiber", 8, 4.8, 56, "🧺"],
  ["Mini Decorative Basket Set", "baskets", 29.00, "A set of 3 miniature decorative baskets in graduated sizes, perfect for gifting.", "Alphonsine Mukamurera", "Kayonza", "Sisal", 40, 4.6, 201, "🧺"],
  ["Terracotta Water Jug", "pottery", 38.00, "A traditional Rwandan terracotta water jug, handcrafted from local clay.", "Claudine Mukamana", "Rubavu", "Local Clay", 12, 4.8, 67, "🏺"],
  ["Decorative Clay Bowl", "pottery", 52.00, "An artistically decorated clay bowl with hand-painted traditional motifs.", "Jean-Baptiste Nkurunziza", "Butare", "Fired Clay", 7, 4.9, 43, "🏺"],
  ["Pottery Vase Set", "pottery", 75.00, "A stunning set of two pottery vases with complementary designs.", "Claudine Mukamana", "Rubavu", "Stoneware Clay", 5, 4.7, 31, "🏺"],
  ["Clay Coffee Mug Set (4)", "pottery", 44.00, "A set of 4 handmade clay coffee mugs, each slightly different.", "Pascal Nshimiyimana", "Kigali", "Glazed Clay", 18, 4.5, 89, "🏺"],
  ["Imigongo Wall Art Panel", "textiles", 95.00, "An authentic imigongo geometric painting on panel — a uniquely Rwandan art form.", "Emmanuel Habimana", "Nyamata", "Natural Pigments & Clay", 4, 5.0, 72, "🪡"],
  ["Kitenge Print Fabric (2m)", "textiles", 22.00, "Vibrant kitenge wax-print fabric in bold Rwandan-inspired patterns.", "Grace Ishimwe", "Kigali", "100% Cotton", 35, 4.6, 156, "🪡"],
  ["Hand-Embroidered Table Runner", "textiles", 35.00, "A beautiful hand-embroidered table runner featuring traditional floral motifs.", "Odette Mutesi", "Rwamagana", "Cotton & Silk Thread", 22, 4.7, 48, "🪡"],
  ["Woven Placemats (Set of 6)", "textiles", 28.00, "A set of 6 handwoven placemats in natural sisal and colored threads.", "Florence Uwase", "Muhanga", "Sisal & Raffia", 30, 4.5, 93, "🪡"],
  ["Beaded Necklace – Earth Tones", "jewelry", 18.00, "A handstrung beaded necklace using traditional Rwandan glass beads.", "Sandrine Uwera", "Kigali", "Glass Beads & Sterling Silver", 45, 4.8, 214, "💍"],
  ["Copper Wire Bracelet", "jewelry", 12.00, "A handcrafted copper wire bracelet with intricate woven patterns.", "Patrick Nkusi", "Rusizi", "Pure Copper Wire", 60, 4.6, 167, "💍"],
  ["Bone & Bead Earrings", "jewelry", 15.00, "Elegant drop earrings combining ethically-sourced bone pieces with seed beads.", "Claudette Ingabire", "Musanze", "Bone & Seed Beads", 33, 4.7, 98, "💍"],
  ["Sisal Fiber Anklet Set", "jewelry", 8.00, "A set of 3 delicate sisal fiber anklets in complementary colors.", "Ange Mukashyaka", "Huye", "Natural Sisal Fiber", 80, 4.4, 122, "💍"],
  ["Carved Gorilla Sculpture", "woodwork", 85.00, "A beautifully hand-carved wooden gorilla sculpture, honouring Rwanda's mountain gorillas.", "Théodore Nsanzimana", "Musanze", "Umuvule Wood", 6, 4.9, 54, "🪵"],
  ["Wooden Salad Bowl Set", "woodwork", 55.00, "A set of 1 large and 4 small wooden salad bowls, hand-turned from local hardwood.", "Augustin Nshuti", "Gicumbi", "Olive Wood", 10, 4.8, 38, "🪵"],
  ["Decorative Wooden Mask", "woodwork", 42.00, "A hand-carved ceremonial mask inspired by traditional East African designs.", "Théodore Nsanzimana", "Musanze", "Mahogany", 14, 4.6, 27, "🪵"],
  ["Handcarved Wooden Spoon Set", "woodwork", 24.00, "A set of 4 handcarved cooking spoons in different sizes.", "Augustin Nshuti", "Gicumbi", "Guava Wood", 25, 4.5, 61, "🪵"],
  ["Large Imigongo Canvas (60cm)", "paintings", 120.00, "A large-scale imigongo artwork on canvas featuring iconic geometric patterns.", "Emmanuel Habimana", "Nyamata", "Natural Pigments on Canvas", 3, 5.0, 41, "🎨"],
  ["Acrylic Rwanda Landscape", "paintings", 80.00, "A vibrant acrylic painting of the Rwandan countryside.", "Christine Murekatete", "Kigali", "Acrylic on Canvas", 8, 4.8, 29, "🎨"],
  ["Batik Art Print", "paintings", 45.00, "A stunning batik fabric art print depicting a Rwandan market scene.", "Grace Ishimwe", "Kigali", "Batik on Cotton", 12, 4.7, 55, "🎨"],
  ["Watercolor Wildlife Set (3)", "paintings", 65.00, "A set of 3 watercolor prints featuring Rwanda's iconic wildlife.", "Christine Murekatete", "Kigali", "Watercolor on Paper", 16, 4.6, 37, "🎨"]
];

const fields = ["name", "category", "price", "description", "artisan", "origin", "material", "stock", "rating", "reviews", "emoji"];

const existingCount = db.count('products');

if (existingCount === 0) {
  for (const row of products) {
    const record = {};
    fields.forEach((f, i) => record[f] = row[i]);
    db.insert('products', record);
  }
  console.log(`✅ Seeded ${products.length} products into the database.`);
} else {
  console.log(`ℹ️  Database already has ${existingCount} products. Skipping seed.`);
}
