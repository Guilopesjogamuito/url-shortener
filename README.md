# URL shortener API

This is a simple project, for demonstration purposes. My intention is to develop using TDD (kinda) and apply concepts of [Clean Architeture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

- [x] `POST /url`
- [ ] `GET /url/{id}`

# Getting started:

Clone the repository:

```
git clone https://github.com/Guilopesjogamuito/url-shortener.git
```

Start demo:

```
cd url-shortener

docker compose -f dcdemo up
```

Request example:

```
curl -X POST -H "Content-Type: application/json" -d '{"url": "http://google.com"}' http://localhost:7000/url
```
