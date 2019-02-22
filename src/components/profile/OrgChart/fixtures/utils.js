/* eslint-disable no-param-reassign */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
export const assumeLanguage = (obj, lang) => {
  const node = obj;
  if (obj.title[lang]) node.title = obj.title[lang];
  obj.direct_reports.forEach(child => assumeLanguage(child, lang));
};

export const linkAvatars = (node) => {
  if (node.avatar) {
    node.avatar = require(`./${node.avatar}`);
  }
  if (node.direct_reports) {
    node.direct_reports.forEach(n => linkAvatars(n));
  }
};

