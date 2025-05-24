<template>
  <div class="note-editor">
    <h2 class="editor-title" contenteditable="true" @input="updateTitle">
      {{ note.name }}
    </h2>
    <textarea
      class="editor-content"
      v-model="content"
      placeholder="Escreva sua nota aqui..."
      @input="emitUpdate"
    ></textarea>
  </div>
</template>

<script>
export default {
  name: 'NoteEditor',
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      content: this.note.content || ''
    }
  },
  watch: {
    note: {
      immediate: true,
      handler(newNote) {
        this.content = newNote.content || ''
      }
    }
  },
  methods: {
    updateTitle(event) {
      this.$emit('update-title', event.target.innerText)
    },
    emitUpdate() {
      this.$emit('update', this.content)
    }
  }
}
</script>

<style scoped>
.note-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.editor-title {
  margin: 0 0 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.editor-title:focus {
  border-color: #2196F3;
}

.editor-content {
  flex: 1;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  font-size: 1rem;
  line-height: 1.5;
  outline: none;
}

.editor-content:focus {
  border-color: #2196F3;
}
</style>
