from sqlalchemy import Column, DateTime, Integer, String

from api.db import Base


class Record(Base):
    __tablename__ = "records"

    id = Column(Integer, primary_key=True)
    duration = Column(Integer)
    registered_at = Column(DateTime)
    problem_id = Column(Integer)
