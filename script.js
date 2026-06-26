// 6. PREMIUM SMOOTH PAGE LEAVE TRANSITION
const overlay = document.querySelector(".page-transition-overlay");

// A: Jab page ready ho jaye toh smooth Fade-In effect dein
setTimeout(() => {
    if (overlay) overlay.classList.add("fade-out");
    document.body.classList.add("page-ready");
}, 100);

// B: Jab user kisi bhi navbar ya dusre page ke link par click kare
document.querySelectorAll("a").forEach(link => {
    // Check karein ke link kahin external website ya same page ka anchor (#) toh nahi hai
    const isAnchor = link.getAttribute("href").startsWith("#");
    const isBlank = link.getAttribute("target") === "_blank";

    if (!isAnchor && !isBlank && link.getAttribute("href")) {
        link.addEventListener("click", function(e) {
            e.preventDefault(); // Furan page change hone se rokein
            const targetUrl = this.href;

            // Overlay ko wapas screen par layein (Fade-Out Animation)
            if (overlay) overlay.classList.remove("fade-out");
            document.body.style.opacity = "0";
            document.body.style.transform = "scale(0.99)";

            // Animation mukammal hone ke baad dusre page par redirect karein
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); // 500ms tak animation chalegi
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const sidebarToggleBtn = document.getElementById("sidebarToggleBtn");
    const geminiSidebar = document.getElementById("geminiSidebar");

    if (sidebarToggleBtn && geminiSidebar) {
        sidebarToggleBtn.addEventListener("click", () => {
            // .collapsed class toggle hogi jo width shrink karegi
            geminiSidebar.classList.toggle("collapsed");
        });
    }
});
