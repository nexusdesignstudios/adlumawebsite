
# Adluma New Style

React (Vite) frontend + Laravel API backend for Adluma’s marketing site, including an Admin dashboard to manage content.

## Tech Stack
- Frontend: React + Vite + Tailwind
- Backend: Laravel + Sanctum
- Database: MySQL (production), SQLite/MySQL (local)

## Local Development
- Frontend
  - npm i
  - npm run dev (http://localhost:5173)
- Backend
  - cd backend
  - composer install
  - cp .env.example .env and set DB_*
  - php artisan key:generate
  - php artisan migrate --force
  - php artisan serve --host=127.0.0.1 --port=8000

## Admin Dashboard
- URL: /admin
- Login: via backend API (Sanctum)
- Manage: Hero background media, Trusted Brands, Team, etc.

## API Base (Production)
- Frontend and Admin use relative paths: /api/...
- Laravel serves API under /api/* and the SPA for non-/api paths

## Deployment (Hostinger hPanel, Single Domain, One Zip)
Goal: one upload + one extract in File Manager; site runs under one domain.

1) Build frontend
- npm run build
- Copy dist/ into backend/public/app (index.html at backend/public/app/index.html)

2) Prepare backend locally
- cd backend
- composer install --no-dev --optimize-autoloader
- php artisan key:generate
- php artisan config:cache
- php artisan route:cache
- php artisan view:cache
- Set .env (APP_ENV=production, APP_URL=https://yourdomain.com, DB_* values)

3) Upload structure (if docroot is public_html)
- Put contents of backend/public into public_html (including app/)
- Place the rest of Laravel (vendor, bootstrap, app, routes, config, storage) one level above public_html
- Edit public_html/index.php paths if needed:
  - require __DIR__.'/../laravel/vendor/autoload.php';
  - $app = require_once __DIR__.'/../laravel/bootstrap/app.php';

4) Database
- Create DB/user in hPanel
- Import schema via phpMyAdmin (or run migrations over SSH)

5) Permissions
- Ensure storage and bootstrap/cache writable

6) Verify
- Visit https://yourdomain.com
- /admin loads the dashboard
- /api/trusted-brands returns JSON

## Hostinger Shared Hosting: Single Domain (Detailed)

Structure
- /home/username/laravel_app → full Laravel project (outside public_html)
- /home/username/public_html → React build + Laravel public files

🚀 STEP 1 — Prepare React for Production
- npm run build
- Output: dist/ (Vite)

🚀 STEP 2 — Prepare Laravel for Production
- composer install --optimize-autoloader --no-dev
- php artisan config:clear
- php artisan route:clear
- php artisan view:clear
- php artisan config:cache
- php artisan route:cache
- .env: APP_ENV=production, APP_DEBUG=false

🚀 STEP 3 — Upload Files to Hostinger
1) Upload Laravel project
- Upload entire Laravel folder to /home/username/laravel_app (not inside public_html)
2) Move Laravel public files
- Copy all files from laravel_app/public → public_html/
- Domain points to Laravel front controller

🚀 STEP 4 — Edit index.php
- public_html/index.php
- require __DIR__.'/../laravel_app/vendor/autoload.php';
- $app = require_once __DIR__.'/../laravel_app/bootstrap/app.php';
- Adjust if folder name differs

🚀 STEP 5 — Upload React Build
- Copy CONTENTS of dist/ into public_html/ (not the folder itself)
- public_html contains: index.php (Laravel), index.html (React), assets/, css/, js/

🚀 STEP 6 — Separate React & Laravel Routing
- Recommended: React serves at root; Laravel serves API under /api/*
- routes/api.php already prefixes /api; if not, use:
- Route::prefix('api')->group(function () { /* routes */ });

🚀 STEP 7 — Fix React Router (.htaccess)
- public_html/.htaccess:
```
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```

🚀 STEP 8 — Setup Database
- Create MySQL DB in hPanel; update .env: DB_DATABASE, DB_USERNAME, DB_PASSWORD
- Migrate with SSH: php artisan migrate --force
- Or import SQL via phpMyAdmin

🚀 STEP 9 — Update React API URL
- Use const API_URL = "/api" or relative fetch("/api/...")
- Rebuild: npm run build and re-upload

Final Correct Structure Example
- /home/u123456/laravel_app/{app, routes, vendor, ...}
- /home/u123456/public_html/{index.php, index.html, assets, .htaccess}

## Notes
- .gitignore excludes secrets (.env) and heavy folders (node_modules, vendor, build output)
- For subdomains (optional): host React at app.yourdomain.com and Laravel at api.yourdomain.com; set API base accordingly
