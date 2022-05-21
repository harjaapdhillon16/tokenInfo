import { useState } from "react";
import { Card, Col, Row, Button, Text } from "@nextui-org/react";
import { InfoModal } from "./infoModal";

interface Props {
  title: string;
  isImageNew: boolean;
  image: string;
}

export const ApiCard = (data: Props) => {
  const { image, isImageNew, title } = data;
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);
  const openModal = () => setShowModal(true);
  return (
    <>
      <Card cover css={{ w: "100%" }}>
        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
          <Col>
            <Text h3 color="white">
              {title}
            </Text>
            {isImageNew && (
              <Text
                size={14}
                weight="bold"
                transform="uppercase"
                color="#ffffffAA"
              >
                New
              </Text>
            )}
          </Col>
        </Card.Header>
        <Card.Body>
          <Card.Image
            src={image}
            height={400}
            width="100%"
            alt="Card example background"
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: "absolute",
            bgBlur: "#ffffff",
            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row justify="flex-end">
                <Button onClick={openModal} flat auto rounded color="primary">
                  <Text
                    css={{ color: "inherit" }}
                    size={12}
                    weight="bold"
                    transform="uppercase"
                  >
                    More Info
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
        <InfoModal data={data} showModal={showModal} closeModal={closeModal} />
      </Card>
    </>
  );
};
