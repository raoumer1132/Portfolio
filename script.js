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
            e.stopPropagation(); // Click event ko baqi body par click hone se rokta hai
            
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

            // External links ya section anchors (#) ko transition overlay block na kare
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
});

// Page load hote hi black screen overlay ko remove karne ke liye
window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
        setTimeout(() => {
            overlay.style.display = "none";
        }, 400);
    }
});

// Cart check karega agar pehle se LocalStorage me data hai
let cart = JSON.parse(localStorage.getItem('portfolioCart')) || [];

const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
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

        // LocalStorage me save karna
        localStorage.setItem('portfolioCart', JSON.stringify(cart));

        // UI update engine trigger
        updateCartBadge();

        alert(`${packageName} successfully cart me add ho gaya hai!`);
    });
});
/* IS NAYE CODE KO APNI FILE KE BILKUL END MEIN PASTE KAREIN */

// 1. Badge update karne ka function
function updateCartBadge() {
    let currentCart = JSON.parse(localStorage.getItem('portfolioCart')) || [];
    const totalItems = currentCart.reduce((total, item) => total + item.quantity, 0);
    const badge = document.getElementById('cart-count');
    if(badge) {
        badge.innerText = totalItems;
    }
}
document.addEventListener("DOMContentLoaded", updateCartBadge);

// 2. Clear Cart karne par number foran 0 karne ka logic
const clearCartBtn = document.getElementById('clear-cart-btn') || document.querySelector('.clear-cart-btn');

if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        // LocalStorage se cart remove kiya
        localStorage.removeItem('portfolioCart');
        
        // Cart array ko bhi khaali kiya taake purana data load na ho
        cart = []; 
        
        // FORAN badge ko 0 karne ke liye trigger kiya
        updateCartBadge(); 
        
        alert("Cart successfully clear ho gaya hai!");
    });
}
