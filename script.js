document.addEventListener("DOMContentLoaded", () => {
    // ==========================================================================
    // 1. PERFECT SIDEBAR TOGGLE LOGIC (Slim to Wide States)
    // ==========================================================================
    const sidebar = document.getElementById("geminiSidebar");
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // CSS ki .sidebar-expanded class ke sath match kiya
            sidebar.classList.toggle("sidebar-expanded");
            
            // Agar mobile overlay element majood hai toh use bhi toggle karein
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Sidebar ke bahar kahin bhi click karne par use wapas close karne ke liye
    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("sidebar-expanded")) {
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("sidebar-expanded");
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // ==========================================================================
    // 2. SEAMLESS PAGE TRANSITION LOGIC (Teeno Pages ke Liye)
    // ==========================================================================
    const transitionOverlay = document.querySelector(".page-transition-overlay");

    // Page Load hote hi smooth entry (Black screen transparent ho jayegi)
    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.add("fade-out");
        }, 50); // Minor browser rendering delay
    }

    // Links par click karne par smooth Exit transition
    const links = document.querySelectorAll("a");
    
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetUrl = this.getAttribute("href");

            // Sirf valid internal layout pages ko animate karein
            if (
                targetUrl && 
                !targetUrl.startsWith("#") && 
                !targetUrl.startsWith("http") && 
                this.getAttribute("target") !== "_blank"
            ) {
                e.preventDefault(); // Default jump rokein
                
                if (transitionOverlay) {
                    transitionOverlay.classList.remove("fade-out");
                    transitionOverlay.classList.add("fade-in");

                    // 400ms (0.4s) ke baad redirect karein jab animation poori ho jaye
                    setTimeout(() => {
                        window.location.href = targetUrl;
                    }, 400); 
                } else {
                    // Fallback agar kisi page par overlay div missing ho
                    window.location.href = targetUrl;
                }
            }
        });
    });
});
