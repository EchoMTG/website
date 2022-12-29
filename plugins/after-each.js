export default async ({ app }) => {
  await app.router.afterEach(() => {
    app.store.commit('asideMobileStateToggle', false)
    console.log('aafte eacg',app.store.state.user);
    const userDarkMode = app.store.state?.user?.dark_mode ? parseInt(app.store.state.user.dark_mode) : false;
    const darkMode = userDarkMode === 1 ? true : false
    console.log('after each dark mode',darkMode, userDarkMode);
    console.log('aftereach document ',document.documentElement)
    document.documentElement.classList[darkMode ? 'add' : 'remove']('is-dark-mode-active')

    app.store.commit('overlayToggle', false)
    app.store.commit('asideActiveForcedKeyToggle', null)
    // app.store.commit('darkModeToggle', darkMode)
    app.store.commit('asideStateToggle', false)
  })
}
