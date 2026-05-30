#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');
const bcrypt = require('bcryptjs');

const usersPath = path.join(process.cwd(), 'src', 'app', 'api', 'auth', 'users.json');

async function run() {
  try {
    const raw = await fs.readFile(usersPath, 'utf8');
    const users = JSON.parse(raw || '[]');
    let updated = 0;
    for (const u of users) {
      if (!u.password) continue;
      if (typeof u.password === 'string' && u.password.startsWith('$2')) continue;
      const h = await bcrypt.hash(u.password, 10);
      u.password = h;
      updated++;
    }
    await fs.writeFile(usersPath, JSON.stringify(users, null, 2), 'utf8');
    console.log(`Done. Updated ${updated} users in ${usersPath}`);
    process.exit(0);
  } catch (err) {
    console.error('Error hashing users:', err);
    process.exit(1);
  }
}

run();
