<template>
  <div class="rich-text-editor">
    <div id="toolbar-container" class="toolbar">
      <span class="ql-formats">
        <select class="ql-font">
          <option value="sans-serif" selected>Sans Serif</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>
        <select class="ql-size">
          <option value="small">Pequeno</option>
          <option value="normal" selected>Normal</option>
          <option value="large">Grande</option>
          <option value="huge">Enorme</option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold" title="Negrito"></button>
        <button class="ql-italic" title="Itálico"></button>
        <button class="ql-underline" title="Sublinhado"></button>
        <button class="ql-strike" title="Tachado"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color" title="Cor do texto"></select>
        <select class="ql-background" title="Cor de fundo"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-script" value="sub" title="Subscrito"></button>
        <button class="ql-script" value="super" title="Sobrescrito"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-header" value="1" title="Título 1"></button>
        <button class="ql-header" value="2" title="Título 2"></button>
        <button class="ql-blockquote" title="Citação"></button>
        <button class="ql-code-block" title="Bloco de código"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered" title="Lista ordenada"></button>
        <button class="ql-list" value="bullet" title="Lista não ordenada"></button>
        <button class="ql-indent" value="-1" title="Diminuir recuo"></button>
        <button class="ql-indent" value="+1" title="Aumentar recuo"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-direction" value="rtl" title="Direção do texto"></button>
        <select class="ql-align" title="Alinhamento">
          <option selected>Padrão</option>
          <option value="center">Centralizado</option>
          <option value="right">Direita</option>
          <option value="justify">Justificado</option>
        </select>
      </span>
      <span class="ql-formats">
        <button class="ql-link" title="Inserir link"></button>
        <button class="ql-image" title="Inserir imagem"></button>
        <button class="ql-video" title="Inserir vídeo"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-clean" title="Limpar formatação"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-formula" title="Inserir fórmula"></button>
        <button class="ql-table" title="Inserir tabela"></button>
      </span>
    </div>
    <div ref="editorRef" class="editor-content"></div>
  </div>
</template>

<script>
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

export default {
  name: 'RichTextEditor',
  props: {
    modelValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: 'Digite seu texto aqui...'
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      quill: null,
      content: ''
    };
  },
  mounted() {
    this.initQuill();
  },
  beforeUnmount() {
    if (this.quill) {
      this.quill.off('text-change');
    }
  },
  methods: {
    initQuill() {
      this.quill = new Quill(this.$refs.editorRef, {
        modules: {
          toolbar: '#toolbar-container',
          table: true
        },
        placeholder: this.placeholder,
        theme: 'snow'
      });

      // Set initial content
      if (this.modelValue) {
        this.quill.root.innerHTML = this.modelValue;
      }

      // Update v-model when content changes
      this.quill.on('text-change', () => {
        this.content = this.quill.root.innerHTML;
        this.$emit('update:modelValue', this.content);
      });
    },
    setContent(content) {
      if (this.quill) {
        this.quill.root.innerHTML = content;
      }
    }
  },
  watch: {
    modelValue(newVal) {
      if (newVal !== this.content) {
        this.setContent(newVal);
      }
    }
  }
};
</script>

<style scoped>
.rich-text-editor {
  --editor-text: #fff;
  --toolbar-bg: #000000;
  --toolbar-text: #ffffff;
  --active-btn: #007aff;
  --border-radius: 12px;
  --font-size: 16px;
  --toolbar-gap: 6px;
  --btn-hover: rgba(0, 0, 0, 0.04);
  --btn-active: rgba(0, 122, 255, 0.12);

  border-radius: var(--border-radius);
  background: linear-gradient(135deg, #222222 0%, #1c1c1e 100%);
  border: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
}

/* Editor */
.editor-content {
  flex: 1;
  min-height: 300px;
  max-height: 800px;
  padding: 20px;
  font-size: var(--font-size);
  color: var(--editor-text);
   background: linear-gradient(135deg, #222222 0%, #1c1c1e 100%);
  border-radius: 0 0 var(--border-radius) var(--border-radius);
  line-height: 1.6;
  outline: none;
}

/* Toolbar */
.toolbar {
  background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px) !important;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2) !important;
  padding: 12px 16px !important;
  display: flex;
  flex-wrap: wrap;
  gap: var(--toolbar-gap);
}

.ql-formats {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border-radius: 10px;
  border: 1px solid transparent;
  padding: 2px;
  transition: border 0.2s ease;
}

.ql-formats:hover {
  border-color: #dcdce0;
}

.ql-formats button,
.ql-formats select {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background 0.15s ease;
  color: var(--toolbar-text);
}

.ql-formats button:hover,
.ql-formats select:hover {
  background: var(--btn-hover) !important;
}

.ql-formats button.ql-active {
  background: var(--btn-active) !important;
  color: var(--active-btn) !important;
}

.ql-formats select {
  padding: 0 10px;
  font-size: 15px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%231c1c1e'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 14px;
  min-width: 110px;
  border-radius: 8px;
}

/* Quill Overrides */
:deep(.ql-container.ql-snow) {
  border: none !important;
  font-family: inherit;
}

:deep(.ql-toolbar.ql-snow) {
  border: none !important;
}

:deep(.ql-editor) {
  padding: 0 !important;
  font-size: var(--font-size) !important;
  min-height: 200px;
}

:deep(.ql-editor.ql-blank::before) {
  color: #a0a0a5;
  font-style: normal;
  left: 20px;
  right: 20px;
}

:deep(.ql-snow .ql-picker) {
  color: var(--toolbar-text);
}

:deep(.ql-snow .ql-stroke) {
  stroke: var(--toolbar-text);
}

:deep(.ql-snow .ql-fill) {
  fill: var(--toolbar-text);
}

:deep(.ql-snow .ql-picker-options) {
  background-color: var(--editor-bg);
  border-color: #dcdce0 !important;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
}

:deep(.ql-snow .ql-picker-item.ql-selected),
:deep(.ql-snow .ql-picker-item:hover) {
  color: var(--active-btn);
}

/* Responsivo */
@media (max-width: 960px) {
  .toolbar {
    padding: 6px 8px !important;
    gap: 4px;
  }

  .ql-formats {
    flex-wrap: wrap;
  }

  .ql-formats button,
  .ql-formats select {
    width: 30px;
    height: 30px;
    font-size: 13px;
  }

  .ql-formats select {
    min-width: 90px;
  }
}
</style>

