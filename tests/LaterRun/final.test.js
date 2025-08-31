import fs from 'fs';
import { test, expect } from "@playwright/test";
test('Validate transaction occurred within 1 hour of startTime', async ({ page }) => {
  // 1. Read saved start time
  const { startTime } = JSON.parse(fs.readFileSync('transaction-data.json', 'utf-8'));
  const startUTC = new Date(startTime); // ISO string (UTC)

  // 2. Get UI timestamp
//   await page.goto('https://yourapp.com/transaction/details');
  const uiTimestampRaw = '20-06-2025 00:39 IST';

  // 3. Parse IST timestamp manually (as IST is +5:30)
  const cleaned = uiTimestampRaw.replace(' IST', '');
  const [datePart, timePart] = cleaned.split(' ');
  const [day, month, year] = datePart.split('-').map(Number);
  const [hour, minute] = timePart.split(':').map(Number);

  // Create Date object in IST and convert to UTC
  const istTimestamp = new Date(Date.UTC(year, month - 1, day, hour - 5, minute - 30));

  // 4. Calculate time difference
  const diffMs = istTimestamp.getTime() - startUTC.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  // 5. Debug logs
  console.log('Start UTC:', startUTC.toISOString());
  console.log('UI Timestamp (IST converted to UTC):', istTimestamp.toISOString());
  console.log('Time diff (mins):', diffMinutes.toFixed(2));

  // 6. Assertions
  expect(diffMinutes).toBeGreaterThanOrEqual(0);
  expect(diffMinutes).toBeLessThanOrEqual(60);
});
