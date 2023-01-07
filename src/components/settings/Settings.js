import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Settings(props) {
  return (
    <div>
        <Modal show={props.show} onHide={()=>props.handleShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>User can custom some setting from here</Modal.Body>
        <p>Light / Dark mood</p>
        <p>anonymous</p>
        <p>language</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>props.handleShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>props.handleShow(false)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>  
    </div>
  )
}
