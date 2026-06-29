document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // A: PAGE TRANSITION MECHANISM
    // ==========================================================================
    const overlay = document.querySelector(".page-transition-overlay");
    setTimeout(() => {
        if (overlay) overlay.classList.add("fade-out");
        document.body.classList.add("page-ready");
    }, 100);

    // Yeh code sirf un links par chalega jo dusre HTML pages par le kar jaate hain
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
                }, 400);
            });
        }
    });

    // ==========================================================================
    // B: SIDEBAR TOGGLE MECHANISM (UPDATED FOR NEW CSS)
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.stopPropagation(); // Click bubble up hone se rokta hai
            
            /* Humne CSS ko update kiya hai taake mobile aur desktop 
               dono par ek hi standard ".open-sidebar" class apply ho.
            */
            geminiSidebar.classList.toggle("open-sidebar");
        });
    }
});
