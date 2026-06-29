document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION AND CONTENT VISIBILITY INITIALIZATION
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Smooth page unloading intercept loops
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

    // 2. SIDEBAR CLICK AND OVERLAY TOGGLE REGISTER
    const sidebarBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarBtn && geminiSidebar) {
        sidebarBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle sidebar open state smoothly
            geminiSidebar.classList.toggle("open-sidebar");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Backdrop overlay dynamic click handler to close sidebar safely
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("open-sidebar");
            sidebarOverlay.classList.remove("show");
        });
    }
});
