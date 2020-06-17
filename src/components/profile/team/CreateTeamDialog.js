import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  InputGroupAddon,
  InputGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button
} from 'reactstrap';
import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import styled from 'styled-components';

import InputCharacterCount from '../../core/InputCharacterCount';

const initialState = {
  nameEn: '',
  nameFr: '',
  descriptionEn: '',
  descriptionFr: '',
};

const FormBody = styled.div`
label {
  font-weight: bold;
}
`;

export class CreateTeamDialog extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  render() {
    const {
      isOpen,
      onSave,
      onCancel,
    } = this.props;

    return (
      <Modal
        isOpen={isOpen}
        toggle={onCancel}
        className="modal-lg create-team-modal"
      >
        <ModalHeader
          close={(
            <button className="close" onClick={onCancel}>
              &times;
            </button>
          )}
        >
          {__('Create a Team')}
        </ModalHeader>
        <ModalBody>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              const {
                nameEn,
                nameFr,
                descriptionEn,
                descriptionFr,
              } = this.state;
              onSave({
                nameEn,
                nameFr,
                descriptionEn,
                descriptionFr,
              });
            }}
          >
            <FormBody>
              <p>{__('What is a team')}</p>
              <FormGroup>
                <Label for="nameEn">{__('Team_name_en')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    EN
                  </InputGroupAddon>
                  <Input
                    id="nameEn"
                    required
                    aria-label={__('Team_name_en')}
                    type="text"
                    value={this.state.nameEn || ''}
                    onChange={(e) => {
                      this.setState({
                        nameEn: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="nameFr">{__('Team_name_fr')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    FR
                  </InputGroupAddon>
                  <Input
                    id="nameFr"
                    required
                    aria-label={__('Team_name_fr')}
                    type="text"
                    value={this.state.nameFr || ''}
                    onChange={(e) => {
                      this.setState({
                        nameFr: e.target.value,
                      });
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <Label for="descriptionEn">{
                  __('Enter_Team_description_en')
                  }
                </Label>
                <InputCharacterCount
                  placeholder={__('placeholder_description_en')}
                  maxLength={280}
                  id="descriptionEn"
                  type="textarea"
                  value={this.state.descriptionEn || ''}
                  onChange={(e) => {
                    this.setState({
                      descriptionEn: e.target.value,
                    });
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="descriptionFr">
                  {__('Enter_Team_description_fr')}
                </Label>
                <InputCharacterCount
                  placeholder={__('placeholder_description_fr')}
                  maxLength={280}
                  id="descriptionFr"
                  type="textarea"
                  value={this.state.descriptionFr || ''}
                  onChange={(e) => {
                    this.setState({
                      descriptionFr: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </FormBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
              >
                {__('Save')}
              </Button>
              <Button color="secondary" onClick={onCancel}>
                {__('Cancel')}
              </Button>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    );
  }
}

CreateTeamDialog.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  isOpen: false,
};

CreateTeamDialog.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default LocalizedComponent(CreateTeamDialog);
