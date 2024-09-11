const http = require("http");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split("/");

  const numStr = pathParts[2];
  const num = parseInt(numStr, 10);
  if (isNaN(num)) {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Invalid integer");
    return;
  }

  const data = Array(num).fill(Array(num).fill(Array(num).fill(0)));

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      for (let k = 0; k < num; k++) {
        data[i][j][k] = i + j + k;
        if (data[k][j][i] !== 0) {
          data[k][j] = [...data[i][j]];
        }
      }
    }
  }

  // proof that it works
  // console.log(data[num - 1][num - 1][num - 1]);

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(num.toString());
});

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
