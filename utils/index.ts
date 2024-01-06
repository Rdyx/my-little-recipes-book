import slugify from "slugify";

export const getSlug = (str: string) => slugify(str, { lower: true });
