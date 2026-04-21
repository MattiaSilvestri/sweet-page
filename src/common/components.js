import { GroupButton, LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };
import { SettingsModal } from "../components/modal.js";
import { saveSettings } from "./settings.js";
import { SearchBar } from "../components/searcBar.js";
import { Clock } from "../components/clock.js";
import { Poetry } from "../components/poetry.js";

export function addClock() {
  const clock = new Clock();
  clock.updateClock();
  setInterval(() => clock.updateClock(), 1000);
}

export async function addPoetry(linecount) {
  if (!localStorage.getItem("poetry")) {
    const dailyPoetry = await Poetry.create({ linecount: linecount });
    localStorage.setItem("poetry", JSON.stringify(dailyPoetry.poetry));
    return;
  }

  const dailyPoetry = JSON.parse(localStorage.getItem("poetry"));
  const poetryDate = new Date(dailyPoetry.timestamp);
  const isAnotherDay = new Date().toDateString() !== poetryDate.toDateString();
  if (isAnotherDay) {
    const dailyPoetry = await Poetry.create({ linecount });
    localStorage.setItem("poetry", JSON.stringify(dailyPoetry.poetry));
  } else {
    const dailyPoetry = JSON.parse(localStorage.getItem("poetry"));
    Poetry.createFromPoetry({ poetry: dailyPoetry });
  }
}

export function addSearchBar() {
  new SearchBar();
}

export function addTab() {
  // Add tabs.
  // This is the entry point for the rest of the elements, each tab adds the
  // group buttons, each group adds the link buttons.
  for (const [key, value] of Object.entries(config)) {
    // Create new tab first
    const tab = new Tab({
      name: key,
      content: value
    })

    // Add buttons for this tab
    addGroupButtons(tab.config);
  }
}

function addGroupButtons(tab) {
  // Takes a tab.config object and add a the button groups to it
  for (const [key, value] of Object.entries(tab.content)) {
    const group = new GroupButton({
      name: key,
      tab: tab,
      content: value,
    })
    addLinkButtons(group.config);
  }
}

function addLinkButtons(group) {
  for (const [key, value] of Object.entries(group.content)) {
    new LinkButton({
      text: key,
      iconColor: value["icon-color"],
      icon: value.icon,
      container: document.getElementById(group.name), // Create inside group
      href: value.link
      // onClick: () => {
      //   window.open(value.link);
      // },
    })
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
