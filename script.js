document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Safe Page Readiness Triggers
    document.body.style.opacity = "1";
    document.body.classList.add("page-ready");
    const transitionOverlay = document.querySelector(".page-transition-overlay");
    if (transitionOverlay) {
        transitionOverlay.classList.add("fade-out");
    }

    // 2. CREATE A STANDALONE FLOATING BUTTON IF NOT PRESENT IN BODY FOR EASY DESKTOP TOGGLE
    if (!document.querySelector(".sidebar-toggle-trigger-fixed")) {
        const fixedBtn = document.createElement("button");
        fixedBtn.className = "sidebar-toggle-trigger-fixed";
        fixedBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        document.body.appendChild(fixedBtn);
    }

    // 3. TARGETING BOTH BUTTONS (Inside sidebar & Floating layout button)
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const toggleButtons = document.querySelectorAll(".sidebar-toggle-trigger, .sidebar-toggle-trigger-fixed");

    toggleButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (geminiSidebar) {
                geminiSidebar.classList.toggle("open-sidebar");
            }
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    });

    // Close sidebar on overlay click
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) geminiSidebar.classList.remove("open-sidebar");
            sidebarOverlay.classList.remove("show");
        });
    }
});
