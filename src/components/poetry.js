import { getPoetry } from "../services/poetry";

export class Poetry {
  constructor(options) {
    this.linecount = options.linecount || 7;
    this.poetry = options.poetry || {};
  }

  static async create(options) {
    const instance = new Poetry(options);
    await instance.fetchPoetry();
    instance.render();
    return instance;
  }

  static createFromPoetry(options) {
    if (!options.poetry) {
      throw new TypeError("No poetry provided");
    };
    const instance = new Poetry(options);
    instance.render();
    return instance;
  }

  async fetchPoetry() {
    const poetry = await getPoetry(this.linecount);
    poetry.timestamp = new Date().toISOString();
    this.poetry = poetry;
    return poetry;
  }

  render() {
    const poetryEl = document.getElementById("poetry");
    const authorEl = document.createElement("div");
    authorEl.id = "author";
    authorEl.classList.add("mt-3", "italic", "flex", "justify-end");
    authorEl.textContent = this.poetry.author;
    poetryEl.textContent = this.poetry.formatted;
    poetryEl.appendChild(authorEl);
  }
}
