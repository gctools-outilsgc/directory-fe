import gql from 'graphql-tag';

export const GET = gql`
query getProfile($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    team {
      id
      organization {
        id
        nameEn
        nameFr
      }
      owner {
        gcID
        name
        avatar
        titleEn
        titleFr
      }
    }
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

export const SEARCH = gql`
query profileSearchQuery($name: String!) {
  profiles(name: $name) {
    gcID
    name
    email
    titleEn
    titleFr
    avatar
    team {
      id
      organization {
        id
        nameEn
        nameFr
      }
    }
    ownerOfTeams {
      id
      nameEn
    }
  }
}`;

export const GET_TEAM = gql`
query getTeam($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    name
    avatar
    titleEn
    titleFr
    team {
      id
      nameEn
      nameFr
      organization {
        id,
        nameEn,
        nameFr
      }
      owner {
        gcID
        name
        avatar
        titleEn
        titleFr
      }
      members {
        name
        titleEn
        avatar
      }
    }
  }
}`;

export const GET_YOUR_TEAM = gql`
query getYourTeam($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    name
    avatar
    titleEn
    titleFr
    team {
      id
      nameEn
      nameFr
      organization {
        id
      }
    }
    ownerOfTeams {
      id
      nameEn
      nameFr
      descriptionEn
      descriptionFr
      members {
        gcID
        name
        avatar
        titleEn
        titleFr
        team {
          id
          nameEn
          nameFr
        }
      }
      organization {
        id
        nameEn
        nameFr
      }
    }
  }
}`;

const profileDataForOrgChart = gql`
  fragment profileDataForOrgChart on Profile {
    gcID
    name
    avatar
    titleEn
    titleFr
  }
`;

const teamDataForOrgChart = gql`
  fragment teamDataForOrgChart on Team {
    id
    nameEn
    nameFr
  }
`;

export const ORGCHART = gql`
query orgChart($gcID: ID!) {
  profiles(gcID: $gcID) {
    ...profileDataForOrgChart
    ownerOfTeams {
      ...teamDataForOrgChart
      members {
        ...profileDataForOrgChart
      }
    }
    team {
      ...teamDataForOrgChart
      owner {
        ...profileDataForOrgChart
      }
      members {
        ...profileDataForOrgChart
      }
    }
  }
}
${profileDataForOrgChart}
${teamDataForOrgChart}
`;


export const EDIT = gql`
mutation editProfile($gcID: ID!, $data: ModifyProfileInput!) {
  modifyProfile(gcID: $gcID, data: $data) {
    gcID
    name
    email
    avatar
    mobilePhone
    officePhone
    team {
      id
    }
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
}
`;

export const EDIT_TEAM = gql`
mutation editTeam($gcID: ID!, $data: ModifyProfileInput!)
{
  modifyProfile(gcID: $gcID, data: $data){
    gcID
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
        team: valueOrUndefined({
          id: valueOrUndefined(data.teamId),
        }),
      },
    },
  };
};

export default GET;
