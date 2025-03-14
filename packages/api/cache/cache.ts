export const cache: Record<string, any> = {};

//just usin simple cache.
// for production use solid cache like redis for persistence and also determine the cache busting strategy
export const getCache = (key: string) => {
  return cache[key];
};

export const setCache = (key: string, value: any) => {
  cache[key] = value;
};
