/**
 * PM2 Ecosystem Config for Better Las Piñas (Nuxt 4)
 *
 * Usage:
 *   Build first:  pnpm build
 *   Start:        pm2 start ecosystem.config.cjs
 *   Save:         pm2 save
 *   Startup:      pm2 startup
 *
 * Requires PM2 v5+ for env_file support.
 */

module.exports = {
  apps: [
    {
      name: 'betterlaspinas',

      // Absolute path to symlink directory
      cwd: '/home/betterlaspinas/htdocs/betterlaspinas.org/current',

      // Nuxt 4 server output entry point
      script: 'server/index.mjs',

      // Load environment variables from .env automatically (PM2 v5+)
      env_file: '/home/betterlaspinas/htdocs/betterlaspinas.org/.env',

      // Auto-restart on crash
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      // Logging
      out_file: '/home/betterlaspinas/htdocs/betterlaspinas.org/logs/pm2-out.log',
      error_file: '/home/betterlaspinas/htdocs/betterlaspinas.org/logs/pm2-error.log',
      merge_logs: true,
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    },
  ],
}
