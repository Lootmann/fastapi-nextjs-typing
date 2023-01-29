from datetime import datetime

import pytest
import starlette.status

# noinspection PyUnresolvedReferences
from tests.init_async_client import async_client


@pytest.mark.asyncio
async def test_create_and_read(async_client):
    # create
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    data = {
        "duration": 102,
        "registered_at": current_date,
        "problem_id": 1,
    }
    resp = await async_client.post("/records", json=data)
    resp_obj = resp.json()
    assert resp.status_code == starlette.status.HTTP_200_OK
    assert resp_obj["duration"] == 102
    assert resp_obj["registered_at"] == current_date.replace(" ", "T")
    assert resp_obj["problem_id"] == 1

    # get
    resp = await async_client.get(f"/records/{resp_obj['id']}")
    resp_obj = resp.json()
    assert resp_obj["duration"] == 102
    assert resp_obj["registered_at"] == current_date.replace(" ", "T")
    assert resp_obj["problem_id"] == 1


@pytest.mark.asyncio
async def test_create_many_and_read(async_client):
    # create
    current_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    data = {
        "duration": 102,
        "registered_at": current_date,
        "problem_id": 1,
    }

    await async_client.post("/records", json=data)
    await async_client.post("/records", json=data)
    await async_client.post("/records", json=data)
    resp = await async_client.post("/records", json=data)
    assert resp.status_code == starlette.status.HTTP_200_OK

    # get
    resp = await async_client.get("/records")
    resp_obj = resp.json()
    assert len(resp_obj) == 4


@pytest.mark.asyncio
async def test_delete(async_client):
    # create
    data = {
        "duration": 59,
        "registered_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "problem_id": 12,
    }

    resp = await async_client.post("/records", json=data)
    assert resp.status_code == starlette.status.HTTP_200_OK

    resp_obj = resp.json()
    record_id = resp_obj["id"]

    # get
    resp = await async_client.get(f"/records/{record_id}")
    resp_obj = resp.json()

    assert resp.status_code == starlette.status.HTTP_200_OK
    assert resp_obj["problem_id"] == 12

    # delete
    await async_client.delete(f"/records/{record_id}")

    # get
    resp = await async_client.get(f"/records/{record_id}")
    resp_obj = resp.json()
    assert resp_obj is None

    resp = await async_client.get(f"/records")
    resp_obj = resp.json()
    assert len(resp_obj) == 0


@pytest.mark.asyncio
async def test_no_records_by_problem_id(async_client):
    resp = await async_client.get("/records/problems/1")
    resp_obj = resp.json()
    assert resp_obj == []


@pytest.mark.asyncio
async def test_record_by_problem_id(async_client):
    # create problems
    resp = await async_client.post("problems", json={"sentence": "hoge"})
    resp_obj = resp.json()
    assert resp.status_code == 200
    assert resp_obj["id"] == 1
    assert resp_obj["sentence"] == "hoge"

    problem_id = resp_obj["id"]

    # create records
    data = {
        "duration": 59,
        "registered_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S"),
        "problem_id": problem_id,
    }
    resp = await async_client.post("/records", json=data)
    assert resp.status_code == 200
    resp_obj = resp.json()

    assert resp_obj["id"] == 1
    assert resp_obj["problem_id"] == problem_id

    # test records
    resp = await async_client.get("/records")
    resp_obj = resp.json()
    assert len(resp_obj) == 1

    resp = await async_client.get(f"/records/problems/{problem_id}")
    resp_obj = resp.json()
    assert len(resp_obj) == 1
    assert resp_obj[0]["problem_id"] == problem_id
