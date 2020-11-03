const domains = [
  'cmhc-schl.gc.ca',
  'cfmws.com',
  'cbc.ca',
  // ola.org,
  'ccc.ca',
  'forces.gc.ca',
  'ccohs.ca',
  // investpsp.ca,
  // invcanada.ca,
  '.gc.ca',
  // glpa-apgl.com,
  // museedelaguerre.ca,
  // warmuseum.ca,
  'nature.ca',
  // quai21.ca,
  // pier21.ca,
  // museedelhistoire.ca,
  // historymuseum.ca,
  // viarail.ca,
  // wdbridge.com,
  'scc.ca',
  // seaway.ca,
  'mint.ca',
  // sct-trp.ca,
  'onf.ca',
  'nfb.ca',
  'ncc-ccn.ca',
  // mentalhealthcommission.ca,
  'crdi.ca',
  'idrc.ca',
  'ijc.org',
  // trc.ca,
  'federalbridge.ca',
  'fcc-fac.ca',
  'edc.ca',
  // destinationcanada.com,
  // ctc-cct.ca,
  // elections.ca,
  // droitsdelapersonne.ca,
  // humanrights.ca,
  // schl.ca,
  // cmhc.ca,
  // techno-science.ca,
  // postescanada.ca,
  // canadapost.ca,
  // clc.ca,
  // Innovation.ca,
  // cdic.ca,
  // conseildesarts.ca,
  // canadacouncil.ca,
  // bdc.ca,
  'bankofcanada.ca',
  'bank-banque-canada.ca',
  // aecl.ca,
  // asiapacific.ca,
  'canada.ca',
];

let govEmail = false;

const isGovEmail = (email) => {
  domains.map((value) => {
    if (email.includes(value)) {
      govEmail = true;
    }
    return null;
  });

  return govEmail;
};

export default isGovEmail;
