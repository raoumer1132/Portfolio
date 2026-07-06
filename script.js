document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SIDEBAR TOGGLE LOGIC
    // ==========================================
    const toggleBtn = document.getElementById("sidebarToggleBtn") || document.querySelector(".global-toggle-btn");
    const sidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); 
            
            sidebar.classList.toggle("sidebar-open");
            document.body.classList.toggle("sidebar-open");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Screen par kahin bhi bahar click karne se sidebar close ho jaye
    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("sidebar-open")) {
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("sidebar-open");
                document.body.classList.remove("sidebar-open");
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // ==========================================
    // 2. SEAMLESS PAGE TRANSITION LOGIC
    // ==========================================
    const transitionOverlay = document.querySelector(".page-transition-overlay");

    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.add("fade-out");
        }, 50);
    }

    const links = document.querySelectorAll("a");

    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetUrl = this.getAttribute("href");

            if (
                targetUrl &&
                !targetUrl.startsWith("#") &&
                !targetUrl.startsWith("http") &&
                this.getAttribute("target") !== "_blank"
            ) {
                e.preventDefault();

                if (transitionOverlay) {
                    transitionOverlay.classList.remove("fade-out");
                    transitionOverlay.classList.add("fade-in");

                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 400);
                } else {
                    window.location.href = targetUrl;
                }
            }
        });
    });

    // ==========================================
    // 3. CART ADD TO CART LOGIC
    // ==========================================
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let cart = JSON.parse(localStorage.getItem('portfolioCart')) || [];
            
            const packageName = e.target.getAttribute('data-name');
            const packagePrice = parseFloat(e.target.getAttribute('data-price'));

            const item = {
                name: packageName,
                price: packagePrice,
                quantity: 1
            };

            const existingItemIndex = cart.findIndex(cartItem => cartItem.name === packageName);

            if (existingItemIndex > -1) {
                cart[existingItemIndex].quantity += 1;
            } else {
                cart.push(item);
            }

            localStorage.setItem('portfolioCart', JSON.stringify(cart));
            updateCartBadge();
            alert(`${packageName} successfully cart me add ho gaya hai!`);
        });
    });

    // Clear Cart button logic
    const clearCartBtn = document.getElementById('clear-cart-btn') || document.querySelector('.clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            localStorage.removeItem('portfolioCart');
            updateCartBadge(); 
            alert("Cart successfully clear ho gaya hai!");
            
            if(window.location.pathname.includes('cart.html')) {
                window.location.reload(); 
            }
        });
    }
});

// ==========================================
// 4. GLOBAL FUNCTIONS & CACHE FIX
// ==========================================
function updateCartBadge() {
    let currentCart = JSON.parse(localStorage.getItem('portfolioCart')) || [];
    const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) {
        badge.innerText = totalItems;
    }
}

// Page load hone par badge update karein
document.addEventListener("DOMContentLoaded", updateCartBadge);

// 🔥 Jab user BACK button daba kar aaye, tab bhi badge 0 ho jaye!
window.addEventListener("pageshow", (event) => {
    if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
        updateCartBadge();
    }
});
