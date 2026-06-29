document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY FIX
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
        overlay.addEventListener("transitionend", () => {
            overlay.style.display = "none";
        });
    } else {
        // Agar page transition overlay body me na bhi ho, toh code freeze nahi hoga
        console.log("Overlay container missing on this page layout");
    }

    // 2. SIDEBAR TOGGLE MECHANISM
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay") || document.querySelector(".sidebar-overlay");

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

    // Close when clicking outside
    document.addEventListener("click", (e) => {
        if (geminiSidebar && geminiSidebar.classList.contains("sidebar-expanded")) {
            if (!geminiSidebar.contains(e.target) && sidebarToggleBtn && !sidebarToggleBtn.contains(e.target)) {
                geminiSidebar.classList.remove("sidebar-expanded");
                if (sidebarOverlay) sidebarOverlay.classList.remove("show");
            }
        }
    });
});
