// inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const mysql = require("mysql")
const moment = require("moment")
const md5 = require("md5")

// implementation
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// create MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pelanggaran_siswa"
})

db.connect(error => {
    if (error) {
        console.log(error.message)
    } else {
        console.log("MySQL Connected")
    }
})

app.get("/siswa", (req, res) => {
    // create sql query
    let sql = "select * from siswa"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }            
        } else {
            response = {
                count: result.length,
                siswa: result
            }            
        }
        res.json(response)
    })
})

app.get("/siswa/:id", (req, res) => {
    let data = {
        id_siswa: req.params.id
    }

    let sql = "select * from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }            
        } else {
            response = {
                count: result.length,
                siswa: result
            }            
        }
        res.json(response)
    })
})

app.post("/siswa", (req,res) => {

    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        poin: req.body.poin
    }

    let sql = "insert into siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/siswa", (req,res) => {

    let data = [
        {
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            poin: req.body.poin
        },
        {
            id_siswa: req.body.id_siswa
        }
    ]

    let sql = "update siswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/siswa/:id", (req,res) => {
    let data = {
        id_siswa: req.params.id
    }

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/pelanggaran", (req, res) => {
    // create sql query
    let sql = "select * from pelanggaran"

    // run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }            
        } else {
            response = {
                count: result.length,
                pelanggaran: result
            }            
        }
        res.json(response)
    })
})

app.get("/pelanggaran/:id", (req, res) => {
    let data = {
        id_pelanggaran: req.params.id
    }

    let sql = "select * from pelanggaran where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message 
            }            
        } else {
            response = {
                count: result.length,
                pelanggaran: result
            }            
        }
        res.json(response)
    })
})

app.post("/pelanggaran", (req,res) => {

    let data = {
        nama_pelanggaran : req.body.nama_pelanggaran,
        poin : req.body.poin
    }

    let sql = "insert into pelanggaran set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/pelanggaran", (req,res) => {

    let data = [
        {
            nama_pelanggaran : req.body.nama_pelanggaran,
            poin : req.body.poin
        },
        {
            id_pelanggaran: req.body.id_pelanggaran
        }
    ]

    let sql = "update pelanggaran set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/pelanggaran/:id", (req,res) => {
    let data = {
        id_pelanggaran: req.params.id
    }

    let sql = "delete from pelanggaran where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})


app.get("/user",(req,res)=>{
    let sql = "select * from user"

    db.query(sql,(error,result)=>{
        let response = null
        if(error){
            response = {
            message: error.message
            }
        }
        else{
            response = {
                count: result.length,
                result: result
            }
        }
        res.json(response)
    })
})

app.get("/user/:id",(req,res)=>{
    let data = {
        id_user: req.params.id
    }

    let sql = "select * from user where ?"

    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
                message: error.message
            }
        }else{
            response = {
                result: result
            }
        }
        res.json(response)
    })
})

app.post("/user",(req,res)=>{
    let data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: md5(req.body.password)
    }

    let sql = "insert into user set ?"

    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
            message: error.message
            }
        }
        else{
        response = {
            message: result.affectedRows + " data inserted"
        }
    }
        res.json(response)
    })
})

app.delete("/user/:id",(req,res)=>{
    let data = {
        id_user: req.params.id
    }

    let sql = "delete from user where ?"

    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
            message: error.message
            }
        }
        else{
        response = {
            message: result.affectedRows + " data deleted"
        }
        res.json(response)
    }
    })
})

app.put("/user",(req,res)=>{
    let data = [
        {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: md5(req.body.password)
        },

        {
            id_user: req.body.id_user
        }    
    ]
    
    let sql = "update user set ? where ?"

    db.query(sql,data,(error,result)=>{
        let response = null
        if(error){
            response = {
            message: error.message
            }
        }
        else{
        response = {
            message: result.affectedRows + " data update"
        }
        res.json(response)
    }
    })
})


app.post("/pelanggaran_siswa", (req,res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let pelanggaran = JSON.parse(req.body.pelanggaran)

    let sql = "insert into pelanggaran_siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        
        if (error) {
            res.json({message: error.message})
        } else {
            
            // get last inserted id_pelanggaran
            let lastID = result.insertId

            // prepare data to detail_pelanggaran
            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])                
            }

            let sql = "insert into detail_pelanggaran_siswa values ?"

            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})

app.get("/pelanggaran_siswa", (req,res) => {
    let sql = "select p.id_pelanggaran_siswa, p.id_siswa,p.waktu, s.nis, s.nama_siswa, p.id_user, u.nama_user " +
     "from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa " +
     "join user u on p.id_user = u.id_user"

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                pelanggaran_siswa: result
            })
        }
    })
})

app.get("/pelanggaran_siswa/:id_pelanggaran_siswa", (req,res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    let sql = "select p.nama_pelanggaran, p.poin " + 
    "from detail_pelanggaran_siswa dps join pelanggaran p "+
    "on p.id_pelanggaran = dps.id_pelanggaran " +
    "where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})   
        }else{
            res.json({
                count: result.length,
                detail_pelanggaran_siswa: result
            })
        }
    })
})

app.delete("/pelanggaran_siswa/:id_pelanggaran_siswa", (req, res) => {
    let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}

    let sql = "delete from detail_pelanggaran_siswa where ?"

    db.query(sql, param, (error, result) => {
        if (error) {
            res.json({ message: error.message})
        } else {
            let param = { id_pelanggaran_siswa: req.params.id_pelanggaran_siswa}
            let sql = "delete from pelanggaran_siswa where ?"

            db.query(sql, param, (error, result) => {
                if (error) {
                    res.json({ message: error.message})
                } else {
                    res.json({message: "Data has been deleted"})
                }
            })
        }
    })

})


app.listen(8000, () => {
    console.log("Run on port 8000")
})

