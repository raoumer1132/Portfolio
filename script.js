document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A: PREMIUM PAGE TRANSITION MECHANISM (STABLE VERSION)
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    
    // Page load hote hi opacity reset karne ka safe mechanism
    setTimeout(() => {
        if (overlay) overlay.classList.add("fade-out");
        document.body.classList.add("page-ready");
        document.body.style.opacity = "1"; // Explicitly force visibility
    }, 100);

    // Click handler for smooth transitions
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const isAnchor = href.startsWith("#");
        const isBlank = link.getAttribute("target") === "_blank";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");
        
        if (!isAnchor && !isBlank && !isExternal) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const targetUrl = this.href;
                
                if (overlay) overlay.classList.remove("fade-out");
                document.body.style.opacity = "0";
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 300);
            });
        }
    });

    // Fallback: Agar kisi wajah se back press ya slow loading par page stuck ho jaye
    window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
            document.body.style.opacity = "1";
            document.body.classList.add("page-ready");
        }
    });

    // ==========================================================================
    // B: SIDEBAR TOGGLE MECHANISM
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            geminiSidebar.classList.toggle("open-sidebar");
        });
    }
});
