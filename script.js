document.addEventListener("DOMContentLoaded", () => {
    // 1. PERFECT HIDDEN-TO-SLIDE SIDEBAR LOGIC
    const sidebar = document.querySelector(".gemini-sidebar");
    const toggleBtn = document.getElementById("sidebarToggleBtn") || document.querySelector(".global-toggle-btn");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (sidebar && toggleBtn) {
        // Bars button click event
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Click event ko baqi body par click hone se rokta hai
            
            // Sidebar aur Body par open classes toggle karein
            sidebar.classList.toggle("sidebar-open");
            document.body.classList.toggle("sidebar-open");
            
            // Background overlay ko toggle karne ke liye
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Screen par kahin bhi bahar click karne se ya overlay par tap karne se sidebar close ho jaye
    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("sidebar-open")) {
            // Agar click sidebar ke andar ya hamburger toggle button par NAHI hua
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("sidebar-open");
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

            // External links (LinkedIn, Calendly, Daraz etc.) ko transition overlay block na kare
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
        // Page load hote hi black screen overlay ko remove karne ke liye
window.addEventListener("DOMContentLoaded", () => {
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
        
        // 400ms baad element ko display none kar dein taake ye rasta na rokay
        setTimeout(() => {
            overlay.style.display = "none";
        }, 400);
    }
});
