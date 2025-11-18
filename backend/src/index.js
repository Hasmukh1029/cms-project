const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/categories", require("./routes/categories"));

//app.listen(4000, () => console.log("Backend running on port 4000 🚀"));
const port = process.env.PORT || 4000;
app.listen(port, () => console.log("Server running on port", port));
