<template>
  <div class="main-notes">
    <div class="note-editor">
      <h2
        class="editor-title"
        contenteditable="true"
        @input="updateTitle"
        :textContent="title"
      ></h2>

      <!-- Toolbar externa -->
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
          <button class="ql-formula"></button>
        </span>
        <span class="ql-formats">
          <button class="ql-clean"></button>
        </span>
      </div>

      <!-- Editor Quill -->
      <div ref="editorRef" class="editor-content"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

// Props
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

// Emits
const emit = defineEmits(['update-title', 'update-content'])

// Refs e dados locais
const editorRef = ref(null)
const title = ref(props.note.name || '')
const content = ref(props.note.content || '')
let quill

// Atualiza título
function updateTitle(event) {
  title.value = event.target.innerText
  saveToLocalStorage()
  emit('update-title', title.value)
}

// Monta o editor Quill
onMounted(() => {
  quill = new Quill(editorRef.value, {
    theme: 'snow',
    modules: {
      toolbar: '#toolbar-container'
    }
  })

  // Conteúdo inicial
  quill.root.innerHTML = content.value

  // Detecta mudanças
  quill.on('text-change', () => {
    content.value = quill.root.innerHTML
    saveToLocalStorage()
    emit('update-content', content.value)
  })

  // Carrega do localStorage se existir
  const savedNote = localStorage.getItem('nota-pedro')
  if (savedNote) {
    const { title: savedTitle, content: savedContent } = JSON.parse(savedNote)
    title.value = savedTitle
    content.value = savedContent
    quill.root.innerHTML = savedContent
  }
})

// Atualiza nota quando a prop mudar
watch(() => props.note, (newNote) => {
  title.value = newNote.name || ''
  content.value = newNote.content || ''
  if (quill) {
    quill.root.innerHTML = content.value
  }
}, { immediate: true })

// Salva no localStorage
function saveToLocalStorage() {
  localStorage.setItem('nota-pedro', JSON.stringify({
    title: title.value,
    content: content.value
  }))
}
</script>

<style scoped>

.editor-content {
  flex: 1;
  width: 100%;
  height: 80vh;
  padding: 1rem;
  font-size: 22px;
  color: var(--text-primary);
  background: transparent;
  border: 1px solid var(--bg-hover);
  border-radius: 8px;
  resize: none;
  overflow-y: auto;
}

.editor-content:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>
