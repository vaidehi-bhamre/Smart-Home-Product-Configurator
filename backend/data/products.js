const products = [
  {
    id: "faucet-01",
    name: "Artifacts Kitchen Faucet",
    category: "Kitchen",
    basePrice: 299,
    description: "Pull-down kitchen faucet with DockNetik magnetic docking system and MasterClean sprayface.",
    image: "https://placehold.co/400x400/e8e0d8/6b5e4f?text=Kitchen+Faucet",
    options: {
      finish: [
        { id: "polished-chrome", label: "Polished Chrome", hex: "#C8C8C8", price: 0 },
        { id: "matte-black", label: "Matte Black", hex: "#2C2C2C", price: 40 },
        { id: "brushed-gold", label: "Brushed Gold", hex: "#C5A35A", price: 80 },
        { id: "brushed-nickel", label: "Brushed Nickel", hex: "#8A8A7A", price: 30 }
      ],
      sprayMode: [
        { id: "stream", label: "Stream Only", price: 0 },
        { id: "stream-spray", label: "Stream + Spray", price: 25 },
        { id: "stream-spray-boost", label: "Stream + Spray + Boost", price: 60 }
      ],
      handle: [
        { id: "single", label: "Single Handle", price: 0 },
        { id: "dual", label: "Dual Handle", price: 35 }
      ]
    }
  },
  {
    id: "shower-01",
    name: "Composed Shower System",
    category: "Bathroom",
    basePrice: 749,
    description: "Thermostatic shower system with precise temperature control and customizable spray patterns.",
    image: "https://placehold.co/400x400/dde8e0/4f6b5e?text=Shower+System",
    options: {
      finish: [
        { id: "polished-chrome", label: "Polished Chrome", hex: "#C8C8C8", price: 0 },
        { id: "matte-black", label: "Matte Black", hex: "#2C2C2C", price: 60 },
        { id: "vibrant-titanium", label: "Vibrant Titanium", hex: "#8B9EA8", price: 120 },
        { id: "polished-gold", label: "Polished Gold", hex: "#D4A84B", price: 150 }
      ],
      showerHead: [
        { id: "standard", label: "Standard Rainhead (10\")", price: 0 },
        { id: "large", label: "Large Rainhead (20\")", price: 180 },
        { id: "multifunction", label: "Multifunction Rainhead", price: 250 }
      ],
      bodySpray: [
        { id: "none", label: "No Body Spray", price: 0 },
        { id: "2-spray", label: "2 Body Sprays", price: 200 },
        { id: "4-spray", label: "4 Body Sprays", price: 380 }
      ]
    }
  },
  {
    id: "sink-01",
    name: "Vox Undermount Sink",
    category: "Bathroom",
    basePrice: 399,
    description: "Understated rectangular undermount sink with SilentShield sound dampening technology.",
    image: "https://placehold.co/400x400/e8dde0/6b4f5e?text=Undermount+Sink",
    options: {
      finish: [
        { id: "white", label: "White", hex: "#F5F5F0", price: 0 },
        { id: "biscuit", label: "Biscuit", hex: "#E8D9B8", price: 20 },
        { id: "black-onyx", label: "Black Onyx", hex: "#1C1C1C", price: 80 }
      ],
      size: [
        { id: "small", label: "Small (17\"x14\")", price: 0 },
        { id: "medium", label: "Medium (20\"x17\")", price: 50 },
        { id: "large", label: "Large (24\"x18\")", price: 120 }
      ],
      drain: [
        { id: "standard", label: "Standard Drain", price: 0 },
        { id: "pop-up", label: "Pop-Up Drain Assembly", price: 45 }
      ]
    }
  }
];

module.exports = products;
