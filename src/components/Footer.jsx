import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-3 mt-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p>
              Designed by {/* eslint-disable-next-line */}
              <a
                href="#"
                className="text-light text-decoration-none cursor-pointer"
              >
                <span className="text-info fw-bold">The team</span>
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
