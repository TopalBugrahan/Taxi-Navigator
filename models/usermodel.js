var sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database("./models/userdata.db",sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.log(err)
    console.log("başarılı")
})

function tablo_ekle()
{
    db.run('CREATE TABLE users(username,password,car_id1,car_id2)')
}

function veri_ekle()
{
    const sql='INSERT INTO users (login_time,out_time) VALUES(?,?)';

db.run(sql,["user2","1234"],(err)=>{
    console.log("işlem alındı")
})
}
function update()
{const sql="UPDATE users SET car_id1 = ? WHERE username=?"
db.run(sql,["34","user2"],(err)=>{
    console.log("işlem alındı")
})
}


function tum_verileri_cek()
{
    const sql=
    'SELECT * FROM date'
    const de="user2"
    const sqlsorgu="SELECT * FROM users where username='"+de+"'"

db.all(sqlsorgu,[],(err,rows)=>{
    console.log(rows)
})
}
function a(){
    const de="user1"
    const de1="1234"
    const sqlsorgu="SELECT * FROM users where username='"+de+"'"
    db.all("SELECT * FROM users where (username=='"+de+"') AND (password=='"+de1+"')", function(err,rows){

        // You need to move your `db.close()` inside the callback 
        // in order to close the database when the query has ended
        db.close();
        if (err)
        {
           console.log('Error: ' + err);
        }
        else
        {      
            
        console.log("girdim")       
           rows.forEach(function (row) {
               console.log('Login Succ')
               //res.sendFile('userSite.html', {root: __dirname })
           });
        }
   });
}
tum_verileri_cek()
