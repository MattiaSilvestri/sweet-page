import { readSettings } from "../common/settings";

export class LinkButton {
  constructor(options) {
    this.config = {
      text: options.text || "Button",
      iconColor: options.iconColor || "text-ctp-text",
      href: options.href || "#",
      container: options.container || document.body,
      className: options.className || "",
      icon: options.icon || "",
    };
    this.settings = readSettings();
    this.render();
  }

  createButtonElement() {
    const button = document.createElement("a");

    // Add text
    const textSpan = document.createElement("span");
    textSpan.textContent = this.config.text;
    textSpan.classList.add("truncate", "min-w-0");
    button.appendChild(textSpan);

    // Add classes
    button.classList.add(...("base-button cursor-pointer m-1".split(" ")),);
    if (this.config.className) {
      button.classList.add(this.config.className);
    }

    // Set colors
    button.classList.add("text-ctp-text");
    button.style.backgroundColor = "transparent";

    // Add icon 
    if (this.config.icon) {
      const iconElement = document.createElement("iconify-icon");
      iconElement.icon = this.config.icon;
      iconElement.width = "16";
      iconElement.height = "16";
      iconElement.classList.add(this.config.iconColor);
      button.prepend(iconElement);
    }

    return button;
  }

  applySettings(button) {
    // Manage click
    button.target = this.settings["open-in-new-tab"] ? "_blank" : "_self";
    button.href = this.config.href;

    // Reload settings reactively
    window.addEventListener("settings-changed", (e) => {
      button.target = e.detail["open-in-new-tab"] ? "_blank" : "_self";
    });
  }

  render() {
    const button = this.createButtonElement();
    this.applySettings(button)
    this.config.container.appendChild(button);
  }

}

export class Tab {
  constructor(options) {
    this.config = {
      name: options.name || "Tab",
      content: options.content || {},
    };

    this.render();
  }

  createTabElement() {
    // Add tab button
    const button = document.createElement("button");
    button.textContent = this.config.name;
    button.dataset.name = this.config.name;
    button.classList.add("tablinks", "truncate", "cursor-pointer", "w-full");
    // button.classList.add(this.config.icon);

    // Add tab panel holding the link buttons
    const tabContent = document.createElement("div");
    tabContent.id = this.config.name;
    tabContent.classList.add("tab-content", "h-full", "grid", "grid-cols-2", "sm:grid-cols-3", "lg:grid-cols-4", "gap-3");

    // const tabContentButton = document.createElement("div");
    // tabContentButton.id = "links";
    // tabContentButton.classList.add(...("links flex flex-wrap gap-3 content-start".split(" ")));
    // tabContent.appendChild(tabContentButton);

    return { button: button, tabContent: tabContent };
  }



  render() {
    // Render elements in the correct place
    const { button, tabContent } = this.createTabElement();
    document.querySelector(".tabbed-container").appendChild(button);
    document.querySelector(".tab-board").appendChild(tabContent);
  }
}

export class GroupButton {
  constructor(options) {
    if (!options.tab) throw new TypeError("Needs to specify a tab");

    this.config = {
      buttons: options.buttons || [],
      name: options.name || "Group",
      tab: options.tab,
      content: options.content || {},
    };
    this.render();
  }

  createGroupButtonElement() {
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group", "flex", "flex-col", "justify-start");
    // FIX: fix possible duplicate id for groups with same name
    buttonGroup.id = this.config.name;

    const label = document.createElement("span");
    label.classList.add("button-group-label", "align-items-center", "truncate");
    label.textContent = this.config.name;
    buttonGroup.appendChild(label);

    return buttonGroup;
  }

  render() {
    // Render elements in the correct place
    const tabEl = document.getElementById(this.config.tab.name);
    const buttonGroup = this.createGroupButtonElement();
    tabEl.appendChild(buttonGroup);
  }
}


