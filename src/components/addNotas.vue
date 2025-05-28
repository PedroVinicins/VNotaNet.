<template>
  <div class="add-notas" :class="prioridade">
    <h1>Adicionar Notas</h1>

    <div class="prioridade">
      <label for="prioridade">Prioridade:</label>
      <select id="prioridade" v-model="prioridade">
        <option value="baixa">Baixa</option>
        <option value="media">Média</option>
        <option value="alta">Alta</option>
      </select>
    </div>

    <div class="sobre-nota">
      <label for="nota">Nota:</label>
      <input
        type="text"
        id="nota"
        v-model="novaNota.name"
        placeholder="Digite o título da nota"
      />
    </div>

    <button @click="adicionarNota" class="add-button">
      <RiMenuAddFill />
    </button>
  </div>
</template>

<script>
import { RiMenuAddFill } from "@remixicon/vue";

export default {
  name: "AddNotas",
  components: {
    RiMenuAddFill,
  },
  data() {
    return {
      prioridade: "baixa",
      novaNota: {
        name: "",
        prioridade: "baixa"
      }
    };
  },
  methods: {
    adicionarNota() {
      this.novaNota.prioridade = this.prioridade;
      this.$emit("nota-adicionada", { ...this.novaNota });
      this.novaNota.name = "";
      this.prioridade = "baixa";
    }
  }
};
</script>

<style scoped>
.add-notas {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 1rem;
}

.add-notas.baixa {
  background-color: #e0f7fa;
}

.add-notas.media {
  background-color: #fff9c4;
}

.add-notas.alta {
  background-color: #ffcdd2;
}
</style>
