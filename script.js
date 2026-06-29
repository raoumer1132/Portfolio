document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // 2. CLEAN & UNIFORM SIDEBAR TOGGLE SYSTEM
    // Ab saare pages par naye classes hain, toh sirf naye selectors use honge
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle expanded class smoothly
            geminiSidebar.classList.toggle("sidebar-expanded");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Overlay par click karne se sidebar close ho jaye (Mobile responsive flow)
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) {
                geminiSidebar.classList.remove("sidebar-expanded");
            }
            sidebarOverlay.classList.remove("show");
        });
    }
});
