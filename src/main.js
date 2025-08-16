import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importa Firebase (só pra inicializar, não precisa usar diretamente aqui)
import { firebaseApp } from "./firebase"

const app = createApp(App)
app.use(router)

// Função para detectar mobile
function isMobileDevice() {
  return window.innerWidth <= 768
}
let currentDevice = isMobileDevice()

window.addEventListener('resize', () => {
  const newDevice = isMobileDevice()
  if (newDevice !== currentDevice) {
    console.log('🔄 Tipo de dispositivo mudou. Recarregando...')
    window.location.reload()
  }
})

// Função para detectar desktop até 4k
function isDeskDevice() {
  return window.innerWidth <= 3840
}
let carregarDevice = isDeskDevice()

window.addEventListener('resize', () => {
  const newDevice = isDeskDevice()
  if (newDevice !== carregarDevice) {
    console.log('🔄 Tipo de dispositivo mudou. Recarregando...')
    window.location.reload()
  }
})

app.mount('#app')
