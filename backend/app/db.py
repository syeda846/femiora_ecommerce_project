"""
db.py — Database connection setup.
Creates the SQLAlchemy engine, session factory, and Base class
that all models inherit from.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:postgres@localhost:5432/femiora")

# engine: manages the actual connection pool to Postgres
engine = create_engine(DATABASE_URL)

# SessionLocal: factory that creates new DB sessions per request
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base: parent class every SQLAlchemy model inherits from
Base = declarative_base()


def get_db():
    """
    Dependency used in routes via Depends(get_db).
    Opens a DB session, yields it to the route, then closes it
    after the request finishes (even if an error occurs).
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()