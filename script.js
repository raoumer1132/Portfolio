document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SIDEBAR TOGGLE LOGIC
    // ==========================================
    const toggleBtn = document.getElementById("sidebarToggleBtn") || document.querySelector(".global-toggle-btn");
    const sidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.querySelector(".sidebar-overlay");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Click event ko baqi body par click hone se rokta hai
            
            sidebar.classList.toggle("sidebar-open");
            document.body.classList.toggle("sidebar-open");

            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Screen par kahin bhi bahar click karne se sidebar close ho jaye
    document.addEventListener("click", (e) => {
        if (sidebar && sidebar.classList.contains("sidebar-open")) {
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.remove("sidebar-open");
                document.body.classList.remove("sidebar-open");
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // ==========================================
    // 2. SEAMLESS PAGE TRANSITION LOGIC
    // ==========================================
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

            // External links ya section anchors (#) ko transition overlay block na kare
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
        setTimeout(() => {
            overlay.style.display = "none";
        }, 400);
    }
});
