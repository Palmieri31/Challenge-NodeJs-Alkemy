create database disneyworld;
use disneyworld;

create table users (
		id int not null auto_increment,
        email varchar(320),
        password varchar(255),
        constraint pk_users primary key(id)
);

create table characters (
		id int not null auto_increment,
        name varchar (50),
        age int,
        weight mediumint,
        history varchar (8000),
        image varchar(100),
        constraint pk_characters primary key(id)
);

create table movies (
		id int not null auto_increment,
		title varchar(50),
        release_date date,
        qualification tinyint,
        image varchar(100),
        constraint pk_movies primary key(id)
);

create table genres (
		id int not null auto_increment,
		name varchar(50),
		constraint pk_genres primary key(id)
);

create table charactersxmovies (
		characterId int,
		movieId int,
		constraint pk_charactersxmovies primary key (characterId, movieId),
		constraint fk_charactersxmovies_character foreign key(characterId) references characters(id) ON DELETE CASCADE ON UPDATE CASCADE,
		constraint fk_charactersxmovies_movie foreign key(movieId) references movies(id) ON DELETE CASCADE ON UPDATE CASCADE
);

create table moviesxgenres (
		movieId int,
        genreId int,
		constraint pk_moviesxgenres primary key (movieId, genreId),
        constraint fk_moviesxgenres_movie foreign key(movieId) references movies(id) ON DELETE CASCADE ON UPDATE CASCADE,
        constraint fk_moviesxgenres_genre foreign key(genreId) references genres(id) ON DELETE CASCADE ON UPDATE CASCADE
);

/* queries to insert genres*/
INSERT INTO genres (name) VALUES ('Action');
INSERT INTO genres (name) VALUES ('Adventure');
INSERT INTO genres (name) VALUES ('Animation');
INSERT INTO genres (name) VALUES ('Comedy');
INSERT INTO genres (name) VALUES ('Crime');
INSERT INTO genres (name) VALUES ('Documentary');
INSERT INTO genres (name) VALUES ('Family');
INSERT INTO genres (name) VALUES ('Fantasy');
INSERT INTO genres (name) VALUES ('History');
INSERT INTO genres (name) VALUES ('Music');
INSERT INTO genres (name) VALUES ('Mystery');
INSERT INTO genres (name) VALUES ('Romance');
INSERT INTO genres (name) VALUES ('Science Fiction');
INSERT INTO genres (name) VALUES ('War');