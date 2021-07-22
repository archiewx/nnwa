<template>
  <div class="v-editor" ref="dom" data-uri="inmemory://model/1"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useEditor from '../composes/editor';
import useWorker from '../composes/worker';

export default defineComponent({
  name: 'MonacoEditor',

  props: {
    language: String,
  },

  setup(props, context) {
    useWorker();
    return useEditor(props, context);
  },
});
</script>

<style lang="less">
@font-face {
  font-family: Mono;
  src: url(https://cdn.zswfx.com/JetBrainsMono/nweUNRcmMwNnJrNmpyYWhGWFVBYzYwU1Yxdk9vb2g5VGo=.woff2);
}

.v-editor {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
