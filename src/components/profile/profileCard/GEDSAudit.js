import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import { ApolloConsumer } from 'react-apollo';

import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Alert
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faSpinner } from '@fortawesome/free-solid-svg-icons';

import { INTEGRATION } from '../../../gql/profile';

const AuditSelector = (props) => {
  const {
    field,
    inputName,
    gedsValue,
    paasValue,
  } = props;

  return (
    <div className="alert alert-info border-0">
      <FormGroup tag="fieldset" className="mb-0">
        <div className="font-weight-bold">
          {field}
        </div>
        <small className="text-muted">
          {__('Please select data')}
        </small>
        <div>
          <Label htmlFor={`${inputName}-1`}>
            <input
              type="radio"
              id={`${inputName}-1`}
              name={inputName}
              className="mr-1"
              disabled
            />
            {gedsValue} - <b>GEDS</b>
          </Label>
        </div>
        <div>
          <Label htmlFor={`${inputName}-2`}>
            <input
              type="radio"
              id={`${inputName}-2`}
              name={inputName}
              className="mr-1"
              disabled
            />
            {paasValue} - <b>Directory</b>
          </Label>
        </div>
        <div>
          <Label htmlFor={`${inputName}-n`}>
            <input
              type="radio"
              id={`${inputName}-n`}
              name={inputName}
              className="mr-1"
              disabled
            />
            {__('Other')}
          </Label>
        </div>
        <div>
          <Label htmlFor={`${inputName}-input`}>
            {__('Other Value')}
          </Label>
          <input
            type="text"
            id={`${inputName}-input`}
            name={`${inputName}-input`}
            className="ml-1"
            disabled
          />
        </div>
      </FormGroup>
    </div>
  );
};

class GEDSAudit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      gName: '',
      gTitleEn: '',
      gTitleFr: '',
      gOfficePhone: '',
      gMobilePhone: '',
      gStreetAddress: '',
      gCity: '',
      gProvince: '',
      gPostalCode: '',
      gCountry: '',
      gOrganization: '',
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    const formatGAddress = `
      ${this.state.gStreetAddress}
      ${this.state.gCity}
      ${this.state.gProvince}
      ${this.state.gCountry}
      ${this.state.gPostalCode}
    `;
    const formatPAddress = (this.props.profile.address) && `
      ${this.props.profile.address.streetAddress}
      ${this.props.profile.address.city}
      ${this.props.profile.address.province}
      ${this.props.profile.address.country}
      ${this.props.profile.address.postalCode}
    `;
    const diffs = [];
    if (this.state.gName !== this.props.profile.name) {
      diffs.push('auditName');
    }
    if (this.state.gTitleEn !== this.props.profile.titleEn) {
      diffs.push('titleEn');
    }
    if (this.state.gTitleFr !== this.props.profile.titleFr) {
      diffs.push('titleFr');
    }
    if (this.state.gOfficePhone !== this.props.profile.officePhone) {
      diffs.push('auditPhone');
    }
    if (this.state.gMobilePhone !== this.props.profile.mobilePhone) {
      diffs.push('auditMobile');
    }
    if (formatGAddress !== formatPAddress) {
      diffs.push('auditAddress');
    }
    // eslint-disable-next-line
    if (this.state.gOrganization !== this.props.profile.team.organization.nameEn) {
      diffs.push('auditOrg');
    }
    const diffList = (diffs) ?
      diffs.map(d => (
        <li key={`${d}-key`}>
          <a href={`#${d}-1`}>
            {
              (d === 'auditName') &&
                <span>{__('auditName')}</span>
            }{
              (d === 'titleEn') &&
                <span>{__('titleEn')}</span>
            }{
              (d === 'titleFr') &&
                <span>{__('titleFr')}</span>
            }{
              (d === 'auditPhone') &&
                <span>{__('auditPhone')}</span>
            }{
              (d === 'auditMobile') &&
                <span>{__('auditMobile')}</span>
            }{
              (d === 'auditAddress') &&
                <span>{__('auditAddress')}</span>
            }{
              (d === 'auditOrg') &&
                <span>{__('auditOrg')}</span>
            }
          </a>
        </li>
      )) : (
        <div>
          <FontAwesomeIcon
            icon={faCheck}
            className="text-success mr-1"
          />
          {__('Your data is the same')}
        </div>
      );
    return (
      <ApolloConsumer>
        {client => (
          <div className="mr-2">
            <Button
              onClick={async () => {
                this.setState({
                  loading: true,
                });
                const { data } = await client.query({
                  query: INTEGRATION,
                  variables: {
                    email: this.props.profile.email,
                    source: 'GEDS',
                  },
                });
                this.setState({
                  // eslint-disable-next-line
                  gName: `${data.integration.en.gn} ${data.integration.en.sn}`,
                  gTitleEn: data.integration.en.title,
                  gTitleFr: data.integration.fr.title,
                  gOfficePhone: data.integration.en.tn,
                  gMobilePhone: '',
                  gStreetAddress: data.integration.en.address,
                  gCity: data.integration.en.city,
                  gProvince: data.integration.en.province,
                  gPostalCode: data.integration.en.pc,
                  gCountry: data.integration.en.country,
                  gOrganization: data.integration.en.department,
                });
                this.toggle();
                this.setState({
                  loading: false,
                });
              }}
              disabled={this.state.loading}
            >
              {
                (this.state.loading) ?
                  <FontAwesomeIcon
                    icon={faSpinner}
                    spin
                  /> :
                  <span>
                    {__('GEDS Audit')}
                  </span>
              }
            </Button>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle}
              className="modal-lg"
            >
              <ModalHeader>
                {__('GEDS Audit')}
              </ModalHeader>
              <ModalBody>
                <Row>
                  <Col>
                    <Alert color="info">
                      {
                        (diffs.length > 1) &&
                          <div>{__('There are differences')}</div>
                      }
                      <ul>
                        {diffList}
                      </ul>
                      {
                        // if no diffs
                      }
                    </Alert>
                    <Form>
                      <div className="border p-2">
                        <div className="font-weight-bold mb-3">
                          {__('Directory Information')}
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (this.state.gName === this.props.profile.name) ?
                              <div className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.name}
                              </div> :
                              <AuditSelector
                                field={__('Name')}
                                inputName="name"
                                gedsValue={this.state.gName}
                                paasValue={this.props.profile.name}
                              />
                          }
                        </div>
                        <div>
                          {
                            /*
                            same string ? Display string :
                            Display inputs
                            */
                            // eslint-disable-next-line
                            (this.state.gTitleEn === this.props.profile.titleEn) ?
                              <span className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.titleEn}
                              </span> :
                              <AuditSelector
                                field={__('Job Title - English')}
                                inputName="titleEn"
                                gedsValue={this.state.gTitleEn}
                                paasValue={this.props.profile.titleEn}
                              />
                          }
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (this.state.gTitleEn === this.props.profile.titleEn) ?
                              <div className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.titleFr}
                              </div> :
                              <AuditSelector
                                field={__('Job Title - French')}
                                inputName="titleFr"
                                gedsValue={this.state.gTitleFr}
                                paasValue={this.props.profile.titleFr}
                              />
                          }
                        </div>
                        <div>
                          {
                            /**
                             * Email should be correct
                             */
                          }
                          <div className="pb-2">
                            <FontAwesomeIcon
                              icon={faCheck}
                              className="text-success mr-1"
                            />
                            {this.props.profile.email}
                          </div>
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (this.state.gOfficePhone === this.props.profile.officePhone) ?
                              <div className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.officePhone}
                              </div> :
                              <AuditSelector
                                field={__('Office Phone')}
                                inputName="auditPhone"
                                gedsValue={this.state.gOfficePhone}
                                paasValue={this.props.profile.officePhone}
                              />
                          }
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (this.state.gMobilePhone === this.props.profile.mobilePhone) ?
                              <div className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.mobilePhone}
                              </div> :
                              <AuditSelector
                                field={__('Mobile Phone')}
                                inputName="auditMobile"
                                gedsValue={this.state.gMobilePhone}
                                paasValue={this.props.profile.mobilePhone}
                              />
                          }
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (formatGAddress === formatPAddress) ?
                              <div className="pb-2">
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {formatPAddress}
                              </div> :
                              <AuditSelector
                                field={__('Office Address')}
                                inputName="auditAddress"
                                gedsValue={formatGAddress}
                                paasValue={formatPAddress}
                              />
                          }
                        </div>
                      </div>
                      <div className="border mt-2 p-2">
                        <div className="font-weight-bold mb-3">
                          {__('Department')}
                        </div>
                        <div>
                          {
                            // eslint-disable-next-line
                            (this.state.gOrganization === this.props.profile.team.organization.nameEn) ?
                              <div>
                                <FontAwesomeIcon
                                  icon={faCheck}
                                  className="text-success mr-1"
                                />
                                {this.props.profile.team.organization.nameEn}
                              </div> :
                              <AuditSelector
                                field={__('Department')}
                                inputName="auditOrg"
                                gedsValue={this.state.gOrganization}
                                paasValue={
                                  this.props.profile.team.organization.nameEn
                                }
                              />
                          }
                        </div>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </ModalBody>
            </Modal>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

AuditSelector.defaultProps = {
  field: '',
  inputName: '',
  gedsValue: '',
  paasValue: '',
};

AuditSelector.propTypes = {
  field: PropTypes.string,
  inputName: PropTypes.string,
  gedsValue: PropTypes.string,
  paasValue: PropTypes.string,
};

GEDSAudit.defaultProps = {
  profile: undefined,
};

GEDSAudit.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    titleEn: PropTypes.string,
    titleFr: PropTypes.string,
    officePhone: PropTypes.string,
    mobilePhone: PropTypes.string,
    address: PropTypes.shape({
      streetAddress: PropTypes.string,
      city: PropTypes.string,
      province: PropTypes.string,
      postalCode: PropTypes.string,
      country: PropTypes.string,
    }),
    team: PropTypes.shape({
      organization: PropTypes.shape({
        id: PropTypes.string,
        nameEn: PropTypes.string,
        nameFr: PropTypes.string,
      }),
    }),
    supervisor: PropTypes.shape({
      gcID: PropTypes.string,
      name: PropTypes.string,
      titleEn: PropTypes.string,
      titleFr: PropTypes.string,
    }),
  }),
};

export default LocalizedComponent(GEDSAudit);
