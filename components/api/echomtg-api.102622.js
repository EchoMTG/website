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
						"description": "Authenticate a user to receive an access token which allows you to make API calls on behalf of the user. You will want to store the token to your application's memory or database for further use. A new token is generated every time a user is auth'd from anywhere. Tokens expire after 24 hours.\n\n| **Param** | **Required** | **Description** |\n| --- | --- | --- |\n| email | required | user email address |\n| password | required | user password |\n| type | optional | Send `curl` to received a plain text token (no json) |"
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
								"www",
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
										"www",
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
						},
						"description": "Change the user avatar (image) that appears in the interface, comments, and blog posts."
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
							"raw": "{\n\t\"emid\": 92175,\n\t\"quantity\" : 1,\n\t\"language\": \"EN\",\n\t\"acquired_price\": \"4.00\",\n\t\"acquired_date\": \"5-1-2020\",\n\t\"condition\": \"MP\",\n\t\"foil\": 0,\n    \"image\" : \"https://assets.echomtg.com/images/echomtg-og-default.png\"\n}"
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
						"description": "Add a card to the user inventory.\n\n| **Param** | **Required** | **Default** | **Description** |\n| --- | --- | --- | --- |\n| emid | required |  | EchoID |\n| quantity | optional | 1 | number to record |\n| language | optional | EN | Card text language. See language options below |\n| condition | optional | NM | Card condition, see options below |\n| foil | optional | 0 | 1=foiled, 0=regular |\n| image | optional |  | A remote URL to an uploaded image. To add an image through Echo, see the Upload Image endpoint |\n\n| **Language Options** | **Condition Options** |\n| --- | --- |\n| EN = english  <br>DE = german  <br>FR = french  <br>RU = russian  <br>IT = italian  <br>ES = spanish  <br>PT = portuguese  <br>CT = chinese traditional  <br>CS = chinese simplified  <br>JP = japanese  <br>KR = korean | NM = Near Mint  <br>LP = Lightly Played  <br>MP = Moderately Played  <br>HP = Heavily Played  <br>D = Damaged  <br>ALT = Altered  <br>ART = Artist Proof  <br>PRE = Pre-release  <br>TS = Timestamped  <br>SGN = Signed  <br>BGS = BGS  <br>B10 = BGS 10  <br>B95 = BGS 9.5  <br>B9 = BGS 9.0  <br>B85 = BGS 8.5  <br>B8 = BGS 8.0  <br>B75 = BGS 7.5  <br>B7 = BGS 7.0  <br>PSA = PSA  <br>P10 = PSA 10  <br>P95 = PSA 9.5  <br>P9 = PSA 9.0  <br>P85 = PSA 8.5  <br>P8 = PSA 8.0  <br>P75 = PSA 7.5  <br>P7 = PSA 7.0 |"
					},
					"response": [
						{
							"name": "Inventory: Adding Cards (JSON Endpoint)",
							"originalRequest": {
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
									"raw": "{\n\t\"emid\": 92175,\n\t\"quantity\" : 1,\n\t\"language\": \"EN\",\n\t\"acquired_price\": \"4.00\",\n\t\"acquired_date\": \"5-1-2020\",\n\t\"condition\": \"MP\",\n\t\"foil\": 0,\n    \"image\" : \"https://assets.echomtg.com/images/echomtg-og-default.png\"\n}"
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
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 10:56:43 GMT"
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
									"value": "1739"
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
							"body": "{\n    \"status\": \"success\",\n    \"message\": \"1 Snapcaster Mage added to inventory binder.\",\n    \"inventory_id\": 46653735,\n    \"card\": {\n        \"id\": \"92175\",\n        \"tcgplayer_id\": \"52206\",\n        \"multiverseid\": \"227676\",\n        \"set_number\": \"78\",\n        \"card_name\": \"Snapcaster Mage\",\n        \"expansion\": \"Innistrad\",\n        \"set_code\": \"ISD\",\n        \"rarity\": \"Rare\",\n        \"mana_cost\": \"{{1}}{{u}}\",\n        \"cmc\": \"2\",\n        \"p_t\": \"2 / 1\",\n        \"types\": \"Creature - Human Wizard\",\n        \"main_type\": \"Creature - Human Wizard\",\n        \"sub_type\": \"\",\n        \"rating\": \"4.265\",\n        \"votes\": \"358\",\n        \"card_text\": \"<p>Flash</p><p>When Snapcaster Mage enters the battlefield, target instant or sorcery card in your graveyard gains flashback until end of turn. The flashback cost is equal to its mana cost. <i>(You may cast that card from your graveyard for its flashback cost. Then exile it.)</i></p>\",\n        \"attributes\": \"flash,flash\",\n        \"flavor_text\": null,\n        \"power\": \"2\",\n        \"toughness\": \"1\",\n        \"artist\": \"Volkan Baga\",\n        \"all_sets\": null,\n        \"community_rating\": \"Community Rating: 4.265 / 5&nbsp;&nbsp;(358 votes)\",\n        \"type\": \"Creature\",\n        \"main_colors\": \"Blue\",\n        \"abilities_colors\": \"\",\n        \"crawlurl\": \"http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=227676\",\n        \"watermark\": null,\n        \"loyalty\": null,\n        \"other_sets\": null,\n        \"card_number\": \"78\",\n        \"has_image\": \"1\",\n        \"flip\": \"0\",\n        \"reserve_list\": \"0\",\n        \"sealed\": \"0\",\n        \"card_id\": \"92175\",\n        \"tcg_low\": \"17.74\",\n        \"tcg_mid\": \"24.97\",\n        \"tcg_market\": \"20.28\",\n        \"tcg_high\": \"24.97\",\n        \"foil_price\": \"101.37\",\n        \"last_updated\": \"2022-10-27 14:22:37\",\n        \"change\": \"2.00\",\n        \"change_1d\": \"0.00\",\n        \"foil_change\": \"0.00\",\n        \"purchase_link_tcg\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Snapcaster+Mage&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n        \"ck_price\": null,\n        \"ck_buy\": null,\n        \"ck_qty_buying\": null,\n        \"ck_foil_price\": null,\n        \"ck_foil_buy\": null,\n        \"ck_foil_qty_buying\": null\n    }\n}"
						}
					]
				},
				{
					"name": "Inventory: Upload Inventory Image",
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
									"src": "/Users/kilroy/Desktop/uma-199-gaddock-teeg.png"
								}
							]
						},
						"url": {
							"raw": "https://dev.echomtg.com/api/inventory/upload_image/?id=45959523",
							"protocol": "https",
							"host": [
								"dev",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"upload_image",
								""
							],
							"query": [
								{
									"key": "id",
									"value": "45959523"
								}
							]
						}
					},
					"response": [
						{
							"name": "Inventory: Upload Inventory Image",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "formdata",
									"formdata": [
										{
											"key": "file",
											"type": "file",
											"src": "/Users/kilroy/Desktop/uma-199-gaddock-teeg.png"
										}
									]
								},
								"url": {
									"raw": "https://www.echomtg.com/api/inventory/upload_image/?id=45959523",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"inventory",
										"upload_image",
										""
									],
									"query": [
										{
											"key": "id",
											"value": "45959523"
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 03:07:20 GMT"
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
									"value": "660"
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
							"body": "{\n    \"status\": \"success\",\n    \"message\": \"User avatar updated to use uma-199-gaddock-teeg.png!\",\n    \"original\": {\n        \"file_name\": \"45959523-front.png\",\n        \"stored_file_name\": \"users/images/1/45959523-front.png\",\n        \"file_url\": \"https://assets.echomtg.com/users/images/1/45959523-front.png\"\n    },\n    \"medium\": {\n        \"file_name\": \"45959523-front.750.png\",\n        \"stored_file_name\": \"users/images/1/45959523-front.750.png\",\n        \"file_url\": \"https://assets.echomtg.com/users/images/1/45959523-front.750.png\"\n    },\n    \"optimized\": {\n        \"file_name\": \"45959523-front.300.png\",\n        \"stored_file_name\": \"users/images/1/45959523-front.300.png\",\n        \"file_url\": \"https://assets.echomtg.com/users/images/1/45959523-front.300.png\"\n    }\n}"
						}
					]
				},
				{
					"name": "Inventory: Removing Cards",
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
								"key": "Content-Type",
								"name": "Content-Type",
								"value": "application/x-www-form-urlencoded",
								"type": "text"
							}
						],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"id\": \"46668493\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
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
						"description": "The call will remove an inventory record from a user's inventory."
					},
					"response": [
						{
							"name": "Inventory: Removing Cards",
							"originalRequest": {
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
									"mode": "raw",
									"raw": "{\n    \"id\": \"46668493\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
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
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 11:39:48 GMT"
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
									"value": "61"
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
							"body": "{\n    \"message\": \"Card removed from inventory.\",\n    \"status\": \"success\"\n}"
						}
					]
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
									"value": "{{user_token}}",
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
					"response": [
						{
							"name": "Get All Lists",
							"originalRequest": {
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
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 28 Oct 2022 11:13:16 GMT"
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
									"value": "5650"
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
							"body": "{\n    \"status\": \"success\",\n    \"message\": \"See all in lists.\",\n    \"lists\": {\n        \"145\": {\n            \"id\": \"145\",\n            \"user_id\": \"1\",\n            \"name\": \"Proclomation of Sands\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2015-06-08 05:21:08\",\n            \"last_updated\": \"2015-06-08 05:21:08\",\n            \"public\": \"1\",\n            \"hash\": \"aJvay\"\n        },\n        \"825\": {\n            \"id\": \"825\",\n            \"user_id\": \"1\",\n            \"name\": \"Modern Esper\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-10 18:58:53\",\n            \"last_updated\": \"2016-01-10 18:58:53\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"828\": {\n            \"id\": \"828\",\n            \"user_id\": \"1\",\n            \"name\": \"Polymorph\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-10 19:03:05\",\n            \"last_updated\": \"2016-01-10 19:03:05\",\n            \"public\": \"1\",\n            \"hash\": \"aJvpC\"\n        },\n        \"835\": {\n            \"id\": \"835\",\n            \"user_id\": \"1\",\n            \"name\": \"RDW San Diego\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-11 00:02:45\",\n            \"last_updated\": \"2016-01-11 00:02:45\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"842\": {\n            \"id\": \"842\",\n            \"user_id\": \"1\",\n            \"name\": \"97059-MODO.txt Cheap\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-11 03:56:52\",\n            \"last_updated\": \"2016-01-11 03:56:52\",\n            \"public\": \"1\",\n            \"hash\": \"gOBkq\"\n        },\n        \"851\": {\n            \"id\": \"851\",\n            \"user_id\": \"1\",\n            \"name\": \"BUG Delver Legacy\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-11 06:02:52\",\n            \"last_updated\": \"2016-01-11 06:02:52\",\n            \"public\": \"1\",\n            \"hash\": \"aIVbH\"\n        },\n        \"860\": {\n            \"id\": \"860\",\n            \"user_id\": \"1\",\n            \"name\": \"Randy Test\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-11 22:35:15\",\n            \"last_updated\": \"2016-01-11 22:35:15\",\n            \"public\": \"1\",\n            \"hash\": \"gER5j\"\n        },\n        \"929\": {\n            \"id\": \"929\",\n            \"user_id\": \"1\",\n            \"name\": \"Eldrazi Blue White Control\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-16 18:41:52\",\n            \"last_updated\": \"2016-01-16 18:41:52\",\n            \"public\": \"1\",\n            \"hash\": \"aKWB4\"\n        },\n        \"1010\": {\n            \"id\": \"1010\",\n            \"user_id\": \"1\",\n            \"name\": \"Modern Esper\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-21 04:45:48\",\n            \"last_updated\": \"2016-01-21 04:45:48\",\n            \"public\": \"1\",\n            \"hash\": \"aM7BD\"\n        },\n        \"1024\": {\n            \"id\": \"1024\",\n            \"user_id\": \"1\",\n            \"name\": \"Ebay Purchases White Foils\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-01-21 18:13:07\",\n            \"last_updated\": \"2016-01-21 18:13:07\",\n            \"public\": \"1\",\n            \"hash\": \"aMKdM\"\n        },\n        \"1317\": {\n            \"id\": \"1317\",\n            \"user_id\": \"1\",\n            \"name\": \"Mill Me Bug\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-02-07 19:43:53\",\n            \"last_updated\": \"2016-02-07 19:43:53\",\n            \"public\": \"1\",\n            \"hash\": \"aTlPE\"\n        },\n        \"1364\": {\n            \"id\": \"1364\",\n            \"user_id\": \"1\",\n            \"name\": \"Porphyry Control\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-02-10 02:58:33\",\n            \"last_updated\": \"2016-02-10 02:58:33\",\n            \"public\": \"1\",\n            \"hash\": \"aTLEW\"\n        },\n        \"3500\": {\n            \"id\": \"3500\",\n            \"user_id\": \"1\",\n            \"name\": \"bugdelvermodern-11-01-16.dek\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-07-26 19:44:16\",\n            \"last_updated\": \"2016-07-26 19:44:16\",\n            \"public\": \"1\",\n            \"hash\": \"gEQKi\"\n        },\n        \"3701\": {\n            \"id\": \"3701\",\n            \"user_id\": \"1\",\n            \"name\": \"Channel Fireball\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-08-19 22:31:30\",\n            \"last_updated\": \"2016-08-19 22:31:30\",\n            \"public\": \"1\",\n            \"hash\": \"basph\"\n        },\n        \"3779\": {\n            \"id\": \"3779\",\n            \"user_id\": \"1\",\n            \"name\": \"Modern Burn\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-08-29 22:11:48\",\n            \"last_updated\": \"2016-08-29 22:11:48\",\n            \"public\": \"1\",\n            \"hash\": \"cEoPM\"\n        },\n        \"4051\": {\n            \"id\": \"4051\",\n            \"user_id\": \"1\",\n            \"name\": \"PyroThing\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2016-09-27 19:24:15\",\n            \"last_updated\": \"2016-09-27 19:24:15\",\n            \"public\": \"1\",\n            \"hash\": \"boyCN\"\n        },\n        \"4865\": {\n            \"id\": \"4865\",\n            \"user_id\": \"1\",\n            \"name\": \"Shardless BUG\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2017-01-02 02:04:32\",\n            \"last_updated\": \"2017-01-02 02:04:32\",\n            \"public\": \"1\",\n            \"hash\": \"gEQIm\"\n        },\n        \"5175\": {\n            \"id\": \"5175\",\n            \"user_id\": \"1\",\n            \"name\": \"Ninja Bear\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2017-01-31 07:04:03\",\n            \"last_updated\": \"2017-01-31 07:04:03\",\n            \"public\": \"1\",\n            \"hash\": \"gEQGO\"\n        },\n        \"6241\": {\n            \"id\": \"6241\",\n            \"user_id\": \"1\",\n            \"name\": \"Burning Green\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2017-04-29 22:25:10\",\n            \"last_updated\": \"2017-04-29 22:25:10\",\n            \"public\": \"1\",\n            \"hash\": \"d5QdV\"\n        },\n        \"13130\": {\n            \"id\": \"13130\",\n            \"user_id\": \"1\",\n            \"name\": \"magic traders duals\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2018-12-03 22:35:39\",\n            \"last_updated\": \"2018-12-03 22:35:39\",\n            \"public\": \"1\",\n            \"hash\": \"gTwpf\"\n        },\n        \"13959\": {\n            \"id\": \"13959\",\n            \"user_id\": \"1\",\n            \"name\": \"arean test\",\n            \"description\": \"asdasd\",\n            \"status\": \"1\",\n            \"date_created\": \"2019-02-11 03:23:21\",\n            \"last_updated\": \"2019-02-11 03:23:21\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"13960\": {\n            \"id\": \"13960\",\n            \"user_id\": \"1\",\n            \"name\": \"test\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2019-02-11 03:27:27\",\n            \"last_updated\": \"2019-02-11 03:27:27\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"15348\": {\n            \"id\": \"15348\",\n            \"user_id\": \"1\",\n            \"name\": \"test import\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2019-05-26 06:10:29\",\n            \"last_updated\": \"2019-05-26 06:10:29\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"23158\": {\n            \"id\": \"23158\",\n            \"user_id\": \"1\",\n            \"name\": \"Special Sealed 2020\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2021-01-24 04:48:43\",\n            \"last_updated\": \"2021-01-24 04:48:43\",\n            \"public\": \"1\",\n            \"hash\": \"l3XKS\"\n        },\n        \"24864\": {\n            \"id\": \"24864\",\n            \"user_id\": \"1\",\n            \"name\": \"snooow\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2021-05-03 01:36:30\",\n            \"last_updated\": \"2021-05-03 01:36:30\",\n            \"public\": \"0\",\n            \"hash\": null\n        },\n        \"25570\": {\n            \"id\": \"25570\",\n            \"user_id\": \"1\",\n            \"name\": \"MH2 Collector Ripped\",\n            \"description\": \"\",\n            \"status\": \"1\",\n            \"date_created\": \"2021-06-19 05:19:53\",\n            \"last_updated\": \"2021-06-19 05:19:53\",\n            \"public\": \"1\",\n            \"hash\": \"luTVm\"\n        },\n        \"30952\": {\n            \"id\": \"30952\",\n            \"user_id\": \"1\",\n            \"name\": \"Gaddock Teeg Commander\",\n            \"description\": \"Shutdown deck based around Gaddock teeg prevent spell casting while tutoring swords onto teeg, having teeg swing for commander damage. Other hate bears to shut down competitors.\",\n            \"status\": \"1\",\n            \"date_created\": \"2022-09-06 19:32:38\",\n            \"last_updated\": \"2022-09-06 19:32:38\",\n            \"public\": \"1\",\n            \"hash\": \"oViOd\"\n        },\n        \"31119\": {\n            \"id\": \"31119\",\n            \"user_id\": \"1\",\n            \"name\": \"united pulls box 1\",\n            \"description\": \"This was a rough box, ~120 in value, a $140 loss\",\n            \"status\": \"1\",\n            \"date_created\": \"2022-09-21 23:59:14\",\n            \"last_updated\": \"2022-09-21 23:59:14\",\n            \"public\": \"0\",\n            \"hash\": null\n        }\n    }\n}"
						}
					]
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
			"name": "Importing",
			"item": [
				{
					"name": "CSV Reader",
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
						},
						"description": "Upload a CSV of card and get back a mapping to EchoMTG ID's"
					},
					"response": []
				}
			],
			"description": "Endpoints to import or read card data."
		},
		{
			"name": "Deprecated",
			"item": [
				{
					"name": "Inventory: Adding Cards (DEPRECATED)",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"method": "GET",
						"header": [
							{
								"key": "Authorization",
								"value": "{{user_token}}",
								"description": "User token gathered from /user/auth/"
							}
						],
						"body": {
							"mode": "urlencoded",
							"urlencoded": []
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
					"name": "Inventory: Adjusting Card Condition (deprecated)",
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
				}
			],
			"description": "Old endpoints are documented for informational purposes, if you are using old endpoint, please migrated to new endpoint documented above."
		}
	]
}
