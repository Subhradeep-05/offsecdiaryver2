-- ============================================================
-- OSD Website Database Schema (SQLite)
-- Reference DDL – tables are auto-created by SQLAlchemy on startup.
-- ============================================================

-- Enquiries (from Enquiry page & EnquiryTerminal page)
CREATE TABLE IF NOT EXISTS enquiries (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    org         TEXT,
    service     TEXT    NOT NULL,
    details     TEXT    NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Training Programme Applications
CREATE TABLE IF NOT EXISTS training_applications (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT    NOT NULL,
    education   TEXT,
    experience  TEXT,
    duration    TEXT    NOT NULL,
    motivation  TEXT    NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Internship Programme Applications
CREATE TABLE IF NOT EXISTS internship_applications (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT    NOT NULL,
    education   TEXT    NOT NULL,
    degree      TEXT    NOT NULL,
    duration    TEXT    NOT NULL,
    skills      TEXT    NOT NULL,
    motivation  TEXT    NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Shadow Corps Applications
CREATE TABLE IF NOT EXISTS shadow_corps_applications (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL,
    phone       TEXT    NOT NULL,
    college     TEXT    NOT NULL,
    role        TEXT    NOT NULL,
    followers   TEXT,
    experience  TEXT,
    motivation  TEXT    NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);
