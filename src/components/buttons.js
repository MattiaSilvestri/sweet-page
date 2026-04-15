import { readSettings } from "../common/settings";

export class LinkButton {
  constructor(options) {
    // Default config
    this.config = {
      text: options.text || "Button",
      iconColor: options.iconColor || "text-ctp-text",
      // onClick: options.onClick || function() { },
      href: options.href || "#",
      disabled: options.disabled || false,
      container: options.container || document.body,
      className: options.className || "",
      icon: options.icon || "",
    };
    this.settings = readSettings();

    // Render button to the specified container
    this.render();
  }

  createButtonElement() {
    const button = document.createElement("a");

    // Add text
    button.textContent = this.config.text;

    // Add classes
    button.classList.add(...("base-button cursor-pointer m-1".split(" ")),);
    if (this.config.className) {
      button.classList.add(this.config.className);
    }

    // Set colors
    button.classList.add("text-ctp-text");
    button.style.backgroundColor = "transparent";

    // Set disabled if needed
    if (this.config.disabled) {
      button.disabled = true;
      button.classList.add("disabled");
    }

    // Add icon 
    if (this.config.icon) {
      const iconElement = document.createElement("iconify-icon");
      iconElement.icon = this.config.icon;
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
      name: options.text || "Tab",
      icon: options.icon || "",
    };
    this.links = options.links || {};

    this.render();
  }

  createTabElement() {
    // Add tab button
    const button = document.createElement("button");
    button.textContent = this.config.name;
    button.dataset.name = this.config.name;
    button.classList.add("tablinks", "cursor-pointer", "w-full");
    // button.classList.add(this.config.icon);

    // Add tab panel holding the link buttons
    const tabContent = document.createElement("div");
    tabContent.id = this.config.name;
    tabContent.classList.add("tab-content", "h-full");

    const tabContentButton = document.createElement("div");
    tabContentButton.id = "links";
    tabContentButton.classList.add(...("links flex flex-wrap gap-3 content-start".split(" ")));
    tabContent.appendChild(tabContentButton);

    return { button: button, tabContent: tabContent };
  }



  render() {
    // Render elements in the correct place
    const { button, tabContent } = this.createTabElement();
    document.querySelector(".tabbed-container").appendChild(button);
    document.querySelector(".tab-board").appendChild(tabContent);
  }
}
