import './style.css'
import { loadTab, openTab } from "./common/utils";
import { addModal, addSearchBar, addTab } from "./common/components";
import { applyAccentColor, readSettings } from "./common/settings";
import "iconify-icon";

document.addEventListener("DOMContentLoaded", () => {
  // Apply accent color from saved settings
  const settings = readSettings();
  applyAccentColor(settings['accent-color']);

  // Add search bar settings
  addSearchBar()
  // Add link buttons
  addTab();
  // Attach event listeners for tab buttons
  const buttons = document.querySelectorAll(".tablinks");
  buttons.forEach(btn => {
    btn.addEventListener("click", evt => {
      const name = btn.dataset.name;
      openTab(name, { evt: evt });
    });
  });
  // Load last tab
  loadTab();
  // Add settings modal
  addModal();

  // Live clock
  const timeEl = document.getElementById('clock-time');
  const dateEl = document.getElementById('clock-date');
  const days   = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  function updateClock() {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
    if (dateEl) {
      const day   = days[now.getDay()];
      const month = months[now.getMonth()];
      const date  = String(now.getDate()).padStart(2, '0');
      dateEl.textContent = `${day} ${month} ${date}`;
    }
  }

  updateClock();
  setInterval(updateClock, 1000);
})
