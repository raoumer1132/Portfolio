document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A: SMOOTH PAGE TRANSITION PROTECTION SYSTEM
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    
    // Dynamic immediate recovery loops forcing document state visibility
    document.body.style.opacity = "1";
    document.body.classList.add("page-ready");
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Capture explicit local relative link clicks safely
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        // Condition rules ignoring click captures on anchors or external buttons
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

    // Window configuration loading protection cache reset
    window.addEventListener("pageshow", (event) => {
        document.body.style.opacity = "1";
        document.body.classList.add("page-ready");
        if (overlay) overlay.classList.add("fade-out");
    });

    // ==========================================================================
    // B: CLEAN OVERLAY FIXED TOGGLE INJECTION
    // ==========================================================================
    // Creates a standalone perfect responsive burger on screen viewport if missing
    if (!document.querySelector(".global-sidebar-trigger")) {
        const burgerBtn = document.createElement("button");
        burgerBtn.className = "global-sidebar-trigger";
        burgerBtn.setAttribute("type", "button");
        burgerBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.appendChild(burgerBtn);
    }

    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const triggers = document.querySelectorAll(".sidebar-toggle-trigger, .global-sidebar-trigger");

    triggers.forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (geminiSidebar) {
                geminiSidebar.classList.toggle("open-sidebar");
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    });

    // Smoothly close active drawer when clicking out of the viewport panel
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("open-sidebar");
            sidebarOverlay.classList.remove("show");
        });
    }
});
