# EchoMTG Nuxt Open-Source Website
Nuxt powered frontend website, open-source for community contributions.

# Teeg's Pledge

EchoMTG started as a project to help manage my personal collection by exploring the world of programming, since it has become much more and I am now a full time programmer. This is fitting given how common it is for magic players to delve into programming. By making the front-end of EchoMTG open-souce, it may grant the opporunity for magic players who are looking to explore a career in programming or website the building start their journey here. 

I pledge to keep the frontend EchoMTG website open-source and to build deployment pipeline that enables the community to make contributions that can directly update the website.

Behind the scenes of the frontend, I will continue to contribute, upgrade, and optimize the APIs, database, and infrastructure which supports the EchoMTG website interface. 

## How to Run this Website for Developement on your Computer

**Requirements**

These command line tools must be installed to run this website on your local machine 

* NodeJS https://nodejs.org/en/
* NPM https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
* VueJS https://vuejs.org/v2/guide/installation.html
* Nuxt https://nuxtjs.org/

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).

### Bulma CSS Framework

(Bulma)[https://bulma.io/] is the CSS framework used on this application, the install of bulma for nuxt is called `buefy` https://www.npmjs.com/package/nuxt-buefy documenation is available here: https://buefy.org/documentation/icon


# Deploying to GCP

You need permission to Echo's Google Cloud Console to execute command 3 and 4.

1. npm install
2. npm run build
3. npm run buildcontainer 
4. npm run deploy