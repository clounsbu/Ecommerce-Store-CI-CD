import "@testing-library/jest-dom";

// Polyfill for TextEncoder/TextDecoder for Jest/jsdom
if (typeof global.TextEncoder === "undefined") {
  const { TextEncoder, TextDecoder } = require("util");
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
