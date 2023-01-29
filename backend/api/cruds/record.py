from typing import List

from sqlalchemy import select
from sqlalchemy.engine import Result
from sqlalchemy.ext.asyncio import AsyncSession

from api.models.record import Record
from api.schemas import record as schema


async def get_all_records(db: AsyncSession) -> List[Record]:
    result: Result = await (
        db.execute(
            select(
                Record.id,
                Record.duration,
                Record.registered_at,
                Record.problem_id,
            )
        )
    )
    return result.all()  # type: ignore


async def get_record(db: AsyncSession, record_id: int) -> Record | None:
    result: Result = await db.execute(select(Record).filter(Record.id == record_id))
    record: Record | None = result.first()  # type: ignore
    return record[0] if record else None


async def get_records_by_problem_id(db: AsyncSession, problem_id: int) -> List[Record] | None:
    result: Result = await db.execute(
        select(Record.id, Record.duration, Record.registered_at, Record.problem_id).filter(
            Record.problem_id == problem_id
        )
    )

    return result.all()  # type: ignore


async def create_record(db: AsyncSession, record_create: schema.RecordCreate) -> Record:
    record = Record(**record_create.dict())
    db.add(record)

    await db.commit()
    await db.refresh(record)

    return record


async def delete_record(db: AsyncSession, original: Record):
    await db.delete(original)
    await db.commit()
