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
        className="modal-lg create-team-modal"
      >
        <ModalHeader>
          {__('Create a Team')}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormBody>
              <p>{__('What is a team')}</p>
              <FormGroup>
                <Label for="nameEn">{__('Team_name_en')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    EN
                  </InputGroupAddon>
                  <Input
                    placeholder={__('Enter_Team_name_en')}
                    id="nameEn"
                    aria-label={__('Enter_Team_name_en')}
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
                    placeholder={__('Enter_Team_name_fr')}
                    id="nameFr"
                    aria-label={__('Enter_Team_name_fr')}
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
                  maxLength={280}
                  placeholder={__('Enter_Team_description_en')}
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
                  maxLength={280}
                  placeholder={__('Enter_Team_description_fr')}
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
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => {
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
            {__('Save')}
          </Button>
          <Button color="secondary" onClick={onCancel}>{__('Cancel')}</Button>
        </ModalFooter>
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
