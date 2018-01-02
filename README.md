# Shrnk - URL shortener

Shrnk is a node.js URL shortener built with express.

-------------

# How to use

### Web app

* Copy a valid url
* Paste URL into field and click shrink
* Visit the shortened URL provided (Something like `https://shrnk.glitch.me/Sdf`)

### API

* Copy a valid url
* Make a `POST` request to `https://shrnk.glitch.me/api/shrink` with data: `url=[copied-url]`
* The API returns a JSON object containing the shortened and original URLs

### Microservice

* Copy a valid url
* Visit `https://shrnk.glitch.me/shrink/[copied-url]`
* The microservice returns a JSON object containing the shortened and original URLs