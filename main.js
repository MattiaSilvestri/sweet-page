import { openTab } from "./src/common/utils";
import { addLinkButton } from "./src/common/components";
import "./src/css/style.css";

document.addEventListener("DOMContentLoaded", () => {
  // Add link buttons
  addLinkButton();

  // Attach event listeners for tab buttons
  const buttons = document.querySelectorAll(".tablinks");
  buttons.forEach(btn => {
    btn.addEventListener("click", evt => {
      const city = btn.dataset.city;
      openTab(evt, city);
    });
  });
})
