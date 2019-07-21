const { NODE_ENV } = process.env;

function isDev() {
  return NODE_ENV !== 'production';
}

function isProd() {
  return NODE_ENV === 'production';
}
