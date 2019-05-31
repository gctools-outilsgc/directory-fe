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

const FormBody = styled.div`
label {
  font-weight: bold;
}
`;

export class EditTeamDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameEn: props.team.nameEn || '',
      nameFr: props.team.nameFr || '',
      descriptionEn: props.team.descriptionEn || '',
      descriptionFr: props.team.descriptionFr || '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.team !== this.props.team) {
      this.setState({
        nameEn: nextProps.team.nameEn,
        nameFr: nextProps.team.nameFr,
        descriptionEn: nextProps.team.descriptionEn,
        descriptionFr: nextProps.team.descriptionFr,
      });
    }
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
          {__('Edit team')}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormBody>
              <FormGroup>
                <Label for="nameEn">{__('English team Name')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    EN
                  </InputGroupAddon>
                  <Input
                    id="nameEn"
                    aria-label={__('English team Name')}
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
                <Label for="nameFr">{__('French team Name')}</Label>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    FR
                  </InputGroupAddon>
                  <Input
                    id="nameFr"
                    aria-label={__('French team Name')}
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
                <Label for="descriptionEn">
                  {__('English team description')}
                </Label>
                <InputCharacterCount
                  maxLength={280}
                  placeholder={__('Write a English description')}
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
                  {__('French team description')}
                </Label>
                <InputCharacterCount
                  maxLength={280}
                  placeholder={__('Write a French description')}
                  id="descriptionFr"
                  type="text"
                  value={this.state.descriptionFr}
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

EditTeamDialog.defaultProps = {
  onSave: () => {},
  onCancel: () => {},
  isOpen: false,
};

EditTeamDialog.propTypes = {
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
  isOpen: PropTypes.bool,
  team: PropTypes.shape({
    id: PropTypes.string,
    nameEn: PropTypes.string,
    nameFr: PropTypes.string,
    descriptionEn: PropTypes.string,
    descriptionFr: PropTypes.string,
  }).isRequired,
};

export default LocalizedComponent(EditTeamDialog);
