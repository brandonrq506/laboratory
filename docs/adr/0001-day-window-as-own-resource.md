# Day Window is its own resource, not a preference

Day Windows live in a dedicated `day_windows` table and API (one row per user and day of the week, nullable Day Start and Day End stored as minutes since midnight), not in the `preferences` catalog. The catalog holds one non-null string per key, so a Day Window would need either 14 keys, whose "end later than start" rule spans two separately saved keys and can persist an invalid window, or a JSON string nothing validates. A table gives real nulls for "unset", a DB check for the cross-field rule, and per-day atomic saves.

## Considered Options

- **14 preference keys**: rejected; cross-key rule can't be enforced per write, `""` stands in for unset.
- **One JSON-string preference**: rejected; unvalidated blob, whole-week writes race and roll back together.
- **Typed jsonb preferences first**: deferred; rework of every existing preference ahead of need. When the next typed setting arrives, add a `value_type` to `preferences` instead. Repeated, rule-bearing settings get their own table; flat ones stay in the catalog.

## Consequences

- Minutes (not Postgres `time`) avoid Rails' time-zone conversion of `time` columns; the API speaks `"HH:mm"`.
- No row for a day of the week means both values are unset, so no seeding or backfill.
