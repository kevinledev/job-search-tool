import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import AlgoShowContainer from '../Algorithms/algo_show_container';
import JobsCreateContainer from '../Jobs/jobs_create_container';
import modal from './modal.css'
import ContactsCreateContainer from '../Contacts/contacts_create_container'


//add a seperate to argument that takes in algoId so it can be passed along to algo component
function Modal(props) {
  console.log(props);
  if (!props.modal) {
    return null;
  }
  let component;
  switch (props.modal.modal) {
    case 'algoShow':
      component = <AlgoShowContainer algoId={props.modal.algoId}/>;
      break;
    case 'createJob':
      component = <JobsCreateContainer />;
      break;
    case 'createContact':
      component = <ContactsCreateContainer />;
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={props.closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
