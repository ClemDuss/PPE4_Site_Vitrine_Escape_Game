use base_escape_game;

create table news(
	id int primary key auto_increment,
    title varchar(100),
    startDate datetime,
    endDate datetime,
    description varchar(500),
    activated boolean default true
)engine InnoDB;

insert into news(title, startDate, endDate, description) values
	('Avant noël', '2020-11-15', '2020-12-23', 'Venez préparer noël chez nous !'),
	('Noël', '2020-12-25', '2020-12-25', 'Venez profiter d\'énigmes exceptionnelles en cette journée du 24 décembre !'),
	('Nouvel An', '2020-12-31', '2020-12-31', 'Venez profiter de cette journée de l\'année entre amis ou en famille ! Pour l\'occasion, nous sommes mêmes ouverts jusqu\'à 2h du matin !'),
	('Nos 3 ans !', '2020-05-15', '2020-06-15', 'Pour les trois ans de notre groupe, venez profiter de promotion exceptionnelles !'),
	('La fin des cours', '2020-06-30', '2020-06-30', 'Viens décompresser une fois ton année scolaire bien terminée !');

drop table if exists displayParameters;
create table displayParameters(
	id int primary key auto_increment,
    displayName varchar(20) unique,
    parameter varchar(50)
)engine InnoDB;

truncate table displayParameters;
insert into displayParameters(displayName, parameter) values
	('reviews', 'random;3'),
	('pictures', 'random;6');
    
select * from displayParameters;