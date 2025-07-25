// Mock product data for the entire website
export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  images?: string[];
  category: string;
  description: string;
  features: string[];
  materials: string;
  dimensions: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  colors?: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Milano Luxury Tote',
    price: '$299',
    originalPrice: '$399',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop'
    ],
    category: 'tote-bags',
    description: 'The Milano Luxury Tote combines Italian craftsmanship with modern sophistication. Perfect for the professional woman who values both style and functionality.',
    features: [
      'Premium Italian leather construction',
      'Spacious main compartment with laptop sleeve',
      'Interior zip pocket and phone slots',
      'Comfortable shoulder straps',
      'Gold-tone hardware accents'
    ],
    materials: 'Genuine Italian Leather',
    dimensions: '15" W x 12" H x 5" D',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    colors: ['Black', 'Brown', 'Navy']
  },
  {
    id: 2,
    name: 'Parisian Crossbody',
    price: '$199',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop'
    ],
    category: 'crossbody',
    description: 'Effortless chic meets Parisian elegance in this versatile crossbody bag. Perfect for day-to-night transitions.',
    features: [
      'Adjustable crossbody strap',
      'Multiple compartments',
      'Secure zip closure',
      'Compact yet spacious design'
    ],
    materials: 'Vegan Leather',
    dimensions: '10" W x 8" H x 3" D',
    badge: 'New',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    colors: ['Burgundy', 'Tan', 'Black']
  },
  {
    id: 3,
    name: 'Venetian Evening Clutch',
    price: '$159',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&h=1000&fit=crop'
    ],
    category: 'clutches',
    description: 'Sophisticated evening elegance inspired by Venetian luxury. The perfect companion for special occasions.',
    features: [
      'Satin finish with beaded details',
      'Detachable chain strap',
      'Magnetic closure',
      'Silk-lined interior'
    ],
    materials: 'Satin with Beaded Accents',
    dimensions: '9" W x 5" H x 2" D',
    badge: 'Limited',
    rating: 4.7,
    reviews: 67,
    inStock: true,
    colors: ['Gold', 'Silver', 'Rose Gold']
  },
  {
    id: 4,
    name: 'London Shoulder Bag',
    price: '$249',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&h=1000&fit=crop',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop'
    ],
    category: 'shoulder-bags',
    description: 'Classic British elegance reimagined for the modern woman. Timeless design meets contemporary functionality.',
    features: [
      'Classic structured design',
      'Top handle and shoulder strap',
      'Multiple interior pockets',
      'Premium hardware'
    ],
    materials: 'Full Grain Leather',
    dimensions: '12" W x 10" H x 4" D',
    rating: 4.6,
    reviews: 92,
    inStock: true,
    colors: ['Black', 'Camel', 'Wine']
  },
  // Add more products for variety
  {
    id: 5,
    name: 'Monaco Mini Bag',
    price: '$179',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop',
    category: 'crossbody',
    description: 'Compact luxury for the minimalist. Perfect for essential carrying.',
    features: ['Compact design', 'Adjustable strap', 'Premium finish'],
    materials: 'Saffiano Leather',
    dimensions: '8" W x 6" H x 3" D',
    rating: 4.5,
    reviews: 45,
    inStock: true
  },
  {
    id: 6,
    name: 'Sydney Work Tote',
    price: '$329',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
    category: 'tote-bags',
    description: 'Professional elegance for the working woman.',
    features: ['Laptop compartment', 'Professional design', 'Durable construction'],
    materials: 'Business Leather',
    dimensions: '16" W x 13" H x 5" D',
    rating: 4.7,
    reviews: 78,
    inStock: true
  }
];

export const categories = [
  {
    id: 'tote-bags',
    name: 'Tote Bags',
    description: 'Spacious and sophisticated',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    count: products.filter(p => p.category === 'tote-bags').length
  },
  {
    id: 'shoulder-bags',
    name: 'Shoulder Bags',
    description: 'Classic elegance redefined',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
    count: products.filter(p => p.category === 'shoulder-bags').length
  },
  {
    id: 'crossbody',
    name: 'Crossbody',
    description: 'Freedom meets fashion',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    count: products.filter(p => p.category === 'crossbody').length
  },
  {
    id: 'clutches',
    name: 'Clutches',
    description: 'Evening sophistication',
    image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&h=400&fit=crop',
    count: products.filter(p => p.category === 'clutches').length
  }
];

export const getBestSellers = () => products.filter(p => p.rating >= 4.6).slice(0, 4);

export const getProductById = (id: number) => products.find(p => p.id === id);

export const getProductsByCategory = (categoryId: string) => 
  products.filter(p => p.category === categoryId);

export const searchProducts = (query: string) => 
  products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );