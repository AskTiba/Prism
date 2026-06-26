# Error Log

> Newest entries at top. Every non-trivial bug gets an entry at the time it's resolved.

| Date | Symptom | Root Cause | Resolution | Prevention |
|---|---|---|---|---|---|
| 2026-06-27 | `transactions/page.test.tsx` avatar test fails — `expect(imgs.length).toBeGreaterThanOrEqual(1)` finds 0 images | Mock data used `avatar: null` for all 10 transactions; component only renders `<img>` when avatar is truthy | Changed first mock item to include a valid avatar URL; removed unused `userEvent` import | Test mock data should match real data shape — include at least one item per conditional rendering path |

