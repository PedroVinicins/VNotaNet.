<template>
  <div class="app-container bg-base-200 min-h-screen flex flex-col">
    <!-- Desktop Header -->
    <header class="desktop-header">
      <div class="navbar">
        <!-- Search Bar -->
        <div class="nav">
          <div class="titulo">
            <h1 class="text-2xl font-bold flex items-center gap-2">
              <span>VNotaNet</span>
            </h1>
          </div>
        </div>

        <div class="search">
          <div class="relative">
            <input v-model="busca" @input="pesquisarNotas" placeholder="Pesquisar notas..." class="input-search"
              aria-label="Search notes" />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div class="btn-actions">
          <button @click="mostrarDialog = true" class="btn-new-note" title="Criar nova nota">
            <RiMenuAddFill class="w-5 h-5" />
            <span>Nova Nota</span>
          </button>
          <button @click="apagarTodasNotas" class="btn-delet text-error">
            <RiDeleteBin6Fill class="w-5 h-5" />
            Limpar Tudo
          </button>
          <!-- Actions -->
          <div class="Actions">
            <div class="dropdown dropdown-top">
              <button tabindex="0" class=" btn-ghost" title="Mais opções">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button @click="gerarPDF" class="flex gap-2">
                    <RiFilePdfFill class="w-5 h-5" />
                    Exportar PDF
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 flex-col lg:flex-row overflow-hidden">
      <!-- Editor Area -->
      <section class="editor-area flex-1 overflow-auto">
        <div class="h-full p-4 lg:p-6">
          <NoteEditor v-if="notaAtual" :note="notaAtual" @update:title="(title) => atualizarConteudoNota({ title })"
            @update:content="(content) => atualizarConteudoNota({ content })" class="h-full" />
          <div v-else class="flex items-center justify-center h-full text-center">
            <div class="max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-6 text-base-content/20" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="text-2xl font-semibold mb-4 text-base-content/70">Nenhuma nota selecionada</h3>
              <p class="text-base-content/50 mb-6">Selecione uma nota existente ou crie uma nova para começar a editar
              </p>
              <button @click="mostrarDialog = true" class="btn btn-primary gap-2">
                <RiMenuAddFill class="w-5 h-5" />
                Criar Nova Nota
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- Sidebar -->
      <aside class="sidebar" :class="{
        'hidden lg:block': !showNotesList,
        'absolute lg:relative z-40 w-full h-full lg:h-auto': showNotesList
      }">
        <div class="h-full flex flex-col">
          <!-- Notes List -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 class="font-semibold text-lg">Minhas Notas</h2>
                </div>
                <div class="badge badge-primary">{{ notasFiltradas.length }}</div>
              </div>

              <div class="notes-list space-y-2">
                <div v-for="(nota, indice) in notasFiltradas" :key="nota.id" @click="selecionarNota(indice)"
                  class="note-item card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  :class="{
                    'ring-2 ring-primary': indiceNotaAtual === getOriginalIndex(indice),
                    'border-l-4': true,
                    'border-l-success': nota.priority === 'Baixa',
                    'border-l-warning': nota.priority === 'Media',
                    'border-l-error': nota.priority === 'Alta'
                  }">
                  <div class="card-body p-4">
                    <div class="flex justify-between items-start gap-2">
                      <div class="flex-1 min-w-0">
                        <h3 class="card-title text-base font-medium truncate">{{ nota.name }}</h3>
                        <p class="text-sm text-base-content/70 truncate">{{ nota.subtitle || 'Sem subtítulo' }}</p>
                        <div class="flex items-center justify-between mt-2">
                          <span class="text-xs text-base-content/50">{{ formatDate(nota.date) }}</span>
                          <div class="badge badge-xs" :class="{
                            'badge-success': nota.priority === 'Baixa',
                            'badge-warning': nota.priority === 'Media',
                            'badge-error': nota.priority === 'Alta'
                          }">
                            {{ nota.priority }}
                          </div>
                        </div>
                      </div>
                      <button @click.stop="apagarNota(indice)"
                        class="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 text-error hover:bg-error hover:text-error-content transition-opacity"
                        aria-label="Delete note">
                        <RiXrpFill class="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="notasFiltradas.length === 0" class="text-center py-8 text-base-content/50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-lg font-medium mb-2">Nenhuma nota encontrada</p>
                  <p class="text-sm mb-4">Crie sua primeira nota para começar</p>
                  <button @click="mostrarDialog = true" class="btn btn-primary gap-2">
                    <RiMenuAddFill class="w-5 h-5" />
                    Criar Nota
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </main>

    <!-- Note Modal -->
    <dialog v-if="mostrarDialog" class="modal modal-open" @click.self="cancelarNovaNota">
      <div class="modal-box max-w-2xl p-0 overflow-hidden">
        <div class="content p-6 text-primary-content">
          <h3 class="font-bold text-2xl">Nova Nota</h3>
          <p>Preencha os campos para criar sua nota</p>
        </div>

        <form @submit.prevent="salvarNovaNota" class="p-6">
          <div class="space-y-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Título *</span>
              </label>
              <input v-model.trim="novaNota.name" placeholder="Dê um título para sua nota"
                class="input input-bordered w-full focus:input-primary" required maxlength="50" aria-required="true">
              <label class="label">
                <span class="label-text-alt">{{ novaNota.name.length }}/50 caracteres</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Subtítulo</span>
              </label>
              <input v-model.trim="novaNota.subtitle" placeholder="Adicione um subtítulo (opcional)"
                class="input input-bordered w-full focus:input-primary" maxlength="100">
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Prioridade</span>
              </label>
              <select v-model="novaNota.priority" class="select select-bordered w-full focus:select-primary">
                <option value="Baixa" class="text-success">🟢 Baixa</option>
                <option value="Media" class="text-warning">🟡 Média</option>
                <option value="Alta" class="text-error">🔴 Alta</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Conteúdo</span>
              </label>
              <textarea v-model.trim="novaNota.content" placeholder="Escreva o conteúdo da sua nota..."
                class="textarea textarea-bordered w-full h-32 focus:textarea-primary"></textarea>
            </div>
          </div>

          <div class="modal-action mt-6">
            <button type="button" @click="cancelarNovaNota" class="btn btn-ghost">
              Cancelar
            </button>
            <button type="submit" class="btn btn-primary gap-2" :disabled="!novaNota.name">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd" />
              </svg>
              Salvar Nota
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
import NoteEditor from '@/components/NoteEditor.vue';
import { RiFilePdfFill, RiDeleteBin6Fill, RiMenuAddFill, RiXrpFill } from "@remixicon/vue";
import perfil from '../assets/perfil.jpg';

export default {
  name: 'NotaNet',
  components: {
    NoteEditor,
    RiFilePdfFill,
    RiDeleteBin6Fill,
    RiMenuAddFill,
    RiXrpFill
  },
  data() {
    return {
      perfil,
      notas: [],
      indiceNotaAtual: 0,
      busca: '',
      notasFiltradas: [],
      mostrarDialog: false,
      showMobileMenu: false,
      showNotesList: false,
      isResizing: false,
      novaNota: {
        name: '',
        subtitle: '',
        priority: 'Media',
        content: ''
      }
    }
  },
  computed: {
    notaAtual() {
      return this.notas[this.indiceNotaAtual] || null
    }
  },
  created() {
    this.carregarNotas()
    this.pesquisarNotas()
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.setupMaincontentResize()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.cleanupSidebarResize()
  },
  methods: {
    setupMaincontentResize() {
      const sidebarElement = document.querySelector('.sidebar')
      const resizeHandle = document.createElement('div')
      resizeHandle.className = 'resize-handle'
      sidebarElement.appendChild(resizeHandle)

      resizeHandle.addEventListener('mousedown', (e) => {
        this.isResizing = true
        document.body.style.cursor = 'col-resize'
        document.addEventListener('mousemove', this.handleResizeMove)
        document.addEventListener('mouseup', this.stopResize)
        e.preventDefault()
      })
    },
    handleResizeMove(e) {
      if (!this.isResizing) return
      const sidebar = document.querySelector('.sidebar')
      const newWidth = e.clientX
      if (newWidth > 200 && newWidth < 600) {
        sidebar.style.width = `${newWidth}px`
      }
    },
    stopResize() {
      this.isResizing = false
      document.body.style.cursor = ''
      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.stopResize)
    },
    cleanupSidebarResize() {
      const resizeHandle = document.querySelector('.resize-handle')
      if (resizeHandle) {
        resizeHandle.remove()
      }
      document.removeEventListener('mousemove', this.handleResizeMove)
      document.removeEventListener('mouseup', this.stopResize)
    },
    carregarNotas() {
      try {
        const notasSalvas = localStorage.getItem('notasData')
        this.notas = notasSalvas ? JSON.parse(notasSalvas) : []
        this.notas.forEach((nota, index) => {
          if (!nota.id) {
            this.$set(this.notas, index, {
              ...nota,
              id: this.gerarIdUnico()
            })
          }
        })
        if (this.notas.length === 0) this.criarNotaPadrao()
      } catch {
        this.notas = []
        this.criarNotaPadrao()
      }
    },
    gerarIdUnico() {
      return Date.now().toString(36) + Math.random().toString(36).substring(2)
    },
    handleResize() {
      this.showNotesList = window.innerWidth >= 1024
      if (window.innerWidth >= 1024) this.showMobileMenu = false
    },
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu
    },
    toggleNotesList() {
      this.showNotesList = !this.showNotesList
    },
    handleNewNoteClick() {
      this.mostrarDialog = true
      this.showMobileMenu = false
    },
    criarNotaPadrao() {
      const notaPadrao = {
        id: this.gerarIdUnico(),
        name: 'Bem-vindo ao NotaNet',
        subtitle: 'Sua primeira nota',
        date: new Date().toISOString(),
        priority: 'Media',
        content: 'Esta é uma nota de exemplo para ajudá-lo a começar.'
      }
      this.notas.push(notaPadrao)
      this.salvarNotas()
    },
    formatDate(dateString) {
      if (!dateString) return ''
      try {
        const date = new Date(dateString)
        return isNaN(date.getTime()) ? dateString : date.toLocaleDateString('pt-BR')
      } catch {
        return dateString
      }
    },
    salvarNovaNota() {
      if (!this.novaNota.name.trim()) return
      const notaCompleta = {
        id: this.gerarIdUnico(),
        name: this.novaNota.name.trim(),
        subtitle: this.novaNota.subtitle.trim(),
        content: this.novaNota.content.trim(),
        priority: this.novaNota.priority,
        date: new Date().toISOString()
      }
      this.notas.unshift(notaCompleta)
      this.indiceNotaAtual = 0
      this.salvarNotas()
      this.pesquisarNotas()
      this.mostrarDialog = false
      this.resetarNovaNota()
      if (window.innerWidth < 1024) {
        this.showNotesList = true
      }
    },
    cancelarNovaNota() {
      this.mostrarDialog = false
      this.resetarNovaNota()
    },
    resetarNovaNota() {
      this.novaNota = {
        name: '',
        subtitle: '',
        priority: 'Media',
        content: ''
      }
    },
    apagarTodasNotas() {
      if (confirm("Tem certeza de que deseja apagar todas as notas?")) {
        this.notas = []
        this.indiceNotaAtual = 0
        this.salvarNotas()
        this.pesquisarNotas()
        this.criarNotaPadrao()
      }
    },
    apagarNota(indiceFiltrado) {
      const originalIndex = this.getOriginalIndex(indiceFiltrado)
      const nota = this.notas[originalIndex]
      if (confirm(`Apagar a nota "${nota.name}"?`)) {
        this.notas.splice(originalIndex, 1)
        if (this.indiceNotaAtual >= originalIndex) {
          this.indiceNotaAtual = Math.max(0, this.indiceNotaAtual - 1)
        }
        if (this.notas.length === 0) {
          this.criarNotaPadrao()
        }
        this.salvarNotas()
        this.pesquisarNotas()
      }
    },
    getOriginalIndex(indiceFiltrado) {
      if (indiceFiltrado < 0 || indiceFiltrado >= this.notasFiltradas.length) return 0
      const notaFiltrada = this.notasFiltradas[indiceFiltrado]
      return this.notas.findIndex(nota => nota.id === notaFiltrada.id)
    },
    selecionarNota(indiceFiltrado) {
      this.indiceNotaAtual = this.getOriginalIndex(indiceFiltrado)
      if (window.innerWidth < 1024) {
        this.showNotesList = false
      }
    },
    atualizarConteudoNota({ title, content }) {
      if (this.notas[this.indiceNotaAtual]) {
        if (title !== undefined) this.notas[this.indiceNotaAtual].name = title
        if (content !== undefined) this.notas[this.indiceNotaAtual].content = content
        this.salvarNotas()
      }
    },
    ordenarPorPrioridade(notas) {
      const ordem = { 'Alta': 1, 'Media': 2, 'Baixa': 3 }
      return [...notas].sort((a, b) => ordem[a.priority] - ordem[b.priority])
    },
    pesquisarNotas() {
      const termo = this.busca.trim().toLowerCase()
      if (!termo) {
        this.notasFiltradas = this.ordenarPorPrioridade(this.notas)
        return
      }
      this.notasFiltradas = this.ordenarPorPrioridade(
        this.notas.filter(nota =>
          nota.name.toLowerCase().includes(termo) ||
          (nota.subtitle && nota.subtitle.toLowerCase().includes(termo)) ||
          (nota.content && nota.content.toLowerCase().includes(termo))
        )
      )
      if (this.notasFiltradas.length > 0) {
        const notaAtualVisivel = this.notasFiltradas.some(
          nota => nota.id === this.notas[this.indiceNotaAtual]?.id
        )
        if (!notaAtualVisivel) this.selecionarNota(0)
      }
    },
    salvarNotas() {
      localStorage.setItem('notasData', JSON.stringify(this.notas))
    }
  }
}
</script>

<style scoped>

* {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
  scrollbar-width: thin;
  scrollbar-color: oklch(var(--bc) / 0.2) transparent;
}

.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #000000;
  background-image: url("https://www.transparenttextures.com/patterns/type.png");
}

.desktop-header {
  display: flex;
  position: fixed;
  width: 100%;
  max-width: 100%;
  padding: 0.5rem;
  bottom: 0px;
  z-index: 50;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #27232300;
  backdrop-filter: blur(5px);
}

.navbar {
  display: flex;
  align-content: center;
  justify-content: space-evenly;
}

.btn-actions {
  display: flex;
  align-items: center;
  justify-content: center;

  .btn-delet {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    padding: 12px;
    background-color: #222;
    gap: 12px;
    border: none;
    border-radius: 20px;
    margin: 5px;
  }
  .btn-new-note {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 170px;
    padding: 12px;
    background-color: #007aff;
    gap: 12px;
    border: none;
    border-radius: 20px;
    margin: 5px;
  }
}

.input-search {
    width: 150%;
    padding: 1rem 3rem;
    outline: none;
    border-radius: 0.5rem;
    background-color: #444;
    color: oklch(var(--bc) / 0.8);
    transition: all 0.2s ease;
}

.sidebar {
  display: flex;
  float: right;
  width: auto;
  background-size: cover;
  border-left: 1px solid #444444;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #27232300;
  backdrop-filter: blur(5px);
    max-height: 95vh;
  overflow-y: auto;
}

.notes-list {
  scrollbar-width: thin;
  scrollbar-color: oklch(var(--bc) / 0.2) transparent;

  .notes-list::-webkit-scrollbar {
    width: 6px;
  }

  .notes-list::-webkit-scrollbar-track {
    background: transparent;
  }

  .notes-list::-webkit-scrollbar-thumb {
    background: oklch(var(--bc) / 0.2);
    border-radius: 3px;
  }
}

.note-item {
  transition: all 0.2s ease;
  padding: 5px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #0f0f0f;
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.note-item:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}


.main-content {
  min-height: calc(100vh - 80px);
}

.editor-area {
  background: transparent;
}


.search-container input,
.search-container-mobile input {
  transition: all 0.2s ease;
}

.search-container input:focus,
.search-container-mobile input:focus {
  transform: scale(1.02);
}

.modal-box {
  max-height: 90vh;
  overflow-y: auto;
}

/* isso e o header do modal */
.content {
  background-image: url("https://www.transparenttextures.com/patterns/inspiration-geometry.png");
}

@media (max-width: 1023px) {
  .notes-container {
    max-height: 50vh;
    overflow-y: auto;
  }

  .editor-area {
    min-height: 50vh;
  }
}

@media (max-width: 960px) {
 .sidebar{
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: row !important;
  width: 100%;
  height: 300px;
 }

 .note-item {
  transition: all 0.2s ease;
  padding: 5px;
  width: 900px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #0f0f0f;
  margin-bottom: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
}

/* Animações suaves */
.modal {
  animation: fadeIn 0.2s ease;
}


@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.mobile-menu {
  animation: slideDown 0.2s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Melhorias de acessibilidade */
.btn:focus,
.input:focus,
.textarea:focus,
.select:focus {
  outline: 2px solid oklch(var(--p));
  outline-offset: 2px;
}

/* Indicadores visuais melhorados */
.badge {
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.5px;
}

</style>
