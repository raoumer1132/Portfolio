document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.getElementById("geminiSidebar");
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const overlay = document.getElementById("sidebarOverlay");

    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Yeh line sidebar ko open/close karegi
            sidebar.classList.toggle("collapsed");
        });
    }

    // Sidebar ke bahar click karne par band karne ke liye
    document.addEventListener("click", (e) => {
        if (sidebar && !sidebar.classList.contains("collapsed")) {
            if (!sidebar.contains(e.target) && toggleBtn && !toggleBtn.contains(e.target)) {
                sidebar.classList.add("collapsed");
            }
        }
    });
});
