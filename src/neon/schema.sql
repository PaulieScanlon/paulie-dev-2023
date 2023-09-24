CREATE TABLE analytics (
  id            SERIAL PRIMARY KEY,          
  date          TIMESTAMP WITH TIME ZONE NOT NULL,
  slug          VARCHAR NOT NULL,
  flag          VARCHAR,
  country       VARCHAR,
  city          VARCHAR,
  latitude      DECIMAL,
  longitude     DECIMAL
);