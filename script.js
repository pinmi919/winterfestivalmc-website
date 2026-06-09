const targetDate = new Date("2026-11-21T20:00:00+08:00").getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
        document.getElementById("timer").innerHTML = "活動已開始";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    document.getElementById("timer").innerHTML =
        `${days} 天 ${hours} 小時 ${minutes} 分 ${seconds} 秒`;
}

updateCountdown();
setInterval(updateCountdown, 1000);
