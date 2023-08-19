<template>
	<section class="breadcrumbBox pt-2 pb-2 pl-3">

        <!-- Right -->
        <b-breadcrumb size="is-small">
            <b-breadcrumb-item  tag='router-link' to="/"><b-icon  size="is-small" class="mr-0 pr-0" icon="home"/></b-breadcrumb-item>
            <b-breadcrumb-item
              v-for="(item, index) in data"
              tag='router-link'
              :key="item.label.toLowerCase().replace(' ','')"
              :to="item.url"
              class="is-capitalized"
              :active="(index + 1) == data.length"
              ><b-icon v-if="item.icon != ''" class="ml-0" :icon="item.icon" size="is-small" />{{item.label}}</b-breadcrumb-item>
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
