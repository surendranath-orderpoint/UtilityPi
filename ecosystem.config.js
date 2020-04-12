module.exports = {
  apps : [{
    name: 'oputility',
    script: 'index.js',
    autorestart: true,
    watch: true,
    ignore_watch : ["node_modules", "vault"],
    watch_delay: 7000,
    max_memory_restart: '1G'
  }]
};
