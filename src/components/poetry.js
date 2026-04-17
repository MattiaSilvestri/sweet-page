import { getPoetry } from "../services/poetry";

export class Poetry {
  constructor(options) {
    this.linecount = options.linecount || 7;

    this.render();
  }

  async render() {
    const poetry = await getPoetry(this.linecount);
    document.getElementById("poetry").innerHTML = poetry.formatted;
  }
}
