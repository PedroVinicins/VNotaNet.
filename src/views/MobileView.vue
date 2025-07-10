<template>
  <div class="app-container bg-base-200 min-h-screen flex flex-col">
    <!-- Mobile Header -->
    <header class="mobile-header shadow-md sticky top-0 z-50 bg-base-100">
      <div class="navbar px-4">
        <div class="flex-1">
          <button @click="toggleSidebar" class="btn btn-ghost">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-xl font-bold ml-2">VNotaNet</h1>
        </div>

        <div class="flex-none gap-2">
          <button
            @click="mostrarDialog = true"
            class="btn btn-ghost btn-sm"
            title="Criar nova nota"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <div class="dropdown dropdown-end">
            <button tabindex="0" class="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <button @click="gerarPDF" class="flex gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Exportar PDF
                </button>
              </li>
              <li>
                <button @click="apagarTodasNotas" class="flex gap-2 text-error">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Limpar Tudo
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Search Bar -->
      <div class="px-4 pb-3">
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
    </header>

    <!-- Main Content -->
    <main class="flex flex-1 flex-col overflow-hidden relative">
      <!-- Mobile Sidebar Overlay -->
      <div
        v-if="sidebarOpen"
        @click="sidebarOpen = false"
        class="fixed inset-0 bg-black bg-opacity-50 z-40"
      ></div>

      <!-- Sidebar Mobile -->
      <aside
        class="sidebar-mobile fixed z-50 top-0 left-0 h-full w-72 bg-base-100 shadow-xl transition-transform duration-300 ease-in-out"
        :class="{'translate-x-0': sidebarOpen, '-translate-x-full': !sidebarOpen}"
      >
        <div class="h-full flex flex-col">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="font-semibold text-lg">Minhas Notas</h2>
            <button @click="sidebarOpen = false" class="btn btn-ghost btn-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="badge badge-primary">{{ notasFiltradas.length }}</div>
              <button
                @click="mostrarDialog = true"
                class="btn btn-primary btn-sm gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Nova
              </button>
            </div>

            <div class="notes-list space-y-2">
              <div
                v-for="(nota, indice) in notasFiltradas"
                :key="nota.id"
                @click="selecionarNota(indice); sidebarOpen = false"
                class="note-item card bg-base-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                :class="{
                  'ring-2 ring-primary': indiceNotaAtual === getOriginalIndex(indice),
                  'border-l-4': true,
                  'border-l-success': nota.priority === 'Baixa',
                  'border-l-warning': nota.priority === 'Media',
                  'border-l-error': nota.priority === 'Alta'
                }"
              >
                <div class="card-body p-3">
                  <div class="flex justify-between items-start gap-2">
                    <div class="flex-1 min-w-0">
                      <h3 class="card-title text-sm font-medium truncate">{{ nota.name }}</h3>
                      <p class="text-xs text-base-content/70 truncate">{{ nota.subtitle || 'Sem subtítulo' }}</p>
                      <div class="flex items-center justify-between mt-1">
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
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="notasFiltradas.length === 0" class="text-center py-8 text-base-content/50">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p class="text-base font-medium mb-2">Nenhuma nota encontrada</p>
                <button @click="mostrarDialog = true" class="btn btn-primary btn-sm gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Criar Nota
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Editor Area -->
      <section class="editor-area flex-1 bg-base-200 overflow-auto">
        <div class="h-full p-4">
          <NoteEditor
            v-if="notaAtual"
            :note="notaAtual"
            @update:title="(title) => atualizarConteudoNota({ title })"
            @update:content="(content) => atualizarConteudoNota({ content })"
            class="h-full"
          />
          <div v-else class="flex items-center justify-center h-full text-center">
            <div class="max-w-md px-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-base-content/20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 class="text-xl font-semibold mb-3 text-base-content/70">Nenhuma nota selecionada</h3>
              <p class="text-base-content/50 mb-4 text-sm">Selecione uma nota existente ou crie uma nova</p>
              <button @click="mostrarDialog = true" class="btn btn-primary btn-sm gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Criar Nota
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- New Note Modal Mobile -->
    <dialog v-if="mostrarDialog" class="modal modal-bottom sm:modal-middle modal-open" @click.self="cancelarNovaNota">
      <div class="modal-box max-w-2xl p-0 overflow-hidden">
        <div class="content p-4 bg-primary text-primary-content">
          <h3 class="font-bold text-xl">Nova Nota</h3>
        </div>

        <form @submit.prevent="salvarNovaNota" class="p-4">
          <div class="space-y-3">
            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Título *</span>
              </label>
              <input
                v-model.trim="novaNota.name"
                placeholder="Título da nota"
                class="input input-bordered w-full focus:input-primary"
                required
                maxlength="50"
                aria-required="true"
              >
              <label class="label">
                <span class="label-text-alt">{{ novaNota.name.length }}/50</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Subtítulo</span>
              </label>
              <input
                v-model.trim="novaNota.subtitle"
                placeholder="Subtítulo (opcional)"
                class="input input-bordered w-full focus:input-primary"
                maxlength="100"
              >
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Prioridade</span>
              </label>
              <select v-model="novaNota.priority" class="select select-bordered w-full focus:select-primary">
                <option value="Baixa">🟢 Baixa</option>
                <option value="Media">🟡 Média</option>
                <option value="Alta">🔴 Alta</option>
              </select>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text font-medium">Conteúdo</span>
              </label>
              <textarea
                v-model.trim="novaNota.content"
                placeholder="Conteúdo da nota..."
                class="textarea textarea-bordered w-full h-24 focus:textarea-primary"
              ></textarea>
            </div>
          </div>

          <div class="modal-action mt-4">
            <button type="button" @click="cancelarNovaNota" class="btn btn-ghost">
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary gap-1"
              :disabled="!novaNota.name"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
              Salvar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script>
import NoteEditor from '@/components/NoteEditor.vue';

export default {
  name: 'NotaNetMobile',
  components: {
    NoteEditor
  },
  data() {
    return {
      notas: [],
      indiceNotaAtual: 0,
      busca: '',
      notasFiltradas: [],
      mostrarDialog: false,
      sidebarOpen: false,
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
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen
    },
    carregarNotas() {
      try {
        const notasSalvas = localStorage.getItem('notasData')
        this.notas = notasSalvas ? JSON.parse(notasSalvas) : []
        if (this.notas.length === 0) this.criarNotaPadrao()
      } catch {
        this.notas = []
        this.criarNotaPadrao()
      }
    },
    criarNotaPadrao() {
      const notaPadrao = {
        id: Date.now().toString(),
        name: 'Bem-vindo ao NotaNet',
        subtitle: 'Sua primeira nota',
        date: new Date().toISOString(),
        priority: 'Media',
        content: 'Esta é uma nota de exemplo para ajudá-lo a começar.'
      }
      this.notas.unshift(notaPadrao)
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
        id: Date.now().toString(),
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
      this.sidebarOpen = false
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
      if (confirm("Tem certeza que deseja apagar todas as notas?")) {
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
    },
    atualizarConteudoNota({ title, content }) {
      if (this.notas[this.indiceNotaAtual]) {
        if (title !== undefined) this.notas[this.indiceNotaAtual].name = title
        if (content !== undefined) this.notas[this.indiceNotaAtual].content = content
        this.salvarNotas()
      }
    },
    pesquisarNotas() {
      const termo = this.busca.trim().toLowerCase()

      if (!termo) {
        this.notasFiltradas = [...this.notas].sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        )
        return
      }

      this.notasFiltradas = this.notas.filter(nota =>
        nota.name.toLowerCase().includes(termo) ||
        (nota.subtitle && nota.subtitle.toLowerCase().includes(termo)) ||
        (nota.content && nota.content.toLowerCase().includes(termo))
      ).sort((a, b) => new Date(b.date) - new Date(a.date))

      if (this.notasFiltradas.length > 0 && !this.notasFiltradas.some(
        nota => nota.id === this.notas[this.indiceNotaAtual]?.id
      )) {
        this.selecionarNota(0)
      }
    },
    salvarNotas() {
      localStorage.setItem('notasData', JSON.stringify(this.notas))
    },
    gerarPDF() {
      // Implementação para gerar PDF
      console.log("Gerando PDF...")
    }
  }
}
</script>

<style scoped>
.mobile-header {
  position: sticky;
  top: 0;
  z-index: 50;
}

.sidebar-mobile {
  transition: transform 0.3s ease-in-out;
  will-change: transform;
}

.note-item {
  transition: all 0.2s ease;
}

.modal-bottom .modal-box {
  width: 100%;
  max-width: 100%;
  border-radius: 0;
}

@media (min-width: 640px) {
  .modal-bottom .modal-box {
    border-radius: 0.5rem;
    max-width: 32rem;
  }
}

/* Ajustes para melhor experiência em mobile */
.input, .textarea, .select {
  font-size: 0.9375rem; /* 15px */
}

.btn {
  min-height: 2.5rem;
}

.badge {
  font-size: 0.75rem;
}

.card-title {
  font-size: 0.9375rem;
}
</style>
