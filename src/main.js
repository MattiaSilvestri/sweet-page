import './style.css'
import { loadTab, openTab } from "./common/utils";
import { addLinkButton } from "./common/components";

document.addEventListener("DOMContentLoaded", () => {
  // Add link buttons
  addLinkButton();
  // Attach event listeners for tab buttons
  const buttons = document.querySelectorAll(".tablinks");
  buttons.forEach(btn => {
    btn.addEventListener("click", evt => {
      const city = btn.dataset.city;
      openTab(city, { evt: evt });
    });
  });
  // Load last tab
  loadTab();
})
