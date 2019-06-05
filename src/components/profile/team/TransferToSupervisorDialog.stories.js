import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MockedProvider } from 'react-apollo/test-utils';

import { SEARCH } from '../../../gql/profile';
import I18NTransferToSupervisorDialog, { TransferToSupervisorDialog }
  from './TransferToSupervisorDialog';

import avatar1 from './fixtures/1.jpg';
import avatar2 from './fixtures/2.jpg';
import avatar3 from './fixtures/3.jpg';

const user1 = {
  name: 'Mark Phillips',
  avatar: avatar1,
  titleEn: 'Job Title Here',
  titleFr: 'Titre du poste ici',
};

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
        search: [{
          gcID: '2',
          name: 'Clara MacKinnon',
          email: 'test2@testing.com',
          titleEn: 'DG, Global Affairs',
          titleFr: 'test title 2 fr',
          avatar: avatar2,
          team: {
            id: 'team1',
            organization: {
              id: 'org1',
              nameEn: 'Department of Global Affairs Canada',
              nameFr: 'Organisation 1',
            },
          },
          ownerOfTeams: [{
            id: 'myteam2',
            nameEn: '',
          }],
        }, {
          gcID: '3',
          name: 'Mia Jarrel',
          email: 'test3@testing.com',
          titleEn: 'Manager, Outreach',
          titleFr: 'test title 2 fr',
          avatar: avatar3,
          team: {
            id: 'team1',
            organization: {
              id: 'org1',
              nameEn: 'Department of Global Affairs Canada',
              nameFr: 'Organisation 2',
            },
          },
          ownerOfTeams: [{
            id: 'myteam3',
            nameEn: '',
          }],
        }],
      },
    },
  },
];

storiesOf('components/profile/team/TransferToSupervisorDialog', module)
  .addParameters({
    info: {
      header: true,
      inline: true,
      source: false,
      propTablesExclude: [MockedProvider, I18NTransferToSupervisorDialog],
      propTables: [TransferToSupervisorDialog],
      text: 'Search for "tes" to test',
    },
  })
  .add(
    'isOpen=true',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToSupervisorDialog
          isOpen
          profile={user1}
        />
      </MockedProvider>
    )
  )
  .add(
    'isOpen=false',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToSupervisorDialog
          isOpen={false}
          profile={user1}
        />
      </MockedProvider>
    )
  )
  .add(
    'with click handlers',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToSupervisorDialog
          isOpen
          profile={user1}
          primaryButtonClick={action('primary')}
          secondaryButtonClick={action('secondary')}
          closeButtonClick={action('close')}
        />
      </MockedProvider>
    )
  );
