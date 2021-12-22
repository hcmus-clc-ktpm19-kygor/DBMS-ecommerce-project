const express = require('express');
const router = express.Router();

const productController = require('./productController');
const sql = require("mssql");
const productService = require("../product/productService");

// GET Method
router.get("/fix-dirty-read", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP02");
        request.output("SO_LUONG", sql.Int);
        request.execute("sp_DIRTYREAD_FIX_TRAN2", async (err, result) => {
            const product = await productService.get('SP02');
            product.stock = result.output.SO_LUONG;
            res.render('product/views/detail', { product });
        });

    } catch (err) {
        console.log(err.message);
    }
});
router.get("/dirty-read-error", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP02");
        request.output("SO_LUONG", sql.Int);
        request.execute("sp_DIRTYREAD_TRAN2", async (err, result) => {
            const product = await productService.get('SP02');
            product.stock = result.output.SO_LUONG;
            res.render('product/views/detail', { product });
        });

    } catch (err) {
        console.log(err.message);
    }
});

router.get("/unrepeatable-read-error-type-1-trans-1", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP01");
        request.output("SO_LUONG", sql.Int);
        request.execute("sp_UNREPEATABLEREAD_TRAN1", async (err, result) => {
            const product = await productService.get('SP01');
            product.stock = result.output.SO_LUONG;
            res.render('product/views/detail', { product });
            // res.json(product);
        });

    } catch (err) {
        console.log(err.message);
    }
})
router.get("/unrepeatable-read-error-type-1-trans-2", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP01");
        request.input("SO_LUONG_DAT", sql.Int, 2);
        request.execute("sp_UNREPEATABLEREAD_TRAN2", async (err, result) => {
            console.log(result);

            const product = await productService.get('SP01');
            res.render('product/views/detail', { product });
            // res.json(product);
        });

    } catch (err) {
        console.log(err.message);
    }
})
router.get("/fix-unrepeatable-read-type-1-trans-1", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP01");
        request.output("SO_LUONG", sql.Int);
        request.execute("sp_UNREPEATABLEREAD_FIX_TRAN1", async (err, result) => {
            const product = await productService.get('SP01');
            product.stock = result.output.SO_LUONG;
            res.render('product/views/detail', { product });
            // res.json(product);
        });

    } catch (err) {
        console.log(err.message);
    }
})
router.get("/fix-unrepeatable-read-type-1-trans-2", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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

        const request = new sql.Request();
        request.input("MA_SAN_PHAM", sql.VarChar, "SP01");
        request.input("SO_LUONG_DAT", sql.Int, 2);
        request.execute("sp_UNREPEATABLEREAD_FIX_TRAN2", async (err, result) => {
            console.log(result);

            const product = await productService.get('SP01');
            res.render('product/views/detail', { product });
            // res.json(product);
        });

    } catch (err) {
        console.log(err.message);
    }
})


router.get("/unrepeatable-read-error-type-2", async function (req, res) {
    const sql = require("mssql");
    const sqlConfig = {
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        server: process.env.DB_SERVER,
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
        const products = await productService.getAll();

    } catch (err) {
        console.log(err.message);
    }
})


// Paging
router.get('/', productController.paging);
// Get 1 product
router.get('/:id', productController.get);

// POST Method
router.post('/', productController.insert);

module.exports = router;