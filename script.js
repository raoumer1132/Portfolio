document.addEventListener("DOMContentLoaded", () => {
    
    // PAGE TRANSITION EFFECT
    const overlay = document.querySelector(".page-transition-overlay");
    document.body.style.opacity = "1";
    if (overlay) {
        overlay.classList.add("fade-out");
    }

    // Intercept standard internal links for smooth loading animations
    document.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (!href) return;

        const isAnchor = href === "#" || href.startsWith("#");
        const isBlank = link.getAttribute("target") === "_blank";
        const isExternal = href.startsWith("http://") || href.startsWith("https://");

        if (!isAnchor && !isBlank && !isExternal) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const targetUrl = this.href;
                if (overlay) overlay.classList.remove("fade-out");
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 250);
            });
        }
    });
});
