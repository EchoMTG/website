// card class
var Card = new Class({

	initialize: function(cardObject,area){
        this.card = cardObject;
        this.getStars().inject(area);
        
        var div = new Element('div',{'class': 'r'});
        this.createCard().inject(div);
		
		this.getInfo().inject(div)
		
		
		this.getGraph().inject(div);
		
		div.inject(area);
		
		
		this.getPrice();
		this.getOtherCopies();
		
    },
    
    createCard: function(){
    	return this.getImage();
    },
    
    getImage: function(){
    	var url = 'http://www.echomage.com/assets/images/crops/'+this.card.set_code+'/'+this.card.card_name+'.jpg';
    	url = url.replace(/\s/,'%20');
    	
    	// check if we have the big art
    	if (!UrlExists(url)) {
    		url = 'http://www.echomage.com/assets/images/crops/'+this.card.set_code+'/'+this.card.card_name+'.crop.jpg';
			url = url.replace(/\s/,'%20');
    	}
		
		// check if its .crop, if not get the MTG versions
    	if (!UrlExists(url)) {	
    		url = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid='+this.card['multiverseid']+'&type=card';
			return new Element('div',{'class' : 'cardImage c-13', 'style': 'background-image: url('+url+')' });	
    	}
    	var power = '';
    	if(this.card.power) power = '<div class="pt">'+this.card.power+'/'+this.card.toughness+'</div>'
    	if(this.card.loyalty) power = '<div class="pt">'+this.card.loyalty+'</div>'
    	return new Element('div',{'class' : 'cardImage big-art c-13', 'html': '<img src="'+url+'" alt="'+this.card.card_name+' by '+this.card.artist+'" /><div class="artist-block">Artwork by '+this.card.artist+'&trade; &copy Wizards of the Coast, Inc.</div>'+power});
    	
    	
    },
    
    getStars: function(rating,width){
    	return getStars(this.card['rating'],280);	
    },
    
    getInfo: function(){
    	
    	var mtgUrl = 'http://gatherer.wizards.com/Pages/Card/Discussion.aspx?multiverseid='+this.card['multiverseid'];
		
		var heading = new Element('div',{'class':'heading'});
		    
    	var column = new Element('div',{'class': 'c-13'});
    	
    	var div = new Element('div',{'class': 'info'});
    	
    	var title = new Element('h1',{'html': this.card.card_name+' '+this.replaceSymbols(this.card.mana_cost)});
    	var expansion = new Element('h2',{'html': this.card.types+' <span><a href="#!/viewset/'+this.card.expansion.replace(/\s/g,'_')+'/">'+this.card.expansion+'</a> &mdash; '+this.card.rarity+'</span>'});

    	var text = new Element('blockquote',{'html': this.replaceSymbols(this.card.card_text)});
    	var flavor = new Element('blockquote',{'html': this.card.flavor_text, 'class':'flavor'});
    	var gatherer = new Element('a',{'class':'gathererLink button margin-right','href': mtgUrl,'rel':'nofollow','html':'<span class="icon-comments-alt"></span> Gatherer Discussion','target':'_blank' });
    	var wishlist = new Element('a',{'class':'addWishItem button margin-right', 'data-id': this.card.id, 'data-name':this.card.card_name, 'href':'javascript:void(0);', 'html':'<span class="icon-plus-sign"></span> Watchlist'});
    	var buy = new Element('a',{'html':'<span class="icon-shopping-cart"></span> Buy','class':'buy button', 'id':'buyButton','target':'_blank'});
    	var prices = new Element('div',{'class':'cardPrices','id':'cardPrices','html':'loading prices<span style="text-decoration:blink">..</span>'});
    	
    	title.inject(heading);
    	expansion.inject(div);
    	text.inject(div);
		flavor.inject(div);
		wishlist.inject(div);
		gatherer.inject(div);
		
		buy.inject(div);
		prices.inject(heading);
		heading.inject($('card'));    	
		div.inject(column);
		
    	return column;
    	
    
    },
    getPrice: function(){

    	priceRequest.send('name='+this.card.card_name+'&set='+this.card.expansion+'&id='+this.card.id);

    	
    },
 	setPrices: function(prices){
 		this.prices = prices;
 	},
    
    replaceSymbols: function(str){
    	return replaceSymbols(str);	    
	},
	
	getGraph: function(){
		var gu = 'http://www.echomage.com/price-graph2.php?id='+this.card.id;
		var g = new Element('iframe',{'src': gu,'class':'graph','scrolling':'no'});
		var oc = new Element('div',{'id':'othercopies'});
		var col = new Element('div',{'class':'c-13 market-data','html':'<h5><span class="icon-bar-chart"></span> Market Data for '+this.card.card_name+'</h5>'});
		

		g.inject(col);
		oc.inject(col);
				
		return col;
		
	},
	
	getOtherCopies: function(){
		 othercopies.send('card_name='+this.card.card_name +'&id='+this.card.id);
		
	}
    
    
});   

