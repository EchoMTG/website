import Vue from 'vue'

import DechView from '../components/single/DeckView.vue'

const components = { DechView }
   
Object.entries(components).forEach(([name, component]) => {
    Vue.component(name, component)
})