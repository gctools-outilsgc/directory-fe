import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import {
  Button,
  Col,
  Form,
  InputGroupAddon,
  InputGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row
} from 'reactstrap';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';
import { CREATE_TEAM } from '../../../gql/team';

import InputCharacterCount from '../../core/InputCharacterCount';

export class CreateTeam extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      nameEn: '',
      nameFr: '',
      descriptionEn: '',
      descriptionFr: '',
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }));
  }

  render() {
    const { gcID, orgId } = this.props;

    return (
      <Row>
        <Col sm="6">
          <span>Teams</span>
          <Button
            className="float-right"
            size="sm"
            color="primary"
            onClick={this.toggleModal}
          >
            {__('+ Create Team')}
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggleModal}
            className="modal-lg create-team-modal"
          >
            <ModalHeader toggle={this.toggleModal}>
              {__('Create a Team')}
            </ModalHeader>
            <ModalBody>
              <Mutation
                mutation={CREATE_TEAM}
                onCompleted={() => {
                  this.setState({ modal: false });
                }}
                onError={() => {
                  alert('ERROR - Replace with error UX');
                }}
              >
                {createTeam => (
                  <Form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const {
                        nameEn,
                        nameFr,
                        descriptionEn,
                        descriptionFr,
                      } = this.state;
                      createTeam({
                        variables: {
                          nameEn,
                          nameFr,
                          descriptionEn,
                          descriptionFr,
                          organization: {
                            id: orgId,
                          },
                          owner: {
                            gcID,
                          },
                        },
                      });
                    }}
                  >
                    <Row>
                      <Col
                        className="create-team-modal-description"
                        sm="12"
                      >
                        {__('What is a team')}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="nameEn">
                          <span className="font-weight-bold">
                            Team Name
                          </span>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              EN
                            </InputGroupAddon>
                            <Input
                              placeholder="Enter team name"
                              id="nameEn"
                              aria-label="Enter team name"
                              type="text"
                              value={this.state.nameEn || ''}
                              onChange={(e) => {
                                this.setState({
                                  nameEn: e.target.value,
                                });
                              }}
                            />
                          </InputGroup>
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="nameFr">
                          <span className="font-weight-bold">
                            {'Titre d\'\u00E9quipe'}
                          </span>
                          <InputGroup>
                            <InputGroupAddon addonType="prepend">
                              FR
                            </InputGroupAddon>
                            <Input
                              placeholder={'Entrez titre d\'\u00E9quipe'}
                              id="nameFr"
                              aria-label="Entrez titre d\'\u00E9quipe"
                              type="text"
                              value={this.state.nameFr || ''}
                              onChange={(e) => {
                                this.setState({
                                  nameFr: e.target.value,
                                });
                              }}
                            />
                          </InputGroup>
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="descriptionEn">
                          <span className="font-weight-bold">
                            Description (English)
                          </span>
                          <InputCharacterCount
                            maxLength={280}
                            placeholder="Describe your team..."
                            id="descriptionEn"
                            type="textarea"
                            value={this.state.descriptionEn || ''}
                            onChange={(e) => {
                              this.setState({
                                descriptionEn: e.target.value,
                              });
                            }}
                          />
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <label htmlFor="descriptionFr">
                          <span className="font-weight-bold">
                            La description (Fran&ccedil;ais)
                          </span>
                          <InputCharacterCount
                            maxLength={280}
                            placeholder={
                              'd\'\u00E9cris ton \u00E9quipe...'}
                            id="descriptionFr"
                            type="textarea"
                            value={this.state.descriptionFr || ''}
                            onChange={(e) => {
                              this.setState({
                                descriptionFr: e.target.value,
                              });
                            }}
                          />
                        </label>
                      </Col>
                    </Row>
                    <Row>
                      <Col
                        className="text-right create-team-modal-buttons"
                      >
                        <Button
                          size="sm"
                          type="submit"
                          color="primary"
                        >
                          {__('Save')}
                        </Button>
                        <Button
                          size="sm"
                        >
                          {__('Cancel')}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                )}
              </Mutation>
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    );
  }
}

CreateTeam.defaultProps = {
  gcID: undefined,
  orgId: undefined,
};

CreateTeam.propTypes = {
  gcID: PropTypes.string,
  orgId: PropTypes.string,
};

export default LocalizedComponent(CreateTeam);
