
 create database prema_feedback_db;
 
 use prema_feedback_db;
 
 drop table user_detail;
 
 create table user_detail(
	name varchar(100)NOT NULL,
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL,
	role varchar (1) NOT NULL,
	PRIMARY KEY (email)  
 );

 
 drop table feedback_detail;
 
 create Table feedback_detail(
	 email varchar(50) NOT NULL,
	 course varchar(50) NOT NULL,
	 rating varchar(50) NOT NULL,
	 suggestion varchar (1000) NOT NULL,
	 FOREIGN KEY (email) REFERENCES user_detail(email)
 );
 
 
  insert into user_detail values
 ('k1','k1@gmail.com','12345','S'),
 ('k2','k2@gmail.com','12345','S'),
 ('k3','k3@gmail.com','12345','S'),
 ('k4','k4@gmail.com','12345','S'),
 ('k5','k5@gmail.com','12345','S'),
 ('k6','k6@gmail.com','12345','S'),
 ('k7','k7@gmail.com','12345','S'),
 ('k8','k8@gmail.com','12345','S'),
 ('k9','k9@gmail.com','12345','S'),
 ('k10','k10@gmail.com','12345','S');
 
 
 
 insert into feedback_detail values('k1@gmail.com','JAVA','4','Good'),
 ('k2@gmail.com','JAVA','4','Good'),
 ('k3@gmail.com','C','3','Good'),
 ('k4@gmail.com','C++','4','Good'),
 ('k5@gmail.com','PYTHON','5','Good'),
 ('k6@gmail.com','JAVA','3','Good'),
 ('k7@gmail.com','C','2','Good'),
 ('k8@gmail.com','C++','1','Good'),
 ('k9@gmail.com','JAVA','4','Good'),
 ('k10@gmail.com','PYTHON','1','Good');