/* eslint-disable no-console */
import React from 'react';

import gql from 'graphql-tag';

import { render, cleanup, waitForElement } from 'react-testing-library';

import { MockedProvider } from 'react-apollo/test-utils';

import QueryLoader from './QueryLoader';

export const GET_TEAM_LIST = gql`
query getTeamList($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    ownerOfTeams {
      id
      nameEn
      nameFr
    }
  }
}
`;

export const GET_BASICS = gql`
query getNameTitle($gcID: ID!) {
  profiles(gcID: $gcID) {
    gcID
    name
    avatar
    titleEn
    titleFr
  }
}
`;

const mocks = [
  {
    request: {
      query: GET_TEAM_LIST,
      variables: {
        gcID: '1',
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '1',
          ownerOfTeams: [{
            id: 'myteam2',
            nameEn: '',
            nameFr: '',
            avatar: '',
          }, {
            id: 'myteam3',
            nameEn: 'External Communications Team',
            nameFr: 'Equipe de communication externe',
            avatar: 'EC',
          }, {
            id: 'myteam4',
            nameEn: 'Outreach team',
            nameFr: 'Equipe de relations communautaires',
            avatar: 'OT',
          }],
        }],
      },
    },
  },
  {
    request: {
      query: GET_BASICS,
      variables: {
        gcID: '2',
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '2',
          name: 'Al Geer',
          titleEn: 'Job Title Here',
          titleFr: 'Titre du poste ici',
          avatar: 'avatar url',
        }],
      },
    },
  },
];


describe('QueryLoader', () => {
  const err = console.error;
  afterEach(cleanup);
  beforeAll(() => {
    console.error = () => {};
  });
  afterAll(() => {
    console.error = err;
  });
  it('passes data using render-prop pattern on success', (done) => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <QueryLoader
          query={GET_BASICS}
          variables={mocks[1].request.variables}
        >
          {({ data }) => {
            expect(data).toEqual(mocks[1].result.data);
            done();
            return <span>${data.profiles[0].name}</span>;
          }}
        </QueryLoader>
      </MockedProvider>
    ));
  });
  it('does not execute render-prop while loading', (done) => {
    render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <QueryLoader
          query={GET_BASICS}
          variables={mocks[1].request.variables}
        >
          {({ loading }) => {
            expect(loading).toBe(false);
            done();
            return <span>Loading</span>;
          }}
        </QueryLoader>
      </MockedProvider>
    ));
  });
  it('does not execute render-prop on error', async () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <QueryLoader
          query={GET_BASICS}
          variables={mocks[0].request.variables}
        >
          {() => <span>THIS SHOULD NOT BE CALLED</span> }
        </QueryLoader>
      </MockedProvider>
      , { container: document.body }
    );
    await waitForElement(() => queryByText('Error'));
    expect(queryByText('THIS SHOULD NOT')).toBe(null);
  });
  it('displays spinner while loading', () => {
    const { queryByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <QueryLoader
          query={GET_BASICS}
          variables={mocks[1].request.variables}
        >
          {() => <span /> }
        </QueryLoader>
      </MockedProvider>
      , { container: document.body }
    );
    const loading = queryByText('Loading...');
    expect(loading).not.toBeNull();
    expect(loading.innerHTML).toBe('Loading...');
  });
  describe('when displayState is false', () => {
    it('does not show loading', async () => {
      const { queryByText, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <QueryLoader
            query={GET_BASICS}
            variables={mocks[1].request.variables}
            displayState={false}
          >
            {() => <span>testing 123</span> }
          </QueryLoader>
        </MockedProvider>
        , { container: document.body }
      );
      const loading = queryByText('Loading...');
      expect(loading).toBeNull();
      expect(container.firstChild).toBeNull();
      await waitForElement(() => queryByText('testing 123'));
    });
    it('does not show errors', (done) => {
      const { queryByText, container } = render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <QueryLoader
            query={GET_BASICS}
            variables={mocks[0].request.variables}
            displayState={false}
          >
            {() => <span>testing 123</span> }
          </QueryLoader>
        </MockedProvider>
        , { container: document.body }
      );
      const loading = queryByText('Loading...');
      expect(loading).toBeNull();
      expect(container.firstChild).toBeNull();
      setTimeout(() => {
        expect(queryByText('Error')).toBeNull();
        done();
      }, 0);
    });
  });
});

export default mocks;
