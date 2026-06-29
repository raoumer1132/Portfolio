document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION & VISIBILITY SAFETY RESETS
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Intercept standard internal links safely
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const isAnchor = href === "#" || href.startsWith("#");
        const isSidebarChild = link.closest(".gemini-sidebar");
        const isBlank = link.getAttribute("target") === "_blank";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");

        if (!isAnchor && !isSidebarChild && !isBlank && !isExternal) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const targetUrl = this.href;
                if (overlay) overlay.classList.remove("fade-out");
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 250);
            });
        }
    });

    // ==========================================================================
    // 2. FIXED SIDEBAR TOGGLE MECHANISM (CLICK HANDLING FIX)
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle dynamic open/close CSS states safely
            geminiSidebar.classList.toggle("sidebar-expanded");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Close sidebar safely if the user clicks anywhere outside on the main layout
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("sidebar-expanded");
            sidebarOverlay.classList.remove("show");
        });
    }
});
