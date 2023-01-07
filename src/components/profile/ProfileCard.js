import React from "react";
import { Card, Container, Image, Stack } from "react-bootstrap";

export default function ProfileCard() {
  return (
    <div>
      <Container>
        <Card>
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/900x200.png"
          />
          <Card.Body>
            <Card.Title>
              <Stack direction="horizontal" gap={3}>
                <div>
                  <Image
                    roundedCircle
                    width="120 rem"
                    src="https://thumbs.dreamstime.com/b/anonymous-business-man-profile-picture-white-background-57594504.jpg"
                  />
                </div>
                <div>USER NAME</div>
              </Stack>
            </Card.Title>
            <Card.Text>
              BIO Some quick example text to build on the card title and make up
              the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Stack direction="horizontal" gap={3}>
            <div className="bg-light border">#interest_1</div>
            <div className="bg-light border">#interest_2</div>
            <div className="bg-light border">#interest_3</div>
            <div className="bg-light border">#interest_4</div>
            <div className="bg-light border">#interest_5</div>
          </Stack>
        </Card>
      </Container>
    </div>
  );
}
