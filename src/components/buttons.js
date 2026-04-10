export class LinkButton {
  constructor(options) {
    // Default config
    this.config = {
      text: options.text || "Button",
      type: options.type || "primary",
      size: options.size || "medium",
      fgColor: options.fgColor || "#cdd6f4",
      bgColor: options.bgColor || "#313244",
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
    button.classList.add("base-button", `button-${this.config.type}`, `button-${this.config.size}`);
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
      const iconElement = document.createElement("span");
      iconElement.classList.add("button-icon");
      iconElement.innerHTML = this.config.icon;
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

  setText(text) {
    this.config.text = text;
    this.element.textContent = text;
    return this;
  }

  setDisabled(isDisabled) {
    this.config.disabled = isDisabled;
    this.element.disabled = isDisabled;
    this.element.classList.toggle("disabled", isDisabled);
    return this;
  }

  remove() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
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

    this.render();
  }

  createTabElement() {
    // Add tab button
    const button = document.createElement("button");
    button.textContent = this.config.name;
    button.dataset.city = this.config.name;
    button.classList.add("tablinks cursor-pointer text-left w-full px-4 py-3 text-sm font-medium text-ctp-subtext hover:bg-ctp-surface0 hover:text-ctp-text transition-colors", `tab-${this.config.type}`);
    // button.classList.add(this.config.icon);

    // Add tab panel holding the link buttons
    const tabContent = document.createElement("div");
    tabContent.id = this.config.name;
    tabContent.classList.add("bg-ctp-base border border-ctp-surface1 rounded-r-xl p-6 overflow-y-auto shadow-[0_8px_24px_rgba(0,0,0,0.4)]");

    const tabContentButton = document.createElement("div");
    tabContentButton.id = "links";
    tabContentButton.classList.add("links flex flex-wrap gap-2 content-start");
    tabContent.appendChild(tabContentButton);

    return { button: button, tabContent: tabContent };
  }



  render() {
    // Render elements in the correct place
    const { button, tabContent } = this.createTabElement();
    document.querySelector(".tabbed-container").appendChild(button);
    document.querySelector(".tabcontent").appendChild(tabContent);
  }
}
