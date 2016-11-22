# --- Created by Ebean DDL
# To stop Ebean DDL generation, remove this comment and start using Evolutions

# --- !Ups

create table book (
  id                            bigint not null,
  title                         varchar(255),
  author                        varchar(255),
  description                   varchar(255),
  constraint pk_book primary key (id)
);
create sequence book_seq;

create table rating (
  id                            bigint not null,
  book_id                       bigint,
  user_email                    varchar(255),
  value                         double,
  constraint pk_rating primary key (id)
);
create sequence rating_seq;

create table user (
  email                         varchar(255) not null,
  name                          varchar(255),
  password                      varchar(255),
  constraint pk_user primary key (email)
);

alter table rating add constraint fk_rating_book_id foreign key (book_id) references book (id) on delete restrict on update restrict;
create index ix_rating_book_id on rating (book_id);

alter table rating add constraint fk_rating_user_email foreign key (user_email) references user (email) on delete restrict on update restrict;
create index ix_rating_user_email on rating (user_email);


# --- !Downs

alter table rating drop constraint if exists fk_rating_book_id;
drop index if exists ix_rating_book_id;

alter table rating drop constraint if exists fk_rating_user_email;
drop index if exists ix_rating_user_email;

drop table if exists book;
drop sequence if exists book_seq;

drop table if exists rating;
drop sequence if exists rating_seq;

drop table if exists user;

