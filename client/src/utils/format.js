/**
 * @param {Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
