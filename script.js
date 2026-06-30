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
           
            sidebar.classList.toggle("sidebar-expanded");
            
            document.body.classList.toggle("sidebar-open");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("sidebar-expanded")) {
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("sidebar-expanded");
                
                document.body.classList.remove("sidebar-open");
                
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

    if (transitionOverlay) {
        setTimeout(() => {
            transitionOverlay.classList.add("fade-out");
        }, 50); 
    }

    const links = document.querySelectorAll("a");
    
    links.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetUrl = this.getAttribute("href");

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
