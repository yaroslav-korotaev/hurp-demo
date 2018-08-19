# hurp-demo

Demo hurp-based application.

A simple key-value storage. Real database and remote cache are stubbed with in-memory map.

## Launch

```bash
$ npm install
$ cp .env.example .env
$ npm start
```

## Usage

There are two hard-coded keys in database: `foo` and `bar`. Slow database is simulated with 1s timeout before read or write operation returns. Read and write operations on cache takes 50ms. Reading unknown key will end with error.

Get key:

```bash
$ curl -w '\n' 'http://localhost:3000/api/get?key=foo'
```

Set key:

```bash
$ curl -w '\n' 'http://localhost:3000/api/set?key=foo&value=flop'
```

Invalidate cache:

```bash
$ curl -w '\n' 'http://localhost:3000/api/invalidate'
```
