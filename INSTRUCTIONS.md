# Migration Guide: SSR to SSG Artifact Deployment

This document outlines the mandatory steps you must take **before merging** the `chore/cd-migration` branch into `main`. Completing these steps ensures a seamless transition from the legacy PM2/SSR setup to the new high-performance, artifact-based static deployment.

---

## 🛠️ Phase 1: GitHub Repository Configuration

The new deployment "bakes" environment variables into the static files during the build process. You must add these to your GitHub Actions Secrets.

### 1. Update/Verify Existing Secrets
Go to **Settings > Secrets and variables > Actions** and ensure these are correct:
- `SERVER_IP`: Your server's public IP.
- `SERVER_USER`: The SSH username (e.g., `root` or `deploy`).
- `SERVER_SSH_KEY`: Your private SSH key.
- `SERVER_DOMAIN`: The domain name used in your file paths (e.g., `betterlaspinas.org`).
- `SERVER_PORT`: (Optional) Defaults to `22`.

### 2. Add New Configuration Secrets
Add the following `NUXT_PUBLIC_SITE_*` secrets to match your LGU configuration:
- `NUXT_PUBLIC_SITE_LGU_TYPE` (e.g., "City")
- `NUXT_PUBLIC_SITE_MUNICIPALITY` (e.g., "Las Piñas")
- `NUXT_PUBLIC_SITE_PROVINCE` (e.g., "Metro Manila")
- `NUXT_PUBLIC_SITE_REGION` (e.g., "NCR")
- `NUXT_PUBLIC_SITE_SITE_ID` (e.g., "betterlaspinas")
- `NUXT_PUBLIC_SITE_DOMAIN` (e.g., "betterlaspinas.org")
- `NUXT_PUBLIC_SITE_TAGLINE`
- `NUXT_PUBLIC_SITE_THEME_COLOR`
- `NUXT_PUBLIC_SITE_OFFICIAL_WEBSITE`

---

## 🏗️ Phase 2: Server Infrastructure Preparation

Run these commands on your production server to set up the new release-based directory structure.

### 1. Create the Releases Directory
Navigate to your project root and create the folder where historical versions will be stored:
```bash
mkdir -p ~/htdocs/betterlaspinas.org/releases
```

### 2. Clean Up Legacy PM2 Process
Once you merge and the first static deployment succeeds, you will no longer need the Node.js server running in the background.
```bash
pm2 stop betterlaspinas
pm2 delete betterlaspinas
pm2 save
```

---

## 🌐 Phase 3: Web Server Configuration (Nginx/Apache)

You must update your web server's "root" to point to the new `current` symlink.

### 1. Update Nginx Config
Edit your site configuration (e.g., `/etc/nginx/sites-available/betterlaspinas.org`):

```nginx
server {
    server_name betterlaspinas.org www.betterlaspinas.org;
    
    # POINT THIS TO THE NEW 'CURRENT' SYMLINK
    root /home/YOUR_USER/htdocs/betterlaspinas.org/current;
    index index.html;

    location / {
        # Critical for Nuxt/Vue client-side routing
        try_files $uri $uri/ /index.html;
    }

    # Optional: Cache static assets
    location /_nuxt/ {
        expires 1y;
        add_header Cache-Control "public, no-transform";
    }
}
```

### 2. Test and Reload
```bash
sudo nginx -t
sudo systemctl reload nginx
```

---

## 🚀 Phase 4: The Merge & Verification

1. **Merge the PR**: Merge `chore/cd-migration` into `main`.
2. **Monitor GitHub Actions**: Ensure the `Continuous Deployment` workflow finishes successfully.
3. **Verify Symlink**: On the server, check that `current` now points to the latest release:
   ```bash
   ls -la ~/htdocs/betterlaspinas.org/current
   ```
4. **Test Rollback**: If anything goes wrong, go to GitHub Actions, select **Rollback Deployment**, and run it to instantly revert to the previous state.

---

## 💡 Summary of Key Changes
- **No Node.js on Server**: You no longer need `node` or `pnpm` installed on your production server.
- **No `.env` on Server**: Configuration is baked in at build-time. Updates require a new GitHub Action run.
- **Atomic Swaps**: Deployments are now instant and zero-downtime via symlink swaps.
- **History**: The last 10 deployments are kept in `releases/` for your safety.
