import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DB_PATH = join(__dirname, '..', 'data.json');

function load() {
  if (!existsSync(DB_PATH)) return {};
  try {
    return JSON.parse(readFileSync(DB_PATH, 'utf-8'));
  } catch {
    return {};
  }
}

function save(data) {
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

export const db = {
  init() {
    const tables = [
      'users', 'companies', 'customers', 'campaigns',
      'analytics_daily', 'activity_log', 'integrations',
      'health_items', 'recommendations', 'invoices',
    ];
    const data = load();
    let changed = false;
    for (const t of tables) {
      if (!data[t]) { data[t] = []; changed = true; }
    }
    if (changed) save(data);
  },

  all(table, where) {
    const data = load();
    const rows = data[table] || [];
    return where ? rows.filter(where) : rows;
  },

  get(table, where) {
    return this.all(table, where)[0];
  },

  run(table, row) {
    const data = load();
    if (!data[table]) data[table] = [];
    data[table].push(row);
    save(data);
  },

  update(table, match, updates) {
    const data = load();
    if (!data[table]) return;
    data[table] = data[table].map((row) => match(row) ? { ...row, ...updates } : row);
    save(data);
  },

  count(table, where) {
    return where ? this.all(table, where).length : (load()[table] || []).length;
  },

  sum(table, field, where) {
    const rows = where ? this.all(table, where) : this.all(table);
    return rows.reduce((acc, r) => acc + (r[field] || 0), 0);
  },

  nextId() {
    const data = load();
    let max = 0;
    for (const t of Object.values(data)) {
      for (const r of t) {
        if (typeof r.id === 'number' && r.id > max) max = r.id;
      }
    }
    return max + 1;
  },
};

db.init();
