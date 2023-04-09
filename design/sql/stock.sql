-- **drop**
drop table if exists k_day;
drop table if exists stock;
drop database stock;
drop role stock;

-- **create**
create role stock login password 's[b]tock[b]**23';
create database stock with encoding 'UTF-8' owner stock;

-- 股票
create table 
  stock (
    code varchar(6)  primary key, 
    name varchar(20) not null
  );
comment on table  stock      is '股票';
comment on column stock.code is '代码';
comment on column stock.name is '名称';

-- 日 K
create table 
  k_day (
    code  varchar(6)    primary key references stock, 
    date  date          not null,
    open  decimal(10,2) not null,
    close decimal(10,2) not null,
    low   decimal(10,2) not null,
    high  decimal(10,2) not null,
    vol   bigint        not null,
    amo   bigint        not null
  );
comment on table  k_day       is '日 K';
comment on column k_day.code  is '代码';
comment on column k_day.date  is '日期';
comment on column k_day.open  is '开盘价';
comment on column k_day.close is '收盘价';
comment on column k_day.low   is '最低价';
comment on column k_day.high  is '最高价';
comment on column k_day.vol   is '成交量(股)';
comment on column k_day.amo   is '成交额(元)';

-- **data**
insert into 
  stock(code, name) 
values
  ('000001', '平安银行'),
  ('600000', '浦发银行');

insert into 
  k_day(code, date, open, close, low, high, vol, amo) 
values
  ('000001', date('2023-04-07'), 12.57, 12.62, 12.50, 12.69, 60792500, 767354797),
  ('600000', date('2023-04-07'), 7.19, 7.23, 7.16, 7.24, 17465820, 125889350);

/*
select * from stock;
select * from k_day;
*/