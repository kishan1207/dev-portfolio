import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import classnames from "classnames";
import Alert from "./Alerts";

import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

export const ContactUs = () => {
  const form = useRef();
  const [alert, setAlert] = React.useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', body: '' });
  const [isLoading, setIsLoading] = useState(false)

  const successAlert = {
    color: "success",
    icon: "ni ni-like-2",
    message: " Your message has been sent successfully!",
  };

  const errorAlert = {
    color: "danger",
    icon: "ni ni-bell-55",
    message: " Oops! Something went wrong. Please try again later.",
  };

  const NoDataErrorAlert = {
    color: "danger",
    icon: "ni ni-bell-55",
    message: "Oops! Please fill out all the fields.",
  };
  const handleOnchange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setFormData(prev => {
      return {
        ...prev,
        [name]: value
      }
    });
  }

  const sendEmail = (e) => {
    e.preventDefault();
    if (formData.name.length && formData.email.length && formData.body.length) {
      setIsLoading(true);
      emailjs
        .sendForm(
          process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
          process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            console.log(result.text);
            setFormData({ name: '', email: '', body: '' });
            setIsLoading(false);
            setAlert(successAlert);
          },
          (error) => {
            console.log(error.text);
            setAlert(errorAlert);
            setIsLoading(false);
          }
        );
    } else {
      setAlert(NoDataErrorAlert);
    }
  };

  return (
    <>
      <section className="section section-lg section-shaped">

        <div className="shape shape-style-3 shape-primary">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        {alert && (
          <Alert
            color={alert.color}
            icon={alert.icon}
            message={alert.message}
          />
        )}
        <form ref={form} onSubmit={sendEmail}>
          <Container>
            <Row className="justify-content-center">
              <Col lg="8">
                <Card className="bg-gradient-secondary shadow">
                  <CardBody className="p-lg-5">
                    <h4 className="mb-1">Want to work with me?</h4>
                    <p className="mt-0">
                      Your project is very important to me.
                    </p>
                    <FormGroup className={classnames("mt-5", {})}>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-user-run" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Your name"
                          type="text"
                          name="name"
                          onChange={handleOnchange}
                          value={formData.name}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className={classnames({})}>
                      <InputGroup className="input-group-alternative">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-email-83" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Email address"
                          name="email"
                          type="email"
                          onChange={handleOnchange}
                          value={formData.email}
                        />
                      </InputGroup>
                    </FormGroup>
                    <FormGroup className="mb-4">
                      <Input
                        className="form-control-alternative"
                        cols="80"
                        name="body"
                        placeholder="Type a message..."
                        rows="4"
                        type="textarea"
                        onChange={handleOnchange}
                        value={formData.body}
                      />
                    </FormGroup>
                    <div>
                      <Button
                        block
                        className="btn-round"
                        color="default"
                        size="lg"
                        type="submit"
                        onClick={sendEmail}
                      >
                        {isLoading ? "Sending..." : "Send Message"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </form>
      </section>
    </>
  );
};

export default ContactUs;
