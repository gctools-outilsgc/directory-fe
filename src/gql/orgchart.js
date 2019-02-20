import gql from 'graphql-tag';

export const GET = gql`
query getOrgChart($gcIDa: String!, $gcIDb: String, $leftGutter: Float) {
  orgchart(gcIDa: $gcIDa, gcIDb: $gcIDb, leftGutter: $leftGutter) {
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
