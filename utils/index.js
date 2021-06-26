/** Sorts most recent date */
export const sortMostRecentDate = (a, b) => {
  return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
};

/** Number of items to be shown on the _Home Page_ */
export const maxToDisplay = 6;
