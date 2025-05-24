<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Notas App</h1>
      <div class="header-actions">
        <button @click="sair" class="btn-logout">Logout</button>
      </div>
    </header>

    <div class="main-content">
      <div class="sidebar">
        <div class="search-container">
          <input
            v-model="busca"
            @input="pesquisarNotas"
            placeholder="Pesquisar notas..."
            class="search-input"
          />
        </div>
        <div class="notes-actions">
          <button @click="adicionarNota" class="btn-new-note">Nova Nota</button>
          <button @click="apagarTodasNotas" class="btn-delete-all">Apagar Tudo</button>
          <button @click="gerarPDF" class="btn-generate-pdf">Gerar PDF</button>
        </div>
        <div class="notes-list">
          <div
            v-for="(nota, indice) in notasFiltradas"
            :key="indice"
            @click="selecionarNota(indice)"
            :class="{ 'note-item': true, 'active': indiceNotaAtual === indice }"
          >
            <div class="note-content">
              <h3
                class="note-title"
                :contenteditable="nota.name.length < 43"
                @input="atualizarNomeNota(indice, $event)"
              >
                {{ nota.name }}
              </h3>
              <p class="note-date">{{ nota.date }}</p>
              <div v-if="nota.name.length >= 43" class="error-message">
                Limite de caracteres atingido!
              </div>
            </div>
            <button class="delete-note-btn" @click.stop="apagarNota(indice)">
              <span class="delete-icon">×</span>
            </button>
          </div>
        </div>
      </div>

      <div class="note-editor-container">
        <NoteEditor
          v-if="notaAtual"
          :note="notaAtual"
          @update="atualizarConteudoNota"
        />
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
