const session = require("express-session");
const Car = require("../models/Car");

var sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./models/userdata.db",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) return console.log(err);
  }
);

exports.loginUser = (req, res) => {
  try {
    username = req.body.username;
    password = req.body.password;
    db.all(
      "SELECT * FROM users where (username=='" +
        username +
        "') AND (password=='" +
        password +
        "')",
      function (err, rows) {
        if (err) {
          console.log("Error: " + err);
        } else {
          let date_ob = new Date();
          let date = ("0" + date_ob.getDate()).slice(-2);

          // current month
          let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

          // current year
          let year = date_ob.getFullYear();

          // current hours
          let hours = date_ob.getHours();

          // current minutes
          let minutes = date_ob.getMinutes();

          // current seconds
          let seconds = date_ob.getSeconds();
          console.log(
            "asdasdasdasdasdasdasd" +
              year +
              "-" +
              month +
              "-" +
              date +
              " " +
              hours +
              ":" +
              minutes +
              ":" +
              seconds
          );
          let fulldate =
            year +
            "-" +
            month +
            "-" +
            date +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
          login_time = fulldate;

          if (rows.length == 0) {
            login_number++;
            if (login_number == 3) {
              login_number = 0;
              res.redirect("/darkwebkiller");
            } else {
              res.redirect("/");
            }
          } else {
            req.session.username = req.body.username;

            rows.forEach(function (row) {
              res.redirect("/dashboard");
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getDashBoard = async (req, res) => {
  try {
    username = req.session.username;
    
    db.all(
      "SELECT * FROM users where (username=='" + username + "') ",
      async function (err, rows) {
        if (err) {
          console.log("Error: " + err);
        } else {
          
          const car_data = await Car.find({ id: rows[0].car_id1 });
          const car_data1=  await Car.find({ id: rows[0].car_id2 });
         
          let middle_data = Math.floor(car_data.length /2);
          let middle_data1 = Math.floor((car_data1.length / 2)+100);
          let car1_time=time
          let car2_time=time1
          console.log(car1_time,car2_time)
          console.log(middle_data,middle_data1)
          rows.forEach(function (row) {
            res.render("dashboard", {
              user: row,
              car_data,
              car_data1,
              middle_data,
              middle_data1,
              car1_time,
              car2_time
            
            });
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.userOut = (req, res) => {
  try {
    let date_ob = new Date();
          let date = ("0" + date_ob.getDate()).slice(-2);

          // current month
          let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

          // current year
          let year = date_ob.getFullYear();

          // current hours
          let hours = date_ob.getHours();

          // current minutes
          let minutes = date_ob.getMinutes();

          // current seconds
          let seconds = date_ob.getSeconds();
          console.log(
            "asdasdasdasdasdasdasd" +
              year +
              "-" +
              month +
              "-" +
              date +
              " " +
              hours +
              ":" +
              minutes +
              ":" +
              seconds
          );
          let fulldate =
            year +
            "-" +
            month +
            "-" +
            date +
            " " +
            hours +
            ":" +
            minutes +
            ":" +
            seconds;
            
    const sql='INSERT INTO date (login_time,out_time) VALUES(?,?)';
    db.run(sql,[login_time,fulldate],(err)=>{
      console.log("işlem alındı")
  })
   req.session.destroy();
   time=30;
   time1=30;
  res.redirect("/");
  } catch (error) {
    console.log(error);
  }
  
};

exports.get_map=(req,res)=>{
 
  time=req.body.dk
  
  res.redirect("/dashboard")
}

exports.get_map1=(req,res)=>{
 
  time1=req.body.dk1
  
  res.redirect("/dashboard")
}

