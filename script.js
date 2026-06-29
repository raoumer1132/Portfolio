document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A: STABLE & FIXED PREMIUM PAGE TRANSITION MECHANISM
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    
    // Force reset body visibility immediately on ready state trigger
    document.body.style.opacity = "1";
    document.body.classList.add("page-ready");
    if (overlay) overlay.classList.add("fade-out");

    // Click handler for links with explicit safety escape strings
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Bypass transition loops on local anchors or code triggers
        if (href === "#" || href.startsWith("#") || link.closest(".sidebar-toggle-trigger") || link.closest(".sidebar-links")) {
            return;
        }

        const isBlank = link.getAttribute("target") === "_blank";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");
        
        if (!isBlank && !isExternal) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const targetUrl = this.href;
                
                if (overlay) overlay.classList.remove("fade-out");
                document.body.style.opacity = "0";
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 250);
            });
        }
    });

    // Pageshow dynamic cache reset protection
    window.addEventListener("pageshow", (event) => {
        document.body.style.opacity = "1";
        document.body.classList.add("page-ready");
        if (overlay) overlay.classList.add("fade-out");
    });

    // ==========================================================================
    // B: SIDEBAR TOGGLE MECHANISM
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            geminiSidebar.classList.toggle("open-sidebar");
            geminiSidebar.classList.toggle("open");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    if (sidebarOverlay && geminiSidebar) {
        sidebarOverlay.addEventListener("click", () => {
            geminiSidebar.remove("open-sidebar");
            geminiSidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        });
    }
});
