import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

load_dotenv()

db_url = os.getenv("DATABASE_URL")

# Vercel/Supabase fix: SQLAlchemy 1.4+ requires 'postgresql://' instead of 'postgres://'
if db_url and db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)

if not db_url:
    # Vercel fix: Must use /tmp for any file writing
    print("WARNING: DATABASE_URL not found. Falling back to /tmp/test.db.")
    db_url = "sqlite:////tmp/test.db"

engine_args = {}
if db_url and "postgresql" in db_url:
    engine_args["pool_pre_ping"] = True
    # Ensure SSL is used for Supabase
    if "sslmode" not in db_url:
        engine_args["connect_args"] = {"sslmode": "require"}

engine = create_engine(db_url, **engine_args)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()
