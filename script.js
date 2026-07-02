document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. PERFECT HIDDEN-TO-SLIDE SIDEBAR LOGIC
    // ==========================================================================
    const sidebar = document.getElementById("geminiSidebar");
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebar && toggleBtn) {
        // Bars button (three bars) click event
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Click event ko baqi body par click hone se rokta hai
            
            // Sidebar ko andar/bahar slide karne ki class toggle
            sidebar.classList.toggle("sidebar-open");
            
            // Background black overlay shadow screen ko toggle karne ke liye
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
