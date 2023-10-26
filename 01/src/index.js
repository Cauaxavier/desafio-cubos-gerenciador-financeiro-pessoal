const express = require("express");
const router = require("./routers/routers");
const app = express();
const port = 3000;

app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
