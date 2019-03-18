import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { MockedProvider } from 'react-apollo/test-utils';

import LocalizedProfileListSearch, { ProfileListSearch }
  from './ProfileListSearch';
import { SEARCH } from '../../gql/profile';

import avatar1 from './fixtures/1.jpg';
import avatar2 from './fixtures/2.jpg';
import avatar3 from './fixtures/3.jpg';

const mocks = [
  {
    request: {
      query: SEARCH,
      variables: {
        name: 'tes',
      },
    },
    result: {
      data: {
        profiles: [{
          gcID: '1',
          name: 'testing 1',
          email: 'test@testing.com',
          titleEn: 'test title 1 en',
          titleFr: 'test title 1 fr',
          avatar: avatar1,
          team: {
            id: 'team1',
            organization: {
              id: 'org1',
              nameEn: 'Organization 1',
              nameFr: 'Organisation 1',
            },
          },
        }, {
          gcID: '2',
          name: 'testing 2',
          email: 'test2@testing.com',
          titleEn: 'test title 2 en',
          titleFr: 'test title 2 fr',
          avatar: avatar2,
          team: {
            id: 'team1',
            organization: {
              id: 'org1',
              nameEn: 'Organization 2',
              nameFr: 'Organisation 2',
            },
          },
        }, {
          gcID: '3',
          name: 'testing 3',
          email: 'test3@testing.com',
          titleEn: 'test title 3 en',
          titleFr: 'test title 3 fr',
          avatar: avatar3,
          team: {
            id: 'team1',
            organization: {
              id: 'org1',
              nameEn: 'Organization 3',
              nameFr: 'Organisation 3',
            },
          },
        }],
      },
    },
  },
];

storiesOf('components/core/ProfileListSearch', module)
  .addParameters({
    info: {
      header: true,
      inline: true,
      source: false,
      propTablesExclude: [MockedProvider, LocalizedProfileListSearch],
      propTables: [ProfileListSearch],
      text: 'Search for "tes" to test',
    },
  })
  .add('With default options', () => (
    <MockedProvider addTypename={false} mocks={mocks}>
      <LocalizedProfileListSearch />
    </MockedProvider>
  ))
  .add('With initial search', () => (
    <MockedProvider addTypename={false} mocks={mocks}>
      <LocalizedProfileListSearch initialSearch="tes" />
    </MockedProvider>
  ))
  .add('With onChange', () => (
    <MockedProvider addTypename={false} mocks={mocks}>
      <LocalizedProfileListSearch
        initialSearch="tes"
        onChange={action('onChange')}
      />
    </MockedProvider>
  ));
