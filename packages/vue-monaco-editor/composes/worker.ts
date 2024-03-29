// @ts-nocheck

import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import JSONWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import TSWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { onMounted } from 'vue';

export default function useWorker() {
  onMounted(() => {
    self.MonacoEnvironment = {
      getWorker(_, label) {
        if (label === 'json') {
          return new JSONWorker();
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
          return new CSSWorker();
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
          return new HTMLWorker();
        }
        if (label === 'typescript' || label === 'javascript') {
          return new TSWorker();
        }
        return new EditorWorker();
      },
    };
  });
}
