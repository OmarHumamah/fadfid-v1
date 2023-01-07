import React from 'react'
import { Modal, Image } from 'react-bootstrap'

export default function ImgModal( props ) {
  return (
    <div>
        <Modal show={props.imgModal} onHide={()=>props.setImgModal(false)}>
            <Image fluid src={props.img}/>  
        </Modal>
    </div>
  )
}
