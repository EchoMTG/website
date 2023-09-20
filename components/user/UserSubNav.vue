<template>
    <b-menu>
        <b-menu-list label="Account Management">
            <b-menu-item label="Profile" :active="isActive('/user/profile/')" icon="account-edit" tag="router-link" to="/user/profile/"></b-menu-item>
            <b-menu-item label="Settings" :active="isActive('/user/settings/')" icon="cogs" tag="router-link" to="/user/settings/"></b-menu-item>
            <b-menu-item label="Email Preferences" :active="isActive('/user/email/')" icon="email" tag="router-link" to="/user/email/"></b-menu-item>
            <b-menu-item label="Billing" :active="isActive('/user/billing/')" icon="credit-card" tag="router-link" to="/user/billing/"></b-menu-item>
            <b-menu-item label="Streamer Settings" :active="isActive('/user/streamer/')" icon="twitch" tag="router-link" to="/user/streamer/"></b-menu-item>
            <b-menu-item label="Change Password" :active="isActive('/user/password/')" icon="lock" tag="router-link" to="/user/password/"></b-menu-item>
        </b-menu-list>
         <b-menu-list label="Your Content">
            <b-menu-item label="My Alters" :active="isActive('/user/alters/')" icon="palette-outline" tag="router-link" to="/user/alters/"></b-menu-item>
            <b-menu-item label="My Articles" :active="isActive('/user/articles/')" icon="fountain-pen-tip" tag="router-link" to="/user/articles/"></b-menu-item>
        </b-menu-list>
        <b-menu-list label="Data / Account">
            <b-menu-item label="Clear Inventory" :active="isActive('/user/clear/')" icon="vacuum" tag="router-link" to="/user/clear/"></b-menu-item>
            <b-menu-item label="Delete Account" :active="isActive('/user/delete/')" icon="delete" tag="router-link" to="/user/delete/"></b-menu-item>
        </b-menu-list>
        <!-- <b-menu-list label="Actions">
            <b-menu-item label="Logout"></b-menu-item>
        </b-menu-list> -->
    </b-menu>
  </template>

  <script>
  export default {
    methods: {
        isActive: function(path){
            if(this.$route.fullPath.includes(path)){
                return true
            }
        }
    }
  }
  </script>
