import Header from '@editorjs/header';
const List = require('@editorjs/list');
const SimpleImage = require('@editorjs/simple-image');

export const EDITOR_JS_TOOLS = {
  header: {
    class: Header,
    config: {
      levels: [2, 3, 4],
      defaultLevel: 2
    }
  },
  list: List,
  image: SimpleImage
}