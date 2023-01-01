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
					"name": "User: Subscriptions Update",
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
							"raw": "{\n    \"general\" : \"1\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost/api/user/subscriptions/",
							"host": [
								"localhost"
							],
							"path": [
								"api",
								"user",
								"subscriptions",
								""
							]
						},
						"description": "View the user's email subscription preferences."
					},
					"response": [
						{
							"name": "User: Subscriptions",
							"originalRequest": {
								"method": "POST",
								"header": [
									{
										"key": "Content-Type",
										"name": "Content-Type",
										"value": "application/json",
										"type": "text"
									}
								],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"general\" : \"1\",\n    \"blog\" : \"1\",\n    \"reports\" : \"1\",\n    \"watchlist\" : \"1\",\n    \"features\" : \"1\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/user/subscriptions/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"subscriptions",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Server",
									"value": "nginx"
								},
								{
									"key": "Date",
									"value": "Tue, 13 Dec 2022 14:41:14 GMT"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "X-Powered-By",
									"value": "PHP/8.1.11"
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
									"key": "Content-Encoding",
									"value": "gzip"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"User subscription updated.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Subscriptions",
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
							"raw": "localhost/api/user/subscriptions/",
							"host": [
								"localhost"
							],
							"path": [
								"api",
								"user",
								"subscriptions",
								""
							]
						},
						"description": "View the user's email subscription preferences."
					},
					"response": [
						{
							"name": "User: Subscriptions",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/user/subscriptions/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"subscriptions",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Server",
									"value": "nginx"
								},
								{
									"key": "Date",
									"value": "Tue, 13 Dec 2022 14:41:14 GMT"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "X-Powered-By",
									"value": "PHP/8.1.11"
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
									"key": "Content-Encoding",
									"value": "gzip"
								}
							],
							"cookie": [],
							"body": "{\n    \"data\": {\n        \"user_id\": \"1\",\n        \"weekly_update\": \"1\",\n        \"watchlist_notifications\": \"1\",\n        \"blog_update\": \"1\",\n        \"feature_updates\": \"1\",\n        \"general_emails\": \"1\"\n    },\n    \"message\": \"User subscription accessed.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Logout",
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
							"raw": "https://www.echomtg.com/api/user/logout/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"logout",
								""
							]
						},
						"description": "Destroy the user session and cookies. Invalidates the token."
					},
					"response": [
						{
							"name": "Logout",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/user/logout/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"logout",
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
							"body": "{\n    \"message\": \"User logged out\",\n    \"status\" : \"success\"\n}"
						}
					]
				},
				{
					"name": "User: Update Meta Data",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\n    \"first_name\" : \"Gaddock\",\n    \"last_name\" : \"Teeg\",\n    \"twitter\" : \"@echomtg\",\n    \"about\" : \"Mythical Programmer\",\n    \"use_market\" : \"1\",\n    \"default_sort\" : \"i.id\",\n    \"setting_report_threshhold\" : \"1\",\n    \"alter_facebook\" : \"\",\n    \"alter_email\" : \"\",\n    \"alter_name\" : \"\",\n    \"alter_website\" : \"https://www.echomtg.com\"\n}\n",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/user/update/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"user",
								"update",
								""
							]
						},
						"description": "**Update user profile information and settings.**\n\n**Default Sort Options**\n\n```\nDate Entered = i.id \nCard Name = c.card_name \nPrice = p.tcg_mid \nPersonal Gain = personal_gain \n7-Day Movement = p.change \nExpansion = c.expansion\n\n```"
					},
					"response": [
						{
							"name": "User: Update Meta Data",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"first_name\" : \"Gaddock\",\n    \"last_name\" : \"Teeg\",\n    \"twitter\" : \"@echomtg\",\n    \"about\" : \"Mythical Programmer\",\n    \"use_market\" : \"1\",\n    \"default_sort\" : \"i.id\",\n    \"setting_report_threshhold\" : \"1\",\n    \"alter_facebook\" : \"\",\n    \"alter_email\" : \"\",\n    \"alter_name\" : \"\",\n    \"alter_website\" : \"https://www.echomtg.com\"\n}\n",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/user/update/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"user",
										"update",
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
									"value": "Sat, 29 Oct 2022 20:19:35 GMT"
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
									"value": "platform=unknown; expires=Mon, 28-Nov-2022 20:19:35 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "device_type=unknown; expires=Mon, 28-Nov-2022 20:19:35 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "has_logged_in=true; expires=Mon, 28-Nov-2022 20:19:35 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "username=teeg; expires=Mon, 28-Nov-2022 20:19:35 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Set-Cookie",
									"value": "email=Teeg%40echomtg.com; expires=Mon, 28-Nov-2022 20:19:35 GMT; Max-Age=2592000; path=/"
								},
								{
									"key": "Content-Length",
									"value": "55"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=99"
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
							"body": "{\n    \"message\": \"Update user meta data.\",\n    \"status\": \"success\"\n}"
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
					"name": "Inventory: Adding Items",
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
						"description": "Add a card to the user inventory.\n\n| **Param** | **Required** | **Default** | **Description** |\n| --- | --- | --- | --- |\n| emid | required |  | EchoID |\n| quantity | optional | 1 | number to record |\n| language | optional | EN | Card text language. See language options below |\n| condition | optional | NM | Card condition, see options below |\n| foil | optional | 0 | 1=foiled, 0=regular |\n| image | optional |  | A remote URL to an uploaded image. To add an image through Echo, see the Upload Image endpoint |\n\n\nCondition Options\n```\nNM = Near Mint  \nLP = Lightly Played  \nMP = Moderately Played  \nHP = Heavily Played  \nD = Damaged  \nALT = Altered  \nART = Artist Proof  \nPRE = Pre-release  \nTS = Timestamped  \nSGN = Signed  \nBGS = BGS  \nB10 = BGS 10  \nB95 = BGS 9.5  \nB9 = BGS 9.0  \nB85 = BGS 8.5  \nB8 = BGS 8.0  \nB75 = BGS 7.5  \nB7 = BGS 7.0  \nPSA = PSA  \nP10 = PSA 10  \nP95 = PSA 9.5  \nP9 = PSA 9.0  \nP85 = PSA 8.5  \nP8 = PSA 8.0  \nP75 = PSA 7.5  \nP7 = PSA 7.0\n\n```\n\nLanguage Options\n```\nEN = english  \nDE = german  \nFR = french  \nRU = russian  \nIT = italian  \nES = spanish  \nPT = portuguese  \nCT = chinese traditional  \nCS = chinese simplified  \nJP = japanese  \nKR = korean  \n\n```"
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
					"name": "Inventory: Upload Item Image",
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
						},
						"description": "Add a custom image to an inventory item. This feature is only available to paid tiers."
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
					"name": "Inventory: Removing Items",
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
				},
				{
					"name": "Inventory: View",
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
							"raw": "https://www.echomtg.com/api/inventory/view/?start=0&limit=200",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"inventory",
								"view",
								""
							],
							"query": [
								{
									"key": "start",
									"value": "0"
								},
								{
									"key": "limit",
									"value": "200"
								}
							]
						}
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
							"raw": "{\n    \"emid\": \"104517\",\n    \"list\": \"145\",\n    \"quantity\": \"1\",\n    \"foil\": \"1\",\n    \"sb\": \"0\"\n}",
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
						"description": "Add an item to a list. If a non-foil is added as foil, it will default to non-foil vice versa.\n\n| **Param** | **Description** |\n| --- | --- |\n| emid | **(int) EchoID of card to add** |\n| **list** | (int) list id, see lists/all/ |\n| foil | (int) 0=false, 1=true |\n| sb | (int) sideboard 0=false, 1=true |"
					},
					"response": [
						{
							"name": "Lists: Add Item to List",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"emid\": \"104517\",\n    \"list\": \"145\",\n    \"quantity\": \"1\",\n    \"foil\": \"1\",\n    \"sb\": \"0\"\n}",
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
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Date",
									"value": "Fri, 04 Nov 2022 19:32:17 GMT"
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
									"value": "282"
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
							"body": "{\n    \"status\": \"success\",\n    \"message\": \"Foiled  Gaddock Teeg added to Proclomation of Sands.\",\n    \"list\": {\n        \"id\": \"145\",\n        \"user_id\": \"1\",\n        \"name\": \"Proclomation of Sands\",\n        \"description\": \"\",\n        \"status\": \"1\",\n        \"date_created\": \"2015-06-08 05:21:08\",\n        \"last_updated\": \"2015-06-08 05:21:08\",\n        \"public\": \"1\",\n        \"hash\": \"aJvay\"\n    }\n}"
						}
					]
				},
				{
					"name": "Lists: Remove Item",
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
							"raw": "{\n    \"id\": \"2523525\",\n    \"list\" : \"145\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/lists/remove/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"lists",
								"remove",
								""
							]
						},
						"description": "Add an item to a list. If a non-foil is added as foil, it will default to non-foil vice versa.\n\n| **Param** | **Description** |\n| --- | --- |\n| emid | **(int) EchoID of card to add** |\n| **list** | (int) list id, see lists/all/ |\n| foil | (int) 0=false, 1=true |\n| sb | (int) sideboard 0=false, 1=true |"
					},
					"response": [
						{
							"name": "Lists: Remove Item",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"2523525\",\n    \"list\" : \"145\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/lists/remove/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"lists",
										"remove",
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
									"value": "Fri, 04 Nov 2022 19:34:22 GMT"
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
									"value": "78"
								},
								{
									"key": "Keep-Alive",
									"value": "timeout=15, max=99"
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
							"body": "{\n    \"message\": \"Card removed from list Proclomation of Sands.\",\n    \"status\": \"success\"\n}"
						}
					]
				}
			]
		},
		{
			"name": "Watchlist",
			"item": [
				{
					"name": "Watchlist: Add Item",
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
							"raw": "{\n    \"emid\": \"104517\",\n    \"foil\": \"1\",\n    \"threshold\": \"10\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/watchlist/add/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"watchlist",
								"add",
								""
							]
						}
					},
					"response": [
						{
							"name": "Watchlist Add",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"emid\": \"104517\",\n    \"foil\": \"1\",\n    \"threshold\": \"10\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/watchlist/add/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"watchlist",
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
									"value": "Sun, 30 Oct 2022 11:06:52 GMT"
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
									"value": "1249"
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
							"body": "{\n    \"status\": \"success\",\n    \"watchlist_id\": 108075,\n    \"message\": \"Gaddock Teeg from Judge Promos add to teeg's watchlist.\",\n    \"card\": {\n        \"id\": \"104517\",\n        \"tcgplayer_id\": \"136601\",\n        \"multiverseid\": \"100053967\",\n        \"set_number\": \"3\",\n        \"card_name\": \"Gaddock Teeg\",\n        \"expansion\": \"Judge Promos\",\n        \"set_code\": \"pJGP\",\n        \"rarity\": \"Special\",\n        \"mana_cost\": \"{{g}}{{w}}\",\n        \"cmc\": \"2\",\n        \"p_t\": \"2/2\",\n        \"types\": \"Legendary Creature — Kithkin Advisor\",\n        \"main_type\": \"Legendary Creature \",\n        \"sub_type\": \" Kithkin Advisor\",\n        \"rating\": null,\n        \"votes\": null,\n        \"card_text\": \"<p>Noncreature spells with converted mana cost 4 or greater can't be played. </p>\\r\\n<p>Noncreature spells with X in their mana costs can't be played.</p>\",\n        \"attributes\": null,\n        \"flavor_text\": \"So great is his wisdom and spirit that many who have met him say that they stood before a giant of a man and talked to the wisest of the four winds.\",\n        \"power\": \"2\",\n        \"toughness\": \"2\",\n        \"artist\": \"Matt Stewart\",\n        \"all_sets\": null,\n        \"community_rating\": null,\n        \"type\": \"Legendary\",\n        \"main_colors\": \"White\",\n        \"abilities_colors\": null,\n        \"crawlurl\": null,\n        \"hand_life\": null,\n        \"watermark\": null,\n        \"loyalty\": null,\n        \"color_indicator\": null,\n        \"other_sets\": null,\n        \"card_number\": null,\n        \"created_at\": null,\n        \"deleted_at\": null,\n        \"updated_at\": \"2021-07-02 05:27:21\",\n        \"has_image\": \"1\",\n        \"flip\": \"0\",\n        \"reserve_list\": \"0\",\n        \"sealed\": \"0\"\n    }\n}"
						}
					]
				},
				{
					"name": "Watchlist: Update",
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
							"raw": "{\n    \"id\": \"108075\",\n    \"threshold\": \"12\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/watchlist/update/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"watchlist",
								"update",
								""
							]
						}
					},
					"response": [
						{
							"name": "Watchlist: Update",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": \"108075\",\n    \"threshold\": \"12\"\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/watchlist/update/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"watchlist",
										"update",
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
									"value": "Sun, 30 Oct 2022 11:27:45 GMT"
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
									"value": "62"
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
							"body": "{\n    \"message\": \"Card threshold updated to 12%\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Watchlist: Get View",
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
							"raw": "https://www.echomtg.com/api/watchlist/view/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"watchlist",
								"view",
								""
							]
						},
						"description": "Get watchlist items.\n\n| **Param** | **default** | **Description** |\n| --- | --- | --- |\n| start | 0 | Item to start from, used for pagination |\n| limit | 100 | total items to return, used for pagination |"
					},
					"response": [
						{
							"name": "Watchlist: Get View",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/watchlist/view/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"watchlist",
										"view",
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
									"value": "Mon, 31 Oct 2022 02:52:26 GMT"
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
									"key": "Keep-Alive",
									"value": "timeout=15, max=100"
								},
								{
									"key": "Connection",
									"value": "Keep-Alive"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Watchlist captured!.\",\n    \"items\": [\n        {\n            \"tcg_low\": null,\n            \"tcg_mid\": null,\n            \"price\": null,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Gaddock+Teeg&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"25.88\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{g}}{{w}}\",\n            \"main_type\": \"Legendary Creature \",\n            \"colors\": \"White\",\n            \"name\": \"Gaddock Teeg\",\n            \"mid\": \"100053967\",\n            \"t\": \"Legendary\",\n            \"set\": \"Judge Promos\",\n            \"rarity\": \"Special\",\n            \"types\": \"Legendary Creature — Kithkin Advisor\",\n            \"set_code\": \"pJGP\",\n            \"expansion\": \"Judge Promos\",\n            \"emid\": \"104517\",\n            \"watchlist_id\": \"108075\",\n            \"threshold\": \"12\",\n            \"foil\": \"1\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/pjgp.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/104517.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/104517.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/pJGP/gaddock-teeg/\",\n            \"echo_url\": \"https://www.echomtg.com/card/104517/gaddock-teeg/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"10.89\",\n            \"tcg_mid\": \"14.23\",\n            \"price\": \"14.23\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Crawlspace&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"71.06\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{3}}\",\n            \"main_type\": \"Artifact\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Crawlspace\",\n            \"mid\": \"12505\",\n            \"t\": \"Artifact\",\n            \"set\": \"Urza's Legacy\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Artifact\",\n            \"set_code\": \"ULG\",\n            \"expansion\": \"Urza's Legacy\",\n            \"emid\": \"4984\",\n            \"watchlist_id\": \"106879\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ulg.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/4984.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/4984.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ULG/crawlspace/\",\n            \"echo_url\": \"https://www.echomtg.com/card/4984/crawlspace/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"3.99\",\n            \"tcg_mid\": \"6.64\",\n            \"price\": \"6.64\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Spoils+of+Evil&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{b}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"Black\",\n            \"name\": \"Spoils of Evil\",\n            \"mid\": \"2487\",\n            \"t\": \"Instant\",\n            \"set\": \"Ice Age\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Instant\",\n            \"set_code\": \"ICE\",\n            \"expansion\": \"Ice Age\",\n            \"emid\": \"2485\",\n            \"watchlist_id\": \"89705\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ice.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/2485.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/2485.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ICE/spoils-of-evil/\",\n            \"echo_url\": \"https://www.echomtg.com/card/2485/spoils-of-evil/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.49\",\n            \"tcg_mid\": \"1\",\n            \"price\": \"1.00\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Misthollow+Griffin&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"14.39\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{u}}{{u}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"Blue\",\n            \"name\": \"Misthollow Griffin\",\n            \"mid\": \"276504\",\n            \"t\": \"Creature\",\n            \"set\": \"Avacyn Restored\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Creature - Griffin\",\n            \"set_code\": \"AVR\",\n            \"expansion\": \"Avacyn Restored\",\n            \"emid\": \"88237\",\n            \"watchlist_id\": \"87323\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/avr.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/88237.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/88237.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/AVR/misthollow-griffin/\",\n            \"echo_url\": \"https://www.echomtg.com/card/88237/misthollow-griffin/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.27\",\n            \"tcg_mid\": \"0.75\",\n            \"price\": \"0.75\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Torrent+Elemental&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1.36\",\n            \"price_change\": \"-3\",\n            \"mc\": \"{{4}}{{U}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"Blue\",\n            \"name\": \"Torrent Elemental\",\n            \"mid\": \"391945\",\n            \"t\": \"Creature\",\n            \"set\": \"Fate Reforged\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Creature- Elemental\",\n            \"set_code\": \"FRF\",\n            \"expansion\": \"Fate Reforged\",\n            \"emid\": \"95873\",\n            \"watchlist_id\": \"87322\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/frf.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/95873.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/95873.jpg\",\n            \"gain\": \"-3\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/FRF/torrent-elemental/\",\n            \"echo_url\": \"https://www.echomtg.com/card/95873/torrent-elemental/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-3%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.2\",\n            \"tcg_mid\": \"0.79\",\n            \"price\": \"0.79\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Beast+Token+%284%2F4%29&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"-33\",\n            \"mc\": null,\n            \"main_type\": \"Creature\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Beast Token (4/4)\",\n            \"mid\": \"201844\",\n            \"t\": \"Creature\",\n            \"set\": \"Duel Decks: Garruk vs. Liliana\",\n            \"rarity\": \"Token\",\n            \"types\": \"Creature- Beast\",\n            \"set_code\": \"DDD\",\n            \"expansion\": \"Duel Decks: Garruk vs. Liliana\",\n            \"emid\": \"66820\",\n            \"watchlist_id\": \"84700\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ddd.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/66820.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/66820.jpg\",\n            \"gain\": \"-33\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/DDD/beast-token-4-4/\",\n            \"echo_url\": \"https://www.echomtg.com/card/66820/beast-token-4-4/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-33%</span>\"\n        },\n        {\n            \"tcg_low\": \"31.4\",\n            \"tcg_mid\": \"38.55\",\n            \"price\": \"38.55\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Spellseeker&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"67.21\",\n            \"price_change\": \"-5\",\n            \"mc\": \"{{2}}{{u}}\",\n            \"main_type\": \"Creature - Human Wizard\",\n            \"colors\": \"Blue\",\n            \"name\": \"Spellseeker\",\n            \"mid\": \"446009\",\n            \"t\": \"Creature\",\n            \"set\": \"Battlebond\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Human Wizard\",\n            \"set_code\": \"BBD\",\n            \"expansion\": \"Battlebond\",\n            \"emid\": \"106957\",\n            \"watchlist_id\": \"40667\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/bbd.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/106957.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/106957.jpg\",\n            \"gain\": \"-5\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/BBD/spellseeker/\",\n            \"echo_url\": \"https://www.echomtg.com/card/106957/spellseeker/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-5%</span>\"\n        },\n        {\n            \"tcg_low\": \"5.91\",\n            \"tcg_mid\": \"8.91\",\n            \"price\": \"8.91\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Idyllic+Tutor&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"51.65\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"White\",\n            \"name\": \"Idyllic Tutor\",\n            \"mid\": \"152938\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Morningtide\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"MOR\",\n            \"expansion\": \"Morningtide\",\n            \"emid\": \"37638\",\n            \"watchlist_id\": \"21600\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/mor.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/37638.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/37638.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/MOR/idyllic-tutor/\",\n            \"echo_url\": \"https://www.echomtg.com/card/37638/idyllic-tutor/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.2\",\n            \"tcg_mid\": \"1.55\",\n            \"price\": \"1.55\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Nissa%2C+Steward+of+Elements&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"3.51\",\n            \"price_change\": \"-4\",\n            \"mc\": \"{{x}}{{g}}{{u}}\",\n            \"main_type\": \"planeswalker\",\n            \"colors\": \"Blue\",\n            \"name\": \"Nissa, Steward of Elements\",\n            \"mid\": \"426906\",\n            \"t\": \"Planeswalker\",\n            \"set\": \"Amonkhet\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Planeswalker - Nissa\",\n            \"set_code\": \"AKH\",\n            \"expansion\": \"Amonkhet\",\n            \"emid\": \"102724\",\n            \"watchlist_id\": \"17659\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/akh.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/102724.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/102724.jpg\",\n            \"gain\": \"-4\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/AKH/nissa-steward-of-elements/\",\n            \"echo_url\": \"https://www.echomtg.com/card/102724/nissa-steward-of-elements/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-4%</span>\"\n        },\n        {\n            \"tcg_low\": \"17.55\",\n            \"tcg_mid\": \"28.27\",\n            \"price\": \"28.27\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Berserk&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"59.08\",\n            \"price_change\": \"-3\",\n            \"mc\": \"{{g}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"Green\",\n            \"name\": \"Berserk\",\n            \"mid\": \"416932\",\n            \"t\": \"Instant\",\n            \"set\": \"Conspiracy: Take the Crown\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Instant\",\n            \"set_code\": \"CN2\",\n            \"expansion\": \"Conspiracy: Take the Crown\",\n            \"emid\": \"99301\",\n            \"watchlist_id\": \"15630\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/cn2.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/99301.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/99301.jpg\",\n            \"gain\": \"-3\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/CN2/berserk/\",\n            \"echo_url\": \"https://www.echomtg.com/card/99301/berserk/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-3%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.4\",\n            \"tcg_mid\": \"1.34\",\n            \"price\": \"1.34\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Splendid+Reclamation&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1.52\",\n            \"price_change\": \"1\",\n            \"mc\": \"{{3}}{{g}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Green\",\n            \"name\": \"Splendid Reclamation\",\n            \"mid\": \"414474\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Eldritch Moon\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"EMN\",\n            \"expansion\": \"Eldritch Moon\",\n            \"emid\": \"99171\",\n            \"watchlist_id\": \"15614\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/emn.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/99171.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/99171.jpg\",\n            \"gain\": \"1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/EMN/splendid-reclamation/\",\n            \"echo_url\": \"https://www.echomtg.com/card/99171/splendid-reclamation/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">1%</span>\"\n        },\n        {\n            \"tcg_low\": \"3.49\",\n            \"tcg_mid\": \"8.25\",\n            \"price\": \"8.25\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Rainbow+Vale&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"-1\",\n            \"mc\": null,\n            \"main_type\": \"Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Rainbow Vale\",\n            \"mid\": \"2010\",\n            \"t\": \"Land\",\n            \"set\": \"Fallen Empires\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"FEM\",\n            \"expansion\": \"Fallen Empires\",\n            \"emid\": \"2008\",\n            \"watchlist_id\": \"14083\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/fem.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/2008.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/2008.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/FEM/rainbow-vale/\",\n            \"echo_url\": \"https://www.echomtg.com/card/2008/rainbow-vale/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"2.2\",\n            \"tcg_mid\": \"3.99\",\n            \"price\": \"3.99\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Disallow&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"6.28\",\n            \"price_change\": \"-3\",\n            \"mc\": \"{{1}}{{u}}{{u}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"Blue\",\n            \"name\": \"Disallow\",\n            \"mid\": \"423698\",\n            \"t\": \"Instant\",\n            \"set\": \"Aether Revolt\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Instant\",\n            \"set_code\": \"AER\",\n            \"expansion\": \"Aether Revolt\",\n            \"emid\": \"101598\",\n            \"watchlist_id\": \"13461\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/aer.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/101598.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/101598.jpg\",\n            \"gain\": \"-3\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/AER/disallow/\",\n            \"echo_url\": \"https://www.echomtg.com/card/101598/disallow/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-3%</span>\"\n        },\n        {\n            \"tcg_low\": \"7.95\",\n            \"tcg_mid\": \"12.05\",\n            \"price\": \"12.05\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Ruination&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{3}}{{r}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Red\",\n            \"name\": \"Ruination\",\n            \"mid\": \"5213\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Stronghold\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"STH\",\n            \"expansion\": \"Stronghold\",\n            \"emid\": \"3861\",\n            \"watchlist_id\": \"13438\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/sth.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/3861.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/3861.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/STH/ruination/\",\n            \"echo_url\": \"https://www.echomtg.com/card/3861/ruination/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"2\",\n            \"tcg_mid\": \"3.22\",\n            \"price\": \"3.22\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Eater+of+Days&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"27.01\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{4}}\",\n            \"main_type\": \"Artifact Creature\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Eater of Days\",\n            \"mid\": \"46165\",\n            \"t\": \"Artifact\",\n            \"set\": \"Darksteel\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Artifact Creature - Leviathan\",\n            \"set_code\": \"DST\",\n            \"expansion\": \"Darksteel\",\n            \"emid\": \"9173\",\n            \"watchlist_id\": \"9843\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/dst.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/9173.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/9173.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/DST/eater-of-days/\",\n            \"echo_url\": \"https://www.echomtg.com/card/9173/eater-of-days/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"47.14\",\n            \"tcg_mid\": \"72.45\",\n            \"price\": \"72.45\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Aluren&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{g}}{{g}}\",\n            \"main_type\": \"Enchantment\",\n            \"colors\": \"Green\",\n            \"name\": \"Aluren\",\n            \"mid\": \"4747\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Tempest\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Enchantment\",\n            \"set_code\": \"TMP\",\n            \"expansion\": \"Tempest\",\n            \"emid\": \"3564\",\n            \"watchlist_id\": \"9837\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/tmp.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/3564.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/3564.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/TMP/aluren/\",\n            \"echo_url\": \"https://www.echomtg.com/card/3564/aluren/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"3\",\n            \"tcg_mid\": \"4.23\",\n            \"price\": \"4.23\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Chain+Lightning&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"3.99\",\n            \"price_change\": \"-1\",\n            \"mc\": \"{{r}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Red\",\n            \"name\": \"Chain Lightning\",\n            \"mid\": \"413665\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Eternal Masters\",\n            \"rarity\": \"Uncommon\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"EMA\",\n            \"expansion\": \"Eternal Masters\",\n            \"emid\": \"98772\",\n            \"watchlist_id\": \"7374\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ema.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/98772.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/98772.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/EMA/chain-lightning/\",\n            \"echo_url\": \"https://www.echomtg.com/card/98772/chain-lightning/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.25\",\n            \"tcg_mid\": \"1.07\",\n            \"price\": \"1.07\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Shardless+Agent&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"2.32\",\n            \"price_change\": \"2\",\n            \"mc\": \"{{1}}{{g}}{{u}}\",\n            \"main_type\": \"Artifact Creature - Human Rogue\",\n            \"colors\": \"Green, Blue\",\n            \"name\": \"Shardless Agent\",\n            \"mid\": \"413748\",\n            \"t\": \"Artifact\",\n            \"set\": \"Eternal Masters\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Artifact Creature  - Human Rogue\",\n            \"set_code\": \"EMA\",\n            \"expansion\": \"Eternal Masters\",\n            \"emid\": \"98918\",\n            \"watchlist_id\": \"7172\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ema.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/98918.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/98918.jpg\",\n            \"gain\": \"2\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/EMA/shardless-agent/\",\n            \"echo_url\": \"https://www.echomtg.com/card/98918/shardless-agent/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">2%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.33\",\n            \"tcg_mid\": \"0.57\",\n            \"price\": \"0.57\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Penance&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"-2\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Enchantment\",\n            \"colors\": \"White\",\n            \"name\": \"Penance\",\n            \"mid\": \"6047\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Exodus\",\n            \"rarity\": \"Uncommon\",\n            \"types\": \"Enchantment\",\n            \"set_code\": \"EXO\",\n            \"expansion\": \"Exodus\",\n            \"emid\": \"4067\",\n            \"watchlist_id\": \"6469\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/exo.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/4067.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/4067.jpg\",\n            \"gain\": \"-2\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/EXO/penance/\",\n            \"echo_url\": \"https://www.echomtg.com/card/4067/penance/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-2%</span>\"\n        },\n        {\n            \"tcg_low\": \"20975\",\n            \"tcg_mid\": \"20975\",\n            \"price\": \"20975.00\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Mox+Ruby&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"-100\",\n            \"mc\": \"{{0}}\",\n            \"main_type\": \"Artifact\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Mox Ruby\",\n            \"mid\": \"35\",\n            \"t\": \"Artifact\",\n            \"set\": \"Limited Edition Alpha\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Artifact\",\n            \"set_code\": \"LEA\",\n            \"expansion\": \"Limited Edition Alpha\",\n            \"emid\": \"76\",\n            \"watchlist_id\": \"6208\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/lea.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/76.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/76.jpg\",\n            \"gain\": \"-100\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/LEA/mox-ruby/\",\n            \"echo_url\": \"https://www.echomtg.com/card/76/mox-ruby/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-100%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.3\",\n            \"tcg_mid\": \"0.99\",\n            \"price\": \"0.99\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Eldrazi+Mimic&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"2.39\",\n            \"price_change\": \"-7\",\n            \"mc\": \"{{2}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Colorless\",\n            \"name\": \"Eldrazi Mimic\",\n            \"mid\": \"407512\",\n            \"t\": \"Creature\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Eldrazi\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97600\",\n            \"watchlist_id\": \"6169\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97600.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97600.jpg\",\n            \"gain\": \"-7\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/eldrazi-mimic/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97600/eldrazi-mimic/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-7%</span>\"\n        },\n        {\n            \"tcg_low\": \"7.05\",\n            \"tcg_mid\": \"10.43\",\n            \"price\": \"10.43\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Koskun+Falls&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{b}}{{b}}\",\n            \"main_type\": \"Enchantment\",\n            \"colors\": \"Black\",\n            \"name\": \"Koskun Falls\",\n            \"mid\": \"2927\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Homelands\",\n            \"rarity\": \"Rare\",\n            \"types\": \"World Enchantment\",\n            \"set_code\": \"HML\",\n            \"expansion\": \"Homelands\",\n            \"emid\": \"92561\",\n            \"watchlist_id\": \"6168\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/hml.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/92561.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/92561.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/HML/koskun-falls/\",\n            \"echo_url\": \"https://www.echomtg.com/card/92561/koskun-falls/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"4.79\",\n            \"tcg_mid\": \"6.5\",\n            \"price\": \"6.50\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Mana+Tithe&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{W}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"White\",\n            \"name\": \"Mana Tithe\",\n            \"mid\": \"100000703\",\n            \"t\": \"Instant\",\n            \"set\": \"Magic Player Rewards\",\n            \"rarity\": \"Special\",\n            \"types\": \"Instant\",\n            \"set_code\": \"pMPR\",\n            \"expansion\": \"Magic Player Rewards\",\n            \"emid\": \"95673\",\n            \"watchlist_id\": \"6131\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/pmpr.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/95673.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/95673.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/pMPR/mana-tithe/\",\n            \"echo_url\": \"https://www.echomtg.com/card/95673/mana-tithe/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"18\",\n            \"tcg_mid\": \"23.61\",\n            \"price\": \"23.61\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Dark+Depths&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"200.65\",\n            \"price_change\": \"0\",\n            \"mc\": null,\n            \"main_type\": \"Legendary Snow Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Dark Depths\",\n            \"mid\": \"121155\",\n            \"t\": \"Land\",\n            \"set\": \"Coldsnap\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Legendary Snow Land\",\n            \"set_code\": \"CSP\",\n            \"expansion\": \"Coldsnap\",\n            \"emid\": \"23978\",\n            \"watchlist_id\": \"6130\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/csp.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/23978.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/23978.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/CSP/dark-depths/\",\n            \"echo_url\": \"https://www.echomtg.com/card/23978/dark-depths/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.61\",\n            \"tcg_mid\": \"1.23\",\n            \"price\": \"1.23\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Eidolon+of+Rhetoric&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"11.16\",\n            \"price_change\": \"9\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Enchantment Creature - Spirit\",\n            \"colors\": \"White\",\n            \"name\": \"Eidolon of Rhetoric\",\n            \"mid\": \"380409\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Journey into Nyx\",\n            \"rarity\": \"Uncommon\",\n            \"types\": \"Enchantment Creature - Spirit\",\n            \"set_code\": \"JOU\",\n            \"expansion\": \"Journey into Nyx\",\n            \"emid\": \"93509\",\n            \"watchlist_id\": \"6128\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/jou.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/93509.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/93509.jpg\",\n            \"gain\": \"9\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/JOU/eidolon-of-rhetoric/\",\n            \"echo_url\": \"https://www.echomtg.com/card/93509/eidolon-of-rhetoric/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">9%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.3\",\n            \"tcg_mid\": \"0.61\",\n            \"price\": \"0.61\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Lapse+of+Certainty&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"2.4\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"White\",\n            \"name\": \"Lapse of Certainty\",\n            \"mid\": \"175026\",\n            \"t\": \"Instant\",\n            \"set\": \"Conflux\",\n            \"rarity\": \"Common\",\n            \"types\": \"Instant\",\n            \"set_code\": \"CON\",\n            \"expansion\": \"Conflux\",\n            \"emid\": \"52404\",\n            \"watchlist_id\": \"6127\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/con.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/52404.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/52404.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/CON/lapse-of-certainty/\",\n            \"echo_url\": \"https://www.echomtg.com/card/52404/lapse-of-certainty/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": null,\n            \"tcg_mid\": null,\n            \"price\": null,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Flooded+Strand&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"273.63\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{}}\",\n            \"main_type\": \"Land\",\n            \"colors\": null,\n            \"name\": \"Flooded Strand\",\n            \"mid\": \"100000936\",\n            \"t\": \"Land\",\n            \"set\": \"Zendikar Expeditions\",\n            \"rarity\": \"Special\",\n            \"types\": \"Land\",\n            \"set_code\": \"BFZx\",\n            \"expansion\": \"Zendikar Expeditions\",\n            \"emid\": \"97127\",\n            \"watchlist_id\": \"6126\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/bfzx.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97127.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97127.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/BFZx/flooded-strand/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97127/flooded-strand/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.1\",\n            \"tcg_mid\": \"0.48\",\n            \"price\": \"0.48\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Timely+Reinforcements&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"10.34\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"White\",\n            \"name\": \"Timely Reinforcements\",\n            \"mid\": \"220074\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Magic 2012\",\n            \"rarity\": \"Uncommon\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"M12\",\n            \"expansion\": \"Magic 2012\",\n            \"emid\": \"73712\",\n            \"watchlist_id\": \"6125\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/m12.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/73712.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/73712.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/M12/timely-reinforcements/\",\n            \"echo_url\": \"https://www.echomtg.com/card/73712/timely-reinforcements/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"1.99\",\n            \"tcg_mid\": \"3.97\",\n            \"price\": \"3.97\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=True-Name+Nemesis&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{u}}{{u}}\",\n            \"main_type\": \"Creature - Merfolk Rogue\",\n            \"colors\": \"Blue\",\n            \"name\": \"True-Name Nemesis\",\n            \"mid\": \"376562\",\n            \"t\": \"Creature\",\n            \"set\": \"Commander 2013 Edition\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Merfolk Rogue\",\n            \"set_code\": \"C13\",\n            \"expansion\": \"Commander 2013 Edition\",\n            \"emid\": \"93192\",\n            \"watchlist_id\": \"6123\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/c13.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/93192.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/93192.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/C13/true-name-nemesis/\",\n            \"echo_url\": \"https://www.echomtg.com/card/93192/true-name-nemesis/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"6.99\",\n            \"tcg_mid\": \"10.66\",\n            \"price\": \"10.66\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Thing+in+the+Ice&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"25.63\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{u}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Blue\",\n            \"name\": \"Thing in the Ice\",\n            \"mid\": \"409836\",\n            \"t\": \"Creature\",\n            \"set\": \"Shadows over Innistrad\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Horror\",\n            \"set_code\": \"SOI\",\n            \"expansion\": \"Shadows over Innistrad\",\n            \"emid\": \"98154\",\n            \"watchlist_id\": \"6115\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/soi.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/98154.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/98154.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/SOI/thing-in-the-ice/\",\n            \"echo_url\": \"https://www.echomtg.com/card/98154/thing-in-the-ice/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"7.95\",\n            \"tcg_mid\": \"10.79\",\n            \"price\": \"10.79\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Green+Sun%27s+Zenith&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"84.86\",\n            \"price_change\": \"-1\",\n            \"mc\": \"{{x}}{{g}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Green\",\n            \"name\": \"Green Sun's Zenith\",\n            \"mid\": \"221559\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Mirrodin Besieged\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"MBS\",\n            \"expansion\": \"Mirrodin Besieged\",\n            \"emid\": \"74054\",\n            \"watchlist_id\": \"6113\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/mbs.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/74054.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/74054.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/MBS/green-sun-s-zenith/\",\n            \"echo_url\": \"https://www.echomtg.com/card/74054/green-sun-s-zenith/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"1.9\",\n            \"tcg_mid\": \"3.65\",\n            \"price\": \"3.65\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Thought-Knot+Seer&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"11.2\",\n            \"price_change\": \"-7\",\n            \"mc\": \"{{3}}{{^}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Colorless\",\n            \"name\": \"Thought-Knot Seer\",\n            \"mid\": \"407519\",\n            \"t\": \"Creature\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Eldrazi\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97736\",\n            \"watchlist_id\": \"6099\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97736.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97736.jpg\",\n            \"gain\": \"-7\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/thought-knot-seer/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97736/thought-knot-seer/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-7%</span>\"\n        },\n        {\n            \"tcg_low\": null,\n            \"tcg_mid\": null,\n            \"price\": null,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Snapcaster+Mage&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"139.94\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{u}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Blue\",\n            \"name\": \"Snapcaster Mage\",\n            \"mid\": \"100001315\",\n            \"t\": \"Creature\",\n            \"set\": \"Pro Tour Promos\",\n            \"rarity\": \"Special\",\n            \"types\": \"Creature - Human Wizard\",\n            \"set_code\": \"pPRO\",\n            \"expansion\": \"Pro Tour Promos\",\n            \"emid\": \"98156\",\n            \"watchlist_id\": \"6098\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ppro.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/98156.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/98156.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/pPRO/snapcaster-mage/\",\n            \"echo_url\": \"https://www.echomtg.com/card/98156/snapcaster-mage/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.85\",\n            \"tcg_mid\": \"2.09\",\n            \"price\": \"2.09\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Kozilek%27s+Return&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"10.45\",\n            \"price_change\": \"1\",\n            \"mc\": \"{{2}}{{r}}\",\n            \"main_type\": \"Instant\",\n            \"colors\": \"Red\",\n            \"name\": \"Kozilek's Return\",\n            \"mid\": \"407608\",\n            \"t\": \"Instant\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Instant\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97875\",\n            \"watchlist_id\": \"6084\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97875.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97875.jpg\",\n            \"gain\": \"1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/kozilek-s-return/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97875/kozilek-s-return/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">1%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.08\",\n            \"tcg_mid\": \"0.45\",\n            \"price\": \"0.45\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Sylvan+Advocate&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"0.81\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{g}}\",\n            \"main_type\": \"Creature - Elf Druid Ally\",\n            \"colors\": \"Green\",\n            \"name\": \"Sylvan Advocate\",\n            \"mid\": \"407654\",\n            \"t\": \"Creature\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Elf Druid Ally\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97926\",\n            \"watchlist_id\": \"6083\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97926.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97926.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/sylvan-advocate/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97926/sylvan-advocate/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"8.47\",\n            \"tcg_mid\": \"11\",\n            \"price\": \"11.00\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Cryptolith+Rite&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"20.94\",\n            \"price_change\": \"-6\",\n            \"mc\": \"{{1}}{{g}}\",\n            \"main_type\": \"Enchantment\",\n            \"colors\": \"Green\",\n            \"name\": \"Cryptolith Rite\",\n            \"mid\": \"409958\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Shadows over Innistrad\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Enchantment\",\n            \"set_code\": \"SOI\",\n            \"expansion\": \"Shadows over Innistrad\",\n            \"emid\": \"98337\",\n            \"watchlist_id\": \"5786\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/soi.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/98337.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/98337.jpg\",\n            \"gain\": \"-6\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/SOI/cryptolith-rite/\",\n            \"echo_url\": \"https://www.echomtg.com/card/98337/cryptolith-rite/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-6%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.04\",\n            \"tcg_mid\": \"0.42\",\n            \"price\": \"0.42\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Obzedat%27s+Aid&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"0.7\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{3}}{{w}}{{b}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"White, Black\",\n            \"name\": \"Obzedat's Aid\",\n            \"mid\": \"369002\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Dragon's Maze\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"DGM\",\n            \"expansion\": \"Dragon's Maze\",\n            \"emid\": \"91115\",\n            \"watchlist_id\": \"5193\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/dgm.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/91115.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/91115.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/DGM/obzedat-s-aid/\",\n            \"echo_url\": \"https://www.echomtg.com/card/91115/obzedat-s-aid/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.08\",\n            \"tcg_mid\": \"0.44\",\n            \"price\": \"0.44\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Blood+Scrivener&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"0.7\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{b}}\",\n            \"main_type\": \"Creature - Zombie Wizard\",\n            \"colors\": \"Black\",\n            \"name\": \"Blood Scrivener\",\n            \"mid\": \"369030\",\n            \"t\": \"Creature\",\n            \"set\": \"Dragon's Maze\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Zombie Wizard\",\n            \"set_code\": \"DGM\",\n            \"expansion\": \"Dragon's Maze\",\n            \"emid\": \"91050\",\n            \"watchlist_id\": \"4977\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/dgm.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/91050.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/91050.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/DGM/blood-scrivener/\",\n            \"echo_url\": \"https://www.echomtg.com/card/91050/blood-scrivener/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.57\",\n            \"tcg_mid\": \"1.01\",\n            \"price\": \"1.01\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Sunscour&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"4.53\",\n            \"price_change\": \"-1\",\n            \"mc\": \"{{5}}{{w}}{{w}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"White\",\n            \"name\": \"Sunscour\",\n            \"mid\": \"121251\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Coldsnap\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"CSP\",\n            \"expansion\": \"Coldsnap\",\n            \"emid\": \"24052\",\n            \"watchlist_id\": \"4182\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/csp.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/24052.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/24052.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/CSP/sunscour/\",\n            \"echo_url\": \"https://www.echomtg.com/card/24052/sunscour/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.08\",\n            \"tcg_mid\": \"0.93\",\n            \"price\": \"0.93\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Porphyry+Nodes&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"5.5\",\n            \"price_change\": \"4\",\n            \"mc\": \"{{w}}\",\n            \"main_type\": \"Enchantment\",\n            \"colors\": \"White\",\n            \"name\": \"Porphyry Nodes\",\n            \"mid\": \"124470\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Planar Chaos\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Enchantment\",\n            \"set_code\": \"PLC\",\n            \"expansion\": \"Planar Chaos\",\n            \"emid\": \"24742\",\n            \"watchlist_id\": \"4181\",\n            \"threshold\": \"5\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/plc.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/24742.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/24742.jpg\",\n            \"gain\": \"4\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/PLC/porphyry-nodes/\",\n            \"echo_url\": \"https://www.echomtg.com/card/24742/porphyry-nodes/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">4%</span>\"\n        },\n        {\n            \"tcg_low\": \"5.7\",\n            \"tcg_mid\": \"11.98\",\n            \"price\": \"11.98\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Void+Winnower&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"25.83\",\n            \"price_change\": \"-6\",\n            \"mc\": \"{{9}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Colorless\",\n            \"name\": \"Void Winnower\",\n            \"mid\": \"402093\",\n            \"t\": \"Creature\",\n            \"set\": \"Battle for Zendikar\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Creature - Eldrazi\",\n            \"set_code\": \"BFZ\",\n            \"expansion\": \"Battle for Zendikar\",\n            \"emid\": \"96901\",\n            \"watchlist_id\": \"3934\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/bfz.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/96901.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/96901.jpg\",\n            \"gain\": \"-6\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/BFZ/void-winnower/\",\n            \"echo_url\": \"https://www.echomtg.com/card/96901/void-winnower/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-6%</span>\"\n        },\n        {\n            \"tcg_low\": \"5.38\",\n            \"tcg_mid\": \"9.44\",\n            \"price\": \"9.44\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Monastery+Mentor&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"31.99\",\n            \"price_change\": \"-5\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"White\",\n            \"name\": \"Monastery Mentor\",\n            \"mid\": \"391883\",\n            \"t\": \"Creature\",\n            \"set\": \"Fate Reforged\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Creature- Human Monk\",\n            \"set_code\": \"FRF\",\n            \"expansion\": \"Fate Reforged\",\n            \"emid\": \"95815\",\n            \"watchlist_id\": \"3933\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/frf.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/95815.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/95815.jpg\",\n            \"gain\": \"-5\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/FRF/monastery-mentor/\",\n            \"echo_url\": \"https://www.echomtg.com/card/95815/monastery-mentor/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-5%</span>\"\n        },\n        {\n            \"tcg_low\": \"1.5\",\n            \"tcg_mid\": \"2.32\",\n            \"price\": \"2.32\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Spirit+of+the+Labyrinth&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"17.28\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{w}}\",\n            \"main_type\": \"Enchantment Creature - Spirit\",\n            \"colors\": \"White\",\n            \"name\": \"Spirit of the Labyrinth\",\n            \"mid\": \"378399\",\n            \"t\": \"Enchantment\",\n            \"set\": \"Born of the Gods\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Enchantment Creature - Spirit\",\n            \"set_code\": \"BNG\",\n            \"expansion\": \"Born of the Gods\",\n            \"emid\": \"93365\",\n            \"watchlist_id\": \"3932\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/bng.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/93365.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/93365.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/BNG/spirit-of-the-labyrinth/\",\n            \"echo_url\": \"https://www.echomtg.com/card/93365/spirit-of-the-labyrinth/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"4.77\",\n            \"tcg_mid\": \"9\",\n            \"price\": \"9.00\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Kataki%2C+War%27s+Wage&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"198\",\n            \"price_change\": \"-1\",\n            \"mc\": \"{{1}}{{w}}\",\n            \"main_type\": \"Legendary Creature\",\n            \"colors\": \"White\",\n            \"name\": \"Kataki, War's Wage\",\n            \"mid\": \"74190\",\n            \"t\": \"Legendary\",\n            \"set\": \"Saviors of Kamigawa\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Legendary Creature - Spirit\",\n            \"set_code\": \"SOK\",\n            \"expansion\": \"Saviors of Kamigawa\",\n            \"emid\": \"10496\",\n            \"watchlist_id\": \"3931\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/sok.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/10496.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/10496.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/SOK/kataki-war-s-wage/\",\n            \"echo_url\": \"https://www.echomtg.com/card/10496/kataki-war-s-wage/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.14\",\n            \"tcg_mid\": \"0.45\",\n            \"price\": \"0.45\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Vryn+Wingmare&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1.52\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{2}}{{w}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"White\",\n            \"name\": \"Vryn Wingmare\",\n            \"mid\": \"398567\",\n            \"t\": \"Creature\",\n            \"set\": \"Magic Origins\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Pegasus\",\n            \"set_code\": \"ORI\",\n            \"expansion\": \"Magic Origins\",\n            \"emid\": \"96609\",\n            \"watchlist_id\": \"3930\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ori.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/96609.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/96609.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ORI/vryn-wingmare/\",\n            \"echo_url\": \"https://www.echomtg.com/card/96609/vryn-wingmare/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.16\",\n            \"tcg_mid\": \"0.8\",\n            \"price\": \"0.80\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Wandering+Fumarole&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1.29\",\n            \"price_change\": \"-9\",\n            \"mc\": \"{{}}\",\n            \"main_type\": \"Land\",\n            \"colors\": null,\n            \"name\": \"Wandering Fumarole\",\n            \"mid\": \"407692\",\n            \"t\": \"Land\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97603\",\n            \"watchlist_id\": \"3788\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97603.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97603.jpg\",\n            \"gain\": \"-9\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/wandering-fumarole/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97603/wandering-fumarole/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-9%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.35\",\n            \"tcg_mid\": \"1.1\",\n            \"price\": \"1.10\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Restoration+Angel&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"9.23\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{3}}{{w}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"White\",\n            \"name\": \"Restoration Angel\",\n            \"mid\": \"240096\",\n            \"t\": \"Creature\",\n            \"set\": \"Avacyn Restored\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Angel\",\n            \"set_code\": \"AVR\",\n            \"expansion\": \"Avacyn Restored\",\n            \"emid\": \"79814\",\n            \"watchlist_id\": \"3638\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/avr.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/79814.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/79814.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/AVR/restoration-angel/\",\n            \"echo_url\": \"https://www.echomtg.com/card/79814/restoration-angel/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.2\",\n            \"tcg_mid\": \"0.74\",\n            \"price\": \"0.74\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Preordain&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"30.75\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{u}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Blue\",\n            \"name\": \"Preordain\",\n            \"mid\": \"205019\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Magic 2011\",\n            \"rarity\": \"Common\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"M11\",\n            \"expansion\": \"Magic 2011\",\n            \"emid\": \"69069\",\n            \"watchlist_id\": \"3593\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/m11.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/69069.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/69069.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/M11/preordain/\",\n            \"echo_url\": \"https://www.echomtg.com/card/69069/preordain/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"1.57\",\n            \"tcg_mid\": \"3.3\",\n            \"price\": \"3.30\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Fulminator+Mage&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"33.48\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{br}}{{br}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"Black,Red\",\n            \"name\": \"Fulminator Mage\",\n            \"mid\": \"142009\",\n            \"t\": \"Creature\",\n            \"set\": \"Shadowmoor\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Elemental Shaman\",\n            \"set_code\": \"SHM\",\n            \"expansion\": \"Shadowmoor\",\n            \"emid\": \"32376\",\n            \"watchlist_id\": \"3592\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/shm.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/32376.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/32376.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/SHM/fulminator-mage/\",\n            \"echo_url\": \"https://www.echomtg.com/card/32376/fulminator-mage/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.19\",\n            \"tcg_mid\": \"0.75\",\n            \"price\": \"0.75\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Prairie+Stream&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"3.75\",\n            \"price_change\": \"-4\",\n            \"mc\": \"\",\n            \"main_type\": \"Land \",\n            \"colors\": null,\n            \"name\": \"Prairie Stream\",\n            \"mid\": \"401998\",\n            \"t\": \"Land\",\n            \"set\": \"Battle for Zendikar\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land - Plains Island\",\n            \"set_code\": \"BFZ\",\n            \"expansion\": \"Battle for Zendikar\",\n            \"emid\": \"96882\",\n            \"watchlist_id\": \"3589\",\n            \"threshold\": \"5\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/bfz.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/96882.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/96882.jpg\",\n            \"gain\": \"-4\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/BFZ/prairie-stream/\",\n            \"echo_url\": \"https://www.echomtg.com/card/96882/prairie-stream/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-4%</span>\"\n        },\n        {\n            \"tcg_low\": \"33.94\",\n            \"tcg_mid\": \"38.99\",\n            \"price\": \"38.99\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Flooded+Strand&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"56.19\",\n            \"price_change\": \"3\",\n            \"mc\": null,\n            \"main_type\": \"Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Flooded Strand\",\n            \"mid\": \"386537\",\n            \"t\": \"Land\",\n            \"set\": \"Khans of Tarkir\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"KTK\",\n            \"expansion\": \"Khans of Tarkir\",\n            \"emid\": \"94243\",\n            \"watchlist_id\": \"3586\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ktk.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/94243.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/94243.jpg\",\n            \"gain\": \"3\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/KTK/flooded-strand/\",\n            \"echo_url\": \"https://www.echomtg.com/card/94243/flooded-strand/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">3%</span>\"\n        },\n        {\n            \"tcg_low\": \"62.07\",\n            \"tcg_mid\": \"74.44\",\n            \"price\": \"74.44\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Bloodstained+Mire&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1049.99\",\n            \"price_change\": \"0\",\n            \"mc\": null,\n            \"main_type\": \"Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Bloodstained Mire\",\n            \"mid\": \"39505\",\n            \"t\": \"Land\",\n            \"set\": \"Onslaught\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"ONS\",\n            \"expansion\": \"Onslaught\",\n            \"emid\": \"8187\",\n            \"watchlist_id\": \"3585\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ons.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/8187.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/8187.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ONS/bloodstained-mire/\",\n            \"echo_url\": \"https://www.echomtg.com/card/8187/bloodstained-mire/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"71.72\",\n            \"tcg_mid\": \"85.84\",\n            \"price\": \"85.84\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Flooded+Strand&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"975.25\",\n            \"price_change\": \"1\",\n            \"mc\": null,\n            \"main_type\": \"Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Flooded Strand\",\n            \"mid\": \"39503\",\n            \"t\": \"Land\",\n            \"set\": \"Onslaught\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"ONS\",\n            \"expansion\": \"Onslaught\",\n            \"emid\": \"8185\",\n            \"watchlist_id\": \"3584\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ons.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/8185.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/8185.jpg\",\n            \"gain\": \"1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ONS/flooded-strand/\",\n            \"echo_url\": \"https://www.echomtg.com/card/8185/flooded-strand/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">1%</span>\"\n        },\n        {\n            \"tcg_low\": \"76\",\n            \"tcg_mid\": \"93.17\",\n            \"price\": \"93.17\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Polluted+Delta&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"1800\",\n            \"price_change\": \"-1\",\n            \"mc\": null,\n            \"main_type\": \"Land\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Polluted Delta\",\n            \"mid\": \"39504\",\n            \"t\": \"Land\",\n            \"set\": \"Onslaught\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Land\",\n            \"set_code\": \"ONS\",\n            \"expansion\": \"Onslaught\",\n            \"emid\": \"8186\",\n            \"watchlist_id\": \"3583\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ons.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/8186.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/8186.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ONS/polluted-delta/\",\n            \"echo_url\": \"https://www.echomtg.com/card/8186/polluted-delta/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        },\n        {\n            \"tcg_low\": \"7.25\",\n            \"tcg_mid\": \"11.86\",\n            \"price\": \"11.86\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Talisman+of+Progress&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"44.93\",\n            \"price_change\": \"-3\",\n            \"mc\": \"{{2}}\",\n            \"main_type\": \"Artifact\",\n            \"colors\": \"Colorless\",\n            \"name\": \"Talisman of Progress\",\n            \"mid\": \"39597\",\n            \"t\": \"Artifact\",\n            \"set\": \"Mirrodin\",\n            \"rarity\": \"Uncommon\",\n            \"types\": \"Artifact\",\n            \"set_code\": \"MRD\",\n            \"expansion\": \"Mirrodin\",\n            \"emid\": \"8223\",\n            \"watchlist_id\": \"3559\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/mrd.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/8223.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/8223.jpg\",\n            \"gain\": \"-3\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/MRD/talisman-of-progress/\",\n            \"echo_url\": \"https://www.echomtg.com/card/8223/talisman-of-progress/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-3%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.05\",\n            \"tcg_mid\": \"0.39\",\n            \"price\": \"0.39\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Dimensional+Infiltrator&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"0.42\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{u}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Blue\",\n            \"name\": \"Dimensional Infiltrator\",\n            \"mid\": \"407554\",\n            \"t\": \"Creature\",\n            \"set\": \"Oath of the Gatewatch\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Eldrazi\",\n            \"set_code\": \"OGW\",\n            \"expansion\": \"Oath of the Gatewatch\",\n            \"emid\": \"97739\",\n            \"watchlist_id\": \"3410\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ogw.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/97739.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/97739.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/OGW/dimensional-infiltrator/\",\n            \"echo_url\": \"https://www.echomtg.com/card/97739/dimensional-infiltrator/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"0.2\",\n            \"tcg_mid\": \"0.59\",\n            \"price\": \"0.59\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Abbot+of+Keral+Keep&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"2\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{r}}\",\n            \"main_type\": \"Creature \",\n            \"colors\": \"Red\",\n            \"name\": \"Abbot of Keral Keep\",\n            \"mid\": \"398411\",\n            \"t\": \"Creature\",\n            \"set\": \"Magic Origins\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Human Monk\",\n            \"set_code\": \"ORI\",\n            \"expansion\": \"Magic Origins\",\n            \"emid\": \"96623\",\n            \"watchlist_id\": \"2071\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ori.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/96623.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/96623.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ORI/abbot-of-keral-keep/\",\n            \"echo_url\": \"https://www.echomtg.com/card/96623/abbot-of-keral-keep/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"1.49\",\n            \"tcg_mid\": \"3.7\",\n            \"price\": \"3.70\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Soulfire+Grand+Master&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"10.19\",\n            \"price_change\": \"-2\",\n            \"mc\": \"{{1}}{{W}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"White\",\n            \"name\": \"Soulfire Grand Master\",\n            \"mid\": \"391927\",\n            \"t\": \"Creature\",\n            \"set\": \"Fate Reforged\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Creature- Human Monk\",\n            \"set_code\": \"FRF\",\n            \"expansion\": \"Fate Reforged\",\n            \"emid\": \"95853\",\n            \"watchlist_id\": \"1900\",\n            \"threshold\": \"10\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/frf.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/95853.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/95853.jpg\",\n            \"gain\": \"-2\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/FRF/soulfire-grand-master/\",\n            \"echo_url\": \"https://www.echomtg.com/card/95853/soulfire-grand-master/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-2%</span>\"\n        },\n        {\n            \"tcg_low\": \"0.44\",\n            \"tcg_mid\": \"1.14\",\n            \"price\": \"1.14\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Serum+Visions&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"7.73\",\n            \"price_change\": \"7\",\n            \"mc\": \"{{u}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Blue\",\n            \"name\": \"Serum Visions\",\n            \"mid\": \"50145\",\n            \"t\": \"Sorcery\",\n            \"set\": \"Fifth Dawn\",\n            \"rarity\": \"Common\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"5DN\",\n            \"expansion\": \"Fifth Dawn\",\n            \"emid\": \"9523\",\n            \"watchlist_id\": \"973\",\n            \"threshold\": \"5\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/5dn.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/9523.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/9523.jpg\",\n            \"gain\": \"7\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/5DN/serum-visions/\",\n            \"echo_url\": \"https://www.echomtg.com/card/9523/serum-visions/\",\n            \"percentage_html\": \"<span class=\\\"percentage green up\\\">7%</span>\"\n        },\n        {\n            \"tcg_low\": \"3.49\",\n            \"tcg_mid\": \"4.99\",\n            \"price\": \"4.99\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Ashiok%2C+Nightmare+Weaver&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"19.89\",\n            \"price_change\": \"0\",\n            \"mc\": \"{{1}}{{u}}{{b}}\",\n            \"main_type\": \"Planeswalker - Ashiok\",\n            \"colors\": \"Blue, Black\",\n            \"name\": \"Ashiok, Nightmare Weaver\",\n            \"mid\": \"373500\",\n            \"t\": \"Planeswalker\",\n            \"set\": \"Theros\",\n            \"rarity\": \"Mythic Rare\",\n            \"types\": \"Planeswalker - Ashiok\",\n            \"set_code\": \"THS\",\n            \"expansion\": \"Theros\",\n            \"emid\": \"92665\",\n            \"watchlist_id\": \"763\",\n            \"threshold\": \"5\",\n            \"foil\": \"1\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/ths.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/92665.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/92665.jpg\",\n            \"gain\": \"0\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/THS/ashiok-nightmare-weaver/\",\n            \"echo_url\": \"https://www.echomtg.com/card/92665/ashiok-nightmare-weaver/\",\n            \"percentage_html\": \"<span class=\\\"percentage na\\\">--</span>\"\n        },\n        {\n            \"tcg_low\": \"2.99\",\n            \"tcg_mid\": \"4.99\",\n            \"price\": \"4.99\",\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Goblin+Guide&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": \"15.37\",\n            \"price_change\": \"-1\",\n            \"mc\": \"{{r}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"Red\",\n            \"name\": \"Goblin Guide\",\n            \"mid\": \"170987\",\n            \"t\": \"Creature\",\n            \"set\": \"Zendikar\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Goblin Scout\",\n            \"set_code\": \"ZEN\",\n            \"expansion\": \"Zendikar\",\n            \"emid\": \"49491\",\n            \"watchlist_id\": \"7\",\n            \"threshold\": \"5\",\n            \"foil\": \"0\",\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/zen.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/49491.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/49491.jpg\",\n            \"gain\": \"-1\",\n            \"echo_set_url\": \"https://www.echomtg.com/set/ZEN/goblin-guide/\",\n            \"echo_url\": \"https://www.echomtg.com/card/49491/goblin-guide/\",\n            \"percentage_html\": \"<span class=\\\"percentage red down\\\">-1%</span>\"\n        }\n    ],\n    \"status\": \"success\"\n}"
						}
					]
				}
			],
			"description": "Track item price movement in a watchlist."
		},
		{
			"name": "Earnings",
			"item": [
				{
					"name": "Earnings: Get List View",
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
							"raw": "https://www.echomtg.com/api/earnings/view/?start=0&limit=200&direction=DESC&sort=date_sold&search=",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"view",
								""
							],
							"query": [
								{
									"key": "start",
									"value": "0"
								},
								{
									"key": "limit",
									"value": "200"
								},
								{
									"key": "direction",
									"value": "DESC"
								},
								{
									"key": "sort",
									"value": "date_sold"
								},
								{
									"key": "search",
									"value": ""
								}
							]
						},
						"description": "Access the users earning data."
					},
					"response": [
						{
							"name": "Earnings: get view",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://dev.echomtg.com/api/earnings/view/?start=0&limit=200&direction=DESC&sort=date_sold&search=",
									"protocol": "https",
									"host": [
										"dev",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"earnings",
										"view",
										""
									],
									"query": [
										{
											"key": "start",
											"value": "0"
										},
										{
											"key": "limit",
											"value": "200"
										},
										{
											"key": "direction",
											"value": "DESC"
										},
										{
											"key": "sort",
											"value": "date_sold"
										},
										{
											"key": "search",
											"value": ""
										}
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "content-type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "x-powered-by",
									"value": "PHP/8.1.11"
								},
								{
									"key": "expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "cache-control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "pragma",
									"value": "no-cache"
								},
								{
									"key": "access-control-allow-origin",
									"value": "*"
								},
								{
									"key": "access-control-allow-headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "access-control-allow-methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "access-control-allow-credentials",
									"value": "true"
								},
								{
									"key": "Content-Encoding",
									"value": "gzip"
								},
								{
									"key": "Date",
									"value": "Sat, 31 Dec 2022 22:54:32 GMT"
								},
								{
									"key": "Server",
									"value": "Google Frontend"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Earnings Accessed.\",\n    \"earnings\": [\n        {\n            \"tcg_low\": 5.99,\n            \"tcg_mid\": 7.11,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Commander+Legends+-+Draft+Booster+Pack&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": -1,\n            \"mc\": null,\n            \"main_type\": null,\n            \"colors\": null,\n            \"name\": \"Commander Legends - Draft Booster Pack\",\n            \"mid\": 100078301,\n            \"t\": null,\n            \"set\": \"Sealed Product - Booster Packs\",\n            \"rarity\": \"sealed\",\n            \"types\": null,\n            \"set_code\": \"PACK\",\n            \"expansion\": \"Sealed Product - Booster Packs\",\n            \"emid\": 123799,\n            \"earnings_id\": 296476,\n            \"date_sold\": \"8/30/2022\",\n            \"date_sold_html\": \"2022-08-30\",\n            \"foil\": 0,\n            \"price\": 6.76,\n            \"price_acquired\": 6.33,\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/pack.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/123799.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/123799.jpg\",\n            \"gain\": 6.79,\n            \"echo_set_url\": \"https://www.echomtg.com/set/PACK/commander-legends--draft-booster-pack/\",\n            \"echo_url\": \"https://www.echomtg.com/card/123799/commander-legends--draft-booster-pack/\"\n        },\n        {\n            \"tcg_low\": 1.24,\n            \"tcg_mid\": 1.93,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Drain+Life&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": null,\n            \"price_change\": 0,\n            \"mc\": \"{{x}}{{1}}{{b}}\",\n            \"main_type\": \"Sorcery\",\n            \"colors\": \"Black\",\n            \"name\": \"Drain Life\",\n            \"mid\": 658,\n            \"t\": \"Sorcery\",\n            \"set\": \"Unlimited Edition\",\n            \"rarity\": \"Common\",\n            \"types\": \"Sorcery\",\n            \"set_code\": \"2ED\",\n            \"expansion\": \"Unlimited Edition\",\n            \"emid\": 38,\n            \"earnings_id\": 196087,\n            \"date_sold\": \"5/10/2021\",\n            \"date_sold_html\": \"2021-05-10\",\n            \"foil\": 127,\n            \"price\": 0,\n            \"price_acquired\": 2.2,\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/2ed.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/38.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/38.jpg\",\n            \"gain\": -100,\n            \"echo_set_url\": \"https://www.echomtg.com/set/2ED/drain-life/\",\n            \"echo_url\": \"https://www.echomtg.com/card/38/drain-life/\"\n        },\n        {\n            \"tcg_low\": 0.2,\n            \"tcg_mid\": 0.49,\n            \"purchase_link\": \"https://shop.tcgplayer.com/magic/product/show?advancedSearch=true&ProductName=Echo+Mage&partner=ECHOMAGE&utm_campaign=affiliate&utm_medium=echomtg-com&utm_source=ECHOMAGE\",\n            \"foil_price\": 3.84,\n            \"price_change\": 0,\n            \"mc\": \"{{1}}{{u}}{{u}}\",\n            \"main_type\": \"Creature\",\n            \"colors\": \"Blue\",\n            \"name\": \"Echo Mage\",\n            \"mid\": 198163,\n            \"t\": \"Creature\",\n            \"set\": \"Rise of the Eldrazi\",\n            \"rarity\": \"Rare\",\n            \"types\": \"Creature - Human Wizard\",\n            \"set_code\": \"ROE\",\n            \"expansion\": \"Rise of the Eldrazi\",\n            \"emid\": 64502,\n            \"earnings_id\": 136577,\n            \"date_sold\": \"9/05/2020\",\n            \"date_sold_html\": \"2020-09-05\",\n            \"foil\": 0,\n            \"price\": 0.49,\n            \"price_acquired\": 0.5,\n            \"set_image\": \"https://assets.echomtg.com/magic/symbols/expansions/roe.png\",\n            \"image_cropped\": \"https://assets.echomtg.com/magic/cards/cropped/64502.hq.jpg\",\n            \"image\": \"https://assets.echomtg.com/magic/cards/original/64502.jpg\",\n            \"gain\": -2,\n            \"echo_set_url\": \"https://www.echomtg.com/set/ROE/echo-mage/\",\n            \"echo_url\": \"https://www.echomtg.com/card/64502/echo-mage/\"\n        },\n        \n    ],\n    \"meta\": {\n        \"total_cards\": 89,\n        \"total_foil\": 395,\n        \"acquired_value\": 588.16,\n        \"sold_value\": 1852.50,\n        \"total_mythics\": 13,\n        \"total_rares\": 50,\n        \"total_uncommon\": 21,\n        \"total_common\": 2,\n        \"profit\": \"1,264.34\",\n        \"change_value\": \"214.97\",\n        \"start\": 0,\n        \"limit\": 200,\n        \"total_results\": 89,\n        \"sort\": \"e.date_sold\",\n        \"direction\": \"DESC\"\n    },\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Earnings: Statistics",
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
							"raw": "https://www.echomtg.com/api/earnings/stats/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"stats",
								""
							]
						}
					},
					"response": [
						{
							"name": "Earnings: Statistics",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://dev.echomtg.com/api/earnings/stats/",
									"protocol": "https",
									"host": [
										"dev",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"earnings",
										"stats",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "content-type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "x-powered-by",
									"value": "PHP/8.1.11"
								},
								{
									"key": "expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "cache-control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "pragma",
									"value": "no-cache"
								},
								{
									"key": "access-control-allow-origin",
									"value": "*"
								},
								{
									"key": "access-control-allow-headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "access-control-allow-methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "access-control-allow-credentials",
									"value": "true"
								},
								{
									"key": "Content-Encoding",
									"value": "gzip"
								},
								{
									"key": "Date",
									"value": "Sun, 01 Jan 2023 14:04:04 GMT"
								},
								{
									"key": "Server",
									"value": "Google Frontend"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Earning Stats calculated.\",\n    \"stats\": {\n        \"sold_value\": 1852.5000000000007,\n        \"acquired_value\": 588.1600000000007,\n        \"total_cards\": 89,\n        \"difference\": \"1,264.34\",\n        \"gainLoss\": 214.97,\n        \"mythics\": 13,\n        \"rares\": 50,\n        \"uncommons\": 21,\n        \"commons\": 2,\n        \"foils\": 395\n    },\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Earnings: Update Sold Price",
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
							"raw": "{\n    \"id\": 296476,\n    \"value\": 7.33\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/earnings/adjust_sold/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"adjust_sold",
								""
							]
						}
					},
					"response": [
						{
							"name": "Earnings: Update Sold Price",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": 296476,\n    \"value\": 7.33\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/earnings/adjust_sold/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"earnings",
										"adjust_sold",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "content-type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "x-powered-by",
									"value": "PHP/8.1.11"
								},
								{
									"key": "expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "cache-control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "pragma",
									"value": "no-cache"
								},
								{
									"key": "access-control-allow-origin",
									"value": "*"
								},
								{
									"key": "access-control-allow-headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "access-control-allow-methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "access-control-allow-credentials",
									"value": "true"
								},
								{
									"key": "Content-Encoding",
									"value": "gzip"
								},
								{
									"key": "Date",
									"value": "Sun, 01 Jan 2023 22:24:28 GMT"
								},
								{
									"key": "Server",
									"value": "Google Frontend"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Card sold price updated to 7.33 USD\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Earnings: Update Acquired Price",
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
							"raw": "{\n    \"id\": 296476,\n    \"value\": 7.33\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/earnings/adjust_acquired/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"adjust_acquired",
								""
							]
						}
					},
					"response": [
						{
							"name": "Earnings: Update Acquired Price",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": 296476,\n    \"value\": 7.33\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/earnings/adjust_acquired/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"earnings",
										"adjust_acquired",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "content-type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "x-powered-by",
									"value": "PHP/8.1.11"
								},
								{
									"key": "expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "cache-control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "pragma",
									"value": "no-cache"
								},
								{
									"key": "access-control-allow-origin",
									"value": "*"
								},
								{
									"key": "access-control-allow-headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "access-control-allow-methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "access-control-allow-credentials",
									"value": "true"
								},
								{
									"key": "Content-Encoding",
									"value": "gzip"
								},
								{
									"key": "Date",
									"value": "Sun, 01 Jan 2023 22:24:28 GMT"
								},
								{
									"key": "Server",
									"value": "Google Frontend"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Card acquired price updated to 7.33 USD\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Earnings: Update Sold Date",
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
							"raw": "{\n    \"id\": 296476,\n    \"value\": \"2012-08-30\"\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/earnings/adjust_date/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"adjust_date",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "Earnings: Delete Entry",
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
							"raw": "{\n    \"id\": 296476\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/earnings/remove/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"earnings",
								"remove",
								""
							]
						}
					},
					"response": [
						{
							"name": "Earnings: Delete Entry",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\n    \"id\": 296476\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/earnings/remove/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"earnings",
										"remove",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "content-type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "x-powered-by",
									"value": "PHP/8.1.11"
								},
								{
									"key": "expires",
									"value": "Thu, 19 Nov 1981 08:52:00 GMT"
								},
								{
									"key": "cache-control",
									"value": "no-store, no-cache, must-revalidate"
								},
								{
									"key": "pragma",
									"value": "no-cache"
								},
								{
									"key": "access-control-allow-origin",
									"value": "*"
								},
								{
									"key": "access-control-allow-headers",
									"value": "Authorization, Origin, X-Requested-With, Content-Type, Accept"
								},
								{
									"key": "access-control-allow-methods",
									"value": "GET, POST, PUT, DELETE, OPTIONS"
								},
								{
									"key": "access-control-allow-credentials",
									"value": "true"
								},
								{
									"key": "Content-Encoding",
									"value": "gzip"
								},
								{
									"key": "Date",
									"value": "Sun, 01 Jan 2023 22:30:46 GMT"
								},
								{
									"key": "Server",
									"value": "Google Frontend"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Card removed from earnings.\",\n    \"status\": \"success\"\n}"
						}
					]
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
			"name": "Billing",
			"item": [
				{
					"name": "Billing: Get Cards",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "https://www.echomtg.com/api/billing/get_cards/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"get_cards",
								""
							]
						},
						"description": "Get cards on file for the user using the Stripe API. Iterate through the cards data object to get `id` s which are used in set default and delete card endpoints."
					},
					"response": [
						{
							"name": "Billing: Get Cards",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/billing/get_cards/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"get_cards",
										""
									]
								}
							},
							"_postman_previewlanguage": "json",
							"header": null,
							"cookie": [],
							"body": "{\n    \"message\": \"Card Added\",\n    \"status\": \"success\",\n    \"cards\": [\n        {\n            \"id\": \"card_1AmpblJ7PTISwI9vgu5I2NHQ\",\n            \"object\": \"payment_method\",\n            \"billing_details\": {\n                \"address\": {\n                    \"city\": null,\n                    \"country\": null,\n                    \"line1\": null,\n                    \"line2\": null,\n                    \"postal_code\": null,\n                    \"state\": null\n                },\n                \"email\": null,\n                \"name\": null,\n                \"phone\": null\n            },\n            \"card\": {\n                \"brand\": \"visa\",\n                \"checks\": {\n                    \"address_line1_check\": null,\n                    \"address_postal_code_check\": null,\n                    \"cvc_check\": \"pass\"\n                },\n                \"country\": \"US\",\n                \"exp_month\": 2,\n                \"exp_year\": 2023,\n                \"fingerprint\": \"BiHdU4oBTMxXhriO\",\n                \"funding\": \"credit\",\n                \"generated_from\": null,\n                \"last4\": \"4242\",\n                \"networks\": {\n                    \"available\": [\n                        \"visa\"\n                    ],\n                    \"preferred\": null\n                },\n                \"three_d_secure_usage\": {\n                    \"supported\": true\n                },\n                \"wallet\": null\n            },\n            \"created\": 1501790869,\n            \"customer\": \"cus_B97rP5lMMUayVf\",\n            \"livemode\": false,\n            \"metadata\": [],\n            \"type\": \"card\"\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Billing: Show Payments",
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
							"raw": "https://www.echomtg.com/api/billing/payments/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"payments",
								""
							]
						},
						"description": "Get cards on file for the user using the Stripe API. Iterate through the cards data object to get `id` s which are used in set default and delete card endpoints."
					},
					"response": [
						{
							"name": "Billing: Show Payments",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/billing/payments/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"payments",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Server",
									"value": "nginx"
								},
								{
									"key": "Date",
									"value": "Sun, 18 Dec 2022 03:05:44 GMT"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "X-Powered-By",
									"value": "PHP/8.1.11"
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
									"key": "Content-Encoding",
									"value": "gzip"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Invoices Received\",\n    \"status\": \"success\",\n    \"invoices\": [\n        {\n            \"id\": \"ch_3M1WOPJ7eeeee0KSDMFiB\",\n            \"object\": \"charge\",\n            \"amount\": 131,\n            \"amount_captured\": 0,\n            \"amount_refunded\": 0,\n            \"application\": null,\n            \"application_fee\": null,\n            \"application_fee_amount\": null,\n            \"balance_transaction\": null,\n            \"billing_details\": {\n                \"address\": {\n                    \"city\": null,\n                    \"country\": null,\n                    \"line1\": null,\n                    \"line2\": null,\n                    \"postal_code\": null,\n                    \"state\": null\n                },\n                \"email\": null,\n                \"name\": \"email@gmail.com\",\n                \"phone\": null\n            },\n            \"calculated_statement_descriptor\": \"ECHOMTG MYTHIC\",\n            \"captured\": false,\n            \"card\": {\n                \"id\": \"card_14je9LJ7PdddddaEuw6V4\",\n                \"object\": \"card\",\n                \"address_city\": null,\n                \"address_country\": null,\n                \"address_line1\": null,\n                \"address_line1_check\": null,\n                \"address_line2\": null,\n                \"address_state\": null,\n                \"address_zip\": null,\n                \"address_zip_check\": null,\n                \"brand\": \"Visa\",\n                \"country\": \"US\",\n                \"customer\": \"cus_4teeeetHLDu6\",\n                \"cvc_check\": null,\n                \"dynamic_last4\": null,\n                \"exp_month\": 7,\n                \"exp_year\": 2017,\n                \"fingerprint\": \"BiHdUwwwwMxXhriO\",\n                \"funding\": \"credit\",\n                \"last4\": \"4242\",\n                \"metadata\": [],\n                \"name\": \"email@gmail.com\",\n                \"tokenization_method\": null\n            },\n            \"created\": 1669041806,\n            \"currency\": \"usd\",\n            \"customer\": \"cus_4tR1ddddHLDu6\",\n            \"description\": \"Invoice 48A2F61-0117\",\n            \"destination\": null,\n            \"dispute\": null,\n            \"disputed\": false,\n            \"failure_balance_transaction\": null,\n            \"failure_code\": \"expired_card\",\n            \"failure_message\": \"Your card has expired.\",\n            \"fraud_details\": [],\n            \"invoice\": \"in_1M1VP0J7PeeeewnkShmL\",\n            \"livemode\": false,\n            \"metadata\": [],\n            \"on_behalf_of\": null,\n            \"order\": null,\n            \"outcome\": {\n                \"network_status\": \"declined_by_network\",\n                \"reason\": \"expired_card\",\n                \"risk_level\": \"normal\",\n                \"risk_score\": 27,\n                \"seller_message\": \"The bank returned the decline code `expired_card`.\",\n                \"type\": \"issuer_declined\"\n            },\n            \"paid\": false,\n            \"payment_intent\": \"pi_3M1WOPJ7PTISwI9v0cX4A1TS\",\n            \"payment_method\": \"card_14je9LJeeeee9vqaEuw6V4\",\n            \"payment_method_details\": {\n                \"card\": {\n                    \"brand\": \"visa\",\n                    \"checks\": {\n                        \"address_line1_check\": null,\n                        \"address_postal_code_check\": null,\n                        \"cvc_check\": null\n                    },\n                    \"country\": \"US\",\n                    \"exp_month\": 7,\n                    \"exp_year\": 2017,\n                    \"fingerprint\": \"BiHdUeeexXhriO\",\n                    \"funding\": \"credit\",\n                    \"installments\": null,\n                    \"last4\": \"4242\",\n                    \"mandate\": null,\n                    \"network\": \"visa\",\n                    \"three_d_secure\": null,\n                    \"wallet\": null\n                },\n                \"type\": \"card\"\n            },\n            \"receipt_email\": \"email@gmail.com\",\n            \"receipt_number\": null,\n            \"receipt_url\": null,\n            \"refunded\": false,\n            \"refunds\": {\n                \"object\": \"list\",\n                \"data\": [],\n                \"has_more\": false,\n                \"total_count\": 0,\n                \"url\": \"/v1/charges/ch_3M1WOPJ7PTISwI9v0KSDMFiB/refunds\"\n            },\n            \"review\": null,\n            \"shipping\": null,\n            \"source\": {\n                \"id\": \"card_14je9LJ7PTISwI9vqaEuw6V4\",\n                \"object\": \"card\",\n                \"address_city\": null,\n                \"address_country\": null,\n                \"address_line1\": null,\n                \"address_line1_check\": null,\n                \"address_line2\": null,\n                \"address_state\": null,\n                \"address_zip\": null,\n                \"address_zip_check\": null,\n                \"brand\": \"Visa\",\n                \"country\": \"US\",\n                \"customer\": \"cus_4tR1stCFtHLDu6\",\n                \"cvc_check\": null,\n                \"dynamic_last4\": null,\n                \"exp_month\": 7,\n                \"exp_year\": 2017,\n                \"fingerprint\": \"BiHdU4oBTMxXhriO\",\n                \"funding\": \"credit\",\n                \"last4\": \"4242\",\n                \"metadata\": [],\n                \"name\": \"apuzzo@gmail.com\",\n                \"tokenization_method\": null\n            },\n            \"source_transfer\": null,\n            \"statement_description\": \"EchoMTG Mythic\",\n            \"statement_descriptor\": \"EchoMTG Mythic\",\n            \"statement_descriptor_suffix\": null,\n            \"status\": \"failed\",\n            \"transfer_data\": null,\n            \"transfer_group\": null\n        }=\n    ]\n}"
						}
					]
				},
				{
					"name": "Billing: Show Subscriptions",
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
							"raw": "https://www.echomtg.com/api/billing/subscriptions/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"subscriptions",
								""
							]
						},
						"description": "Get cards on file for the user using the Stripe API. Iterate through the cards data object to get `id` s which are used in set default and delete card endpoints."
					},
					"response": [
						{
							"name": "Billing: Show Subscriptions",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/billing/subscriptions/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"subscriptions",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Server",
									"value": "nginx"
								},
								{
									"key": "Date",
									"value": "Sun, 18 Dec 2022 14:48:23 GMT"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "X-Powered-By",
									"value": "PHP/8.1.11"
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
									"key": "Content-Encoding",
									"value": "gzip"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Subscriptions Received\",\n    \"status\": \"success\",\n    \"subscriptions\": [\n        {\n            \"id\": \"sub_4tR1Yeeeeee5L\",\n            \"object\": \"subscription\",\n            \"application\": null,\n            \"application_fee_percent\": null,\n            \"automatic_tax\": {\n                \"enabled\": false\n            },\n            \"billing\": \"charge_automatically\",\n            \"billing_cycle_anchor\": 1469557744,\n            \"billing_thresholds\": null,\n            \"cancel_at\": null,\n            \"cancel_at_period_end\": false,\n            \"canceled_at\": null,\n            \"collection_method\": \"charge_automatically\",\n            \"created\": 1412373827,\n            \"currency\": \"usd\",\n            \"current_period_end\": 1672079344,\n            \"current_period_start\": 1669487344,\n            \"customer\": \"cus_4tR1seeeeHLDu6\",\n            \"days_until_due\": null,\n            \"default_payment_method\": null,\n            \"default_source\": null,\n            \"default_tax_rates\": [],\n            \"description\": null,\n            \"discount\": null,\n            \"ended_at\": null,\n            \"invoice_customer_balance_settings\": {\n                \"consume_applied_balance_on_void\": true\n            },\n            \"items\": {\n                \"object\": \"list\",\n                \"data\": [\n                    {\n                        \"id\": \"si_18SoMAJ7PTISwI9vpBrTP6SA\",\n                        \"object\": \"subscription_item\",\n                        \"billing_thresholds\": null,\n                        \"created\": 1412373827,\n                        \"metadata\": [],\n                        \"plan\": {\n                            \"id\": \"rare\",\n                            \"object\": \"plan\",\n                            \"active\": true,\n                            \"aggregate_usage\": null,\n                            \"amount\": 299,\n                            \"amount_decimal\": \"299\",\n                            \"billing_scheme\": \"per_unit\",\n                            \"created\": 1412037694,\n                            \"currency\": \"usd\",\n                            \"interval\": \"month\",\n                            \"interval_count\": 1,\n                            \"livemode\": false,\n                            \"metadata\": [],\n                            \"name\": \"Rare\",\n                            \"nickname\": null,\n                            \"product\": \"prod_BVEq66c8So6QEi\",\n                            \"statement_description\": \"EchoMTG Rare\",\n                            \"statement_descriptor\": \"EchoMTG Rare\",\n                            \"tiers\": null,\n                            \"tiers_mode\": null,\n                            \"transform_usage\": null,\n                            \"trial_period_days\": null,\n                            \"usage_type\": \"licensed\"\n                        },\n                        \"price\": {\n                            \"id\": \"rare\",\n                            \"object\": \"price\",\n                            \"active\": true,\n                            \"billing_scheme\": \"per_unit\",\n                            \"created\": 1412037694,\n                            \"currency\": \"usd\",\n                            \"custom_unit_amount\": null,\n                            \"livemode\": false,\n                            \"lookup_key\": null,\n                            \"metadata\": [],\n                            \"nickname\": null,\n                            \"product\": \"prod_BVEq66c8So6QEi\",\n                            \"recurring\": {\n                                \"aggregate_usage\": null,\n                                \"interval\": \"month\",\n                                \"interval_count\": 1,\n                                \"trial_period_days\": null,\n                                \"usage_type\": \"licensed\"\n                            },\n                            \"tax_behavior\": \"unspecified\",\n                            \"tiers_mode\": null,\n                            \"transform_quantity\": null,\n                            \"type\": \"recurring\",\n                            \"unit_amount\": 299,\n                            \"unit_amount_decimal\": \"299\"\n                        },\n                        \"quantity\": 1,\n                        \"subscription\": \"sub_4tR1Y3aHRk3b5L\",\n                        \"tax_rates\": []\n                    }\n                ],\n                \"has_more\": false,\n                \"total_count\": 1,\n                \"url\": \"/v1/subscription_items?subscription=sub_4tR1Y3aHRk3b5L\"\n            },\n            \"latest_invoice\": \"in_1M8TASJ7PTISwI9vmwg1Isyh\",\n            \"livemode\": false,\n            \"metadata\": [],\n            \"next_pending_invoice_item_invoice\": null,\n            \"on_behalf_of\": null,\n            \"pause_collection\": null,\n            \"payment_settings\": {\n                \"payment_method_options\": null,\n                \"payment_method_types\": null,\n                \"save_default_payment_method\": null\n            },\n            \"pending_invoice_item_interval\": null,\n            \"pending_setup_intent\": null,\n            \"pending_update\": null,\n            \"plan\": {\n                \"id\": \"rare\",\n                \"object\": \"plan\",\n                \"active\": true,\n                \"aggregate_usage\": null,\n                \"amount\": 299,\n                \"amount_decimal\": \"299\",\n                \"billing_scheme\": \"per_unit\",\n                \"created\": 1412037694,\n                \"currency\": \"usd\",\n                \"interval\": \"month\",\n                \"interval_count\": 1,\n                \"livemode\": false,\n                \"metadata\": [],\n                \"name\": \"Rare\",\n                \"nickname\": null,\n                \"product\": \"prod_BVEq66c8So6QEi\",\n                \"statement_description\": \"EchoMTG Rare\",\n                \"statement_descriptor\": \"EchoMTG Rare\",\n                \"tiers\": null,\n                \"tiers_mode\": null,\n                \"transform_usage\": null,\n                \"trial_period_days\": null,\n                \"usage_type\": \"licensed\"\n            },\n            \"quantity\": 1,\n            \"schedule\": null,\n            \"start\": 1545353794,\n            \"start_date\": 1412373827,\n            \"status\": \"unpaid\",\n            \"tax_percent\": null,\n            \"test_clock\": null,\n            \"transfer_data\": null,\n            \"trial_end\": null,\n            \"trial_start\": null\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Billing: Customer",
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
							"raw": "http://localhost/api/billing/customer/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"path": [
								"api",
								"billing",
								"customer",
								""
							]
						},
						"description": "Get cards on file for the user using the Stripe API. Iterate through the cards data object to get `id` s which are used in set default and delete card endpoints."
					},
					"response": [
						{
							"name": "Billing: Show Subscriptions",
							"originalRequest": {
								"method": "GET",
								"header": [],
								"url": {
									"raw": "https://www.echomtg.com/api/billing/subscriptions/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"subscriptions",
										""
									]
								}
							},
							"status": "OK",
							"code": 200,
							"_postman_previewlanguage": "json",
							"header": [
								{
									"key": "Server",
									"value": "nginx"
								},
								{
									"key": "Date",
									"value": "Sun, 18 Dec 2022 14:48:23 GMT"
								},
								{
									"key": "Content-Type",
									"value": "application/json; charset=UTF-8"
								},
								{
									"key": "Transfer-Encoding",
									"value": "chunked"
								},
								{
									"key": "Connection",
									"value": "keep-alive"
								},
								{
									"key": "Vary",
									"value": "Accept-Encoding"
								},
								{
									"key": "X-Powered-By",
									"value": "PHP/8.1.11"
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
									"key": "Content-Encoding",
									"value": "gzip"
								}
							],
							"cookie": [],
							"body": "{\n    \"message\": \"Subscriptions Received\",\n    \"status\": \"success\",\n    \"subscriptions\": [\n        {\n            \"id\": \"sub_4tR1Yeeeeee5L\",\n            \"object\": \"subscription\",\n            \"application\": null,\n            \"application_fee_percent\": null,\n            \"automatic_tax\": {\n                \"enabled\": false\n            },\n            \"billing\": \"charge_automatically\",\n            \"billing_cycle_anchor\": 1469557744,\n            \"billing_thresholds\": null,\n            \"cancel_at\": null,\n            \"cancel_at_period_end\": false,\n            \"canceled_at\": null,\n            \"collection_method\": \"charge_automatically\",\n            \"created\": 1412373827,\n            \"currency\": \"usd\",\n            \"current_period_end\": 1672079344,\n            \"current_period_start\": 1669487344,\n            \"customer\": \"cus_4tR1seeeeHLDu6\",\n            \"days_until_due\": null,\n            \"default_payment_method\": null,\n            \"default_source\": null,\n            \"default_tax_rates\": [],\n            \"description\": null,\n            \"discount\": null,\n            \"ended_at\": null,\n            \"invoice_customer_balance_settings\": {\n                \"consume_applied_balance_on_void\": true\n            },\n            \"items\": {\n                \"object\": \"list\",\n                \"data\": [\n                    {\n                        \"id\": \"si_18SoMAJ7PTISwI9vpBrTP6SA\",\n                        \"object\": \"subscription_item\",\n                        \"billing_thresholds\": null,\n                        \"created\": 1412373827,\n                        \"metadata\": [],\n                        \"plan\": {\n                            \"id\": \"rare\",\n                            \"object\": \"plan\",\n                            \"active\": true,\n                            \"aggregate_usage\": null,\n                            \"amount\": 299,\n                            \"amount_decimal\": \"299\",\n                            \"billing_scheme\": \"per_unit\",\n                            \"created\": 1412037694,\n                            \"currency\": \"usd\",\n                            \"interval\": \"month\",\n                            \"interval_count\": 1,\n                            \"livemode\": false,\n                            \"metadata\": [],\n                            \"name\": \"Rare\",\n                            \"nickname\": null,\n                            \"product\": \"prod_BVEq66c8So6QEi\",\n                            \"statement_description\": \"EchoMTG Rare\",\n                            \"statement_descriptor\": \"EchoMTG Rare\",\n                            \"tiers\": null,\n                            \"tiers_mode\": null,\n                            \"transform_usage\": null,\n                            \"trial_period_days\": null,\n                            \"usage_type\": \"licensed\"\n                        },\n                        \"price\": {\n                            \"id\": \"rare\",\n                            \"object\": \"price\",\n                            \"active\": true,\n                            \"billing_scheme\": \"per_unit\",\n                            \"created\": 1412037694,\n                            \"currency\": \"usd\",\n                            \"custom_unit_amount\": null,\n                            \"livemode\": false,\n                            \"lookup_key\": null,\n                            \"metadata\": [],\n                            \"nickname\": null,\n                            \"product\": \"prod_BVEq66c8So6QEi\",\n                            \"recurring\": {\n                                \"aggregate_usage\": null,\n                                \"interval\": \"month\",\n                                \"interval_count\": 1,\n                                \"trial_period_days\": null,\n                                \"usage_type\": \"licensed\"\n                            },\n                            \"tax_behavior\": \"unspecified\",\n                            \"tiers_mode\": null,\n                            \"transform_quantity\": null,\n                            \"type\": \"recurring\",\n                            \"unit_amount\": 299,\n                            \"unit_amount_decimal\": \"299\"\n                        },\n                        \"quantity\": 1,\n                        \"subscription\": \"sub_4tR1Y3aHRk3b5L\",\n                        \"tax_rates\": []\n                    }\n                ],\n                \"has_more\": false,\n                \"total_count\": 1,\n                \"url\": \"/v1/subscription_items?subscription=sub_4tR1Y3aHRk3b5L\"\n            },\n            \"latest_invoice\": \"in_1M8TASJ7PTISwI9vmwg1Isyh\",\n            \"livemode\": false,\n            \"metadata\": [],\n            \"next_pending_invoice_item_invoice\": null,\n            \"on_behalf_of\": null,\n            \"pause_collection\": null,\n            \"payment_settings\": {\n                \"payment_method_options\": null,\n                \"payment_method_types\": null,\n                \"save_default_payment_method\": null\n            },\n            \"pending_invoice_item_interval\": null,\n            \"pending_setup_intent\": null,\n            \"pending_update\": null,\n            \"plan\": {\n                \"id\": \"rare\",\n                \"object\": \"plan\",\n                \"active\": true,\n                \"aggregate_usage\": null,\n                \"amount\": 299,\n                \"amount_decimal\": \"299\",\n                \"billing_scheme\": \"per_unit\",\n                \"created\": 1412037694,\n                \"currency\": \"usd\",\n                \"interval\": \"month\",\n                \"interval_count\": 1,\n                \"livemode\": false,\n                \"metadata\": [],\n                \"name\": \"Rare\",\n                \"nickname\": null,\n                \"product\": \"prod_BVEq66c8So6QEi\",\n                \"statement_description\": \"EchoMTG Rare\",\n                \"statement_descriptor\": \"EchoMTG Rare\",\n                \"tiers\": null,\n                \"tiers_mode\": null,\n                \"transform_usage\": null,\n                \"trial_period_days\": null,\n                \"usage_type\": \"licensed\"\n            },\n            \"quantity\": 1,\n            \"schedule\": null,\n            \"start\": 1545353794,\n            \"start_date\": 1412373827,\n            \"status\": \"unpaid\",\n            \"tax_percent\": null,\n            \"test_clock\": null,\n            \"transfer_data\": null,\n            \"trial_end\": null,\n            \"trial_start\": null\n        }\n    ]\n}"
						}
					]
				},
				{
					"name": "Billing: Switch Plan",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"plan\": \"rare\" \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/billing/switch_plan/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"switch_plan",
								""
							]
						}
					},
					"response": [
						{
							"name": "Billing: Switch Plan",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"plan\": \"rare\" \r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/billing/switch_plan/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"switch_plan",
										""
									]
								}
							},
							"_postman_previewlanguage": "json",
							"header": null,
							"cookie": [],
							"body": "{\n    \"message\": \"Hi teeg,<br/><br/>Woohoo welcome to the rare party! Let me know if you have any questions with the subscription upgrade and may you pull mythically!\",\n    \"data\": {\n        \"id\": \"sub_XXXXXX\",\n        \"object\": \"subscription\",\n        \"application\": null,\n        \"application_fee_percent\": null,\n        \"automatic_tax\": {\n            \"enabled\": false\n        },\n        \"billing\": \"charge_automatically\",\n        \"billing_cycle_anchor\": 111111,\n        \"billing_thresholds\": null,\n        \"cancel_at\": null,\n        \"cancel_at_period_end\": false,\n        \"canceled_at\": null,\n        \"collection_method\": \"charge_automatically\",\n        \"created\": 111111,\n        \"currency\": \"usd\",\n        \"current_period_end\": 111111,\n        \"current_period_start\": 11111,\n        \"customer\": \"cus_XXXXXXX\",\n        \"days_until_due\": null,\n        \"default_payment_method\": null,\n        \"default_source\": null,\n        \"default_tax_rates\": [],\n        \"description\": null,\n        \"discount\": null,\n        \"ended_at\": null,\n        \"invoice_customer_balance_settings\": {\n            \"consume_applied_balance_on_void\": true\n        },\n        \"items\": {\n            \"object\": \"list\",\n            \"data\": [\n                {\n                    \"id\": \"si_XXXXXXXX\",\n                    \"object\": \"subscription_item\",\n                    \"billing_thresholds\": null,\n                    \"created\": 1667852966,\n                    \"metadata\": [],\n                    \"plan\": {\n                        \"id\": \"rare\",\n                        \"object\": \"plan\",\n                        \"active\": true,\n                        \"aggregate_usage\": null,\n                        \"amount\": 299,\n                        \"amount_decimal\": \"299\",\n                        \"billing_scheme\": \"per_unit\",\n                        \"created\": 1412037694,\n                        \"currency\": \"usd\",\n                        \"interval\": \"month\",\n                        \"interval_count\": 1,\n                        \"livemode\": false,\n                        \"metadata\": [],\n                        \"name\": \"Rare\",\n                        \"nickname\": null,\n                        \"product\": \"prod_XXXXXXX\",\n                        \"statement_description\": \"EchoMTG Rare\",\n                        \"statement_descriptor\": \"EchoMTG Rare\",\n                        \"tiers\": null,\n                        \"tiers_mode\": null,\n                        \"transform_usage\": null,\n                        \"trial_period_days\": null,\n                        \"usage_type\": \"licensed\"\n                    },\n                    \"price\": {\n                        \"id\": \"rare\",\n                        \"object\": \"price\",\n                        \"active\": true,\n                        \"billing_scheme\": \"per_unit\",\n                        \"created\": 1412037694,\n                        \"currency\": \"usd\",\n                        \"custom_unit_amount\": null,\n                        \"livemode\": false,\n                        \"lookup_key\": null,\n                        \"metadata\": [],\n                        \"nickname\": null,\n                        \"product\": \"prod_XXXXXXX\",\n                        \"recurring\": {\n                            \"aggregate_usage\": null,\n                            \"interval\": \"month\",\n                            \"interval_count\": 1,\n                            \"trial_period_days\": null,\n                            \"usage_type\": \"licensed\"\n                        },\n                        \"tax_behavior\": \"unspecified\",\n                        \"tiers_mode\": null,\n                        \"transform_quantity\": null,\n                        \"type\": \"recurring\",\n                        \"unit_amount\": 299,\n                        \"unit_amount_decimal\": \"299\"\n                    },\n                    \"quantity\": 1,\n                    \"subscription\": \"sub_XXXXXX\",\n                    \"tax_rates\": []\n                }\n            ],\n            \"has_more\": false,\n            \"total_count\": 1,\n            \"url\": \"/v1/subscription_items?subscription=sub_XXXXXXXX\"\n        },\n        \"latest_invoice\": \"in_XXXXXXX\",\n        \"livemode\": false,\n        \"metadata\": [],\n        \"next_pending_invoice_item_invoice\": null,\n        \"on_behalf_of\": null,\n        \"pause_collection\": null,\n        \"payment_settings\": {\n            \"payment_method_options\": null,\n            \"payment_method_types\": null,\n            \"save_default_payment_method\": \"off\"\n        },\n        \"pending_invoice_item_interval\": null,\n        \"pending_setup_intent\": null,\n        \"pending_update\": null,\n        \"plan\": {\n            \"id\": \"rare\",\n            \"object\": \"plan\",\n            \"active\": true,\n            \"aggregate_usage\": null,\n            \"amount\": 299,\n            \"amount_decimal\": \"299\",\n            \"billing_scheme\": \"per_unit\",\n            \"created\": 1412037694,\n            \"currency\": \"usd\",\n            \"interval\": \"month\",\n            \"interval_count\": 1,\n            \"livemode\": false,\n            \"metadata\": [],\n            \"name\": \"Rare\",\n            \"nickname\": null,\n            \"product\": \"prod_XXXXXXXX\",\n            \"statement_description\": \"EchoMTG Rare\",\n            \"statement_descriptor\": \"EchoMTG Rare\",\n            \"tiers\": null,\n            \"tiers_mode\": null,\n            \"transform_usage\": null,\n            \"trial_period_days\": null,\n            \"usage_type\": \"licensed\"\n        },\n        \"quantity\": 1,\n        \"schedule\": null,\n        \"start\": 1667852965,\n        \"start_date\": 1667852965,\n        \"status\": \"active\",\n        \"tax_percent\": null,\n        \"test_clock\": null,\n        \"transfer_data\": null,\n        \"trial_end\": null,\n        \"trial_start\": null\n    },\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Set Default Card",
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
							"raw": "{\r\n    \"card_id\" : \"card_1MGMvNJ7PTISwI9vPN3ZHLuZ\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "localhost/api/billing/set_default_card/",
							"host": [
								"localhost"
							],
							"path": [
								"api",
								"billing",
								"set_default_card",
								""
							]
						},
						"description": "Set an existing card to the default payment method. `card_id` comes from the card array returned by `billing/get_cards/`"
					},
					"response": [
						{
							"name": "Set Default Card",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"card_id\" : \"card_XXXXXXX\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/billing/set_default_card/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"set_default_card",
										""
									]
								}
							},
							"_postman_previewlanguage": "json",
							"header": null,
							"cookie": [],
							"body": "{\n    \"message\": \"Card set as default.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Billing: Add Card",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"plan\": \"uncommon\",\r\n    \"card_number\": \"5555555555554444\",\r\n    \"exp_month\": \"04\",\r\n    \"exp_year\": \"2023\",\r\n    \"cvc\": \"123\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/billing/add_card/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"add_card",
								""
							]
						},
						"description": "Add Card endpoint is used for both for creating new customers and adding cards to their accounts. This endpoint was design this way since Echo paid plans require a credit card to start. If a user already exists, then a `plan` is optional."
					},
					"response": [
						{
							"name": "Billing: Add Card",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"plan\": \"uncommon\",\r\n    \"card_number\": \"5555555555554444\",\r\n    \"exp_month\": \"04\",\r\n    \"exp_year\": \"2023\",\r\n    \"cvc\": \"123\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/billing/add_card/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"add_card",
										""
									]
								}
							},
							"_postman_previewlanguage": "json",
							"header": null,
							"cookie": [],
							"body": "{\n    \"message\": \"Plan set to uncommon and payment source added.\",\n    \"status\": \"success\"\n}"
						}
					]
				},
				{
					"name": "Billing: Charge",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"amount\" : \"4.99\",\r\n    \"description\" : \"Pack of cards\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/billing/charge/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"charge",
								""
							]
						},
						"description": "One off charge (not implemented yet). Requires a user to have a registered card through `/api/billing/add_card/`."
					},
					"response": []
				},
				{
					"name": "Delete Card",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"card_id\" : \"card_XXXXXXX\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "https://www.echomtg.com/api/billing/remove/",
							"protocol": "https",
							"host": [
								"www",
								"echomtg",
								"com"
							],
							"path": [
								"api",
								"billing",
								"remove",
								""
							]
						},
						"description": "Delete an existing card, `card_id` comes from the card array returned by `billing/get_cards/`"
					},
					"response": [
						{
							"name": "Delete Card",
							"originalRequest": {
								"method": "POST",
								"header": [],
								"body": {
									"mode": "raw",
									"raw": "{\r\n    \"card_id\" : \"card_XXXXXXX\"\r\n}",
									"options": {
										"raw": {
											"language": "json"
										}
									}
								},
								"url": {
									"raw": "https://www.echomtg.com/api/billing/remove/",
									"protocol": "https",
									"host": [
										"www",
										"echomtg",
										"com"
									],
									"path": [
										"api",
										"billing",
										"remove",
										""
									]
								}
							},
							"_postman_previewlanguage": "json",
							"header": null,
							"cookie": [],
							"body": "{\n    \"message\": \"Card deleted.\",\n    \"status\": \"success\"\n}"
						}
					]
				}
			],
			"description": "API Endpoints to controls a single users billing, all calls are in context of the authenticated user. EchoMTG is integrated with Stripe.com, keeping all sensitive data off the EchoMTG platform. Access is done through an obfuscated user token, which is stored on the EchoMTG user."
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
