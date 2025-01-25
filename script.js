// DOM Elements
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navMenu = document.querySelector(".nav-menu");
const closeBanner = document.querySelector(".close-banner");

// State
let products = [];
let filteredProducts = [];

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    products = data.slice(0, 8);
    filteredProducts = [...products];
    renderProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    productsGrid.innerHTML =
      "<p>Error loading products. Please try again later.</p>";
  }
}

// Format price
function formatPrice(price) {
  return `$${price.toFixed(2)}`;
}

// Generate star rating
function generateRating(rate) {
  const fullStars = Math.floor(rate);
  const hasHalfStar = rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    "★".repeat(fullStars) + (hasHalfStar ? "⭐" : "") + "☆".repeat(emptyStars)
  );
}

// Render products
function renderProducts() {
  productsGrid.innerHTML = filteredProducts
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="rating">${generateRating(product.rating.rate)}</div>
                <div class="price">
                    <span class="current-price">${formatPrice(
                      product.price
                    )}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Filter products
function filterProducts(searchTerm) {
  filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderProducts();
}

// Toggle mobile menu
function toggleMobileMenu() {
  navMenu.classList.toggle("active");
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Initialize
  fetchProducts();

  // Search functionality
  searchInput?.addEventListener("input", (e) => {
    filterProducts(e.target.value);
  });

  // Mobile menu
  mobileMenuBtn?.addEventListener("click", toggleMobileMenu);

  // Close banner
  closeBanner?.addEventListener("click", () => {
    closeBanner.parentElement.style.display = "none";
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  if (window.innerWidth > 390) {
    navMenu?.classList.remove("active");
  }
});
