const express = require('express')
const router = express.Router()
const mySQLDB = require('./db.mysql')

router.use(express.json())
router.use(express.urlencoded({extended: false}))   //middleware

//UserID is auto increment
//I add CreatedDate UpdateDate,DeletedDate,UpdateBy for reference and security purposes 

// Get all Data
router.get('/api/getDataLogin', (req, res) => {
    let sql = `SELECT * FROM login`
    mySQLDB.query(sql,(error, results, fields)=> {
        if (error) throw error;
        res.send(results)
    })
})

// Add new data
router.post('/api/addDataLogin', async(req, res) => {
    try {
        let Data = req.body
        let sql = `INSERT INTO login
                    (
                        FirstName,
                        LastName,
                        Address,
                        PostCode,
                        ContactNumber,
                        Email,
                        UserName,
                        Password,
                        CreatedDate,
                        UpdatedDate,
                        UpdatedBy
                        
                    )
                    VALUES 
                    (
                        '${Data.FirstName}',
                        '${Data.LastName}',
                        '${Data.Address}',
                        '${Data.PostCode}',
                        '${Data.ContactNumber}',
                        '${Data.Email}',
                        '${Data.UserName}',
                        '${Data.Password}',
                        NOW(),
                        NOW(),
                        'Guest'
                    )`
        let response = await mySQLDB.query(sql);
            if(response) {
                res.send('Added Data Successfully')
            }
    }catch(err){
        res.send({message:err})
    }
})


// Soft delete data
router.post('/api/softDeleteDataLogin',async(req,res)=>{
    try{
        let sql = `UPDATE  login
                    SET     DeletedDate = NOW()
                    WHERE   UserID = '${req.body.UserID}'`

        let response = await mySQLDB.query(sql);
            if(response) {
                res.send('Successfully Deleted')
            }
    }catch(err){
        res.send({message:err})
    }
})


// Hard delete data
router.delete('/api/hardDeleteDataLogin', async(req,res)=>{
    try{
        let sql = ` Delete  
                    FROM    login
                    WHERE   UserID = '${req.body.UserID}'`

        let response = await mySQLDB.query(sql);
            if(response) {
                res.send('Successfully Deleted')
            }
    }catch(err){
        res.send({message:err})
    }
})

// Delete multiple data (hard delete)
// Array format should be pass here...
// e.g [1,2,3]
router.delete('/api/deleteMultipleDataLogin', (req,res)=>{
    let Data = req.body
        Data.forEach(id=>{
            let sql = `Delete  
                        FROM    login
                        WHERE   UserID 
                        IN      (${id})`

        mySQLDB.query(sql, (error, results, fields) => {
            if (error) {
                console.log(error)
            } else {
                res.send('Multiple Delete Successfully')
            }
        })
    })
})


// Update data
router.post('/api/updateDataLogin/:UserID', async(req, res) => {
    try{
        let Data = req.body
        let sql = ` UPDATE  login 
                    SET     FirstName = '${Data.FirstName}',
                            LastName = '${Data.LastName}',
                            Address = '${Data.Address}',
                            PostCode = '${Data.PostCode}',
                            ContactNumber = '${Data.ContactNumber}',
                            Email = '${Data.Email}',
                            UserName = '${Data.UserName}',
                            Password = '${Data.Password}',
                            UpdatedDate = NOW(),
                            UpdatedBy = 'Guest'
                    WHERE   UserID = ${req.params.UserID}`
        let response = await mySQLDB.query(sql);
            if(response) {
                res.send('Successfully Updated')
            }
        }catch(err){
            res.send({message:err})
        }
})

module.exports = router