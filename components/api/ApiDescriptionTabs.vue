<template>
    <div>

        <b-tabs v-model="activeTab">
            <b-tab-item label="Description">
                <div class="content">
                  <div v-if="description" v-html="$md.render(description)"></div>
                </div>
            </b-tab-item>
            <b-tab-item label="Example Javascript Request">
                 <b-input
                      type="textarea"
                      rows="8"
                      :value="this.buildRequest()"
                      />
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
        },
        request: {
          type: Object,
          default: () => {}
        },
        token: {
          type: String,
          default: ''
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
        },
        buildRequest() {
          if(this.request.method.toLowerCase() == 'post'){
            let body = this.request.body ? 'const body = ' + this.request.body.raw : ''
            return `
const request = async () => {
  const endpoint = '${this.request.url.raw}';
  ${body}
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ${this.token}'
    },
    body: JSON.stringify(body)
  })
  const data = await res.json();
  return data;
}`.trim();
          }
           if(this.request.method.toLowerCase() == 'get'){
            return `
const request = async () => {
  const endpoint = '${this.request.url.raw}';
  const res = await fetch(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : 'Bearer ${this.token}'
    }
  })
  const data = await res.json();
  return data;
}`.trim();
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
