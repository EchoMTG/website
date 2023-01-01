
const shellUser = {
  first_name: '',
  last_name: '',
  avatar: 'https://assets.echomtg.com/interface/echomtg-mage-avatar.png',
  username: '',
  email: '',
  last_login: ''
}

export const state = () => ({
  /* User */
  userName: null,
  userEmail: null,
  userLevel: null,
  userAvatar: 'https://assets.echomtg.com/interface/echomtg-mage-avatar.png',
  user: shellUser,
  authenticated: false,

  /* NavBar */
  isNavBarVisible: true,
  navBarColor: null,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideExpanded: false,
  isAsideMobileExpanded: false,
  asideActiveForcedKey: null,
  isAsideRightVisible: false,
  isAsideRightActive: false,

  /* Updates */
  hasUpdates: false,

  /* Overlay */
  isOverlayVisible: false,

  /* Layout */
  isLayoutBoxed: false,
  isLayoutAsideHidden: false,
  isLayoutMobile: false,

  /* Dark mode (available with style-light-dark.scss only) */
  isDarkModeActive: false,

  /* ConfigBox */
  isConfigBoxVisible: false
})

export const mutations = {
  /* A fit-them-all commit */
  basic (state, payload) {
    state[payload.key] = payload.value
  },

  /* User */
  user (state, payload) {
    if (payload.username) {
      state.userName = payload?.first_name ? payload.first_name + ' ' + payload.last_name : payload.username;
      state.user = payload
      state.authenticated = true
      // let darkmode = parseInt(state.user.dark_mode) == 1 ? true : false;
      // state.isDarkModeActive = darkmode
      // document.documentElement.classList[darkmode ? 'add' : 'remove']('is-dark-mode-active');
      // store to locale store to persist later
      window.localStorage.setItem('user', JSON.stringify(payload));

    }

  },

  authenticated(state, payload){
      state.authenticated = payload
      // store to locale store to persist later
      if(payload == true){
        window.localStorage.setItem('authenticated', 'true');
      } else {
        window.localStorage.removeItem('authenticated')
        window.localStorage.removeItem('user')
      }

  },

  /* Full Page mode */
  fullPage (state, payload) {
    state.isConfigBoxVisible = !payload
    state.isNavBarVisible = !payload
    state.isAsideVisible = !payload
    state.isFooterBarVisible = !payload
    state.isOverlayVisible = false
  },

  /* Aside Desktop Visibility */
  asideVisibilityToggle (state, payload) {
    state.isAsideVisible = payload
  },

  /* Aside Desktop State */
  asideStateToggle (state, payload = null) {
    const htmlAsideClassName = 'has-aside-expanded'
    const isExpand = payload !== null ? payload : !state.isAsideExpanded

    document.documentElement.classList[isExpand ? 'add' : 'remove'](htmlAsideClassName)

    state.isAsideExpanded = isExpand
  },

  /* Aside Mobile State */
  asideMobileStateToggle (state, payload = null) {
    const isShow = payload !== null ? payload : !state.isAsideMobileExpanded

    document.documentElement.classList[isShow ? 'add' : 'remove']('has-aside-mobile-expanded')

    state.isAsideVisible = true
    state.isAsideMobileExpanded = isShow
  },

  /* Aside Forced Active Key (when secondary submenu is open) */
  asideActiveForcedKeyToggle (state, payload) {
    state.asideActiveForcedKey =
      payload && payload.menuSecondaryKey ? payload.menuSecondaryKey : null
  },

  /* Aside Right */
  asideRightToggle (state, payload) {
    state.isAsideRightVisible = payload
    state.isAsideRightActive = payload
    state.hasUpdates = false
  },

  /* Overlay */
  overlayToggle (state, payload = null) {
    const setIsVisible = payload !== null ? payload : !state.isOverlayVisible

    if (!setIsVisible && state.isLayoutAsideHidden && (state.isAsideVisible || state.isAsideRightVisible)) {
      return
    }

    state.isOverlayVisible = setIsVisible

    document.documentElement.classList[setIsVisible ? 'add' : 'remove']('is-clipped')
  },

  /* Layouts */

  layoutBoxedToggle (state, payload = null) {
    const setIsBoxed = payload !== null ? payload : !state.isLayoutBoxed

    state.isLayoutAsideHidden = setIsBoxed
    state.isLayoutBoxed = setIsBoxed
    state.isAsideExpanded = setIsBoxed
    state.isAsideVisible = !setIsBoxed
    state.isAsideRightVisible = false
    state.isAsideRightActive = false

    document.documentElement.classList[setIsBoxed ? 'remove' : 'add']('has-aside-left', 'has-navbar-fixed-top')
    document.documentElement.classList[setIsBoxed ? 'add' : 'remove']('has-boxed-layout', 'has-aside-hidden-layout', 'has-aside-expanded')
  },

  layoutWideToggle (state, payload = null) {
    const setIsWide = payload !== null ? payload : !state.isLayoutBoxed

    state.isLayoutAsideHidden = setIsWide
    state.isAsideExpanded = setIsWide
    state.isAsideVisible = !setIsWide
    state.isAsideRightVisible = !setIsWide

    document.documentElement.classList[setIsWide ? 'remove' : 'add']('has-aside-left')
    document.documentElement.classList[setIsWide ? 'add' : 'remove']('has-aside-hidden-layout', 'has-aside-expanded')
  },

  layoutMobileToggle (state, payload) {
    state.isLayoutMobile = payload
  },

  /* Dark Mode */
  darkModeToggle (state, payload = null) {
    const setIsDark = payload !== null ? payload : !state.isDarkModeActive
    state.isDarkModeActive = setIsDark
    document.documentElement.classList[setIsDark ? 'add' : 'remove']('is-dark-mode-active')
  },

  /* Misc */

  setNavBarColor (state, payload) {
    state.navBarColor = payload
  }
}

export const actions = {
  asideCloseAll ({ commit, state }) {
    commit('asideVisibilityToggle', false)
    commit('asideRightToggle', false)
    commit('overlayToggle', false)
  },
  asideVisibilityToggle ({ commit, state }, payload = null) {
    const setIsVisible = payload !== null ? payload : !state.isAsideVisible

    commit('asideVisibilityToggle', setIsVisible)
    commit('overlayToggle', setIsVisible)
  },
  asideRightToggle ({ commit, state }, payload = null) {
    const isShow = payload !== null ? payload : !state.isAsideRightVisible

    commit('asideRightToggle', isShow)

    if (state.isLayoutAsideHidden) {
      commit('overlayToggle', isShow)
    }

    if (!state.isLayoutAsideHidden) {
      document.documentElement.classList[isShow ? 'add' : 'remove']('has-aside-right')
    }
  },
  layoutMobileToggle ({ commit, state }) {
    const isMobile = window.innerWidth < 1024

    commit('layoutMobileToggle', isMobile)

    document.documentElement.classList[isMobile && state.isIframePreviewMode ? 'add' : 'remove']('iframe-preview-mode')
  },
  toggleFullPage ({ commit }, payload) {
    commit('layoutBoxedToggle', false)
    commit('fullPage', payload)

    document.documentElement.classList.remove('is-clipped')

    if (payload) {
      document.documentElement.classList.remove('has-aside-left', 'has-navbar-fixed-top')
    }
  }
}
