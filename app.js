const app = require("express")();
const consign = require("consign");
const db = require("./config/db");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

consign()
    .include("./repository")
    .include("./service")
    .include("./controller")
    .include("./middleware")
    .include('./routes')
    .into(app);

app.db = db;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
