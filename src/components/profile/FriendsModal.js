import React from 'react'
import { Modal, ListGroup, Image } from 'react-bootstrap'

export default function FriendsModal(props) {
    let friendsModal = props.friendsModal
    let setFriendsModal = props.setFriendsModal
    let user = props.user
    let allUsers = props.allUsers
    return (
    <div><Modal
    show={friendsModal.show}
    onHide={() => setFriendsModal({ show: false, friends: [] })}
  >
    <Modal.Header>Friends</Modal.Header>
    <Modal.Body>
      <ListGroup>
        {friendsModal.friends.map((f, n) => (
          <ListGroup.Item key={n}>
            <a
              href={
                "/" + user &&
                allUsers.find((u) => u.subId === user.sub).subId === f.id
                  ? "profile"
                  : allUsers.find((u) => u.subId === f.id).userName
              }
            >
              <Image
                src={allUsers.find((u) => u.subId === f.id).pic}
                roundedCircle
                width={40}
              />
              {`${allUsers.find((u) => u.subId === f.id).firstName} ${
                allUsers.find((u) => u.subId === f.id).lastName
              }`}
            </a>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Modal.Body>
  </Modal></div>
  )
}
