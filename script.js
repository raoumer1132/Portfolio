document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // ==========================================================================
    // 2. SIDEBAR CLICK TOGGLE SYSTEM (ID TARGETING FIXED)
    // ==========================================================================
    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const geminiSidebar = document.getElementById("geminiSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        console.log("Elements detected correctly!");

        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Toggle 'sidebar-expanded' class
            geminiSidebar.classList.toggle("sidebar-expanded");
            
            // Backdrop overlay handling
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    } else {
        console.log("Error: HTML IDs matching missed!");
    }

    // Close sidebar when clicking outside on the overlay mask
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("sidebar-expanded");
            sidebarOverlay.classList.remove("show");
        });
    }
});
