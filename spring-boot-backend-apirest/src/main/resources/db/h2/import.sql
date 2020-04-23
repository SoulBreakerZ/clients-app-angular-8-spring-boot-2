INSERT INTO REGION(id,name) VALUES (1,'South america');
INSERT INTO REGION(id,name) VALUES (2,'Central America');
INSERT INTO REGION(id,name) VALUES (3,'North America');
INSERT INTO REGION(id,name) VALUES (4,'Europe');
INSERT INTO REGION(id,name) VALUES (5,'Asia');
INSERT INTO REGION(id,name) VALUES (6,'Africa');
INSERT INTO REGION(id,name) VALUES (7,'Oceania');
INSERT INTO REGION(id,name) VALUES (8,'Antarctica');

INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Reimy','Antivilo','reimy.antivilo@gmail.com',NOW(),1);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Sergio','Antivilo','sergio.antivilo@gmail.com',NOW(),1);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Mario','Antivilo','mario.antivilo@gmail.com',NOW(),2);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Alberto','Antivilo','alberto.antivilo@gmail.com',NOW(),7);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Santiago','Antivilo','santiago.antivilo@gmail.com',NOW(),6);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Marco','Antivilo','marco.antivilo@gmail.com',NOW(),5);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Patricio','Antivilo','patricio.antivilo@gmail.com',NOW(),4);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Martin','Antivilo','martin.antivilo@gmail.com',NOW(),8);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Benjamin','Antivilo','benjamin.antivilo@gmail.com',NOW(),3);
INSERT INTO CLIENT(name,last_name,email,created_date,region_id) VALUES('Mark','Antivilo','mark.antivilo@gmail.com',NOW(),2);

INSERT INTO USER(username,password,enabled,name,last_name,email) VALUES('reimy','$2a$10$TIC33rNONDolFsxYvE4g.uVjivyLuJDIkZxJ/M34y/oKrOr/DRIry',1,'Reimy','Antivilo','reimy.antivilo@gmail.com');
INSERT INTO USER(username,password,enabled,name,last_name,email) VALUES('admin','$2a$10$f1MbMZHHC5HndHLdwYbg8eDtZPoTV7Nf3/YVydLHmTFLoHjM/tytC',1,'Admin','Antivilo','admin.antivilo@gmail.com');

INSERT INTO ROLE(name) VALUES('ROLE_USER');
INSERT INTO ROLE(name) VALUES('ROLE_ADMIN');

INSERT INTO USER_ROLES(user_id,roles_id) VALUES(1,1);
INSERT INTO USER_ROLES(user_id,roles_id) VALUES(2,2);
INSERT INTO USER_ROLES(user_id,roles_id) VALUES(2,1);