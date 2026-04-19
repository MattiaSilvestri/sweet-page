import { getPoetry } from "../services/poetry";

export class Poetry {
  constructor(options) {
    this.linecount = options.linecount || 7;

    this.ready = this.render();
  }

  async fetchPoetry() {

  }

  async render() {
    const poetry = await getPoetry(this.linecount);
    poetry.timestamp = new Date().toLocaleString();
    const poetryEl = document.getElementById("poetry");
    const authorEl = document.createElement("div");
    authorEl.id = "author";
    authorEl.classList.add("mt-3", "italic", "flex", "justify-end");
    authorEl.textContent = poetry.author;
    poetryEl.textContent = poetry.formatted;
    poetryEl.appendChild(authorEl);
    this.poetry = poetry;
  }
}
