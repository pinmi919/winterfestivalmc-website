// 活動時間: 2026/12/05
const targetDate = new Date("2026-12-05T00:00:00+08:00").getTime();

function updateCountdown() {
    const timerElement = document.getElementById("timer");
    if (!timerElement) return; // 確保元素存在

    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        timerElement.innerHTML = "❄️ 冬境大門已開啟 ❄️";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    timerElement.innerHTML = `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
}

setInterval(updateCountdown, 1000);
updateCountdown();