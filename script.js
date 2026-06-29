document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. PAGE TRANSITION & VISIBILITY SAFETY RESETS
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    document.body.classList.add("page-ready");
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Dynamic clean links handling logic
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

    window.addEventListener("pageshow", () => {
        document.body.style.opacity = "1";
        if (overlay) overlay.classList.add("fade-out");
    });

    // ==========================================================================
    // 2. PERFECT SIDEBAR TOGGLE USING INTERIOR TRIGGER BUTTON
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle active visual states smoothly
            geminiSidebar.classList.toggle("open-sidebar");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Close when overlay panel backdrop mask layout is clicked
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("open-sidebar");
            sidebarOverlay.classList.remove("show");
        });
    }
});
