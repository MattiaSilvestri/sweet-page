import './style.css'
import { loadTab, openTab } from "./common/utils";
import { addClock, addModal, addPoetry, addSearchBar, addTab } from "./common/components";
import "iconify-icon";

document.addEventListener("DOMContentLoaded", () => {
  // Add clock
  addClock();
  // Add poetry
  addPoetry(7);
  // Add search bar settings
  addSearchBar()
  // Add settings modal
  addModal();
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
})
