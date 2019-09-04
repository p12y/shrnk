# Shrnk - URL shortener

Shrnk is a URL shortener built with MongoDB, Express and Vue.

---

# How to use

### Web app

- Copy a valid url
- Paste URL into field and click shrink
- Visit the shortened URL provided `localhost:8080/ENCODED_URL`

### API

- Copy a valid url
- Make a `POST` request to `localhost:8080/api/shrink` with data: `url=LONG_URL`
- The API returns a JSON object containing the shortened and original URLs

# Installation

1. Download repository
2. Install packages with `npm install`
3. Add a MongoDB `DB_PASSWORD` & `DB_URL` in a `.env` file in the root directory
4. Run the dev server with `npm run dev`
