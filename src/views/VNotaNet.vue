<template>
  <div class="app-container display-flex justify-space-between">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <h1 class="text-xl">NotaNet</h1>
      </div>
      <div class="main-navbar bg-base-100 shadow-sm">
        <ul class="header menu-horizontal w-90">
          <li>
            <button @click="mostrarDialog = true" class="btn-new-note">
              <RiMenuAddFill />
            </button>
          </li>
          <li>
            <button @click="apagarTodasNotas" class="btn-delete-all">
              <RiDeleteBin6Fill />
            </button>
          </li>
          <li>
            <button @click="gerarPDF" class="btn-generate-pdf">
              <RiFilePdfFill />
            </button>
          </li>
        </ul>
      </div>

      <div class="search-container">
        <input v-model="busca" @input="pesquisarNotas" placeholder="Pesquisar notas..." class="search-input" />
      </div>

      <div class="avatar avatar-online">
        <div class="w-14 rounded-full">
          <img src="https://img.daisyui.com/images/profile/demo/idiotsandwich@192.webp" />
        </div>
      </div>
    </div>

    <!-- Caixa de dialogo com o noos mano -->
    <div v-if="mostrarDialog" class="modal modal-open">
      <div class="modal-box max-w-2xl p-0 overflow-hidden">
        <div class="modal-header bg-gradient-to-r p-6">
          <h3 class="font-bold text-2xl text-white">Nova Nota</h3>
          <p class="text-blue-100">Preencha os campos para criar sua nota</p>
        </div>

        <div class="dialog-content p-6 space-y-4">
          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input v-model="novaNota.name" placeholder="Dê um título para sua nota"
              class="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required>
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Subtítulo</label>
            <input v-model="novaNota.subtitle" placeholder="Adicione um subtítulo (opcional)"
              class="input input-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
            <select v-model="novaNota.priority"
              class="select select-bordered w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option disabled selected>Selecione a prioridade</option>
              <option value="Baixa" class="text-green-600">Baixa</option>
              <option value="Media" class="text-yellow-600">Média</option>
              <option value="Alta" class="text-red-600">Alta</option>
            </select>
          </div>

          <div class="form-group">
            <label class="block text-sm font-medium text-gray-700 mb-1">Conteúdo</label>
            <textarea v-model="novaNota.content" placeholder="Escreva o conteúdo da sua nota..."
              class="textarea textarea-bordered w-full h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
        </div>

        <div class="modal-footer px-6 py-4 flex justify-end space-x-3">
          <button @click="cancelarNovaNota" class="btn btn-ghost hover:bg-gray-200 text-gray-600">
            Cancelar
          </button>
          <button @click="salvarNovaNota"
            class="btn bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
            :disabled="!novaNota.name" :class="{ 'opacity-70 cursor-not-allowed': !novaNota.name }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd" />
            </svg>
            Salvar Nota
          </button>
        </div>
      </div>
    </div>

    <div class="main-content">
      <ul
        class="menu inline-flex p-5 text-base font-medium text-gray-500 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
        <li>
          <details open>
            <summary>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="h-4 w-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              My Files
            </summary>
            <ul>
              <li>
                <details open>
                  <summary>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="h-4 w-4">
                      <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                    </svg>
                    Notas
                  </summary>
                  <div class="sidebar ">
                    <div class="notes-list">
                      <div v-for="(nota, indice) in notasFiltradas" :key="indice" @click="selecionarNota(indice)"
                        :class="{
                          'note-item': true,
                          'active': indiceNotaAtual === indice,
                          [nota.priority]: true
                        }">
                        <div class="note-content">
                          <div class="note-title">
                            {{ nota.name }}
                          </div>
                          <p class="note-subtitle">{{ nota.subtitle || 'Sem subtítulo' }}</p>
                          <p class="note-date">{{ nota.date }}</p>
                          <div v-if="nota.priority" class="priority" :class="nota.priority">
                            {{ nota.priority }}
                          </div>
                          <div v-if="nota.name.length >= 43" class="error-message">
                            Limite de caracteres atingido!
                          </div>
                          <button class="delete-note-btn" @click.stop="apagarNota(indice)">
                            <span class="delete-icon">
                              <RiXrpFill size="12px" />
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              </li>
            </ul>
          </details>
        </li>
        <li>
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="h-4 w-4">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            NotaNEt
          </a>
        </li>
      </ul>
      <div class="note-editor-container">
        <NoteEditor v-if="notaAtual" :note="notaAtual" @update="atualizarConteudoNota" />
        <div v-else class="no-note-selected">
          <p>Selecione uma nota ou crie uma nova</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NoteEditor from '@/components/NoteEditor.vue'
import { RiFilePdfFill, RiDeleteBin6Fill, RiMenuAddFill, RiXrpFill } from "@remixicon/vue";

export default {
  name: 'JumpNotas',
  components: {
    NoteEditor,
    RiFilePdfFill,
    RiDeleteBin6Fill,
    RiMenuAddFill,
    RiXrpFill
  },
  data() {
    return {
      notas: JSON.parse(localStorage.getItem('notasData')) || [],
      indiceNotaAtual: 0,
      busca: '',
      notasFiltradas: [],
      mostrarDialog: false,
      novaNota: {
        name: '',
        subtitle: '',
        priority: 'media',
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
    this.notasFiltradas = [...this.notas]
    // Se não houver notas, cria uma padrão <
    if (this.notas.length === 0) {
      this.criarNotaPadrao()
    }
  },
  methods: {
    criarNotaPadrao() {
      this.notas.push({
        name: 'Bem-vindo ao NotaNet',
        subtitle: 'Sua primeira nota',
        date: new Date().toLocaleDateString(),
        content: 'Comece a escrever suas notas aqui!'
      })
      this.salvarNotas()
    },
    salvarNovaNota() {
      const notaCompleta = {
        ...this.novaNota,
        date: new Date().toLocaleDateString()
      }

      this.notas.push(notaCompleta)
      this.indiceNotaAtual = this.notas.length - 1
      this.salvarNotas()
      this.pesquisarNotas()
      this.mostrarDialog = false
      this.resetarNovaNota()
    },
    cancelarNovaNota() {
      this.mostrarDialog = false
      this.resetarNovaNota()
    },
    resetarNovaNota() {
      this.novaNota = {
        name: '',
        subtitle: '',
        priority: 'media',
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
    apagarNota(indice) {
      if (confirm(`Tem certeza que deseja apagar a nota "${this.notas[indice].name}"?`)) {
        this.notas.splice(indice, 1)
        if (this.indiceNotaAtual >= indice) {
          this.indiceNotaAtual = Math.max(0, this.indiceNotaAtual - 1)
        }

        if (this.notas.length === 0) {
          this.criarNotaPadrao()
        }

        this.salvarNotas()
        this.pesquisarNotas()
      }
    },
    gerarPDF() {
      if (this.notas.length === 0) {
        alert('Nenhuma nota encontrada!')
        return
      }

      import('jspdf').then(jsPDF => {
        const doc = new jsPDF.default()
        doc.setFontSize(18)
        doc.text('Suas Notas', 10, 10)

        let yPos = 20
        doc.setFontSize(12)

        this.notas.forEach((nota, indice) => {
          doc.text(`Nota ${indice + 1}: ${nota.name}`, 10, yPos)
          yPos += 7
          doc.text(`Subtítulo: ${nota.subtitle || 'Nenhum'}`, 10, yPos)
          yPos += 7
          doc.text(`Prioridade: ${nota.priority}`, 10, yPos)
          yPos += 7
          doc.text(`Data: ${nota.date}`, 10, yPos)
          yPos += 10

          const linhasConteudo = doc.splitTextToSize(nota.content || '', 180)
          doc.text('Conteúdo:', 10, yPos)
          yPos += 7
          doc.text(linhasConteudo, 10, yPos)
          yPos += (linhasConteudo.length * 7) + 15

          if (yPos > 280) {
            doc.addPage()
            yPos = 20
          }
        })

        doc.save('Suas_Notas.pdf')
      })
    },
    selecionarNota(indice) {
      this.indiceNotaAtual = indice
    },
  
    atualizarConteudoNota(conteudoAtualizado) {
      this.notas[this.indiceNotaAtual].content = conteudoAtualizado
      this.salvarNotas()
    },
    ordenarPorPrioridade(notas) {
      const ordemPrioridade = { 'Media': 3, 'Baixa': 2, 'Alta': 1 };
      return [...notas].sort((a, b) => {
        return ordemPrioridade[a.priority] - ordemPrioridade[b.priority];
      });
    },

    pesquisarNotas() {
      if (this.busca.trim() === '') {
        this.notasFiltradas = this.ordenarPorPrioridade(this.notas);
        return;
      }

      const termo = this.busca.toLowerCase();
      const notasFiltradas = this.notas.filter(nota =>
        nota.name.toLowerCase().includes(termo) ||
        (nota.subtitle && nota.subtitle.toLowerCase().includes(termo)) ||
        (nota.content && nota.content.toLowerCase().includes(termo))
      );

      this.notasFiltradas = this.ordenarPorPrioridade(notasFiltradas);

      if (this.notasFiltradas.length > 0) {
        this.indiceNotaAtual = this.notas.indexOf(this.notasFiltradas[0]);
      }
    },
    salvarNotas() {
      localStorage.setItem('notasData', JSON.stringify(this.notas))
      this.notasFiltradas = [...this.notas]
    },
    sair() {
      window.location.href = "index.html"
    }
  }
}
</script>
