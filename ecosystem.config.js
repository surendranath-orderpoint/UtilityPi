module.exports = {
  apps : [{
    name: 'oputility',
    script: 'index.js',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
