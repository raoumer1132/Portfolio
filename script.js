document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE INTRO & OVERLAY FIX
    const overlay = document.querySelector(".page-transition-overlay");
    
    // Page ready class body par lagana ta ke page fade-in ho (CSS target)
    document.body.classList.add("page-ready");

    if (overlay) {
        overlay.classList.add("fade-out");
        overlay.addEventListener("transitionend", () => {
            overlay.style.display = "none";
        });
    } else {
        console.log("Overlay container missing on this page layout");
    }

    // 2. SIDEBAR TOGGLE MECHANISM
    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn") || document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.getElementById("geminiSidebar") || document.querySelector(".gemini-sidebar");
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

    // 3. CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    document.addEventListener("click", (e) => {
        if (geminiSidebar && geminiSidebar.classList.contains("sidebar-expanded")) {
            // Check agar click sidebar par ya toggle button par nahi hua
            const clickedInsideSidebar = geminiSidebar.contains(e.target);
            const clickedToggleButton = sidebarToggleBtn && sidebarToggleBtn.contains(e.target);

            if (!clickedInsideSidebar && !clickedToggleButton) {
                geminiSidebar.classList.remove("sidebar-expanded");
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // 4. OVERLAY CLICK TO CLOSE SIDEBAR
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("sidebar-expanded");
            sidebarOverlay.classList.remove("show");
        });
    }
});
