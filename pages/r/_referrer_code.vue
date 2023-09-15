<template>
  <div>
      Redirecting...
  </div>
</template>
<script>

export default {
  name: 'Referrer',
  async fetch() {
    const parts = this.$route.path.split('/')
    const referrerCode = parts[2]

    console.log(referrerCode)

    const days = 30
    // store a cookie
    this.$cookies.set('referrerCode', referrerCode,{
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * days,
      domain: '.echomtg.com'
    })

    this.$nuxt.context.redirect({path:'/'})

  },


}
</script>
