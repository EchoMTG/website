<template>
    <div>

        <b-tabs v-model="activeTab">
            <b-tab-item label="Description">
                <div class="content">
                  <div v-if="description" v-html="$md.render(description)"></div>
                </div>
            </b-tab-item>

            <b-tab-item v-if="hasResponse()" label="Example JSON Response">

                <b-input
                      type="textarea"
                      rows="8"
                      placeholder="Maxlength automatically counts characters"
                      :value="this.getResponse()"
                      />
            </b-tab-item>

        </b-tabs>
    </div>
</template>

<script>
    export default {
      name: 'ApiDescriptionTabs',
      props: {
        description: {
          type: String,
          default: ''
        },
        response: {
          type: Array,
          default: () => []
        }
      },
      methods: {
        hasResponse() {
          return this.response.length > 0
        },
        getResponse() {
          if(this.response[0].hasOwnProperty('body')) {
            return this.response[0].body
          }
          return ''
        }
      },
      data() {
          return {
              activeTab: 0,
          }
      }
    }
</script>
