import { addIcon, loadIcon } from "iconify-icon";

export class LinkButton {
  constructor(options) {
    // Default config
    this.config = {
      text: options.text || "Button",
      fgColor: options.fgColor || "#cdd6f4",
      bgColor: options.bgColor || "#181825",
      onClick: options.onClick || function() { },
      disabled: options.disabled || false,
      container: options.container || document.body,
      className: options.className || "",
      icon: options.icon || "",
    };

    // Render button to the specified container
    this.render();
  }

  createButtonElement() {
    const button = document.createElement("button");

    // Add text
    button.textContent = this.config.text;

    // Add classes
    button.classList.add(...("base-button cursor-pointer m-1".split(" ")),);
    if (this.config.className) {
      button.classList.add(this.config.className);
    }

    // Set colors
    button.style.color = this.config.fgColor;
    button.style.backgroundColor = this.config.bgColor;

    // Set disabled if needed
    if (this.config.disabled) {
      button.disabled = true;
      button.classList.add("disabled");
    }

    // Add icon 
    if (this.config.icon) {
      const iconElement = document.createElement("iconify-icon");
      iconElement.icon = this.config.icon;
      button.prepend(iconElement);
    }

    // Click event
    button.addEventListener("click", (e) => {
      if (!this.config.disabled) {
        this.config.onClick(e);
      }
    })

    return button;
  }

  render() {
    this.config.container.appendChild(this.createButtonElement());
  }
}

export class Tab {
  constructor(options) {
    this.config = {
      name: options.text || "Button",
      type: options.type || "primary",
      fgColor: options.fgColor || "#cdd6f4",
      bgColor: options.bgColor || "#313244",
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
    button.classList.add("tablinks", "cursor-pointer", "w-full", `tab-${this.config.type}`);
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
