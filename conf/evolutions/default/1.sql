# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table book (
  id                            integer auto_increment not null,
  title                         varchar(255),
  author                        varchar(255),
  description                   varchar(255),
  constraint pk_book primary key (id)
);

create table book_genre (
  book_id                       integer not null,
  genre_name                    varchar(255) not null,
  constraint pk_book_genre primary key (book_id,genre_name)
);

create table book_list (
  id                            integer auto_increment not null,
  status                        varchar(255),
  user_email                    varchar(255),
  constraint pk_book_list primary key (id)
);

create table book_list_book (
  book_list_id                  integer not null,
  book_id                       integer not null,
  constraint pk_book_list_book primary key (book_list_id,book_id)
);

create table comment (
  id                            integer auto_increment not null,
  user_email                    varchar(255),
  book_id                       integer,
  text                          varchar(255),
  constraint pk_comment primary key (id)
);

create table genre (
  name                          varchar(255) not null,
  constraint pk_genre primary key (name)
);

create table rating (
  id                            integer auto_increment not null,
  book_id                       integer,
  user_email                    varchar(255),
  value                         double,
  constraint pk_rating primary key (id)
);

create table user (
  email                         varchar(255) not null,
  name                          varchar(255),
  password                      varchar(255),
  constraint pk_user primary key (email)
);

alter table book_genre add constraint fk_book_genre_book foreign key (book_id) references book (id) on delete restrict on update restrict;
create index ix_book_genre_book on book_genre (book_id);

alter table book_genre add constraint fk_book_genre_genre foreign key (genre_name) references genre (name) on delete restrict on update restrict;
create index ix_book_genre_genre on book_genre (genre_name);

alter table book_list add constraint fk_book_list_user_email foreign key (user_email) references user (email) on delete restrict on update restrict;
create index ix_book_list_user_email on book_list (user_email);

alter table book_list_book add constraint fk_book_list_book_book_list foreign key (book_list_id) references book_list (id) on delete restrict on update restrict;
create index ix_book_list_book_book_list on book_list_book (book_list_id);

alter table book_list_book add constraint fk_book_list_book_book foreign key (book_id) references book (id) on delete restrict on update restrict;
create index ix_book_list_book_book on book_list_book (book_id);

alter table comment add constraint fk_comment_user_email foreign key (user_email) references user (email) on delete restrict on update restrict;
create index ix_comment_user_email on comment (user_email);

alter table comment add constraint fk_comment_book_id foreign key (book_id) references book (id) on delete restrict on update restrict;
create index ix_comment_book_id on comment (book_id);

alter table rating add constraint fk_rating_book_id foreign key (book_id) references book (id) on delete restrict on update restrict;
create index ix_rating_book_id on rating (book_id);

alter table rating add constraint fk_rating_user_email foreign key (user_email) references user (email) on delete restrict on update restrict;
create index ix_rating_user_email on rating (user_email);


# --- !Downs

alter table book_genre drop foreign key fk_book_genre_book;
drop index ix_book_genre_book on book_genre;

alter table book_genre drop foreign key fk_book_genre_genre;
drop index ix_book_genre_genre on book_genre;

alter table book_list drop foreign key fk_book_list_user_email;
drop index ix_book_list_user_email on book_list;

alter table book_list_book drop foreign key fk_book_list_book_book_list;
drop index ix_book_list_book_book_list on book_list_book;

alter table book_list_book drop foreign key fk_book_list_book_book;
drop index ix_book_list_book_book on book_list_book;

alter table comment drop foreign key fk_comment_user_email;
drop index ix_comment_user_email on comment;

alter table comment drop foreign key fk_comment_book_id;
drop index ix_comment_book_id on comment;

alter table rating drop foreign key fk_rating_book_id;
drop index ix_rating_book_id on rating;

alter table rating drop foreign key fk_rating_user_email;
drop index ix_rating_user_email on rating;

drop table if exists book;

drop table if exists book_genre;

drop table if exists book_list;

drop table if exists book_list_book;

drop table if exists comment;

drop table if exists genre;

drop table if exists rating;

drop table if exists user;

