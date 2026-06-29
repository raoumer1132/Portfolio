document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // 2. SIDEBAR CLICK TOGGLE SYSTEM
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            geminiSidebar.classList.toggle("sidebar-expanded");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // Close sidebar when clicking outside on overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("sidebar-expanded");
            sidebarOverlay.classList.remove("show");
        });
    }
});
