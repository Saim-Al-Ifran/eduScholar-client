import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 const ScholarshipCard = ({
    universityName,
    universityLogo,
    category,
    location,
    deadline,
    subjectCategory,
    applicationFees,
    rating,
  }) => {
    return (
      <Card className="w-full max-w-sm mx-auto mt-3">
        <CardHeader color="blue" className="relative h-56">
          <img src={universityLogo} alt={universityName} className="w-full h-full object-cover" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            {universityName}
          </Typography>
          <Typography>{category}</Typography>
          <Typography>{location}</Typography>
          <Typography>Deadline: {deadline}</Typography>
          <Typography>Subject: {subjectCategory}</Typography>
          <Typography>Application Fees: ${applicationFees}</Typography>
          <Typography>Rating: {rating}</Typography>
          <Button variant="gradient" color="green" className="mt-4">
            Scholarship Details
          </Button>
        </CardBody>
      </Card>
    );
  };


  export default ScholarshipCard;