const { NODE_ENV } = process.env;

export function isDev() {
  return NODE_ENV !== 'production';
}

export function isProd() {
  return NODE_ENV === 'production';
}
