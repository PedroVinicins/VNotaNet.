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

        <div class="search-container">
          <div class="search-input-wrapper">
            <input v-model="busca" @input="pesquisarNotas" placeholder="Pesquisar notas..." class="search-input"
              aria-label="Search notes" />
            <span class="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>
        </div>
        <div class="btn-actions">
          <button @click="modalOverlay = true" class="btn-new-note" title="Criar nova nota">
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
      <!-- Sidebar -->
      <aside class="sidebar" :class="{
        'hidden lg:block': !showNotesList,
        'absolute lg:relative z-40 w-full h-full lg:h-auto': showNotesList
      }">
        <div class="h-full flex flex-col">
          <!-- Notes List -->
          <div class="flex-1 overflow-y-auto">
            <div class="p-4">
              <div class="flex items-center justify-between mb-4 p-1 glass-effect">
                <div class="flex items-center gap-3">
                  <h2 class="font-semibold text-lg">Minhas Notas</h2>
                </div>
                <div class="element-icon">{{ notasFiltradas.length }}</div>
              </div>

              <div class="notes-list space-y-2">
                <div v-for="(nota, indice) in notasFiltradas" :key="nota.id" @click="selecionarNota(indice)"
                  class="note-item transition-all cursor-pointer group glass-effect " :class="{
                    'ring-1': indiceNotaAtual === getOriginalIndex(indice),
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
                  <button @click="modalOverlay = true" class="btn btn-primary gap-2">
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
              <button @click="modalOverlay = true" class="btn btn-primary gap-2">
                <RiMenuAddFill class="w-5 h-5" />
                Criar Nova Nota
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Note Modal -->
    <div v-if="modalOverlay" class="modal-overlay" id="modalOverlay">
      <div class="modal-container">
        <div class="modal-header">
          <h3>Nova Nota</h3>
          <p>Preencha os campos para criar sua nota</p>
        </div>

        <form @submit.prevent="salvarNovaNota" class="modal-form">
          <div class="form-group">
            <label for="modalNoteTitle">Título *</label>
            <input v-model="novaNota.name" type="text" id="modalNoteTitle" placeholder="Dê um título para sua nota"
              maxlength="50" required>
            <div class="char-counter">
              <span>{{ novaNota.name.length }}</span>/50 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="modalNoteSubtitle">Subtítulo</label>
            <input v-model="novaNota.subtitle" type="text" id="modalNoteSubtitle"
              placeholder="Adicione um subtítulo (opcional)" maxlength="100">
          </div>

          <div class="form-group">
            <label for="modalNotePriority">Prioridade</label>
            <select v-model="novaNota.priority" id="modalNotePriority">
              <option value="Baixa">🟢 Baixa</option>
              <option value="Media" selected>🟡 Média</option>
              <option value="Alta">🔴 Alta</option>
            </select>
          </div>

          <div class="form-group">
            <label for="modalNoteContent">Conteúdo</label>
            <textarea v-model="novaNota.content" id="modalNoteContent" placeholder="Escreva o conteúdo da sua nota..."
              rows="4"></textarea>
          </div>

          <div class="modal-actions">
            <button type="button" class="btn secondary" @click="modalOverlay = false">Cancelar</button>
            <button type="submit" class="btn primary">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
              Salvar Nota
            </button>
          </div>
        </form>
      </div>
    </div>

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
      modalOverlay: false,
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
    // Métodos existentes de redimensionamento...
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

    // Métodos de gerenciamento de notas com notificações integradas
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

    salvarNovaNota() {
      if (!this.novaNota.name.trim()) {
        this.showNotification('Por favor, insira um título para a nota', 'error')
        return
      }

      try {
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
        this.modalOverlay = false
        this.resetarNovaNota()

        this.showNotification('Nota criada com sucesso!', 'success')

        if (window.innerWidth < 1024) {
          this.showNotesList = true
        }
      } catch (error) {
        console.error('Erro ao salvar nota:', error)
        this.showNotification('Erro ao criar nota', 'error')
      }
    },

    apagarNota(indiceFiltrado) {
      const originalIndex = this.getOriginalIndex(indiceFiltrado)
      const nota = this.notas[originalIndex]

      if (confirm(`Apagar a nota "${nota.name}"?`)) {
        try {
          this.notas.splice(originalIndex, 1)

          if (this.indiceNotaAtual >= originalIndex) {
            this.indiceNotaAtual = Math.max(0, this.indiceNotaAtual - 1)
          }

          if (this.notas.length === 0) {
            this.criarNotaPadrao()
          }

          this.salvarNotas()
          this.pesquisarNotas()
          this.showNotification('Nota removida com sucesso', 'info')
        } catch (error) {
          console.error('Erro ao apagar nota:', error)
          this.showNotification('Erro ao remover nota', 'error')
        }
      }
    },

    apagarTodasNotas() {
      if (confirm("Tem certeza de que deseja apagar todas as notas?")) {
        try {
          this.notas = []
          this.indiceNotaAtual = 0
          this.salvarNotas()
          this.pesquisarNotas()
          this.criarNotaPadrao()
          this.showNotification('Todas as notas foram removidas', 'info')
        } catch (error) {
          console.error('Erro ao apagar todas as notas:', error)
          this.showNotification('Erro ao limpar notas', 'error')
        }
      }
    },

    atualizarConteudoNota({ title, content }) {
      try {
        if (this.notas[this.indiceNotaAtual]) {
          if (title !== undefined) this.notas[this.indiceNotaAtual].name = title
          if (content !== undefined) this.notas[this.indiceNotaAtual].content = content
          this.salvarNotas()
        }
      } catch (error) {
        console.error('Erro ao atualizar nota:', error)
      }
    },

    // Método de notificação
    showNotification(message, type = 'info') {
      // Verifica se já existe um container de notificações
      let container = document.getElementById('notification-container')
      if (!container) {
        container = document.createElement('div')
        container.id = 'notification-container'
        container.style.position = 'fixed'
        container.style.bottom = '20px'
        container.style.right = '20px'
        container.style.zIndex = '10000'
        container.style.display = 'flex'
        container.style.flexDirection = 'column'
        container.style.gap = '10px'
        document.body.appendChild(container)
      }

      // Cria a notificação
      const notification = document.createElement('div')
      notification.className = `notification ${type}`

      // Ícone baseado no tipo
      let icon
      switch (type) {
        case 'success': icon = '✓'; break
        case 'error': icon = '✕'; break
        default: icon = 'ℹ'
      }

      notification.innerHTML = `
        <div class="notification-content">
          <span class="notification-icon">${icon}</span>
          <span class="notification-message">${message}</span>
          <button class="notification-close">×</button>
        </div>
      `

      // Adiciona estilos se não existirem
      if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style')
        style.id = 'notification-styles'
        style.textContent = `
             /* Estilos para as notificações sem usar variáveis CSS */
.notification {
  position: fixed;
top: 100px;
                    right: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  animation: slideInRight 0.3s ease;
  max-width: 300px;
  transform: translateX(0);
  opacity: 1;
  transition: all 0.3s ease;
  z-index: 10000;
}

.notification.success {
  border-left: 4px solid #34C759;
}

.notification.error {
  border-left: 4px solid #FF3B30;
}

.notification.info {
  border-left: 4px solid #007AFF;
}

.notification.warning {
  border-left: 4px solid #FF9500;
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.notification-icon {
  font-size: 18px;
  color: #FFFFFF;
}

.notification-message {
  color: #FFFFFF;
  font-size: 14px;
  flex-grow: 1;
}

.notification-close {
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  margin-left: 8px;
}

.notification-close:hover {
  color: #FFFFFF;
}

@keyframes slideInRight {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes fadeOut {
  to { opacity: 0; transform: translateY(-10px); }
}
        `
        document.head.appendChild(style)
      }

      container.appendChild(notification)

      // Fecha ao clicar no botão
      const closeBtn = notification.querySelector('.notification-close')
      closeBtn.addEventListener('click', () => {
        notification.style.animation = 'fadeOut 0.3s ease'
        setTimeout(() => notification.remove(), 300)
      })

      // Remove automaticamente após 3 segundos
      setTimeout(() => {
        if (notification.parentNode) {
          notification.style.animation = 'fadeOut 0.3s ease'
          setTimeout(() => notification.remove(), 300)
        }
      }, 3000)
    },

    // Outros métodos existentes...
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
      this.modalOverlay = true
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
    cancelarNovaNota() {
      this.modalOverlay = false
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
