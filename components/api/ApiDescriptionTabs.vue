<template>
    <div>

        <b-tabs v-model="activeTab">
            <b-tab-item label="Description">
                <div class="content">
                  <div v-if="description" v-html="$md.render(description)"></div>
                </div>
            </b-tab-item>
            <b-tab-item label="Example Javascript Request">
              <vue-code-highlight language="javascript">
                <pre>{{this.buildRequest()}}</pre>
              </vue-code-highlight>
            </b-tab-item>
            <b-tab-item v-if="hasResponse()" label="Example JSON Response">
              <vue-code-highlight language="javascript">
                <pre>{{this.getResponse()}}</pre>
              </vue-code-highlight>
            </b-tab-item>
        </b-tabs>
    </div>
</template>

<script>
import { component as VueCodeHighlight } from 'vue-code-highlight';

    export default {
      name: 'ApiDescriptionTabs',
      components: {
        VueCodeHighlight
      },
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
          if(!this.response[0]) return ''
          if(this.response[0].hasOwnProperty('body')) {
            return this.response[0].body
          }
          return ''
        },
        outputURL(url){
          let newURL = url.replace('localhost','https://api.echomtg.com')
          newURL = newURL.replace('dev.echomtg.com','api.echomtg.com')
          newURL = newURL.replace('www.echomtg.com','api.echomtg.com')

          return newURL

        },
        buildRequest() {
          let endpoint = this.request?.url?.raw ? this.request.url.raw : '';
          endpoint = this.outputURL(endpoint);
          if(this.request.method.toLowerCase() == 'post' && this.getResponse().includes('Login')){
            let body = this.request.body ? 'const body = ' + this.request.body.raw : ''
            return `
const request = async () => {
  const endpoint = '${endpoint}';
  ${body}
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  })
  const data = await res.json();
  return data;
}`.trim();
          }

          if(this.request.method.toLowerCase() == 'post' && this.getResponse().includes('avatar')){

            return `
const request = async () => {
  const endpoint = '${endpoint}';
  var formdata = new FormData();
  formdata.append("file", fileInput.files[0], "gaddock-teeg.jpg");
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Authorization' : 'Bearer ${this.token}'
    },
    body: formdata
  })
  const data = await res.json();
  return data;
}`.trim();
          }
          if(this.request.method.toLowerCase() == 'post'){
            let body = this.request.body ? 'const body = ' + this.request.body.raw : ''
            return `
const request = async () => {
  const endpoint = '${endpoint}';
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
  const endpoint = '${endpoint}';
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
