# Typing Game with FastAPI + Nextjs

タイピングゲーム

色々やろうとして時間がかかりすぎ

とりあえずタイピングは出来るようになったので終了


## Backend

- [x] FastAPI


### Routers

```
GET    `/problems`
POST   `/problems`
GET    `/problems/{problem_id}`
PUT    `/problems/{problem_id}`
DELETE `/problems/{problem_id}`
GET    `/records`
POST   `/records`
GET    `/records/{record_id}`
```


### Model

```python
from datetime import datetime
from pydantic import BaseModel


class Problem(BaseModel):
    id: int
    sentence: str


class Record(BaseModel):
    id: int
    duration: int
    registered_at: datetime
    problem_id: int
```


### Schema

```sql
-- sqlite> .schema problems
CREATE TABLE problems (
        id INTEGER NOT NULL,
        sentence VARCHAR(1024),
        PRIMARY KEY (id)
);

-- sqlite> .schema records
CREATE TABLE records (
        id INTEGER NOT NULL,
        duration INTEGER,
        registered_at DATETIME,
        problem_id INTEGER,
        PRIMARY KEY (id)
);
```


## Frontend

- [x] Nextjs
  - [x] Routing
- [x] Tailwindcss
