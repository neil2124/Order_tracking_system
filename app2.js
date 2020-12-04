
 var mysql = require('mysql');
 var faker = require('faker');
 
 
 
  var connection = mysql.createConnection({
          host:'localhost',
          user:"root",
          password:"password",
          database:"Shippment_Tracking",
          
      })
     
     // --- Insert 100 Random Companies ---- 


  var data=[];
  for(let i=0;i<100;i++){
      data.push([
         faker.company.companyName()

      ]);
  }

  var q = "Insert Into shippping_companies (name) values ?";
  connection.query(q,[data],(err,results)=>{
      if (err) throw err;
  })




// ---- Insert Random 100 Customers ---- //

//  var data=[];
//  for(let i=0;i<100;i++){
//      data.push([
//          faker.name.findName(),
//          faker.address.streetName(),
//          faker.address.zipCode(),
//          faker.address.streetAddress(),
//          faker.internet.email()

//      ])
//  }

//  var q = "Insert Into customers (name,street_name,house_number,Landmark,email) values ?";
//  connection.query(q,[data],(err,results)=>{
//      if (err) throw err;
//  })

// ----    Inserted 100 Users  -----