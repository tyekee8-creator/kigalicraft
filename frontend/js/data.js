// KigaliCraft Product Database
const products = [
  // BASKETS
  {
    id: 1, name: "Agaseke Peace Basket", category: "baskets",
    price: 45.00, rating: 4.9, reviews: 128,
    emoji: "🧺", description: "The iconic Rwandan agaseke peace basket, handwoven by skilled artisans using sisal and sweetgrass. Features traditional geometric patterns in earth tones. Perfect as a home decor piece or meaningful gift.",
    artisan: "Marie Uwimana", origin: "Musanze", material: "Sisal & Sweetgrass", stock: 23
  },
  {
    id: 2, name: "Ibyansi Market Basket", category: "baskets",
    price: 32.00, rating: 4.7, reviews: 84,
    emoji: "🧺", description: "A traditional ibyansi basket, perfect for daily use at the market or as a decorative piece. Handwoven with natural materials using centuries-old techniques.",
    artisan: "Consolée Nyiraneza", origin: "Huye", material: "Sisal & Palm Leaf", stock: 15
  },
  {
    id: 3, name: "Large Storage Basket", category: "baskets",
    price: 68.00, rating: 4.8, reviews: 56,
    emoji: "🧺", description: "A large, sturdy basket ideal for storage and organization. Woven using traditional patterns with natural dyes in rich, earthy colors.",
    artisan: "Vestine Mukandoli", origin: "Ruhengeri", material: "Banana Fiber", stock: 8
  },
  {
    id: 4, name: "Mini Decorative Basket Set", category: "baskets",
    price: 29.00, rating: 4.6, reviews: 201,
    emoji: "🧺", description: "A set of 3 miniature decorative baskets in graduated sizes. Perfect for gifting or as table centerpieces. Each one is unique.",
    artisan: "Alphonsine Mukamurera", origin: "Kayonza", material: "Sisal", stock: 40
  },
  // POTTERY
  {
    id: 5, name: "Terracotta Water Jug", category: "pottery",
    price: 38.00, rating: 4.8, reviews: 67,
    emoji: "🏺", description: "A traditional Rwandan terracotta water jug, handcrafted from local clay. Keeps water naturally cool and adds rustic elegance to any kitchen or dining table.",
    artisan: "Claudine Mukamana", origin: "Rubavu", material: "Local Clay", stock: 12
  },
  {
    id: 6, name: "Decorative Clay Bowl", category: "pottery",
    price: 52.00, rating: 4.9, reviews: 43,
    emoji: "🏺", description: "An artistically decorated clay bowl with hand-painted traditional motifs. Suitable for display or functional use. Each piece is a unique work of art.",
    artisan: "Jean-Baptiste Nkurunziza", origin: "Butare", material: "Fired Clay", stock: 7
  },
  {
    id: 7, name: "Pottery Vase Set", category: "pottery",
    price: 75.00, rating: 4.7, reviews: 31,
    emoji: "🏺", description: "A stunning set of two pottery vases with complementary designs. Ideal for flowers, dried grasses, or as standalone decorative objects.",
    artisan: "Claudine Mukamana", origin: "Rubavu", material: "Stoneware Clay", stock: 5
  },
  {
    id: 8, name: "Clay Coffee Mug Set (4)", category: "pottery",
    price: 44.00, rating: 4.5, reviews: 89,
    emoji: "🏺", description: "A set of 4 handmade clay coffee mugs, each slightly different — celebrating the beauty of handcraft. Food-safe glaze, dishwasher safe.",
    artisan: "Pascal Nshimiyimana", origin: "Kigali", material: "Glazed Clay", stock: 18
  },
  // TEXTILES
  {
    id: 9, name: "Imigongo Wall Art Panel", category: "textiles",
    price: 95.00, rating: 5.0, reviews: 72,
    emoji: "🪡", description: "An authentic imigongo geometric painting on cow dung panel — a uniquely Rwandan art form. Features bold black-and-white patterns with colorful accents. Each piece is original.",
    artisan: "Emmanuel Habimana", origin: "Nyamata", material: "Natural Pigments & Clay", stock: 4
  },
  {
    id: 10, name: "Kitenge Print Fabric (2m)", category: "textiles",
    price: 22.00, rating: 4.6, reviews: 156,
    emoji: "🪡", description: "Vibrant kitenge wax-print fabric in bold Rwandan-inspired patterns. 100% cotton, 2 metres. Perfect for dresses, shirts, or home decor projects.",
    artisan: "Grace Ishimwe", origin: "Kigali", material: "100% Cotton", stock: 35
  },
  {
    id: 11, name: "Hand-Embroidered Table Runner", category: "textiles",
    price: 35.00, rating: 4.7, reviews: 48,
    emoji: "🪡", description: "A beautiful hand-embroidered table runner featuring traditional Rwandan floral motifs. Measures 150cm × 35cm. Machine washable.",
    artisan: "Odette Mutesi", origin: "Rwamagana", material: "Cotton & Silk Thread", stock: 22
  },
  {
    id: 12, name: "Woven Placemats (Set of 6)", category: "textiles",
    price: 28.00, rating: 4.5, reviews: 93,
    emoji: "🪡", description: "A set of 6 handwoven placemats in natural sisal and colored threads. Adds an African touch to any dining table. Heat-resistant and durable.",
    artisan: "Florence Uwase", origin: "Muhanga", material: "Sisal & Raffia", stock: 30
  },
  // JEWELRY
  {
    id: 13, name: "Beaded Necklace – Earth Tones", category: "jewelry",
    price: 18.00, rating: 4.8, reviews: 214,
    emoji: "💍", description: "A handstrung beaded necklace using traditional Rwandan glass beads in warm earth tones. Adjustable length, sterling silver clasp. Fair trade certified.",
    artisan: "Sandrine Uwera", origin: "Kigali", material: "Glass Beads & Sterling Silver", stock: 45
  },
  {
    id: 14, name: "Copper Wire Bracelet", category: "jewelry",
    price: 12.00, rating: 4.6, reviews: 167,
    emoji: "💍", description: "A handcrafted copper wire bracelet with intricate woven patterns. One size fits most with adjustable clasp. Naturally antibacterial and beautiful.",
    artisan: "Patrick Nkusi", origin: "Rusizi", material: "Pure Copper Wire", stock: 60
  },
  {
    id: 15, name: "Bone & Bead Earrings", category: "jewelry",
    price: 15.00, rating: 4.7, reviews: 98,
    emoji: "💍", description: "Elegant drop earrings combining ethically-sourced bone pieces with colorful seed beads. Lightweight and comfortable for all-day wear.",
    artisan: "Claudette Ingabire", origin: "Musanze", material: "Bone & Seed Beads", stock: 33
  },
  {
    id: 16, name: "Sisal Fiber Anklet Set", category: "jewelry",
    price: 8.00, rating: 4.4, reviews: 122,
    emoji: "💍", description: "A set of 3 delicate sisal fiber anklets in complementary colors. Perfect beach or festival accessory. Each is hand-braided and adjustable.",
    artisan: "Ange Mukashyaka", origin: "Huye", material: "Natural Sisal Fiber", stock: 80
  },
  // WOODWORK
  {
    id: 17, name: "Carved Gorilla Sculpture", category: "woodwork",
    price: 85.00, rating: 4.9, reviews: 54,
    emoji: "🪵", description: "A beautifully hand-carved wooden gorilla sculpture — honouring Rwanda's iconic mountain gorillas. Made from sustainable Umuvule wood. Stands 25cm tall.",
    artisan: "Théodore Nsanzimana", origin: "Musanze", material: "Umuvule Wood", stock: 6
  },
  {
    id: 18, name: "Wooden Salad Bowl Set", category: "woodwork",
    price: 55.00, rating: 4.8, reviews: 38,
    emoji: "🪵", description: "A set of 1 large and 4 small wooden salad bowls, hand-turned from local hardwood. Food-safe oil finish. Brings natural warmth to the dining table.",
    artisan: "Augustin Nshuti", origin: "Gicumbi", material: "Olive Wood", stock: 10
  },
  {
    id: 19, name: "Decorative Wooden Mask", category: "woodwork",
    price: 42.00, rating: 4.6, reviews: 27,
    emoji: "🪵", description: "A hand-carved ceremonial mask inspired by traditional East African designs. Suitable as a wall decoration or display piece. Unique collector's item.",
    artisan: "Théodore Nsanzimana", origin: "Musanze", material: "Mahogany", stock: 14
  },
  {
    id: 20, name: "Handcarved Wooden Spoon Set", category: "woodwork",
    price: 24.00, rating: 4.5, reviews: 61,
    emoji: "🪵", description: "A set of 4 handcarved cooking spoons in different sizes, made from sustainable local wood. Smooth finish, ergonomic handle, naturally heat-resistant.",
    artisan: "Augustin Nshuti", origin: "Gicumbi", material: "Guava Wood", stock: 25
  },
  // PAINTINGS
  {
    id: 21, name: "Large Imigongo Canvas (60cm)", category: "paintings",
    price: 120.00, rating: 5.0, reviews: 41,
    emoji: "🎨", description: "A large-scale imigongo artwork on canvas (60×60cm). Features the iconic spiral and geometric patterns of this uniquely Rwandan art form, in classic black, white, and terracotta.",
    artisan: "Emmanuel Habimana", origin: "Nyamata", material: "Natural Pigments on Canvas", stock: 3
  },
  {
    id: 22, name: "Acrylic Rwanda Landscape", category: "paintings",
    price: 80.00, rating: 4.8, reviews: 29,
    emoji: "🎨", description: "A vibrant acrylic painting of the Rwandan countryside — rolling hills, banana trees, and traditional homesteads. Framed, ready to hang. 40×50cm.",
    artisan: "Christine Murekatete", origin: "Kigali", material: "Acrylic on Canvas", stock: 8
  },
  {
    id: 23, name: "Batik Art Print", category: "paintings",
    price: 45.00, rating: 4.7, reviews: 55,
    emoji: "🎨", description: "A stunning batik fabric art print depicting a Rwandan market scene. The wax-resist dyeing technique creates rich layers of color and detail. Framed 35×45cm.",
    artisan: "Grace Ishimwe", origin: "Kigali", material: "Batik on Cotton", stock: 12
  },
  {
    id: 24, name: "Watercolor Wildlife Set (3)", category: "paintings",
    price: 65.00, rating: 4.6, reviews: 37,
    emoji: "🎨", description: "A set of 3 watercolor prints featuring Rwanda's iconic wildlife: mountain gorilla, golden monkey, and shoebill stork. Each print is 20×25cm, unframed.",
    artisan: "Christine Murekatete", origin: "Kigali", material: "Watercolor on Paper", stock: 16
  }
];
