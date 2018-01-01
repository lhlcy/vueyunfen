<template>
  <div class="editer_container">
    <iframe :src="editerUrl" id="Ueditor" ref="editer" name="editer" width="940px" height="620px" scrolling="no" frameborder="0"></iframe>
  </div>
</template>

<script>

import { editerUrl } from '../config/env';
export default {
  name: 'Editer',
  data() {
    return {
      editerUrl: editerUrl.join('/'),
      setState: false
    }
  },
  props: {
    output: {
      type: Function,
      default: function() {}
    },
    input: {
      type: String,
      default: ''
    },
    newEdit: {
      type: Boolean,
      default: false
    },
  },
  created() {
    window.addEventListener('message', e => {
      if (e.origin !== editerUrl[0]) return;
      if (e.data.type === 'ready') {
        this.setContent(this.input);
      } else if (e.data.type === 'get') {
        this.$emit('output', e.data.content, e.data.txt);
      }
    }, false);
  },
  methods: {
    setContent(content) {
      this.$nextTick(() => {
        window.frames[0].postMessage({
          type: 'set',
          content: content
        }, editerUrl[0]);
      });
    },
    reset(){
      window.frames[0].postMessage({
        type: 'reset'
      }, editerUrl[0]);
    }
  },
  watch: {
    input: function(content) {
      if(this.setStat || this.newEdit) return;
      this.setStat = true;
      this.setContent(content);
    }
  },
  beforeDestroy () {
    setTimeout(function () {
      location.reload()
    }, 300)
  }
}
</script>

<style lang="scss">
  .editer_container {

  }
</style>
