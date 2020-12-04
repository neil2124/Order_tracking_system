
-- Created Customers Table 

create table customers(customer_id int  not null Auto_Increment, name varchar(100),
street_name varchar(100), house_number varchar(50), Landmark
varchar(100), email varchar(100) not null,primary key(customer_id));

-- Inserted A Few Users

Insert Into customers(name,street_name,house_number,Landmark,email) 
values 

('Neil Mascarenhas','Ambadi Road','b-5','Ambadi Crosss','neilmassy2001@gmail.com');

-- Created Orders Table

create table orders(order_id int not null Auto_Increment primary key, package varchar(100) not null, customer_id int,shipped_from varchar(100), shipment_status varchar(20),shipping_id int, foreign key(customer_id) references customers(customer_id) on delete cascade,foreign key (shipping_id) references shippping_companies(id));


-- Joining Customers And Orders

Select * from customers join orders on customers.customer_id = orders.customer_id
where orders.customer_id=102;

-- Cancelled Orders
create table cancelled_orders(id int not null Auto_Increment primary key,package_name varchar(100) not null,reason varchar(100),customer_id int,foreign key (customer_id) references customers(customer_id));


-- Created Shipping Company Table 

create table shippping_companies(id int not null Auto_Increment primary key,name varchar(100));


