/*

Welcome to the GitHub Copilot study!
Your mission, should you choose to accept it:

Write a toy HTTP server engine. 
You do not need to actually handle network requests.
Just parse a request string and return a response string.

This is a good reference for the structure of HTTP requests and responses:
https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages

You must parse the request headers, but you do not need to validate them.
You must return a valid HTTP response with a correct content length.
You must serve files from the content/ directory as the root.
  Meaning, `GET /index.html HTTP/1.1` should return content/index.html.
  You do not need to handle `GET /`

Return HTTP status 404 if the file is not found.
Return HTTP status 400 if the request is invalid.
Return HTTP status 405 for any HTTP method other than GET.
Return HTTP status 200 with the contents of the file if the request is valid.

A proper HTTP response with no body has two trailing newlines:
  `HTTP/1.1 404 Not Found\n\n`

A proper HTTP response with a body has a Content-Length header and a body:
  `HTTP/1.1 200 OK\nContent-Length: ${THELENGTH}\n\n${THEFILEBODY}`
*/

/**
 *
 * @typedef {Object} Request
 * @property {string} method - The HTTP method of the request.
 * @property {string} path - The path of the request.
 * @property {string} version - The HTTP version of the request.
 * @property {Object} headers - The headers of the request.
 * @property {string} body - The body of the request.
 */


const fs = require("fs");

/**
 * Parse the raw request string into a request object.
 *
 * @export
 * @param {string} raw
 * @return {Request} the parsed request
 */
function parse(raw) {
  // TODO: Implement me!
}

function respond(raw) {
  // TODO: Implement me!
}

module.exports = { parse, respond };

