import { LinkButton, Tab } from "../components/buttons.js";
import config from '../../config.json' assert { type: 'json' };

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

