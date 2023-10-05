<template>
   <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                 <a href="/" title="EchoMTG" class="logo">
                    <NuxtPicture quality="100" src="https://assets.echomtg.com/interface/echomtg-logo-white-color.svg" alt="EchoMTG">
                    <NuxtPicture quality="100" class="mobile" src="https://assets.echomtg.com/interface/echo-mage-logo-icon.png" alt="EchoMTG Mobile Logo">
                </a>
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item href="/">
                Dashboard
            </b-navbar-item>
            <b-navbar-item href="/sets/">
                Sets
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <b-navbar-item href="#">
                    About
                </b-navbar-item>
                <b-navbar-item href="#">
                    Contact
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>
        <template #end>
            <UserLogin/>
        </template>

    </b-navbar>

</template>
