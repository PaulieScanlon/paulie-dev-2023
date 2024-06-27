CREATE TABLE analytics (
  id            SERIAL PRIMARY KEY,          
  date          TIMESTAMP WITH TIME ZONE NOT NULL,
  title         VARCHAR,
  slug          VARCHAR NOT NULL,
  referrer      VARCHAR,
  flag          VARCHAR,
  country       VARCHAR,
  city          VARCHAR,
  latitude      DECIMAL,
  longitude     DECIMAL
);

CREATE TABLE reactions (
  id            SERIAL PRIMARY KEY,          
  date          TIMESTAMP WITH TIME ZONE NOT NULL,
  title         VARCHAR,
  slug          VARCHAR NOT NULL,
  reaction      VARCHAR NOT NULL,
  flag          VARCHAR,
  country       VARCHAR,
  city          VARCHAR,
  latitude      DECIMAL,
  longitude     DECIMAL
);