drop database if exists hbotdb;
drop user if exists hbotuser;
create user hbotuser;
alter user hbotuser with encrypted password 'Pass1234';
CREATE database hbotdb;
grant all privileges on database hbotdb to hbotuser;