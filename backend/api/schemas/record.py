from datetime import datetime

from pydantic import BaseModel, Field


class RecordBase(BaseModel):
    duration: int = Field(0, example=102)
    registered_at: datetime = Field(
        datetime.now(), example=datetime.now().strftime("%Y-%m-%dT%H:%M:%S")
    )
    problem_id: int = Field(0, exmaple=0)


class RecordCreate(RecordBase):
    pass


class RecordCreateResponse(RecordCreate):
    id: int

    class Config:
        orm_mode = True


class Record(RecordBase):
    id: int

    class Config:
        orm_mode = True
