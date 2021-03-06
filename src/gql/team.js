import gql from 'graphql-tag';

export const CREATE_TEAM = gql`
mutation createTeam(
  $nameEn: String!,
  $nameFr: String!,
  $descriptionEn: String,
  $descriptionFr: String,
  $organization: OrganizationInput!,
  $owner: TeamOwnerInput!
)
{
  createTeam(
    nameEn: $nameEn,
    nameFr: $nameFr,
    descriptionEn: $descriptionEn,
    descriptionFr: $descriptionFr,
    organization: $organization,
    owner: $owner
  ) {
    id
    nameEn
    nameFr
    descriptionEn
    descriptionFr
    organization {
      id
    }
    owner {
      gcID
      name
    }
  }
}`;

export const EDIT_A_TEAM = gql`
mutation modifyTeam(
  $id: ID!,
  $data: ModifyTeamInput!
)
{
  modifyTeam (
    id: $id,
    data: $data,
  ) {
    id
    nameEn
    nameFr
    descriptionEn
    descriptionFr
    organization {
      id
    }
    owner {
      gcID
      name
    }
  }
}`;

export default CREATE_TEAM;
