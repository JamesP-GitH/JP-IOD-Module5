const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/test", (req, res) => {
    res.send("This is a test");
});

const app2 = express();
const port2 = 3001;

app2.listen(port2, () => {
    console.log(`Example second app listening at http://localhost:${port2}`);
});

app2.get("/", (req, res) => {
    res.send("Hello from server 2 on port 3001!");
});

app2.get("/test", (req, res) => {
    res.send("This is server 2 responding to /test");
});
