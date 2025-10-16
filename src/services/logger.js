export default {
  info(...args) {
    console.info('[INFO]', ...args);
  },
  
  error(...args) {
    console.error('[ERROR]', ...args);
  }
};