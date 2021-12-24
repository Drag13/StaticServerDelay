const express = require("express");
const config = require("./config.json");

function valueOrDefault(value, defaultValue) {
  // Nullish coalescing operator supported only in 14 Node
  // Don't want to use Babel for now
  // Using old syntax for compatibility and suffering :'(
  return value != null ? value : defaultValue;
}

function delay(defaultDelay, config) {
  return function delayMiddleware(req, res, next) {
    const url = req.url;
    const individualDelay = config[url];
    const delay = valueOrDefault(individualDelay, defaultDelay);
    const shouldBedelayed = typeof delay === "number" && delay > 0;
    if (shouldBedelayed) {
      setTimeout(next, delay);
    } else {
      next();
    }
  };
}

function run(config) {
  const port = valueOrDefault(config.port, 4000);
  const delays = valueOrDefault(config.delays, {});
  const root = valueOrDefault(config.root, "src/public");
  const defaultDelay = valueOrDefault(config.defaultDelay, 0);
  const app = express();

  app.use(delay(defaultDelay, delays));

  app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  app.use(express.static(root));
}

run(config);
