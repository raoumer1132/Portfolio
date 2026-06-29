document.addEventListener("DOMContentLoaded", () => {
    
    // 1. PAGE TRANSITION OVERLAY (Click Blocking Fix)
    const overlay = document.querySelector(".page-transition-overlay");
    if (overlay) {
        overlay.classList.add("fade-out");
        
        // Jab fade-out animation poori ho jaye, toh overlay ko display none kar dein
        // taake yeh baaki page ke buttons ke clicks ko block na kare
        overlay.addEventListener("transitionend", () => {
            overlay.style.display = "none";
        });
    }

    // 2. CLEAN & UNIFORM SIDEBAR TOGGLE SYSTEM
    const sidebarToggleBtn = document.querySelector(".sidebar-toggle-trigger");
    const geminiSidebar = document.querySelector(".gemini-sidebar");
    
    // Safety check: Dono ID ya Class selector se handle ho jaye
    const sidebarOverlay = document.getElementById("sidebarOverlay") || document.querySelector(".sidebar-overlay");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation(); // Click event ko baahir window tak jaane se rokta hai
            
            // Toggle expanded class smoothly
            geminiSidebar.classList.toggle("sidebar-expanded");
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.toggle("show");
            }
        });
    }

    // 3. OUTSIDE CLICK CLOSURE (Global Fix)
    // Agar user sidebar se baahir kahin bhi screen par click kare (overlay par ya page par), sidebar close ho jaye
    document.addEventListener("click", (e) => {
        // Agar sidebar khula hua hai aur click sidebar ke andar NAHI hua, aur na hi toggle button par hua hai
        if (geminiSidebar && geminiSidebar.classList.contains("sidebar-expanded")) {
            if (!geminiSidebar.contains(e.target) && !sidebarToggleBtn.contains(e.target)) {
                
                geminiSidebar.classList.remove("sidebar-expanded");
                
                if (sidebarOverlay) {
                    sidebarOverlay.classList.remove("show");
                }
            }
        }
    });

    // Explicit Overlay click backup
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener("click", () => {
            if (geminiSidebar) {
                geminiSidebar.classList.remove("sidebar-expanded");
            }
            sidebarOverlay.classList.remove("show");
        });
    }
});
