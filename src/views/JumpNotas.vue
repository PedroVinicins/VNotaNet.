<template>
  <div class="app-container display-flex justify-space-between">
    <div class="navbar bg-base-100 shadow-sm">
      <div class="flex-1">
        <h1 class="text-xl">ConectNotas</h1>
      </div>
      <div class="navbar bg-base-100 shadow-sm">
        <ul class="header menu-horizontal bg-base-200 rounded-box w-90">
          <li>
            <a>
              <button @click="adicionarNota" class="btn-new-note">Nova Nota</button>
            </a>
          </li>
          <li>
            <a>
              <button @click="apagarTodasNotas" class="btn-delete-all">Apagar Tudo</button>
            </a>
          </li>
          <li>
            <a>
              <div class="notes-actions">
                <button @click="gerarPDF" class="btn-generate-pdf">Gerar PDF</button>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="flex gap-2">
        <div class="search-container">
          <input v-model="busca" @input="pesquisarNotas" placeholder="Pesquisar notas..." class="search-input" />
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                Seu Perfil
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Configuraçoes</a></li>
            <li><a>Sair</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="main-content ">
      <ul class="menu menu-xg bg-base-200 rounded-box max-w-xg">
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
                      <div class="sidebar">
                        <div class="notes-list">
                          <div v-for="(nota, indice) in notasFiltradas" :key="indice" @click="selecionarNota(indice)"
                            :class="{ 'note-item': true, 'active': indiceNotaAtual === indice }">
                            <div class="note-content">
                              <h3 class="note-title" :contenteditable="nota.name.length < 43"
                                @input="atualizarNomeNota(indice, $event)">
                                {{ nota.name }}
                              </h3>
                              <p class="note-date">{{ nota.date }}</p>
                              <div v-if="nota.name.length >= 43" class="error-message">
                                Limite de caracteres atingido!
                              </div>
                              <button class="delete-note-btn" @click.stop="apagarNota(indice)">
                                <span class="delete-icon">×</span>
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

export default {
  name: 'JumpNotas',
  components: {
    NoteEditor
  },
  data() {
    return {
      notas: JSON.parse(localStorage.getItem('notasData')) || [],
      indiceNotaAtual: 0,
      busca: '',
      notasFiltradas: []
    }
  },
  computed: {
    notaAtual() {
      return this.notas[this.indiceNotaAtual] || null
    }
  },
  created() {
    this.notasFiltradas = [...this.notas]
  },
  methods: {
    adicionarNota() {
      const nome = prompt("Digite o nome da sua nova nota:", "Nova Nota")
      if (nome === null) return

      const novaNota = {
        name: nome || "Nova Nota",
        date: new Date().toLocaleDateString(),
        content: ''
      }

      this.notas.push(novaNota)
      this.salvarNotas()
      this.indiceNotaAtual = this.notas.length - 1
      this.pesquisarNotas()
    },
    apagarTodasNotas() {
      if (confirm("Tem certeza de que deseja apagar tudo?")) {
        this.notas = []
        this.indiceNotaAtual = 0
        this.salvarNotas()
        this.pesquisarNotas()
      }
    },
    apagarNota(indice) {
      if (confirm(`Tem certeza que deseja apagar a nota "${this.notas[indice].name}"?`)) {
        this.notas.splice(indice, 1)
        if (this.indiceNotaAtual >= indice) {
          this.indiceNotaAtual = Math.max(0, this.indiceNotaAtual - 1)
        }

        if (this.notas.length === 0) {
          this.adicionarNota()
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
          yPos += 10
          doc.text(`Data: ${nota.date}`, 10, yPos)
          yPos += 10

          const linhasConteudo = doc.splitTextToSize(nota.content || '', 180)
          doc.text('Conteúdo:', 10, yPos)
          yPos += 7
          doc.text(linhasConteudo, 10, yPos)
          yPos += (linhasConteudo.length * 7) + 10
        })

        doc.save('Suas_Notas.pdf')
      })
    },
    selecionarNota(indice) {
      this.indiceNotaAtual = indice
    },
    atualizarNomeNota(indice, evento) {
      const novoNome = evento.target.innerText
      if (novoNome.length >= 43) {
        evento.target.innerText = novoNome.substring(0, 43)
        this.notas[indice].name = novoNome.substring(0, 43)
      } else {
        this.notas[indice].name = novoNome
      }
      this.salvarNotas()
    },
    atualizarConteudoNota(conteudoAtualizado) {
      this.notas[this.indiceNotaAtual].content = conteudoAtualizado
      this.salvarNotas()
    },
    pesquisarNotas() {
      if (this.busca.trim() === '') {
        this.notasFiltradas = [...this.notas]
        return
      }

      const termo = this.busca.toLowerCase()
      this.notasFiltradas = this.notas.filter(nota =>
        nota.name.toLowerCase().includes(termo)
      )

      if (this.notasFiltradas.length === 0) {
        this.indiceNotaAtual = -1
      } else {
        this.indiceNotaAtual = 0
      }
    },
    salvarNotas() {
      localStorage.setItem('notasData', JSON.stringify(this.notas))
    },
    sair() {
      window.location.href = "index.html"
    }
  }
}
</script>
