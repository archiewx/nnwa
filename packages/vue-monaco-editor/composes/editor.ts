import { onMounted, ref, watch, onBeforeUnmount } from 'vue';
import * as monaco from 'monaco-editor';

function useEditor(props, context) {
  const inst = ref<monaco.editor.IStandaloneCodeEditor>(null);
  const dom = ref(null);

  const refreshMonacoEditor = (language: string) => {
    if (inst.value) {
      const model = inst.value.getModel();
      monaco.editor.setModelLanguage(model, language);
      return;
    }
    const editor = monaco.editor.create(dom.value, {
      value: '',
      fontFamily: 'Mono',
      lineHeight: 24,
      fontSize: 12,
      cursorWidth: 3,
      language,
      theme: 'vs-light',
    });
    inst.value = editor;
  };

  onMounted(() => {
    refreshMonacoEditor(props.language);
  });
  const stop = watch<string>(
    () => props.language,
    (newLanguage) => {
      refreshMonacoEditor(newLanguage);
    }
  );

  onBeforeUnmount(() => {
    stop();
  });

  return { dom };
}

export default useEditor;
