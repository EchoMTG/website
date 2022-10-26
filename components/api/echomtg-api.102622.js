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
					"request": {
						"method": "POST",
						"header": [
							{
								"key": "Content-Type",
								"value": "application/x-www-form-urlencoded"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": [
								{
									"key": "email",
									"value": "user@email.com",
									"description": "This is the email address of the user you want a token for.",
									"type": "text"
								},
								{
									"key": "password",
									"value": "XXXXXXXXX",
									"description": "The password associated with the user. ",
									"type": "text"
								},
								{
									"key": "app",
									"value": "YOUR_APP_NAME",
									"description": "(optional) the code of your app, please register your app with teeg at echomtg dot com",
									"type": "text"
								}
							]
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
						"description": "The user must be auth'd to execute any API call. Make this call by sending the user's Email Address (user) and Password. You will want to store the token to your application's memory or database for further use. A new token is generated every time a user is auth'd from anywhere. To have permanent tokens for users in your application contact teeg at echomtg dot com.\n\n/api/user/auth/ returns a status, message, token (only if successful) parameter in JSON."
					},
					"response": [
						{
							"name": "Auth: Retrieving a User token",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"value": "application/x-www-form-urlencoded",
										"disabled": true
									}
								],
								"body": {
									"mode": "urlencoded",
									"urlencoded": [
										{
											"key": "email",
											"value": "user@email.com",
											"description": "This is the email address of the user you want a token for.",
											"type": "text"
										},
										{
											"key": "password",
											"value": "XXXXXXXXX",
											"description": "The password associated with the user. ",
											"type": "text"
										}
									]
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
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Access-Control-Allow-Headers",
									"value": "Origin, X-Requested-With, Content-Type, Accept",
									"name": "Access-Control-Allow-Headers",
									"description": ""
								},
								{
									"key": "Access-Control-Allow-Origin",
									"value": "*",
									"name": "Access-Control-Allow-Origin",
									"description": ""
								},
								{
									"key": "Cache-Control",
									"value": "no-store, no-cache, must-revalidate",
									"name": "Cache-Control",
									"description": ""
								},
								{
									"key": "Connection",
									"value": "Keep-Alive",
									"name": "Connection",
									"description": ""
								},
								{
									"key": "Content-Length",
									"value": "101",
									"name": "Content-Length",
									"description": ""
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8",
									"name": "Content-Type",
									"description": ""
								},
								{
									"key": "Date",
									"value": "Wed, 15 Nov 2017 01:00:38 GMT",
									"name": "Date",
									"description": ""
								},
								{
									"key": "Expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT",
									"name": "Expires",
									"description": ""
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=99",
									"name": "Keep-Alive",
									"description": ""
								},
								{
									"key": "Pragma",
									"value": "no-cache",
									"name": "Pragma",
									"description": ""
								},
								{
									"key": "Server",
									"value": "Apache",
									"name": "Server",
									"description": ""
								},
								{
									"key": "Set-Cookie",
									"value": "platform=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/",
									"name": "Set-Cookie",
									"description": ""
								},
								{
									"key": "Set-Cookie",
									"value": "device_type=deleted; expires=Thu, 01-Jan-1970 00:00:01 GMT; Max-Age=0; path=/",
									"name": "Set-Cookie",
									"description": ""
								},
								{
									"key": "Set-Cookie",
									"value": "has_logged_in=true; expires=Fri, 15-Dec-2017 01:00:38 GMT; Max-Age=2592000; path=/",
									"name": "Set-Cookie",
									"description": ""
								},
								{
									"key": "Set-Cookie",
									"value": "username=teeg; expires=Fri, 15-Dec-2017 01:00:38 GMT; Max-Age=2592000; path=/",
									"name": "Set-Cookie",
									"description": ""
								},
								{
									"key": "Set-Cookie",
									"value": "email=Teeg%40echomtg.com; expires=Fri, 15-Dec-2017 01:00:38 GMT; Max-Age=2592000; path=/",
									"name": "Set-Cookie",
									"description": ""
								}
							],
							"cookie": [
								{
									"expires": "Invalid Date",
									"httpOnly": false,
									"domain": "www.echomtg.com",
									"path": "/",
									"secure": false,
									"value": "jf8tcmsecdvuhh2rmqgdl10ol3",
									"key": "PHPSESSID"
								},
								{
									"expires": "Invalid Date",
									"httpOnly": false,
									"domain": "www.echomtg.com",
									"path": "/",
									"secure": false,
									"value": "true",
									"key": "has_logged_in"
								},
								{
									"expires": "Invalid Date",
									"httpOnly": false,
									"domain": "www.echomtg.com",
									"path": "/",
									"secure": false,
									"value": "teeg",
									"key": "username"
								},
								{
									"expires": "Invalid Date",
									"httpOnly": false,
									"domain": "www.echomtg.com",
									"path": "/",
									"secure": false,
									"value": "Teeg%40echomtg.com",
									"key": "email"
								}
							],
							"body": "{\n    \"token\": \"XXXXXXXXXXXXXXXXX\",\n    \"message\": \"Login Successful!\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Change Currency",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "formdata",
							"formdata": [
								{
									"key": "currency_code",
									"value": "JPY",
									"description": "Country Code, see description of the endpoint for all country codes.",
									"type": "text"
								},
								{
									"key": "auth",
									"value": "{{user_token}}",
									"type": "text"
								}
							]
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
						"description": "The user must be Auth'd to make this call. The call will change the currency shown to a user for all API requests and www.echomtg.com interface price displays. It is called simple by sending the Currency Code (currency_code) of the card you want to add and the user Token (auth).\n\n## Currencies Available\n\n* USD - U.S. Dollars\n* GBP - British Pounds\n* EUR - Euros\n* AUD - Australian Dollars\n* BRL - Brazilian Real\n* CAD - Canadian Dollars\n* CZK - Czech koruny\n* DKK - Danish Kroner\n* HKD - Hong Kong Dollars\n* HUF - Hungarian Forints\n* ILS - Israeli Shekels\n* JPY - Japanese Yen\n* MYR - Malaysian Ringgits\n* MXN - Mexican Pesos\n* NZD - New Zealand Dollars\n* NOK - Norwegian Kroner\n* PHP - Philippine Pesos\n* PLN - Polish zloty\n* SGD - Singapore Dollars\n* SEK - Swedish Kronor\n* CHF - Swiss Francs\n* TWD - Taiwan New Dollars\n* THB - Thai Baht\n* TRY - Turkish Liras"
					},
					"response": []
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
		}
	]
}
