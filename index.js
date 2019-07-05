const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);

const server = http.createServer((req, res) => {
  const pathName = url.parse(req.url, true).pathname;
  const id = url.parse(req.url, true).query.id;

  if (pathName === "/products" || pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Products page");
  } else if (pathName === "/laptop" && id < laptopData.length) {
    res.writeHead(200, { "Content-Type": "text/html" });
    fs.readFile(
      `${__dirname}/templates/template-laptop.html`,
      "utf-8",
      (error, data) => {
        let output = data.replace(
          /{%PRODUCTNAME%}/g,
          laptopData[id].productName
        );
        output = output.replace(/{%PRICE%}/g, laptopData[id].price);
        output = output.replace(/{%SCREEN%}/g, laptopData[id].screen);
        output = output.replace(/{%CPU%}/g, laptopData[id].cpu);
        output = output.replace(/{%STORAGE%}/g, laptopData[id].storage);
        output = output.replace(/{%RAM%}/g, laptopData[id].ram);
        output = output.replace(/{%DESCRIPTION%}/g, laptopData[id].description);
        output = output.replace(/{%IMG%}/g, laptopData[id].image);
        res.end(output);
      }
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("URL was not found on the server");
  }
});
server.listen(1337, "127.0.0.1", () => {
  console.log("Listen for requests now");
});
