// Product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        description: "Premium sound quality with noise cancellation",
        price: 199,
        image: "images/headphones.jpg"
    },
    {
        id: 2,
        name: "Smart Watch",
        description: "Track your fitness and stay connected",
        price: 299,
        image: "images/smartwatch.jpg"
    },
    {
        id: 3,
        name: "Gaming Laptop",
        description: "High-performance gaming laptop",
        price: 1299,
        image: "images/laptop.jpg"
    },
    {
        id: 4,
        name: "Smartphone",
        description: "Latest features and camera technology",
        price: 799,
        image: "images/smartphone.jpg"
    },
    {
        id: 5,
        name: "Wireless Earbuds",
        description: "Compact and portable audio solution",
        price: 149,
        image: "images/earbuds.jpg"
    },
    {
        id: 6,
        name: "Gaming Mouse",
        description: "Precision gaming with RGB lighting",
        price: 79,
        image: "images/mouse.jpg"
    }
];

// Cart functionality
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const searchBtn = document.getElementById('searchBtn');
const cartBtn = document.getElementById('cartBtn');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const searchModal = document.getElementById('searchModal');
const cartModal = document.getElementById('cartModal');
const closeSearchModal = document.getElementById('closeSearchModal');
const closeCartModal = document.getElementById('closeCartModal');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const cartCount = document.querySelector('.cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
    updateCartDisplay();
});

// Load products
function loadProducts() {
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price}</div>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `;
    
    return card;
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
    }
}

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart modal
    if (cartItems) {
        cartItems.innerHTML = '';
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.style.cssText = `
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 0;
                    border-bottom: 1px solid #eee;
                `;
                
                cartItem.innerHTML = `
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price} x ${item.quantity}</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button onclick="updateQuantity(${item.id}, -1)" style="padding: 5px 10px;">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" style="padding: 5px 10px;">+</button>
                        <button onclick="removeFromCart(${item.id})" style="color: red; background: none; border: none; cursor: pointer;">×</button>
                    </div>
                `;
                
                cartItems.appendChild(cartItem);
            });
        }
    }
    
    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) {
        cartTotal.textContent = total;
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search modal
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
    });
    
    closeSearchModal.addEventListener('click', () => {
        searchModal.classList.remove('active');
    });
    
    // Cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
    });
    
    closeCartModal.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        const nav = document.querySelector('.nav');
        nav.classList.toggle('active');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Active navigation link
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #007bff;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


function scrollHero(direction) {
  const container = document.getElementById('heroScroll');
  const scrollAmount = window.innerWidth;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}


