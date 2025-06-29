<template>
  <div class="app-container bg-base-200 min-h-screen flex flex-col">
    <!-- Mobile Header -->
    <header class="mobile-header lg:hidden sticky top-0 z-50 bg-base-100 shadow-md">
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center gap-2">
          <button @click="toggleNotesList" class="btn btn-ghost btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <h1 class="text-xl font-bold ">VNotaNet</h1>
        </div>

        <div class="flex items-center gap-2">
          <button @click="toggleMobileMenu" class="btn btn-ghost btn-square" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Search -->
      <div class="px-4 pb-4">
        <div class="relative">
          <input
            v-model="busca"
            @input="pesquisarNotas"
            placeholder="Pesquisar notas..."
            class="input input-bordered w-full pl-10"
            aria-label="Search notes"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="showMobileMenu" class="mobile-menu bg-base-100 border-t p-4">
        <div class="flex gap-2">
          <button @click="handleNewNoteClick" class="btn btn-primary flex-1 gap-2">
            <RiMenuAddFill class="w-5 h-5" />
            Nova Nota
          </button>
          <button @click="gerarPDF" class="btn btn-ghost" title="Exportar PDF">
            <RiFilePdfFill class="w-5 h-5" />
          </button>
          <button @click="apagarTodasNotas" class="btn btn-ghost text-error" title="Limpar tudo">
            <RiDeleteBin6Fill class="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>

    <!-- Desktop Header -->
    <header class="desktop-header hidden lg:flex shadow-md sticky top-0 z-50">
      <div class="navbar max-w-8xl mx-auto w-full px-6">
        <!-- Logo/Brand -->


        <!-- Search Bar -->
        <div class="flex-1 px-4">
    <div class="items-center gap-2">
         <h1 class="text-2xl font-bold flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
           </svg>
           <span>VNotaNet</span>
         </h1>
       </div>
        </div>

        <div class="header flex-1 px-4">
           <div class="relative max-w-xl">
            <input
              v-model="busca"
              @input="pesquisarNotas"
              placeholder="Pesquisar notas..."
              class="input"
              aria-label="Search notes"
            />
            <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex-none flex items-center gap-2">
          <button
            @click="mostrarDialog = true"
            class="btn gap-2"
            title="Criar nova nota"
          >
            <RiMenuAddFill class="w-5 h-5" />
            <span>Nova Nota</span>
          </button>

          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-ghost" title="Mais opções">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button @click="gerarPDF" class="flex gap-2">
                  <RiFilePdfFill class="w-5 h-5" />
                  Exportar PDF
                </button>
              </li>
              <li>
                <button @click="apagarTodasNotas" class="flex gap-2 text-error">
                  <RiDeleteBin6Fill class="w-5 h-5" />
                  Limpar Tudo
                </button>
              </li>
            </ul>
          </div>

          <!-- User Avatar -->
          <div class="dropdown dropdown-end">
            <button tabindex="0" class="avatar placeholder" title="Perfil">
              <div class="w-10 rounded-full bg-neutral text-neutral-content">
                  <img :src="perfil" alt="Perfil">
              </div>
            </button>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Meu Perfil</a></li>
              <li><a>Configurações</a></li>
              <li><a class="text-error">Sair</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 flex-col lg:flex-row overflow-hidden">
      <!-- Sidebar -->
      <aside
        class="sidebar bg-base-100 shadow-inner lg:w-80 xl:w-96 transition-all duration-300 ease-in-out"
        :class="{
          'hidden lg:block': !showNotesList,
          'absolute lg:relative z-40 w-full h-full lg:h-auto': showNotesList
        }"
      >
        <div class="h-full flex flex-col">
          <!-- Mobile Notes Toggle -->
          <div class="lg:hidden p-4 border-b flex justify-between items-center bg-base-100">
            <h2 class="font-semibold text-lg">Minhas Notas</h2>
            <button @click="toggleNotesList" class="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Notes List -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h2 class="font-semibold text-lg">Minhas Notas</h2>
                </div>
                <div class="badge badge-primary">{{ notasFiltradas.length }}</div>
              </div>

              <div class="notes-list space-y-2">
                <div
                  v-for="(nota, indice) in notasFiltradas"
                  :key="nota.id"
                  @click="selecionarNota(indice)"
                  class="note-item card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  :class="{
                    'ring-2 ring-primary': indiceNotaAtual === getOriginalIndex(indice),
                    'border-l-4': true,
                    'border-l-success': nota.priority === 'Baixa',
                    'border-l-warning': nota.priority === 'Media',
                    'border-l-error': nota.priority === 'Alta'
                  }"
                >
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
                      <button
                        @click.stop="apagarNota(indice)"
                        class="btn btn-ghost btn-xs opacity-0 group-hover:opacity-100 text-error hover:bg-error hover:text-error-content transition-opacity"
                        aria-label="Delete note"
                      >
                        <RiXrpFill class="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                <div v-if="notasFiltradas.length === 0" class="text-center py-8 text-base-content/50">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
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

      <!-- Editor Area -->
      <section class="editor-area flex-1 bg-base-200 overflow-auto">
        <div class="h-full p-4 lg:p-6">
          <NoteEditor
            v-if="notaAtual"
            :note="notaAtual"
            @update:title="(title) => atualizarConteudoNota({ title })"
            @update:content="(content) => atualizarConteudoNota({ content })"
            class="h-full"
          />
          <div v-else class="flex items-center justify-center h-full text-center">
            <div class="max-w-md">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto mb-6 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="text-2xl font-semibold mb-4 text-base-content/70">Nenhuma nota selecionada</h3>
              <p class="text-base-content/50 mb-6">Selecione uma nota existente ou crie uma nova para começar a editar</p>
              <button @click="mostrarDialog = true" class="btn btn-primary gap-2">
                <RiMenuAddFill class="w-5 h-5" />
                Criar Nova Nota
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- New Note Modal -->
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
              <input
                v-model.trim="novaNota.name"
                placeholder="Dê um título para sua nota"
                class="input input-bordered w-full focus:input-primary"
                required
                maxlength="50"
                aria-required="true"
              >
              <label class="label">
                <span class="label-text-alt">{{ novaNota.name.length }}/50 caracteres</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Subtítulo</span>
              </label>
              <input
                v-model.trim="novaNota.subtitle"
                placeholder="Adicione um subtítulo (opcional)"
                class="input input-bordered w-full focus:input-primary"
                maxlength="100"
              >
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
              <textarea
                v-model.trim="novaNota.content"
                placeholder="Escreva o conteúdo da sua nota..."
                class="textarea textarea-bordered w-full h-32 focus:textarea-primary"
              ></textarea>
            </div>
          </div>

          <div class="modal-action mt-6">
            <button type="button" @click="cancelarNovaNota" class="btn btn-ghost">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary gap-2"
              :disabled="!novaNota.name"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
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

<style>
.resize-handle {
  width: 5px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  cursor: col-resize;
  background-color: rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}

.resize-handle:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.sidebar {
  position: relative;
  min-width: 250px;
  max-width: 500px;
  resize: horizontal;
  overflow: auto;
}

/* Hide the default resize handle */
.sidebar::-webkit-resizer {
  display: none;
}

.sidebar {
  position: relative;
  height: 100vh;
  overflow-y: auto;
  width: 300px; /* Default width */
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .sidebar {
    height: auto;
    max-height: 50vh;
    width: 100% !important;
    resize: none;
  }

  .editor-area {
    min-height: 50vh;
  }

  .resize-handle {
    display: none;
  }
}
</style>
