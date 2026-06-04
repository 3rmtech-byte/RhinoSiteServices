CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  qr_code TEXT UNIQUE,
  estado TEXT NOT NULL,
  ubicacion_lat DOUBLE PRECISION,
  ubicacion_lng DOUBLE PRECISION,
  notas TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo_servicio TEXT NOT NULL,
  cliente TEXT NOT NULL,
  direccion TEXT NOT NULL,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  unidad_id UUID REFERENCES units(id),
  fecha_programada TIMESTAMP NOT NULL,
  estado TEXT NOT NULL,
  notas TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS job_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offline_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tipo TEXT NOT NULL,
  version TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jobs_fecha ON jobs(fecha_programada);
CREATE INDEX IF NOT EXISTS idx_jobs_estado ON jobs(estado);
CREATE INDEX IF NOT EXISTS idx_units_estado ON units(estado);
