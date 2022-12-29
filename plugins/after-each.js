// this run after every push state event when running vue nuxt link
export default async ({ app }) => {
  await app.router.afterEach(() => {
    app.store.commit('asideMobileStateToggle', false)
    const userDarkMode = app.store.state?.user?.dark_mode ? parseInt(app.store.state.user.dark_mode) : false;
    const darkMode = userDarkMode === 1 ? true : false
    document.documentElement.classList[darkMode ? 'add' : 'remove']('is-dark-mode-active')

    app.store.commit('overlayToggle', false)
    app.store.commit('asideActiveForcedKeyToggle', null)

  })
}
