<template>
  <div class="rich-text-editor glass-effect">
    <div id="toolbar-container" class="toolbar">
      <!-- Font & Size -->
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

      <!-- Text Formatting -->
      <span class="ql-formats">
        <button class="ql-bold" title="Negrito">
          <svg viewBox="0 0 18 18"><path d="M5 4h3.5c1.5 0 3 1 3 2.5a2.4 2.4 0 0 1-2 2.4v.1a2.5 2.5 0 0 1 2.5 2.5c0 2-1.6 3-3.5 3H5z"></path></svg>
        </button>
        <button class="ql-italic" title="Itálico">
          <svg viewBox="0 0 18 18"><line x1="7" x2="13" y1="4" y2="4"></line><line x1="5" x2="11" y1="14" y2="14"></line><line x1="8" x2="10" y1="14" y2="4"></line></svg>
        </button>
        <button class="ql-underline" title="Sublinhado">
          <svg viewBox="0 0 18 18"><path d="M5 3v7a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4V3"></path><path d="M3 13h12"></path></svg>
        </button>
        <button class="ql-strike" title="Tachado">
          <svg viewBox="0 0 18 18"><line x1="4" x2="14" y1="9" y2="9"></line><path d="M11 13h1a2 2 0 0 0 2-2V7a3 3 0 0 0-3-3H8a3 3 0 0 0-3 3v4a2 2 0 0 0 2 2h1"></path></svg>
        </button>
      </span>

      <!-- Colors -->
      <span class="ql-formats">
        <select class="ql-color" title="Cor do texto">
          <option value="#000000"></option>
          <option value="#ffffff"></option>
          <option value="#ff3b30"></option>
          <option value="#ff9500"></option>
          <option value="#ffcc00"></option>
          <option value="#34c759"></option>
          <option value="#007aff" selected></option>
          <option value="#5856d6"></option>
          <option value="#af52de"></option>
          <option value="#ff2d55"></option>
        </select>
        <select class="ql-background" title="Cor de fundo">
          <option value="#000000"></option>
          <option value="#ffffff"></option>
          <option value="#ff3b30"></option>
          <option value="#ff9500"></option>
          <option value="#ffcc00"></option>
          <option value="#34c759"></option>
          <option value="#007aff"></option>
          <option value="#5856d6"></option>
          <option value="#af52de"></option>
          <option value="#ff2d55"></option>
          <option value="transparent" selected></option>
        </select>
      </span>

      <!-- Script & Headers -->
      <span class="ql-formats">
        <button class="ql-script" value="sub" title="Subscrito">
          <svg viewBox="0 0 18 18"><path d="M10 15H7v1h3v-1zm-3-2h3v1H7v-1zm5-11v5h1V4h1V2h-2z"></path><path d="M8 2H5v1h1v5H5v1h3V8H7V3h1V2z"></path></svg>
        </button>
        <button class="ql-script" value="super" title="Sobrescrito">
          <svg viewBox="0 0 18 18"><path d="M10 13H7v1h3v-1zm-3-2h3v1H7v-1zm5-7v5h1V7h1V5h-2z"></path><path d="M8 5H5v1h1v5H5v1h3v-1H7V6h1V5z"></path></svg>
        </button>
        <button class="ql-header" value="1" title="Título 1">H1</button>
        <button class="ql-header" value="2" title="Título 2">H2</button>
      </span>

      <!-- Blocks -->
      <span class="ql-formats">
        <button class="ql-blockquote" title="Citação">
          <svg viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="1"></rect><path d="M7 7h4v4H7z"></path></svg>
        </button>
        <button class="ql-code-block" title="Bloco de código">
          <svg viewBox="0 0 18 18"><path d="M5 3h2v2H5zM5 7h2v2H5zM5 11h2v2H5zM11 3h2v2h-2zM11 7h2v2h-2zM11 11h2v2h-2z"></path></svg>
        </button>
        <button class="ql-list" value="ordered" title="Lista ordenada">
          <svg viewBox="0 0 18 18"><line x1="6" x2="15" y1="5" y2="5"></line><line x1="6" x2="15" y1="9" y2="9"></line><line x1="6" x2="15" y1="13" y2="13"></line><path d="M4 5h1V4H3v1h1zM3 9h2v1H3zM3 13h2v1H3z"></path></svg>
        </button>
        <button class="ql-list" value="bullet" title="Lista não ordenada">
          <svg viewBox="0 0 18 18"><line x1="6" x2="15" y1="5" y2="5"></line><line x1="6" x2="15" y1="9" y2="9"></line><line x1="6" x2="15" y1="13" y2="13"></line><circle cx="3.5" cy="5.5" r="1.5"></circle><circle cx="3.5" cy="9.5" r="1.5"></circle><circle cx="3.5" cy="13.5" r="1.5"></circle></svg>
        </button>
      </span>

      <!-- Alignment & Indent -->
      <span class="ql-formats">
        <button class="ql-indent" value="-1" title="Diminuir recuo">
          <svg viewBox="0 0 18 18"><path d="M3 5h12v1H3zM3 9h12v1H3zM3 13h12v1H3z"></path><path d="M1 9h2v1H1z"></path><path d="M1 13h2v1H1z"></path></svg>
        </button>
        <button class="ql-indent" value="+1" title="Aumentar recuo">
          <svg viewBox="0 0 18 18"><path d="M3 5h12v1H3zM3 9h12v1H3zM3 13h12v1H3z"></path><path d="M1 9h2v1H1z"></path><path d="M1 13h2v1H1z"></path></svg>
        </button>
        <select class="ql-align" title="Alinhamento">
          <option selected>Padrão</option>
          <option value="center">Centralizado</option>
          <option value="right">Direita</option>
          <option value="justify">Justificado</option>
        </select>
      </span>

      <!-- Media & Links -->
      <span class="ql-formats">
        <button class="ql-link" title="Inserir link">
          <svg viewBox="0 0 18 18"><path d="M7 11a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M11 7a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path><path d="M8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path><path d="M6 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path><path d="M12 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path><path d="M10 10a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path><path d="M9 6a1 1 0 1 0-2 0 1 1 0 0 0 2 0z"></path></svg>
        </button>
        <button class="ql-image" title="Inserir imagem">
          <svg viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="1"></rect><circle cx="6.5" cy="6.5" r="1.5"></circle><path d="M15 11l-3-3-3 3-2-2-3 3"></path></svg>
        </button>
        <button class="ql-video" title="Inserir vídeo">
          <svg viewBox="0 0 18 18"><rect x="3" y="3" width="12" height="12" rx="1"></rect><path d="M8 7l4 2-4 2z"></path></svg>
        </button>
      </span>

      <!-- Advanced -->
      <span class="ql-formats">
        <button class="ql-clean" title="Limpar formatação">
          <svg viewBox="0 0 18 18"><path d="M5 5h8v8H5z"></path><path d="M3 3h12v12H3z"></path></svg>
        </button>
        <button class="ql-formula" title="Inserir fórmula">
          <svg viewBox="0 0 18 18"><path d="M5 5h8v8H5z"></path><path d="M3 3h12v12H3z"></path><path d="M7 7h4v4H7z"></path></svg>
        </button>
        <button class="ql-table" title="Inserir tabela">
          <svg viewBox="0 0 18 18"><path d="M3 3h12v12H3z"></path><path d="M6 3v12M12 3v12M3 6h12M3 12h12"></path></svg>
        </button>
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

      if (this.modelValue) {
        this.quill.root.innerHTML = this.modelValue;
      }

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
  border-radius: 16px;
  background: rgba(28, 28, 30, 0.9);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, sans-serif;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 1;
  transform: translateZ(0);
}

.rich-text-editor:hover {
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.editor-content {
  flex: 1;
  min-height: 300px;
  max-height: 800px;
  padding: 24px;
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  outline: none;
  background: transparent;
  border-radius: 0 0 16px 16px;
  transition: background 0.3s ease;
}

.editor-content:focus-within {
  background: rgba(255, 255, 255, 0.02);
}

.toolbar {
  background: rgba(44, 44, 46, 0.9);
  backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 12px 16px !important;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  border-radius: 16px 16px 0 0;
  position: relative;
  z-index: 2;
}

.toolbar::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.ql-formats {
  display: inline-flex;
  align-items: center;
  background: transparent;
  border-radius: 10px;
  padding: 2px;
  transition: all 0.2s ease;
  position: relative;
}

.ql-formats:hover {
  background: rgba(255, 255, 255, 0.06);
}

.ql-formats::before {
  content: '';
  position: absolute;
  top: 2px;
  bottom: 2px;
  left: 2px;
  right: 2px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0);
  transition: all 0.2s ease;
  z-index: -1;
}

.ql-formats:hover::before {
  background: rgba(255, 255, 255, 0.06);
}

.ql-formats button,
.ql-formats select {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
  color: rgba(255, 255, 255, 0.9);
  position: relative;
}

.ql-formats button svg,
.ql-formats select svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.ql-formats button:hover,
.ql-formats select:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 1);
}

.ql-formats button.ql-active {
  background: rgba(0, 122, 255, 0.2) !important;
  color: #007AFF !important;
}

.ql-formats button.ql-active:hover {
  background: rgba(0, 122, 255, 0.25) !important;
}

.ql-formats select {
  padding: 8px 32px 8px 12px;
  font-size: 14px;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='rgba(255,255,255,0.7)'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 14px;
  min-width: 120px;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.9);
  z-index: 2;
}

.ql-formats select option {
  background: rgba(44, 44, 46, 0.95);
  color: rgba(255, 255, 255, 0.9);
}

:deep(.ql-container.ql-snow) {
  border: none !important;
  font-family: inherit;
}

:deep(.ql-toolbar.ql-snow) {
  border: none !important;
}

:deep(.ql-editor) {
  padding: 0 !important;
  font-size: 16px !important;
  min-height: 200px;
}

:deep(.ql-editor.ql-blank::before) {
  color: rgba(255, 255, 255, 0.4);
  font-style: normal;
  left: 24px;
  right: 24px;
  font-size: 16px;
}

:deep(.ql-snow .ql-picker) {
  color: rgba(255, 255, 255, 0.9);
}

:deep(.ql-snow .ql-stroke) {
  stroke: rgba(255, 255, 255, 0.9);
}

:deep(.ql-snow .ql-fill) {
  fill: rgba(255, 255, 255, 0.9);
}

:deep(.ql-snow .ql-picker-options) {
  background-color: rgba(44, 44, 46, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(24px);
  padding: 8px;
}

:deep(.ql-snow .ql-picker-item) {
  border-radius: 6px;
  padding: 4px 8px;
  margin: 2px;
  transition: all 0.2s ease;
}

:deep(.ql-snow .ql-picker-item.ql-selected),
:deep(.ql-snow .ql-picker-item:hover) {
  background: rgba(0, 122, 255, 0.2);
  color: #007AFF;
}

:deep(.ql-snow .ql-tooltip) {
  background-color: rgba(44, 44, 46, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  color: #FFFFFF;
  border-radius: 12px;
  backdrop-filter: blur(24px);
  padding: 8px 12px;
  transform: translateY(5px);
}

:deep(.ql-snow .ql-tooltip input[type=text]) {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  border-radius: 8px;
  padding: 6px 12px;
  margin-top: 4px;
}

:deep(.ql-snow .ql-tooltip a.ql-action::after) {
  color: #007AFF;
  border-radius: 6px;
  padding: 4px 8px;
  margin-left: 8px;
}

:deep(.ql-snow .ql-tooltip a.ql-action:hover::after) {
  background: rgba(0, 122, 255, 0.1);
}

:deep(.ql-syntax) {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  padding: 2px 4px;
  color: #FF9500;
}

@media (max-width: 768px) {
  .toolbar {
    padding: 8px !important;
    gap: 4px;
  }

  .ql-formats {
    flex-wrap: wrap;
  }

  .ql-formats button,
  .ql-formats select {
    width: 32px;
    height: 32px;
    font-size: 13px;
  }

  .ql-formats select {
    min-width: 100px;
    padding: 6px 28px 6px 10px;
  }

  .editor-content {
    padding: 16px;
    min-height: 200px;
  }
}

/* Custom scrollbar */
:deep(.ql-editor)::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

:deep(.ql-editor)::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
}

:deep(.ql-editor)::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

:deep(.ql-editor)::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
