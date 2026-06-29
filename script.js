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
            
            // FIXED: 'sidebar-expanded' ki jagah aapki CSS ke mutabiq 'collapsed' use kiya hai
            geminiSidebar.classList.toggle("collapsed");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // 3. CLOSE SIDEBAR WHEN CLICKING OUTSIDE
    document.addEventListener("click", (e) => {
        // FIXED: 'sidebar-expanded' ki jagah check kiya ke jab sidebar 'collapsed' NA HO (yani open ho)
        if (geminiSidebar && !geminiSidebar.classList.contains("collapsed")) {
            // Check agar click sidebar par ya toggle button par nahi hua
            const clickedInsideSidebar = geminiSidebar.contains(e.target);
            const clickedToggleButton = sidebarToggleBtn && sidebarToggleBtn.contains(e.target);

            if (!clickedInsideSidebar && !clickedToggleButton) {
                geminiSidebar.classList.add("collapsed"); // Hide sidebar
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // 4. OVERLAY CLICK TO CLOSE SIDEBAR
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.add("collapsed"); // Hide sidebar
            sidebarOverlay.classList.remove("show");
        });
    }
});
