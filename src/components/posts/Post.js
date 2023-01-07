import React, {useRef, useState} from "react";
import {
  Button,
  Card,
  Container,
  Stack,
  ListGroup,
  Badge,
  Image,
  Form, 
} from "react-bootstrap";
import { Link } from "react-router-dom";
import ImgModal from "./ImgModal";

export default function Post() {
  const img = "https://via.placeholder.com/1280x720.png";
  const imgF = undefined;
  const cRef = useRef(null)
  const [imgModal, setImgModal] = useState(false)
  return (
    <div>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title className="d-flex align-items-start">
            <Image
                    roundedCircle
                    width="40 rem"
                    src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                  /> USER NAME
            </Card.Title>
            <Card.Text className="d-flex justify-content-between align-items-start">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            {img && <Card.Img onClick={()=>setImgModal(true)} src={img} />}
            <Stack direction="horizontal" gap={2}>
              <div className="bg-light border">
                like <Badge>10</Badge>
              </div>
              <div className="bg-light border ms-auto">
                <Badge>4</Badge> comments
              </div>
            </Stack>
            <hr />
            <Stack direction="horizontal" gap={2}>
              <div>
                <Button variant="outline-secondary">Like</Button>
              </div>
              <div className="vr" />
              <div>
                <Button variant="outline-secondary" onClick={()=> cRef.current.focus()}>comment</Button>
              </div>
            </Stack>
          </Card.Body>
          <Card.Body>
            <Card>
              <Card.Body>
                <Stack direction="horizontal" gap={3}>
                  <Image
                    roundedCircle
                    width="35 rem"
                    src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                  />
                  <Form.Control 
                    ref={cRef}
                    className="me-auto"
                    placeholder="Write a comment..."
                  />
                  <Button variant="secondary">Enter</Button>
                </Stack>
              </Card.Body>
            </Card>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <b className="fw-bold">
                    <Image
                      roundedCircle
                      width="35 rem"
                      src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                    />
                    USER NAME:{" "}
                  </b>
                  Comment content lorm sdasd asdas asd a sda sd
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <b className="fw-bold">
                    <Image
                      roundedCircle
                      width="35 rem"
                      src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                    />{" "}
                    USER NAME:{" "}
                  </b>
                  Comment content lorm sdasd asdas asd a sda sd
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <b className="fw-bold">
                    <Image
                      roundedCircle
                      width="35 rem"
                      src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                    />{" "}
                    USER NAME:{" "}
                  </b>
                  Comment content lorm sdasd asdas asd a sda sd
                </div>
              </ListGroup.Item>
            </ListGroup>
            <Link>see all comments</Link>
          </Card.Body>
        </Card>
      </Container>
      <ImgModal img={img} imgModal={imgModal} setImgModal={setImgModal}/>
    </div>
  );
}
