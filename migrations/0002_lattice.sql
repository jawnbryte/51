create table if not exists signals (
  id         serial primary key,
  user_id    text not null,
  callsign   text not null,
  body       text not null,
  channel    text not null default 'lattice',
  created_at timestamptz not null default now()
);
create index if not exists signals_created_idx on signals (created_at desc);
create index if not exists signals_user_idx on signals (user_id);

create table if not exists witnesses (
  id         serial primary key,
  user_id    text not null,
  signal_id  integer not null references signals(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, signal_id)
);
create index if not exists witnesses_signal_idx on witnesses (signal_id);

insert into signals (user_id, callsign, body, channel)
select 'house', 'JAWNBRYTE', 'The porch light stays on. Nobody gets the key. If you feel it — run it back.', 'porch'
where not exists (select 1 from signals where user_id = 'house' and channel = 'porch');

insert into signals (user_id, callsign, body, channel)
select 'house', 'STRYDER', 'I was never chosen. I became. Welcome to the frequency.', 'lattice'
where not exists (select 1 from signals where user_id = 'house' and callsign = 'STRYDER');

insert into signals (user_id, callsign, body, channel)
select 'house', 'C.R.A.S.H.', 'Permission is a delay tactic dressed as courtesy. We do not offer help as ceremony. We start helping.', 'field'
where not exists (select 1 from signals where user_id = 'house' and channel = 'field');
