// test/initTransaction.spec.ts
import fs from 'fs';
import { test } from "@playwright/test";

test('Initialize transaction', async ({ page }) => {
  const transactionId = 'TX12345'; // Fetch from UI or API response
  const startTime = new Date().toISOString();

  fs.writeFileSync(
    'transaction-data.json',
    JSON.stringify({ transactionId, startTime }, null, 2)
  );
});
