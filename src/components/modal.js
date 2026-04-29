import Swiper from "swiper";
import { Navigation, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { readSettings } from "../common/settings";
import { DEFAULT_BANNERS } from "../common/defaults";

export class SettingsModal {
  constructor() {
    const settings = readSettings();
    this.settings = {
      searchEngine: settings["search-engine"],
      newTab: settings["open-in-new-tab"],
      showSeconds: settings["show-seconds"]
    }
    this.modal = document.getElementById("settings-modal");

    this.render();
  }

  populateGeneral() {
    // Populate search engines options and set default
    const engines = [
      { value: "google", label: "Google" },
      { value: "duckduckgo", label: "DuckDuckGo" },
      { value: "brave", label: "Brave" },
    ]

    const searchEngineSelect = this.modal.querySelector("#search-engine");
    engines.forEach(({ value, label }) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      searchEngineSelect.appendChild(option);
      searchEngineSelect.value = this.settings.searchEngine
    });

    // Populate new tab option
    const newTabCheckbox = this.modal.querySelector("#open-in-new-tab");
    newTabCheckbox.checked = this.settings.newTab

    // Populate clock options
    const secondsCheckBox = this.modal.querySelector("#show-seconds");
    secondsCheckBox.checked = this.settings.showSeconds
  }

  render() {
    this.populateGeneral();
  }
}

export class ImagePicker {
  constructor(options) {
    this.images = options.images;
    this.banners = DEFAULT_BANNERS;
    this.settings = readSettings();
  }

  render() {
    const wrapper = document.querySelector(".swiper-wrapper");
    this.banners.forEach(src => {
      src = `banners/${src}`
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      const img = document.createElement("img");
      img.src = src;
      img.classList.add("cursor-pointer");
      if (this.settings.banner === src) img.classList.add("selected-banner");
      img.addEventListener("click", (e) => {
        document.querySelectorAll(".selected-banner").forEach(img => img.classList.remove("selected-banner"));
        e.target.classList.add("selected-banner");
      });
      slide.appendChild(img);
      wrapper.appendChild(slide);
    });
  }

  initSwiper() {
    return new Swiper('.swiper', {
      modules: [Navigation, EffectCoverflow, Pagination],
      effect: "coverflow",
      grabCursor: false,
      centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
