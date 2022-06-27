import { Col, Row } from "react-bootstrap";
import { AboutSM } from "../components/AboutSM";

export function About() {
    return (
        <>
            <h1>About</h1>
            <Row md={2} xs={1} lg={4} className="g-3 mt-5">
                <Col>
                    <AboutSM
                        imgUrl="/imgs/facebook.jpg"
                        linkUrl="https://facebook.com"
                    />
                </Col>
                <Col>
                    <AboutSM
                        imgUrl="/imgs/instagram.jpg"
                        linkUrl="https://instagram.com"
                    />
                </Col>
                <Col>
                    <AboutSM
                        imgUrl="/imgs/email.jpg"
                        linkUrl="mailto:email@example.com"
                    />
                </Col>
                <Col>
                    <h2>Kontaktinformationen</h2>
                    <br />
                    <p>Karin Kocher</p>
                    <p>Adresse postfach oder so was</p>
                </Col>
            </Row>
        </>
    );
}
