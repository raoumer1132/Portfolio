document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A: STABLE & CRASH-PROOF PAGE TRANSITION MECHANISM
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    
    // Force visibility state safety resets immediately
    document.body.style.opacity = "1";
    document.body.classList.add("page-ready");
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Smooth page navigation click filtering selector
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Bypass transition conditions for external social logic and sidebar loops
        const isAnchor = href === "#" || href.startsWith("#");
        const isSidebarChild = link.closest(".gemini-sidebar");
        const isBlank = link.getAttribute("target") === "_blank";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");

        if (!isAnchor && !isSidebarChild && !isBlank && !isExternal) {
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

    window.addEventListener("pageshow", (event) => {
        document.body.style.opacity = "1";
        document.body.classList.add("page-ready");
        if (overlay) overlay.classList.add("fade-out");
    });

    // ==========================================================================
    // B: SIDEBAR TOGGLE MECHANISM (ISOLATED EXECUTION)
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle both standard selectors smoothly
            geminiSidebar.classList.toggle("open-sidebar");
            geminiSidebar.classList.toggle("open");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    if (sidebarOverlay && geminiSidebar) {
        sidebarOverlay.addEventListener("click", () => {
            geminiSidebar.classList.remove("open-sidebar");
            geminiSidebar.classList.remove("open");
            sidebarOverlay.classList.remove("show");
        });
    }
});
