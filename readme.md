# Smart Image Search Using Binary Search

Full-stack DSA project: React + Express + MySQL with a **real Binary Search** over a sorted in-memory index.

## Prerequisites
- Node.js ≥ 18
- MySQL ≥ 8 (or MariaDB 10.6+)

## 1. Set up MySQL

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

Add optional sample images: download 24 free JPEGs and name them `seed-lion-1.jpg`, `seed-lion-2.jpg`, … matching `database/seed.sql`, into `backend/uploads/`. Missing files still render a placeholder.

## 2. Backend

```bash
cd backend
cp .env.example .env
# edit .env with your DB credentials
npm install
npm run dev            # or: npm start
# listens on http://localhost:4000
```

## 3. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev            # http://localhost:5173
```

## 4. Run tests

```bash
cd backend
npm test
```

## Architecture summary
See `backend/services/searchIndex.js` and `backend/algorithms/binarySearch.js`. The sorted index is built once at startup, and incrementally updated on upload/delete — never rebuilt per request.

## API Reference

| Method | Path | Notes |
|---|---|---|
| GET | `/api/images?category=&sort=&page=&pageSize=` | Paginated listing |
| GET | `/api/images/search?q=&category=&sort=&compare=1` | Binary-search query |
| GET | `/api/images/:id` | Single image |
| POST | `/api/images` | multipart: `image`, `title`, `description`, `category`, `tags` (comma-separated) |
| DELETE | `/api/images/:id` | Removes row + file |
| GET | `/api/categories` | Distinct categories |
| GET | `/api/stats` | Total images/categories/tags |

### Example: search

```bash
curl "http://localhost:4000/api/images/search?q=lion&compare=1"
```

```json
{
  "ok": true,
  "query": "lion",
  "algorithm": "Binary Search",
  "resultCount": 3,
  "comparisonCount": 6,
  "searchTimeMs": 0.084,
  "linearComparison": { "comparisonCount": 47, "resultCount": 3 },
  "results": [ ... ]
}
```

### Example: upload

```bash
curl -X POST http://localhost:4000/api/images \
  -F image=@/path/to/file.jpg \
  -F "title=Lion Cub" \
  -F "description=Playful cub" \
  -F "category=Animals" \
  -F "tags=lion,lion cub,wild"
```

## Complexity
- Binary Search prefix: O(log n) + O(k) where k is number of matches.
- Linear Search comparison shown in UI is O(n).

## Troubleshooting
- `Error: Access denied for user` → wrong `DB_USER`/`DB_PASSWORD`.
- `ER_NO_SUCH_TABLE` → run `schema.sql`.
- Uploads fail → check `MAX_UPLOAD_BYTES`, ensure `backend/uploads/` is writable.
- `CORS error` → set `CORS_ORIGIN` in backend `.env` to your frontend origin.
- Gallery images 404 → place the demo files in `backend/uploads/` or re-upload via UI.