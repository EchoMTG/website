<template>
  <div v-if="isConfigBoxVisible" class="config-box">
    <span v-if="!isOpen" class="icon trigger is-large" @click="isOpen = true">
      <i class="mdi mdi-settings mdi-36px" />
    </span>
    <div v-else class="config-wrapper">
      <b-field label="App style">
        <div class="content" style="max-width: 25vw">
          <p>Default is <code>style-default.scss</code></p>
          <p>Dark mode works with <code>style-light-dark.scss</code><br>Set <code>css</code> in <code>nuxt.config.js</code><br>Toggle with <code>this.$store.commit('darkModeToggle')</code></p>
        </div>
      </b-field>
      <b-field label="Updates Bar">
        <b-button size="is-small" @click="toggleUpdatesBar">
          <b-icon icon="bell" custom-size="default" />
          <span>Toggle</span>
        </b-button>
      </b-field>
        <b-field label="Dark Mode">
        <b-button size="is-small" @click="toggleDark">
          <b-icon icon="sun" custom-size="default" />
          <span>Toggle</span>
        </b-button>


        
      </b-field>
      <b-field label="Layout">
        <radio-picker v-model="layout" :options="{default:'Default', expanded:'Expanded', boxed:'Boxed', wide:'Wide'}" :addons="false" @input="setLayout" />
      </b-field>
      <b-field v-if="appStyle === 'default'" label="Navbar color">
        <radio-picker v-model="navBarColor" :options="{default:'White', 'is-black':'Black', 'is-dark':'Dark', 'is-light':'Light'}" :addons="false" @input="setNavBarColor" />
      </b-field>
      <span class="icon is-medium close-button" @click="isOpen = false">
        <i class="mdi mdi-24px mdi-close" />
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadioPicker from '@/components/RadioPicker'

export default {
  name: 'ConfigBox',
  components: {
    RadioPicker
  },
  data () {
    return {
      isOpen: false,
      layout: 'default',
      navBarColor: 'default'
    }
  },
  computed: mapState([
    'isDarkModeActive',
    'isAsideRightVisible',
    'isOverlayVisible',
    'isLayoutMobile',
    'isConfigBoxVisible'
  ]),
  watch: {
    isLayoutMobile (newVal) {
      if (newVal) {
        this.layout = 'default'
      }
    }
  },
  methods: {
    setLayout (layout) {
      this.$store.commit('layoutBoxedToggle', false)
      this.$store.commit('asideRightToggle', false)
      this.$store.commit('overlayToggle', false)
      
      document.documentElement.classList.remove('has-aside-right')

      if (layout === 'default') {
        this.$store.commit('asideStateToggle', false)
      } else if (layout === 'expanded') {
        this.$store.commit('asideStateToggle', true)
      } else if (layout === 'boxed') {
        this.$store.commit('layoutBoxedToggle', true)
      } else if (layout === 'wide') {
        this.$store.commit('layoutWideToggle', true)
      }
    },
    setNavBarColor (color) {
      this.$store.commit('setNavBarColor', color !== 'default' ? color : null)
    },
    toggleUpdatesBar () {
      this.$store.dispatch('asideRightToggle')
    },
    toggleDark () {
      this.$store.commit('darkModeToggle')
    }
  }
}
</script>
