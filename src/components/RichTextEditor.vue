<template>

  <div class="rich-text-editor" :style="editorStyles">
    <!-- Customization Button -->
    <button @click="showCustomizationPanel = true" class="customize-button">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
        </path>
      </svg>
    </button>

    <!-- Customization Modal -->
    <dialog v-if="showCustomizationPanel" class="customization-modal" @click.self="showCustomizationPanel = false">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Personalizar Editor</h3>
          <button @click="showCustomizationPanel = false" class="close-button">
            &times;
          </button>
        </div>

        <div class="modal-body">
          <!-- Theme Selection -->
          <div class="panel-section">
            <h4>Tema</h4>
            <div class="theme-options">
              <button v-for="theme in themes" :key="theme.name" @click="applyTheme(theme)"
                :class="{ active: currentTheme === theme.name }" :style="{
                  background: theme.toolbarBackground,
                  color: theme.toolbarText
                }">
                {{ theme.name }}
              </button>
            </div>
          </div>

          <!-- Color Customization -->
          <div class="panel-section">
            <h4>Cores Personalizadas</h4>
            <div class="color-pickers">
              <div class="color-picker" v-for="(color, key) in colorOptions" :key="key">
                <label>{{ color.label }}</label>
                <input type="color" v-model="customColors[key]" @input="updateCustomTheme">
              </div>
            </div>
          </div>

          <!-- Font Size -->
          <div class="panel-section">
            <h4>Tamanho da Fonte</h4>
            <div class="font-size-control">
              <button @click="decreaseFontSize">-</button>
              <span>{{ fontSize }}px</span>
              <button @click="increaseFontSize">+</button>
            </div>
          </div>

          <!-- Border Radius -->
          <div class="panel-section">
            <h4>Bordas</h4>
            <div class="border-control">
              <select v-model="borderRadius" @change="updateCustomTheme">
                <option value="0">Sem bordas</option>
                <option value="8px">Suave</option>
                <option value="14px">Moderado</option>
                <option value="40px">Arredondado</option>
              </select>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button @click="resetToDefault" class="reset-button">Resetar para Padrão</button>
        </div>
      </div>
    </dialog>


    <div id="toolbar-container" class="toolbar">
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
      <span class="ql-formats">
        <button class="ql-formula"></button>
        <button class="ql-table"></button>
      </span>
    </div>
    <div ref="editorRef" class="editor-content"></div>
  </div>
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue'
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

    // Configurações de personalização
    const showCustomizationPanel = ref(false)
    const currentTheme = ref('dark')
    const fontSize = ref(16)
    const borderRadius = ref('14px')

    const customColors = ref({
      editorBackground: '#2a2a3a',
      editorText: '#e0e0e0',
      toolbarBackground: '#1e1e2d',
      toolbarText: '#e0e0e0',
      activeButton: '#b388ff'
    })

    const themes = [
      {
        name: 'Dracula',
        editorBackground: '#1c1b29',
        editorText: '#d1c4e9',
        toolbarBackground: '#2a2a3a',
        toolbarText: '#e8eaf6',
        activeButton: '#7c4dff'
      },
      {
        name: 'light',
        editorBackground: '#e3f2fd',
        editorText: '#0d47a1',
        toolbarBackground: '#bbdefb',
        toolbarText: '#0d47a1',
        activeButton: '#1976d2'
      },
      {
        name: 'Git',
        editorBackground: '#222',
        editorText: '#ffffff',
        toolbarBackground: '#333',
        toolbarText: '#ffffff',
        activeButton: '#ffffff'
      },
      {
        name: 'Espaço',
        editorBackground: '#102027',
        editorText: '#e0f7fa',
        toolbarBackground: '#263238',
        toolbarText: '#b2ebf2',
        activeButton: '#00bfa5'
      }
    ]
    const editorStyles = computed(() => ({
      '--editor-bg': customColors.value.editorBackground,
      '--editor-text': customColors.value.editorText,
      '--toolbar-bg': customColors.value.toolbarBackground,
      '--toolbar-text': customColors.value.toolbarText,
      '--active-btn': customColors.value.activeButton,
      '--border-radius': borderRadius.value,
      '--font-size': `${fontSize.value}px`
    }))

    function applyTheme(theme) {
      currentTheme.value = theme.name
      customColors.value = {
        editorBackground: theme.editorBackground,
        editorText: theme.editorText,
        toolbarBackground: theme.toolbarBackground,
        toolbarText: theme.toolbarText,
        activeButton: theme.activeButton
      }
    }

    function updateCustomTheme() {
      currentTheme.value = 'custom'
    }

    function increaseFontSize() {
      if (fontSize.value < 24) fontSize.value += 1
    }

    function decreaseFontSize() {
      if (fontSize.value > 12) fontSize.value -= 1
    }

    function resetToDefault() {
      applyTheme(themes.find(t => t.name === 'dark'))
      fontSize.value = 16
      borderRadius.value = '14px'
    }

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
      editorRef,
      showCustomizationPanel,
      currentTheme,
      themes,
      customColors,
      fontSize,
      borderRadius,
      editorStyles,
      applyTheme,
      updateCustomTheme,
      increaseFontSize,
      decreaseFontSize,
      resetToDefault
    }
  }
}
</script>


<style scoped>
.rich-text-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--editor-bg);
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  overflow: auto;
}

.editor-content {
  display: flex;
  flex: 1;
  min-height: 300px;
  max-height: 800px;
  flex-direction: column;
  padding: 20px;
  color: var(--editor-text);
  background: var(--editor-bg);
  font-size: var(--font-size);
  overflow-y: auto;
  overflow-x: hidden;
}

.ql-container {
  border: none !important;
  font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.ql-toolbar {
  border: none !important;
  background: var(--toolbar-bg) !important;
  padding: 10px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  position: relative;
  z-index: 1;
}

.ql-toolbar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
}

.ql-formats {
  margin: 0;
  display: inline-flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 5px;
  transition: all 0.3s ease;
}

.ql-formats:hover {
  background: rgba(255, 255, 255, 0.1);
}

.ql-formats select,
.ql-formats button {
  color: var(--toolbar-text) !important;
  background: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ql-formats select {
  padding: 5px 8px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2) !important;
}

.ql-formats button {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.ql-formats button:hover {
  background: rgba(255, 255, 255, 0.1) !important;
}

.ql-formats button.ql-active {
  background: color-mix(in srgb, var(--active-btn) 20%, transparent) !important;
  color: var(--active-btn) !important;
}

/* Painel de personalização */
.editor-controls {
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 100;
}

.customization-modal {
  position: fixed;
  bottom: 0px;
    width: 100%;
  max-width: 1000px;
  max-height: 80vh;
  background: transparent;
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  border: none;
  padding: 0;
}

.customization-modal::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background: var(--editor-bg);
  color: var(--editor-text);
  border-radius: 12px;
  width: 100%;
  max-width: 1000px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: modalFadeIn 0.3s ease-out;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eee;
  color: var(--toolbar-text);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color:var(--toolbar-text);
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0 8px;
}

.close-button:hover {
  color: #333;
}

.modal-body {
  padding: 24px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.customize-button {
  position: fixed;
  bottom: 16px;
  left: 20%;
  transform: translateX(-50%);
  background: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
  border: none;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
  z-index: 999;
}

.customize-button :hover {
  background: rgb(255, 255, 255);
  color: rgb(0, 0, 0);
  transform: translateX(-50%) scale(1.05);
}


.panel-section {
  margin-bottom: 15px;
}

.panel-section h4 {
  margin: 0 0 10px 0;
  font-size: 15px;
  color: #555;
}

.theme-options {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.theme-options button {
  border: none;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: transform 0.2s;
}

.theme-options button:hover {
  transform: translateY(-2px);
}

.theme-options button.active {
  box-shadow: 0 0 0 2px var(--active-btn);
}

.color-pickers {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

.color-picker {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.color-picker label {
  font-size: 13px;
  color: #666;
}

.color-picker input[type="color"] {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.font-size-control {
  display: flex;
  align-items: center;
  gap: 10px;
}

.font-size-control button {
  width: 30px;
  height: 30px;
  border: none;
  background: rgb(0, 0, 0);
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

.font-size-control span {
  min-width: 40px;
  text-align: center;
}

.border-control select {
  width: 100%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #0c0c0c;
}

.reset-button {
  width: 100%;
  padding: 8px;
  background: #0c0c0c;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

/* Estilo para mobile */
@media (max-width: 768px) {
  .rich-text-editor {
    border-radius: var(--border-radius);
  }

  .customization-panel {
    width: 260px;
    right: -10px;
  }

  .theme-options {
    grid-template-columns: 1fr;
  }

  .editor-content {
    padding: 15px;
    min-height: 300px;
    max-height: 800px;
  }
}
</style>
