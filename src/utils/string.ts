export const toUrl = (str: string): string =>
  str.replace(/\s+/g, "-").toLowerCase();
