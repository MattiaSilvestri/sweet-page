import { createJSONEditor } from "vanilla-jsoneditor";

class JsonEditor {
  constructor(options) {
    this.settings = readSettings();
    this.config = readConfig();
    this.editor = createJSONEditor({
      target: document.getElementById('jsoneditor-modal')
    })
  }

  render() {
    // set json
    document.getElementById('setContent').onclick = function() {
      const content = {
        text: undefined, // used in text mode
        json: {
          array: [1, 2, 3],
          boolean: true,
          color: '#82b92c',
          null: null,
          number: 123,
          object: { a: 'b', c: 'd' },
          time: 1575599819000,
          string: 'Hello World'
        }
      }

      editor.set(content)
    }

    // get json
    document.getElementById('getContent').onclick = function() {
      const content = editor.get()
      alert(JSON.stringify(content, null, 2))
    }
  }
}
