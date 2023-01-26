# Typing Game with FastAPI + Nextjs

タイピングゲーム


## Features

- 過去のタイピング記録を残しておく
  - パフォーマンスが時系列的にどれのくらい上がったのかを分析


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
    actual_typing: str
    duration: int
    registered_at: datetime
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
        actual_typing VARCHAR(9999),
        duration INTEGER,
        registered_at DATETIME,
        PRIMARY KEY (id)
);
```


## Frontend

- [ ] Nextjs
  - [ ] Routing
- [ ] Tailwindcss
- [ ] Axios
