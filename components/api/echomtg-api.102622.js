export default {
	"info": {
		"_postman_id": "6410086a-5469-44aa-aed5-7a5c9f5c96b5",
		"name": "EchoMTG Public Magic:the Gathering API",
		"description": "This API is open to the app developers to access a centralized inventory system. It's released because the hardest thing to do is keep up with your magic inventory. If every app adopted it, you could manage your inventory from anywhere. I'm sure then we still wouldn't stay on top of it ;)\n\nThe second reason this is opened up is to gain access to list generation for importing and exporting your lists to sites like MagicTraders.com and PucaTrade.com. I love the market, and I love trading, that is why Echo exists.\n\nThe inventory is controlled by the Multiverse ID, which makes it universal for all apps to work with. Since Judge Foils and other promo cards do not have multiverseids, their multiverseid's start at 100000000. Access the ID reference here. If you have any suggestions here, please email me teeg at echomtg dot com.\n\nPHP Wrapper by Andrew Gioia: https://github.com/andrewgioia/EchoPHP\n\nJAVA Wrapper for Android https://github.com/ardeay/EchoMTG-Java-API-Wrapper/\n\nHave fun ;)\n—Teeg\n\nPrerequisites\n1. Register a user with EchoMTG so that it can submit API requests.\n\n2. Familiarize yourself with the core concepts of the JSON (JavaScript Object Notation) data format. For more information, see json.org.\n\n",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "383273"
	},
	"item": [
		{
			"name": "User",
			"item": [
				{
					"name": "Auth: Retrieving a User token",
					"protocolProfileBehavior": {
						"disabledSystemHeaders": {
							"connection": true,
							"accept-encoding": true,
							"accept": true
						}
					},
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"email\": \"your@email.com\",\n    \"password\": \"xxxxxxxxxxx\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/user/auth/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"auth",
								""
							]
						},
						"description": "The user must be auth'd to execute any API call. Make this call by sending the user's Email Address (user) and Password. You will want to store the token to your application's memory or database for further use. A new token is generated every time a user is auth'd from anywhere. Tokens expire after 24 hours.\n\nOptional: `type: 'curl'` responds with a plan text token"
					},
					"response": [
						{
							"name": "Auth: Retrieving a User token",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"email\": \"teeg@echomtg.com\",\n    \"password\": \"1737RA\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://dev.echomtg.com/api/user/auth/",
									"protocol": "https",
									"host": [
										"dev",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"auth",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 01:14:15 GMT"
								},
								{
									"key": "Server",
									"value": "Apache"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Access-Control-Allow-Headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "Access-Control-Allow-Methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "Access-Control-Allow-Credentials",
									"value": "true"
								},
								{
									"key": "Expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "Cache-Control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "Pragma",
									"value": "no-cache"
								},
								{
									"key": "Set-Cookie",
									"value": "platform=unknown; expires=Sun, 27-Nov-2022 01:14:15 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "device_type=unknown; expires=Sun, 27-Nov-2022 01:14:15 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "has_logged_in=true; expires=Sun, 27-Nov-2022 01:14:15 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "username=teeg; expires=Sun, 27-Nov-2022 01:14:15 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "email=Teeg%40echomtg.com; expires=Sun, 27-Nov-2022 01:14:15 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Content-Length",
									"value": "152"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"token\": \"xxxxxxxxxxxxxxxxxxxx\",\n    \"message\": \"Login Successful!\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Change Currency",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{user_token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"currency_code\" : \"USD\"\n}"
						},
						"url": {
							"raw": "https://www.echomtg.com/api/user/change_currency/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"change_currency",
								""
							]
						},
						"description": "Changing currency will modify the values of all API output that involves a monetary value. The conversion rate is calculated from a daily pull from [https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml)\n\n## Available Currencies\n\n- USD - U.S. Dollars\n- GBP - British Pounds\n- EUR - Euros\n- AUD - Australian Dollars\n- BRL - Brazilian Real\n- CAD - Canadian Dollars\n- CZK - Czech koruny\n- DKK - Danish Kroner\n- HKD - Hong Kong Dollars\n- HUF - Hungarian Forints\n- ILS - Israeli Shekels\n- JPY - Japanese Yen\n- MYR - Malaysian Ringgits\n- MXN - Mexican Pesos\n- NZD - New Zealand Dollars\n- NOK - Norwegian Kroner\n- PHP - Philippine Pesos\n- PLN - Polish zloty\n- SGD - Singapore Dollars\n- SEK - Swedish Kronor\n- CHF - Swiss Francs\n- TWD - Taiwan New Dollars\n- THB - Thai Baht\n- TRY - Turkish Liras"
					},
					"response": [
						{
							"name": "User: Change Currency",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"currency_code\" : \"USD\"\n}"
								},
								"url": {
									"raw": "https://www.echomtg.com/api/user/change_currency/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"change_currency",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 00:52:52 GMT"
								},
								{
									"key": "Server",
									"value": "Apache"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Access-Control-Allow-Headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "Access-Control-Allow-Methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "Access-Control-Allow-Credentials",
									"value": "true"
								},
								{
									"key": "Expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "Cache-Control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "Pragma",
									"value": "no-cache"
								},
								{
									"key": "Content-Length",
									"value": "118"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=100"
								},
								{
									"key": "Connection",
									"value": "Keep-Alive"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Currency code update to USD - U.S. Dollars, current conversion is rate from USD is 1.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Meta Data",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{user_token}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://www.echomtg.com/api/user/meta/",
							"protocol": "https",
							"host": [
								"dev",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"meta",
								""
							]
						},
						"description": "Access user information like name, email, about, and other meta data that can control the interface like currency code and default sort orders."
					},
					"response": [
						{
							"name": "Meta Fetch",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/user/meta/",
									"protocol": "https",
									"host": [
										"dev",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"meta",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 01:09:47 GMT"
								},
								{
									"key": "Server",
									"value": "Apache"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Access-Control-Allow-Headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "Access-Control-Allow-Methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "Access-Control-Allow-Credentials",
									"value": "true"
								},
								{
									"key": "Expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "Cache-Control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "Pragma",
									"value": "no-cache"
								},
								{
									"key": "Content-Length",
									"value": "1498"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=100"
								},
								{
									"key": "Connection",
									"value": "Keep-Alive"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"user\": {\n        \"id\": \"1\",\n        \"username\": \"teeg\",\n        \"email\": \"Teeg@echomtg.com\",\n        \"plan\": \"rare\",\n        \"first_name\": \"Teeg\",\n        \"last_name\": \"Mage\",\n        \"twitter\": \"@echomtg\",\n        \"about\": \"I'm the mythical programmer of EchoMTG. I've been a player since 1995, but took a hiatus before middle school, then returned in 2011. Upon returning I was hellbent on collecting nostalgic cards I once had in my collection (dual lands etc.) so I could jump into the legacy scene. Collecting duals needed to be done on a budget, so trading up was the only option. While trading heavily online, I started Echo database (early 2012) to help calculate quick trades. I take a lot of pride as a product author and still love mtg dearly, so Echo is a great avenue for experimental interface designs while feeding into my favorite hobby.\",\n        \"date_created\": \"2014-09-01 06:40:18\",\n        \"last_login\": \"2022-10-28 00:50:23\",\n        \"login_Count\": \"36560\",\n        \"image_pref\": \"0\",\n        \"currency_code\": \"USD\",\n        \"conversion_rate\": \"1.00\",\n        \"alter_facebook\": \"\",\n        \"alter_email\": \"test\",\n        \"alter_name\": \"\",\n        \"alter_website\": \"\",\n        \"referrer_code\": \"6c300461\",\n        \"phone\": \"\",\n        \"is_store\": \"0\",\n        \"avatar\": \"https://assets.echomtg.com/users/avatars/c4ca4238a0b923820dcc509a6f75849b.png\",\n        \"slack\": \"teeg\",\n        \"default_sort\": \"i.id\",\n        \"contributor\": \"1\",\n        \"show_real_name\": \"0\",\n        \"use_market\": \"0\",\n        \"setting_report_threshhold\": \"1.00\",\n        \"message\": \"\",\n        \"planObject\": {\n            \"user_id\": 0,\n            \"message\": \"\",\n            \"color\": \"gold\",\n            \"list_cap\": 50,\n            \"card_cap\": 11520,\n            \"title\": \"Seasoned Collector\",\n            \"name\": \"Rare\",\n            \"id\": \"3\"\n        }\n    },\n    \"message\": \"User meta accessed.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Upload Avatar",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{user_token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "file",
									"type": "file",
									"src": "/Users/kilroy/Desktop/gaddock-teeg.jpg"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/user/upload_avatar/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"upload_avatar",
								""
							]
						}
					},
					"response": [
						{
							"name": "Avatar Change",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "/Users/kilroy/Desktop/gaddock-teeg.jpg"
										}
									]
								},
								"url": {
									"raw": "https://dev.echomtg.com/api/user/upload_avatar/",
									"protocol": "https",
									"host": [
										"dev",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"upload_avatar",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 01:30:37 GMT"
								},
								{
									"key": "Server",
									"value": "Apache"
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*"
								},
								{
									"key": "Access-Control-Allow-Headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "Access-Control-Allow-Methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "Access-Control-Allow-Credentials",
									"value": "true"
								},
								{
									"key": "Expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "Cache-Control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "Pragma",
									"value": "no-cache"
								},
								{
									"key": "Content-Length",
									"value": "552"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=100"
								},
								{
									"key": "Connection",
									"value": "Keep-Alive"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"status\": \"success\",\n    \"message\": \"User avatar updated to use gaddock-teeg.jpg!\",\n    \"file\": {\n        \"file_name\": \"c4ca4238a0b923820dcc509a6f75849b.jpg\",\n        \"stored_file_name\": \"users/avatars/c4ca4238a0b923820dcc509a6f75849b.jpg\",\n        \"file_url\": \"https://assets.echomtg.com/users/avatars/c4ca4238a0b923820dcc509a6f75849b.jpg\"\n    },\n    \"cropped\": {\n        \"file_name\": \"300.c4ca4238a0b923820dcc509a6f75849b.jpg\",\n        \"stored_file_name\": \"users/avatars/300.c4ca4238a0b923820dcc509a6f75849b.jpg\",\n        \"file_url\": \"https://assets.echomtg.com/users/avatars/300.c4ca4238a0b923820dcc509a6f75849b.jpg\"\n    }\n}"
						}
					]
				}
			],
			"description": "The majority of calls requires user authentication. Soon you will be able to create a user on the fly here as well. This will let you use EchoMTG's preexisting user base without creating your own."
		},
		{
			"name": "Inventory",
			"item": [
				{
					"name": "Inventory: Adding Cards",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "{{user_token}}",
								"description": "User token gathered from /user/auth/"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "mid",
									"value": "240",
									"description": "The wizards gatherer multiverse ID",
									"type": "text"
								},
								{
									"key": "foil",
									"value": "1",
									"description": "**[optional]** 1 for foil, omit 0 for non-foil, defaults to 0 for non-foil ",
									"type": "text"
								},
								{
									"key": "acquired_date",
									"value": "03-24-2013",
									"description": "**[optional]** the date you acquired the card, defaults to today's date",
									"type": "text"
								},
								{
									"key": "condition",
									"value": "MP",
									"description": "**[optional]** the date you acquired the card, defaults to today's date",
									"type": "text"
								},
								{
									"key": "quantity",
									"value": "4",
									"description": "**[optional]** the number of cards you want to add, defaults to 1",
									"type": "text"
								},
								{
									"key": "auth",
									"value": "{{user_token}}",
									"description": "[deprecated]",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/inventory/add/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"add",
								""
							]
						},
						"description": "The user must be Auth'd to make this call. The call will add a card to the user inventory. It is called simple by sending the Multiverse ID (mid) of the card you want to add and the user Token (auth)."
					},
					"response": []
				},
				{
					"name": "Inventory: Adding Cards (JSON Endpoint)",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{user_token}}",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"warning": "This is a duplicate header and will be overridden by the Authorization header generated by Postman.",
								"description": "User token gathered from /user/auth/",
								"key": "Authorization",
								"value": "{{user_token}}",
								"disabled": true
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n\t\"emid\": 92175,\n\t\"quantity\" : 1,\n\t\"language\": \"EN\",\n\t\"acquired_price\": \"4.00\",\n\t\"acquired_date\": \"5-1-2020\",\n\t\"condition\": \"MP\",\n\t\"foil\": 0\n}"
						},
						"url": {
							"raw": "https://dev.echomtg.com/api/inventory/add/",
							"protocol": "https",
							"host": [
								"dev",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"add",
								""
							]
						},
						"description": "The user must be Auth'd to make this call. The call will add a card to the user inventory. It is called simple by sending the Multiverse ID (mid) of the card you want to add and the user Token (auth)."
					},
					"response": []
				},
				{
					"name": "Inventory: Adjusting Card Condition",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "id",
									"value": "2",
									"description": "id of the inventory item",
									"type": "text"
								},
								{
									"key": "auth",
									"value": "{{user_token}}",
									"type": "text"
								},
								{
									"key": "value",
									"value": "LP",
									"description": "card condition",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/inventory/change_condition/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"change_condition",
								""
							]
						},
						"description": "The user must be Auth'd to make this call. The call will adjust the price a single card from a user's inventory. It is called by sending the Inventory ID (id) of the card you want to update, the Card Condition (value), and the user Token (auth).\n\n**Card Conditions**\n* NM  = Near Mint\n* LP  = Lightly Played\n* MP  = Moderately Played\n* HP  = Heavily Played\n* D   = Damaged\n* ALT = Altered\n* ART = Artist Proof\n* PRE = Pre-release\n* TS = Timestamped\n* SGN = Signed\n* B10 = BGS 10\n* B95 = BGS 9.5\n* B9  = BGS 9.0\n* B85 = BGS 8.5\n* B8  = BGS 8.0\n* B75 = BGS 7.5\n* B7  = BGS 7.0\n* P10 = PSA 10\n* P95 = PSA 9.5\n* P9  = PSA 9.0\n* P85 = PSA 8.5\n* P8  = PSA 8.0\n* P75 = PSA 7.5\n* P7  = PSA 7.0"
					},
					"response": []
				},
				{
					"name": "Inventory: Removing Cards",
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/x-www-form-urlencoded",
								"type": "text"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "auth",
									"value": "{{user_token}}",
									"type": "text"
								},
								{
									"key": "inventory_id",
									"value": "26104547",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/inventory/remove/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"remove",
								""
							],
							"query": [
								{
									"key": "auth",
									"value": "{{auth}}",
									"disabled": true
								}
							]
						},
						"description": "The user must be Auth'd to make this call. The call will remove a single card from a user's inventory. It is called by sending the Inventory ID (**inventory_id** of the card you want to remove and the user Token (**auth**).\n\n*/api/inventory/remove/* returns a status and message parameter in JSON."
					},
					"response": []
				}
			],
			"description": "The most valuable part of EchoMTG is the inventory (collection) aspect. Being able to manipulate this from multiple application allows magic players to keep on top of their collections. This is a quick and easy way to add more value to your magic applications for users."
		},
		{
			"name": "Notes",
			"item": [
				{
					"name": "Note Creation",
					"request": {
						"auth": {
							"type": "bearerAuth"
						},
						"method": "POST",
						"header": [
							{
								"key": "Authorization",
								"value": "Bearer {{user_token}}"
							}
						],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "inventory_id",
									"value": "782989",
									"type": "text"
								},
								{
									"key": "note",
									"value": "This is a test note",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/notes/create/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"notes",
								"create",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "Note Get",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://www.echomtg.com/api/notes/note/id=2&auth={{user_token}}",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"notes",
								"note",
								"id=2&auth={{user_token}}"
							]
						}
					},
					"response": []
				},
				{
					"name": "Note Edit",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "auth",
									"value": "{{user_token}}",
									"description": "User Authentication Token, access this from /user/auth/",
									"type": "text"
								},
								{
									"key": "note_id",
									"value": "2",
									"type": "text"
								},
								{
									"key": "note",
									"value": "test update",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/notes/edit/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"notes",
								"edit",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "Note Delete",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "auth",
									"value": "{{user_token}}",
									"type": "text"
								},
								{
									"key": "note_id",
									"value": "3",
									"type": "text"
								}
							]
						},
						"url": {
							"raw": "https://www.echomtg.com/api/notes/delete/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"notes",
								"delete",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Lists",
			"item": [
				{
					"name": "Get All Lists",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "{{accessToken}}",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": ""
						},
						"url": {
							"raw": "https://www.echomtg.com/api/lists/all/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"lists",
								"all",
								""
							]
						},
						"description": "Get all the user lists"
					},
					"response": []
				},
				{
					"name": "Lists: Add Item to List",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    emid: 1234,\n    list: 1,\n    quantity: 1,\n    foil: 0,\n    sb: 0\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/lists/add/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"lists",
								"add",
								""
							]
						},
						"description": "Add an item to a list.\n\n| **Param** | **Description** |\n| --- | --- |\n| emid | **(int) EchoID of card to add** |\n| **list** | (int) list id, see lists/all/ |\n| foil | (int) 0=false, 1=true |\n| sb | (int) sideboard 0=false, 1=true |"
					},
					"response": []
				}
			]
		},
		{
			"name": "csv read echomtg",
			"request": {
				"method": "POST",
				"header": [
					{
						"key": "Content-Type",
						"name": "Content-Type",
						"value": "application/x-www-form-urlencoded",
						"type": "text"
					}
				],
				"body": {
					"mode": "formdata",
					"formdata": [
						{
							"key": "csvFile",
							"contentType": "multipart/form-data",
							"type": "file",
							"src": "/Users/kilroy/Downloads/EchoMTG-Upload-Template (1).csv"
						}
					]
				},
				"url": {
					"raw": "https://us-central1-echo-csv.cloudfunctions.net/echo-csv/upload",
					"protocol": "https",
					"host": [
						"us-central1-echo-csv",
						"cloudfunctions",
						"net"
					],
					"path": [
						"echo-csv",
						"upload"
					]
				}
			},
			"response": []
		}
	]
}
