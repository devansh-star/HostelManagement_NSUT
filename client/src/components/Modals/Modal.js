import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const CreateComplaint = (props) => {
  console.log(props);
  const { className } = props;

  //   const [modal, setModal] = useState(false);

  return (
    <div>
      <Modal
        isOpen={props.modalOpen}
        toggle={props.toggle}
        className={className}
      >
        <ModalHeader toggle={props.toggle}>{props.header}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={props.toggle}>
            Submit
          </Button>{' '}
          <Button color="secondary" onClick={props.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateComplaint;
