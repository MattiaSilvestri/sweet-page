export class Clock {
  constructor() {
    this.timeEl = document.getElementById('clock-time');
    this.dateEl = document.getElementById('clock-date');
    this.days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    this.months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  }

  updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    if (this.timeEl) this.timeEl.innerHTML = `<span id="clock-h">${hh}</span>:<span id="clock-mm">${mm}</span>:<span id="clock-ss">${ss}</span>`;
    if (this.dateEl) {
      const day = this.days[now.getDay()];
      const month = this.months[now.getMonth()];
      const date = String(now.getDate()).padStart(2, '0');
      this.dateEl.textContent = `${day} ${month} ${date}`;
    }
  }
}
