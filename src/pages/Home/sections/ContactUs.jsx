import React from "react";
import { Card, CardBody, Input, Textarea, Button, Typography } from "@material-tailwind/react";

const ContactUs = () => {
  return (
    <div className="container mx-auto p-4 mt-[6rem] mb-[4rem]">
      <Typography variant="h2" className="text-center mb-10 font-bold text-4xl">
        Contact Us
      </Typography>
      <Card className="w-full max-w-4xl mx-auto shadow-lg rounded-lg">
        <CardBody className="p-6">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Input
                  variant="outlined"
                  label="Name"
                  type="text"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <Input
                  variant="outlined"
                  label="Email"
                  type="email"
                  className="w-full"
                  required
                />
              </div>
            </div>
            <div>
              <Input
                variant="outlined"
                label="Subject"
                type="text"
                className="w-full"
                required
              />
            </div>
            <div>
              <Textarea
                variant="outlined"
                label="Message"
                className="w-full"
                rows={6}
                required
              />
            </div>
            <div className="text-center">
              <Button variant="gradient" size="lg" className="bg-blue-500 hover:bg-blue-700" type="submit">
                Send Message
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactUs;
