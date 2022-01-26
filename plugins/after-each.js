export default async ({ app }) => {
  await app.router.afterEach(() => {
    app.store.commit('asideMobileStateToggle', false)
    app.store.commit('overlayToggle', false)
    app.store.commit('asideActiveForcedKeyToggle', null)
  })
}
