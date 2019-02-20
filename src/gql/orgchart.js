import gql from 'graphql-tag';

export const GET = gql`
query getOrgChart($gcIDa: String!, $gcIDb: String) {
  orgchart(gcIDa: $gcIDa, gcIDb: $gcIDb) {
    boxes {
      id
      x
      y
      on_path
      width
      height
      node {
        avatar
        name
        titleEn
        root
        x
        y
      }
    }
    lines {
      id
      d
      on_path
    }
    miniboxes {
      id
      x
      y
      on_path
      width
      height
      node {
        avatar
        name
        titleEn
        root
        x
        y
      }
    }
    minilines {
      id
      d
      on_path
    }
  }
}`;

export default GET;
