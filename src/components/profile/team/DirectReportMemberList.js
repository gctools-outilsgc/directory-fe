/* eslint-disable */
import React, { Fragment } from 'react';

import { Col, Row } from 'reactstrap';
import { Query } from 'react-apollo';

import { GET_DIRECT_REPORTS } from '../../../gql/profile';
import { UserAvatar } from '../../core/UserAvatar';
import Loading from './Loading';

const MemberList = (props) => {
  const { p } = props;
  return (
    <Col sm="4" className="mb-3">
      <a href={p ? p.gcID : ''} >
        <div className="d-flex">
          <UserAvatar
            avatar={p ? p.avatar : ''}
            name=""
          />
          <div className="ml-2 font-weight-bold">
            <div className="text-dark">
              {p ? p.name : 'None'}
            </div>
            {(localizer.lang === 'en_CA') ? (
              <small className="text-muted">
                {p ? p.titleEn : ''}
              </small>
            ) : (
                <small className="text-muted">
                  {p ? p.titleFr : ''}
                </small>
              )}
          </div>
        </div>
      </a>
    </Col>
  );
};

const TeamList = (props) => {
  const { t } = props;
  const members = t.members.map(p => (
    <MemberList key={p.gcID} p={p} />
  ));
  return (
    <Row className="mt-3">
      {members}
    </Row>
  );
};

const DirectReportMemberList = (props) => {
  const { userID } = props;
  return (
    <Query
      query={GET_DIRECT_REPORTS}
      variables={{ gcID: (String(userID)) }}
    >
      {({
        loading,
        error,
        data,
      }) => {
        if (loading) return <Loading />;
        if (error) return errorHandler(error);
        const teams = (!data) ? '' : data.profiles[0].ownerOfTeams;
        const list = teams.map(t => (
          t.members.length > 0 ?
            <div>
              {localizer.lang === 'en_CA' ?
                <div className="font-weight-bold">{t.nameEn}</div> :
                <div className="font-weight-bold">{t.nameFr}</div>}
              < TeamList t={t} />
            </div>
            : null
        ));
        const rule = list != '' ? <hr /> : ''
        return (
          <Fragment>
            {rule}
            {list}
          </Fragment>
        );
      }}
    </Query>
  );
}

export default DirectReportMemberList;