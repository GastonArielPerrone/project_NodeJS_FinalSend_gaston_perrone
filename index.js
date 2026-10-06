import express from 'express';

const app = express();
const PORT = 3000;
const user = [
  {
    name: "Juan",
    age: 30,
    email: "juan@example.com",
  },
  {
    name: "María",
    age: 25,
    email: "maria@example.com",
  },
];

app.get("/ping", (req, res) => {
  res.send("/pong");
});

app.get("/html", (req, res) => {
  res.send("<h1>Bienvenidos al HTML</h1>");
});

app.get("/users", (req, res) => {
  res.json(user);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});