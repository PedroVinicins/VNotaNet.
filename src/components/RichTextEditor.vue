<template>
  <div class="rich-text-editor">
    <div id="toolbar-container">
      <span class="ql-formats">
        <select class="ql-font"></select>
        <select class="ql-size"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub"></button>
        <button class="ql-script" value="super"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1"></button>
        <button class="ql-header" value="2"></button>
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl"></button>
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    </div>
    <div ref="editorRef" class="editor-content"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  name: 'RichTextEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const editorRef = ref(null)
    let quill = null

    onMounted(() => {
      quill = new Quill(editorRef.value, {
        theme: 'snow',
        modules: {
          toolbar: '#toolbar-container'
        }
      })

      quill.root.innerHTML = props.modelValue || ''

      quill.on('text-change', () => {
        const content = quill.root.innerHTML
        emit('update:modelValue', content)
      })
    })

    watch(() => props.modelValue, (newValue) => {
      if (quill && quill.root.innerHTML !== newValue) {
        quill.root.innerHTML = newValue || ''
      }
    })

    return {
      editorRef
    }
  }
}
</script>

<style scoped>
.rich-text-editor {
  display: flex;
  height: 100%;
  flex-direction: column;
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  font-size: 2  rem;
}

.ql-formats{
  margin: 5px;
  color: white !important;
  background-color: #ffffffc2 !important;
  border-radius:  14px !important;

}

.ql-container {
  border: none !important;
}

.ql-toolbar {
  border: none !important;
  border-bottom: 1px solid #7e7e7e !important;
  background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
  border-radius:  14px !important;
}
</style>
