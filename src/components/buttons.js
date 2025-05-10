export class Button {
  constructor(options) {
    // Default config
    this.config = {
      text: options.text || "Button",
      type: options.type || "primary",
      size: options.size || "medium",
      onClick: options.onClick || function() { },
      disabled: options.disabled || false,
      container: options.container || document.body,
      className: options.className || "",
      icon: options.icon || "",
    };

    // Create the actual button
    this.element = this.createButtonElement();

    // Add button to the specified container
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
    this.config.container.appendChild(this.element);
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
