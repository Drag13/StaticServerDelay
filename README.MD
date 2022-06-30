# Static Server Delay

## Why

Simple, pre configured, express based web server with support of delaying static resources. Allows general and individual delay rules for easier web performance testing

## Install

```cmd
npm ci
```

## Start

```cmd
npm run dev
```

## Features

- General delay for all static files:

```json
{ "defaultDelay": 1000 }
```

- Delaying individual files (overrides general delay rule):

```json
{
  "delays": {
    "/styles.css": 3000,
    "/javascript.js": 3000
  }
}
```

## Disclaimer

The code designed for the experimental purposes only and should not be used in production
