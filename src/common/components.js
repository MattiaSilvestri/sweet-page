import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };
import { SettingsModal } from "../components/modal.js";
import { saveSettings } from "./utils.js";

function addLinkButtons(tab) {
  for (const [key, value] of Object.entries(tab.links)) {
    new LinkButton({
      text: key,
      container: document.getElementById("links"),
      iconColor: value["icon-color"],
      icon: value.icon,
      container: document.getElementById(tab.config.name), // Create inside tab
      onClick: () => {
        window.open(value.link, "_blank");
      },
    })
  }
}

export function addTab() {
  for (const [key, value] of Object.entries(config.bookmarks)) {
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
  const settings = JSON.parse(localStorage.getItem("config"))
  const settingsModal = new SettingsModal({
    searchEngine: settings["search-engine"],
    newTab: settings["open-in-new-tab"]
  })
  // Append settings modal event handlers //
  // Open modal
  document.getElementById("settings").addEventListener("click", () => modal.classList.add("open"));
  // Close modal
  const modal = document.getElementById("settings-modal");
  modal.querySelector("#settings-close").addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => { if (e.target === modal) modal.classList.remove("open"); });
  // Save settings
  modal.querySelector("#settings-save").addEventListener("click", saveSettings());
}
