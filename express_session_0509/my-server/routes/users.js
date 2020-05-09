var express = require("express");
var router = express.Router();

var mysql = require("mysql");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));
const pool = mysql.createPool({
    host: "localhost",
    port: 3306,
    database: "E_SESSION",
    password: "tjddlr072rp",
    user: "root",
    connectionLimit: 10,
});

const getConnection = () => pool;
/* GET users listing. start */
router.get("/", function(req, res) {
    const connection = getConnection();
    const queryString = "SELECT * FROM animals;";
    connection.query(queryString, (err, rows, fields) => {
        res.send(rows);
    });
});
/* GET users listing. end */

/* GET user start */
router.get("/:id", function(req, res) {
    const connection = getConnection();
    const id = req.params.id;
    const queryString = "SELECT * FROM animals WHERE id=?";
    connection.query(queryString, [id], (err, rows, fields) => {
        res.send(rows);
    });
});
/* GET user. end */

/* CREATE user start */
router.post("/create", function(req, res) {
    const connection = getConnection();
    const name = req.body.name;
    const fee = req.body.fee;
    const queryString = "INSERT INTO animals (name, fee) VALUES (?,?)";
    connection.query(queryString, [name, fee], (err, rows, fields) => {
        res.redirect("/users");
    });
});
/*  CREATE user. end */
/* DELETE user start */
router.delete("/:id", function(req, res) {
    const connection = getConnection();
    const id = req.params.id;
    const queryString = "DELETE FROM  animals  WHERE id=?";
    connection.query(queryString, [id], (err, rows, fields) => {
        res.redirect("/users");
    });
});
/*  DELETE user. end */
/* UPDATE user start */
router.put("/:id", function(req, res) {
    const connection = getConnection();
    const id = req.params.id;
    const name = req.body.name;
    const fee = req.body.fee;

    const queryString = "UPDATE animals SET name=?, fee=? WHERE id=?";
    connection.query(queryString, [name, fee, id], (err, rows, fields) => {
        res.redirect(`/users/${id}`);
    });
});
/*   UPDATE user. end */

module.exports = router;