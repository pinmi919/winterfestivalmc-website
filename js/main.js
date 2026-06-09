// 動態載入 HTML 元件的函數
async function loadComponent(id, url, callback = null) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(id).innerHTML = html;
        if (callback) callback();
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// 依序載入所有區塊
document.addEventListener("DOMContentLoaded", () => {
    loadComponent("navbar-container", "components/navbar.html");
    
    // Hero 載入完成後，再載入倒數計時 JS
    loadComponent("hero-container", "components/hero.html", () => {
        const script = document.createElement("script");
        script.src = "js/countdown.js";
        document.body.appendChild(script);
    });

    loadComponent("about-container", "components/about.html");
    loadComponent("world-container", "components/world.html");
    loadComponent("schedule-container", "components/schedule.html");
    loadComponent("requirements-container", "components/requirements.html");
    loadComponent("plugins-container", "components/plugins.html");
    loadComponent("footer-container", "components/footer.html");
});