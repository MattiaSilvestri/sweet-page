import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };
import { SettingsModal } from "../components/modal.js";
import { readSettings, saveSettings } from "./settings.js";
import { SearchBar } from "../components/searcBar.js";
import { Clock } from "../components/clock.js";
import { Poetry } from "../components/poetry.js";
import dayjs from "dayjs";

function addLinkButtons(tab) {
  for (const [key, value] of Object.entries(tab.links)) {
    new LinkButton({
      text: key,
      container: document.getElementById("links"),
      iconColor: value["icon-color"],
      icon: value.icon,
      container: document.getElementById(tab.config.name), // Create inside tab
      href: value.link
      // onClick: () => {
      //   window.open(value.link);
      // },
    })
  }
}

export function addClock() {
  const clock = new Clock();
  clock.updateClock();
  setInterval(() => clock.updateClock(), 1000);
}

export async function addPoetry(linecount) {
  if (!localStorage.getItem("poetry")) {
    const dailyPoetry = new Poetry(linecount);
    await dailyPoetry.ready;
    localStorage.setItem("poetry", JSON.stringify(dailyPoetry.poetry));
    return;
  }

  const dailyPoetry = JSON.parse(localStorage.getItem("poetry"));
  const [date, time] = dailyPoetry.timestamp.split(", ");
  const [day, month, year] = date.split("/");
  const poetryDate = new Date(`${year}-${month}-${day}T${time}`);
  const isAnotherDay = new Date().toDateString() !== poetryDate.toDateString();
  if (isAnotherDay) {
    const dailyPoetry = new Poetry(linecount);
    await dailyPoetry.ready;
    localStorage.setItem("poetry", JSON.stringify(dailyPoetry.poetry));
  } else {
    const dailyPoetry = JSON.parse(localStorage.getItem("poetry"));
    const poetryEl = document.getElementById("poetry");
    const authorEl = document.createElement("div");
    authorEl.id = "author";
    authorEl.classList.add("mt-3", "italic", "flex", "justify-end");
    authorEl.textContent = dailyPoetry.author;
    poetryEl.textContent = dailyPoetry.formatted;
    poetryEl.appendChild(authorEl);
  }
}

export function addSearchBar() {
  new SearchBar();
}

export function addTab() {
  for (const [key, value] of Object.entries(config)) {
    // Create new tab first
    const tab = new Tab({
      text: key,
      links: value.links
    })

    // Add buttons for this tab
    addLinkButtons(tab);
  }
}

export function addModal() {
  // Read settings from config and create modal
  // const settings = Object.fromEntries(Object.entries(config.settings))
  new SettingsModal()
  // Append settings modal event handlers //
  // Open modal
  const modal = document.getElementById("settings-modal");
  document.getElementById("settings").addEventListener("click", () => modal.classList.add("open"));
  // Close modal
  modal.querySelector("#settings-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
  // Save settings
  modal.querySelector("#settings-save").addEventListener("click", () => saveSettings(modal));
}
