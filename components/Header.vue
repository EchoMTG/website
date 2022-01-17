<template>
    <div class="header" id="header">
        <a href="/" title="EchoMTG" class="logo">
            <img src="https://assets.echomtg.com/interface/echomtg-logo-white-color.svg" alt="EchoMTG">
            <img class="mobile" src="https://assets.echomtg.com/interface/echo-mage-logo-icon.png" alt="EchoMTG Mobile Logo">
        </a>

        <div id="mainSearchApp">

            <global-search
                    firstSearch=""
                    :showimage="true"
                    currencysymbol="$"></global-search>
        </div>
        
        <div class="jump-links">	
            <a href="/sets/">All Magic Sets</a> 
            |
            <a href="/blog/">Articles</a> 
        </div>
                    
        
        
        <div class="user-links">

    
            <a class="" href="/user/" >
                $USD		
            </a>
            &nbsp; | &nbsp;	
            
            <a class="has-text-danger"  href="/register/">
                <span class="fa fa-user-plus"></span> create account 
            </a>
                    &nbsp;	&nbsp;
            <a class="round-button" href="/user/">
                <span class="fa fa-sign-in"></span> login 
            </a>

            
            <ul class="drop-links">
                <li>
                    <a href="/plans/">
                        <span class="fa fa-certificate"></span> Plan
                    </a>
                </li>
                <li><hr></li>	
                <li>
                    <a href="/user/profile/">
                    <span class="fa fa-user"></span> User Name
                    </a>
                </li>
                <li>
                    <a href="/user/">
                        <span class="fa fa-dashboard"></span> Dashboard
                    </a>
                </li>
                <li>
                    <a href="/user/profile/">
                        <span class="fa fa-edit"></span> Edit Profile
                    </a>
                </li>
                <li>
                    <a href="/user/subscriptions/">
                        <span class="fa fa-envelope"></span> Email Preferences
                    </a>
                </li>
                <li>
                    <a href="/user/password/">
                        <span class="fa fa-lock"></span> Change Password
                    </a>
                </li>	
            
                <li><hr/></li>			
                <li>
                    <a href="/about/discord/">
                        <span class="fa fa-life-saver"></span> Get Support
                    </a>
                </li>	
                <li><hr/></li>	
                <li>
                    <a href="/logout/" >
                        <span class="fa fa-sign-out"></span> Logout 
                    </a>
                </li>			
            </ul>
            
        </div>
        
    </div>
</template>

<style>
.nuxt-logo {
  height: 180px;
}
</style>
