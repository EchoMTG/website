<template>
	<section class="breadcrumbBox pt-2 pb-2 pl-3">

        <!-- Right -->
        <b-breadcrumb size="is-small">
            <b-breadcrumb-item  href="/"><b-icon  size="is-small" class="mr-0 pr-0" icon="home"/></b-breadcrumb-item>
            <b-breadcrumb-item
              v-for="(item, index) in data"
              :key="item.label.toLowerCase().replace(' ','')"
              :href="item.url"
              :active="(index + 1) == data.length"
              >{{item.label}}</b-breadcrumb-item>
        </b-breadcrumb>

    </section>
</template>

<script>
export default {

  name: 'EchoBreadCrumbs',
  props: {
      data: {
          type: Array,
          default: () => [],
          required: true
      },
  },
  mounted() {
    // console.log(this.data)
  }

}
</script>
