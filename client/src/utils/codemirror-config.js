import { basicSetup } from 'codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from '@codemirror/view';

const codemirrorConfig = {
  extensions: [
    basicSetup,
    javascript(),
  ],
  theme: EditorView.theme({
    '&': {
      color: '#fff',
      backgroundColor: '#282c34',
    },
    '.cm-content': {
      caretColor: '#fff',
    },
    '&.cm-focused .cm-cursor': {
      borderLeftColor: '#fff',
    },
    '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-selectionForeground': {
      backgroundColor: '#3e4451',
      color: '#fff',
    },
  }),
  lineNumbers: true,
  tabSize: 2,
};

export default codemirrorConfig;