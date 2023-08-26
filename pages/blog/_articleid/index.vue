<template>
  <div>
   Redirecting...
  </div>
</template>

<script>
export default {
  name: 'ArticleRedirect',
  async asyncData({params, redirect, $echomtg}) {

    const articleid = params.articleid;
    let res = {}

    // try to get the json
    try {
       res = await $echomtg.getArticle(articleid);
    } catch(err){
      console.log(err)
    }

    // return it
    if (res.data?.article?.id == articleid) {
      return redirect(res.data.article.url)
    } else {
      return redirect('/blog/')
    }

  },
}
</script>
