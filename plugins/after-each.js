// this run after every push state event when running vue nuxt link
export default async ({ app }) => {
  await app.router.afterEach(() => {
    app.store.commit('asideMobileStateToggle', false)
    let darkMode = true;
    if(app.store.state?.user){

      darkMode = app.store.state.user.dark_mode == 1 ? true : false;
      console.log('darkmode',darkMode)
    }
    app.store.commit('darkModeToggle', darkMode)

    app.store.commit('overlayToggle', false)
    app.store.commit('asideActiveForcedKeyToggle', null)

  })
}
