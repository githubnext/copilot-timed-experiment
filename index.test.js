const { parse, respond } = require("./index.js");
const fs = require("fs");

describe("start lines", () => {
  it("parses the method", () => {
    const request = parse(`GET / HTTP/1.1\n`);
    expect(request.method).toEqual("GET");
  });

  it("parses the path", () => {
    const request = parse(`GET /mypath HTTP/1.1\n`);
    expect(request.path).toEqual("/mypath");
  });

  it("parses the HTTP version", () => {
    const request = parse(`GET / HTTP/1.1\n`);
    expect(request.version).toEqual("HTTP/1.1");
  });

  it("parses empty requests", () => {
    const request = parse(`GET / HTTP/1.1\n`);
    expect(request.headers).toEqual({});
    expect(request.body).toEqual("");
  });

  it("parses requests with headers but no body", () => {
    const request = parse(`GET / HTTP/1.1\nHost: example.com\n`);
    expect(request.headers).toEqual({
      Host: "example.com",
    });
    expect(request.body).toEqual("");
  });

  it("gracefully parses requests with only a start line", () => {
    const request = parse(`GET / HTTP/1.1`);
    expect(request.headers).toEqual({});
    expect(request.body).toEqual("");
  });

  it("parses requests containing a body", () => {
    const request = parse(`GET / HTTP/1.1\nHost: example.com\n\nHello, world!`);
    expect(request.headers).toEqual({
      Host: "example.com",
    });
    expect(request.body).toEqual("Hello, world!");
  });
});

describe("behavior", () => {
  it("returns 400 for malformed requests", () => {
    expect(respond(`thisisaninvalidrequest`)).toEqual(
      `HTTP/1.1 400 Bad Request\n\n`
    );
    expect(respond(`GET / FOOO/1.1`)).toEqual(`HTTP/1.1 400 Bad Request\n\n`);
  });
  it("only accepts GET", () => {
    expect(respond(`HEAD / HTTP/1.1\n`)).toEqual(
      `HTTP/1.1 405 Method Not Allowed\n\n`
    );
  });
  it("only accepts HTTP/1.1", () => {
    expect(respond(`GET / HTTP/1.0\n`)).toEqual(`HTTP/1.1 400 Bad Request\n\n`);
  });

  it("returns 404 for non-existent files", () => {
    expect(respond(`GET /foo/bar/baz HTTP/1.1\n`)).toEqual(
      `HTTP/1.1 404 Not Found\n\n`
    );
  });

  it("returns 200 for existing files", () => {
    const file = fs.readFileSync("content/index.html");
    expect(respond(`GET /index.html HTTP/1.1\n`)).toEqual(
      `HTTP/1.1 200 OK\nContent-Length: ${file.length}\n\n${file}`
    );

    const file2 = fs.readFileSync("content/github.svg");
    expect(respond(`GET /github.svg HTTP/1.1\n`)).toEqual(
      `HTTP/1.1 200 OK\nContent-Length: ${file2.length}\n\n${file2}`
    );
  });
});

