export const assumeLanguage = (obj, lang) => {
  const node = obj;
  if (obj.title[lang]) node.title = obj.title[lang];
  obj.direct_reports.forEach(child => assumeLanguage(child, lang));
};

export default assumeLanguage;
