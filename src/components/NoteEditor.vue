<template>
  <div class="note-editor-container">
    <input v-model="title" @input="updateTitle" placeholder="Título da nota" class="editor-title" />
    <RichTextEditor v-model="content" class="editor-content" />
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import RichTextEditor from './RichTextEditor.vue'

export default {
  name: 'NoteEditor',
  components: {
    RichTextEditor
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  emits: ['update:title', 'update:content'],
  setup(props, { emit }) {
    const title = ref(props.note.name || '')
    const content = ref(props.note.content || '')

    const updateTitle = () => {
      emit('update:title', title.value)
    }

    watch(() => props.note, (newNote) => {
      title.value = newNote.name || ''
      content.value = newNote.content || ''
    }, { immediate: true })

    watch(content, (newContent) => {
      emit('update:content', newContent)
    })

    return {
      title,
      content,
      updateTitle
    }
  }
}
</script>

<style scoped>
.note-editor-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.editor-title {
  font-size: 2rem;
  font-weight: bold;
  padding: 0.5rem;
  border: none;
  border-radius: 0.5rem;
  outline: none;
  width: 100%;
    background: #222;
  transition: border 0.2s ease, box-shadow 0.2s ease;
  color: rgb(255, 255, 255);
}


.editor-title:focus {
  color: rgb(185, 185, 185);
}

/* O
.editor-content ele ta no RichTextEditor por conta das chamadas no js
pra temas e size fonte
 */
</style>
