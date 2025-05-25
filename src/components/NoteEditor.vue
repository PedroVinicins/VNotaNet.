<template>
  <div class="main-notes">
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
