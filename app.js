var mysql = require('mysql');
var faker = require('faker');
var express = require('express');
const bodyParser = require('body-parser');
var app = express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
    host:'localhost',
    user:"root",
    password:"password",
    database:"shippment_tracking",
    port:3306
})

//    ----    Inserting Random 100 users  ------

// var data=[];
// for(let i=0;i<100;i++){
//     data.push([
//         faker.name.findName(),
//         faker.address.streetName(),
//         faker.address.zipCode(),
//         faker.address.streetAddress(),
//         faker.internet.email()

//     ])
// }

// var q = "Insert Into customers (name,street_name,house_number,Landmark,email) values ?";
// connection.query(q,[data],(err,results)=>{
//     if (err) throw err;
// })

// ----    Inserted 100 Users  -----



// Gets All The Users Who Have Registered

app.get('/customers',(req,res) =>{
    var q ="select * from customers limit 10";
    connection.query(q,(err,results)=>{
        if (err) throw err;
        var items = results;
        res.render("customers",{data:items});
        
        
    })
    
})

// Signing Up For The Website

app.get("/",(req,res)=>{
    res.render("index");
})

app.post("/register",(req,res)=>{
    var person = {
        name:req.body.name,
        street_name:req.body.street_name,
        house_number:req.body.zipcode,
        Landmark:req.body.landmark,
        email:req.body.email
    }
    connection.query("Insert into customers set ?",person,(err,result)=>{
        if (err) throw err;
        res.send("Thanks For Registering");
        
    })
})

//  --- SignUp Completed

// Placing An Order

app.get("/placeorder",(req,res)=>{

    res.render("placeOrder")
})

app.post("/registerorder",(req,res)=>{
    var orderStatus = Math.floor(Math.random()*10);
    var cust_email = req.body.email;
    var q = `select customer_id from customers where email='${cust_email}'`
    connection.query(q,(err,results)=>{
        if(err) {
            throw err;
        } else if (results.length===0) {
            res.send("Please Register");
        }
        else{
        console.log(results);
        var id = results[0].customer_id;
        var order = {
            package:req.body.order,
            customer_id:results[0].customer_id,
            shipped_from:faker.address.city(),
            shipment_status:orderStatus>5?'Dispatched':'Processing Order',
            shipping_id:Math.floor((Math.random()*100)+1)

        }
        connection.query("Insert Into orders set ?",order,(err,results)=>{
            if (err) throw err;
            var q =`Select order_id from orders where package='${req.body.order}' and customer_id='${id}'`
            
            connection.query(q,(err,results)=>{
               
                res.send("Thanks For Ordering Your Customer  Id is "+ id + " And Order Id is "+results[0].order_id );
            })
        })

    }})
    
})

//  --- Done Placing Order ---


// Tracking Order

app.get("/trackorder",(req,res)=>{
    res.render("trackOrder")
})

app.post('/placedorders',(req,res)=>{
    var q =`Select * from customers join orders on customers.customer_id = orders.customer_id join shippping_companies on orders.shipping_id = shippping_companies.id
    where orders.customer_id='${req.body.customer_id}';`
    connection.query(q,(err,results)=>{
        if (err) throw error;
        console.log(results);
        res.render('Orders',{yourOrders:results})
    })
})

// --- Done Tracking Order ---


// Deleting Orders

app.get("/cancelOrder",(req,res)=>{
    res.render("cancelOrder")
    
})

app.post("/cancel_order",(req,res)=>{
    var order_id = req.body.order_id;
    var q = `Select * from orders join customers on customers.customer_id = orders.customer_id where order_id='${order_id}'`;
    connection.query(q,(err,results)=>{
        if (err) throw err;
        
        res.render("cancelledOrder",{data:results[0]});
        var cancOrder = {
            package_name:results[0].package,
            reason:req.body.reason,
            customer_id:results[0].customer_id
        }
        connection.query("Insert Into cancelled_orders set ?",cancOrder,(err,results)=>{
            if (err) throw err;
        })
        var q = `delete from orders where order_id='${order_id}'`;
        connection.query(q,(err,results)=>{
            if (err) throw err;
            console.log(results);
        })
    })
})


app.listen(8000,() =>{
    console.log('Server Running On 8000');
})
