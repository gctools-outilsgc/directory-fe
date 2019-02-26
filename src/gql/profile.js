import gql from 'graphql-tag';

export const GET = gql`
query getProfile($gcID: String!) {
  profiles(gcID: $gcID) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    address {
      id
      streetAddress
      city
      province
      postalCode
      country
    }
    titleEn
    titleFr
  }
}`;

export const GET_TEAM = gql`
query getTeam($gcID: String!) {
  profiles(gcID: $gcID) {
    gcID
    name
    avatar
    titleEn
    titleFr
    supervisor {
      gcID
      name
      titleEn
      titleFr
    }
    team {
      nameEn
      nameFr
    }
  }
}`;

export const EDIT = gql`
mutation editProfile($gcID: String!, $data: ModifyProfileInput!) {
  modifyProfile(gcID: $gcID, data: $data) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    address {
      id
      streetAddress
      city
      province
      postalCode
      country
    }
    titleEn
    titleFr
    supervisor {
      gcID
    }
  }
}
`;

export const EDIT_TEAM = gql`
mutation editTeam($gcID: String!, $data: ModifyProfileInput!)
{
  modifyProfile(gcID: $gcID, data: $data){
    gcID
    supervisor {
      gcID
    }
    team {
      id
    }
  }
}
`;

/**
 * Prepare variables suitable for the editProfile mutation
 * @param {object} data Object with the following keys:
 * @param {string} data.gcID Profile's GCID
 * @param {string} data.name Name (required)
 * @param {string} data.email Email (required)
 * @param {string} data.titleEn English title
 * @param {string} data.titleFr French title
 * @param {string} data.officePhone Office phone number
 * @param {string} data.mobilePhone Mobile phone
 * @param {string} data.streetAddress Street Address
 * @param {string} data.city City
 * @param {string} data.province Province
 * @param {string} data.postalCode Postal code
 * @param {string} data.country Country
 */
export const prepareEditProfile = (data) => {
  const valueOrUndefined = (v) => {
    if (typeof v === 'object') {
      const test = Object.keys(v).reduce((t, c) =>
        t || typeof v[c] !== 'undefined', false);
      return (test) ? v : undefined;
    }
    if (v && v !== '') return v;
    return undefined;
  };
  const {
    gcID,
    name, email, titleEn, titleFr, officePhone, mobilePhone,
    streetAddress, city, province, postalCode, country,
  } = data;
  return {
    variables: {
      gcID,
      data: {
        name,
        email,
        titleEn: valueOrUndefined(titleEn),
        titleFr: valueOrUndefined(titleFr),
        officePhone: valueOrUndefined(officePhone),
        mobilePhone: valueOrUndefined(mobilePhone),
        address: valueOrUndefined({
          streetAddress: valueOrUndefined(streetAddress),
          city: valueOrUndefined(city),
          province: valueOrUndefined(province),
          postalCode: valueOrUndefined(postalCode),
          country: valueOrUndefined(country),
        }),
      },
    },
  };
};

export default GET;
