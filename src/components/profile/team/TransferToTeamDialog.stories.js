import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { MockedProvider } from 'react-apollo/test-utils';

import I18NTransferToTeamDialog, {
  TransferToTeamDialog,
  GET_TEAM_LIST,
  GET_BASICS
} from './TransferToTeamDialog';

import avatar1 from './fixtures/1.jpg';

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
          avatar: avatar1,
        }],
      },
    },
  },
];

const [
  { request: { variables: { gcID: supervisor } } },
  { request: { variables: { gcID: user } } },
] = mocks;

storiesOf('components/profile/team/TransferToTeamDialog', module)
  .addParameters({
    info: {
      header: true,
      inline: true,
      source: false,
      propTablesExclude: [MockedProvider, I18NTransferToTeamDialog],
      propTables: [TransferToTeamDialog],
      text: 'Search for "tes" to test',
    },
  })
  .add(
    'isOpen=true',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToTeamDialog
          isOpen
          user={user}
          supervisor={supervisor}
        />
      </MockedProvider>
    )
  )
  .add(
    'isOpen=false',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToTeamDialog
          isOpen={false}
          user={user}
          supervisor={supervisor}
        />
      </MockedProvider>
    )
  )
  .add(
    'with click handlers',
    () => (
      <MockedProvider addTypename={false} mocks={mocks}>
        <I18NTransferToTeamDialog
          isOpen
          user={user}
          supervisor={supervisor}
          primaryButtonClick={action('primary')}
          secondaryButtonClick={action('secondary')}
          closeButtonClick={action('close')}
        />
      </MockedProvider>
    )
  );

export default mocks;
