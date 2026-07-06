import { createJSONEditor } from "vanilla-jsoneditor";
import { readConfig, readSettings, writeConfig } from "../common/settings";

export class JsonEditor {
  constructor(options) {
    this.settings = readSettings();
    this.config = readConfig();
    this.target = options.target;
  }

  render() {
    let content = {
      text: undefined,
      json: this.config
    }
    this.editor = createJSONEditor(
      {
        target: document.getElementById(this.target),
        props: {
          content,
          onChange: (updatedContent, previousContent, { contentErrors, patchResult }) => {
            // content is an object { json: unknown } | { text: string }
            if (contentErrors) return; // don't update on invalid JSON
            this.config = updatedContent.json ?? JSON.parse(updatedContent.text);
          }
        }
      }
    )
  }

  saveConfig() {
    writeConfig(this.config);
    addTab();
  }

}
