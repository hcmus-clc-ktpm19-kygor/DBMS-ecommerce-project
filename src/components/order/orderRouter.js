const express = require("express");
const router = express.Router();
const controller = require("./orderController");
const sql = require("mssql");

// GET Method
router.get("/:id", controller.get);
router.get("/", controller.getAll);

// POST Method
router.post("/dirty-read-error", async function (req, res) {
  const sql = require("mssql");
  const sqlConfig = {
    user: "sa",
    password: "123",
    database: "HE_THONG_SHIP",
    server: "localhost",
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig);
    // const result = await pool
    //   .request()
    //   .input("MA_SAN_PHAM", sql.VarChar, "SP02")
    //   .output("SO_LUONG", sql.Int)
    //   .execute("sp_DIRTYREAD_TRAN2");
    // console.dir(result);

    const request = new sql.Request();
    request.input("MA_SAN_PHAM", sql.VarChar, "SP02");
    request.output("SO_LUONG", sql.Int);
    request.execute("sp_DIRTYREAD_TRAN2", (err, result) => {
      // ... error checks
      res.json({message: result.output}); // key/value collection of output values
      // ...
    });
  } catch (err) {
    console.log(err.message);
  }
});
router.post("/", controller.insert);

// PUT Method
router.put("/:id", controller.update);

// DELETE Method
router.delete("/:id", controller.delete);

module.exports = router;
