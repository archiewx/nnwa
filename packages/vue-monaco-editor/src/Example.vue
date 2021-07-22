<template>
  <div>
    <select style="width: 300px" v-model="language">
      <option value="javascript">JS</option>
      <option value="typescript">TS</option>
      <option value="go">GO</option>
      <option value="rust">RUST</option>
    </select>
  </div>
  <monaco-editor :language="language" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MonacoEditor from '../components/MonacoEditor.vue';

export default defineComponent({
  name: 'Example',
  components: {
    MonacoEditor,
  },
  data() {
    return {
      language: 'go',
    };
  },
});
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100vw;
  height: 100vw;
}
</style>
