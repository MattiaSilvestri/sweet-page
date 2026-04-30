import './style.css'
import { loadTab, openTab } from "./common/utils";
import { addClock, addModal, addPoetry, addSearchBar, addTab } from "./common/components";
import "iconify-icon";
import { Banner } from './components/banner';
import { Calendar } from './components/calendar';

document.addEventListener("DOMContentLoaded", () => {
  // Add banner
  const banner = new Banner();
  banner.render();

  addClock();
  addPoetry(7);

  // Add calendar
  const calendar = new Calendar();
  calendar.render();

  addSearchBar();
  addModal();
  addTab();
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
