document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // ==========================================================================
    // 2. FIXED SIDEBAR TOGGLE MECHANISM (CLASS INTERACTION FIXED)
    // ==========================================================================
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        console.log("Sidebar elements bounded successfully!");

        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle 'sidebar-expanded' matching CSS expansion rules
            geminiSidebar.classList.toggle("sidebar-expanded");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Close when mask layout overlay is pressed
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("sidebar-expanded");
            sidebarOverlay.classList.remove("show");
        });
    }
});
