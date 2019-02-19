export const getNode = (node, uuid) => {
  if (node.uuid === uuid) return node;
  for (let x = 0; x < node.direct_reports.length; x += 1) {
    const n = getNode(node.direct_reports[x], uuid);
    if (n) return n;
  }
  return false;
};

export const copyNode = (node) => {
  const newNode = Object.assign(
    {},
    node,
    { direct_reports: [], parent: null },
  );
  node.direct_reports
    .forEach(child => newNode.direct_reports.push(copyNode(child)));
  return newNode;
};

export const assumeLanguage = (obj, lang) => {
  const node = obj;
  if (obj.title[lang]) node.title = obj.title[lang];
  obj.direct_reports.forEach(child => assumeLanguage(child, lang));
};
