import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

function isMobileDevice() {
  return window.innerWidth <= 768
}

if (isMobileDevice()) {
      console.log('✅ mobile carregado!')
}else{
    console.error('❌ Erro ao carregar  mobile')
}

// Verifica mudança de tamanho da tela >>>
let currentDevice = isMobileDevice()

window.addEventListener('resize', () => {
  const newDevice = isMobileDevice()
  if (newDevice !== currentDevice) {
    console.log('🔄 Tipo de dispositivo mudou. Recarregando...')
    window.location.reload()
  }
})
function isDesckDevice() {
  return window.innerWidth <= 3840
}

// Aplica CSS mobile se for necessário
if (isDesckDevice()) {
      console.log('✅ CSS mobile carregado!')
}else{
      console.error('❌ Erro ao carregar CSS mobile:', err)
}

// Verifica mudança de tamanho da tela >>>
let carregarDevice = isDesckDevice()

window.addEventListener('resize', () => {
  const newDevice = isDesckDevice()
  if (newDevice !== carregarDevice) {
    console.log('🔄 Tipo de dispositivo mudou. Recarregando...')
    window.location.reload()
  }
})

app.mount('#app')

