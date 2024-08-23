import { Card, CardHeader, CardBody, Typography, Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
 const ScholarshipCard = ({
    _id,
    universityName,
    image,
    degree,
    location,
    applicationDeadline,
    subjectCategory,
    fees,
    rating,
  }) => {
    return (
      <Card className="w-full max-w-sm mx-auto mt-3">
        <CardHeader color="blue" className="relative h-56">
          <img src={image} alt={universityName} className="w-full h-full object-cover" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" className="mb-2">
            {universityName}
          </Typography>
          <Typography>{degree?.name}</Typography>
          <Typography>{location}</Typography>
          <Typography>Deadline: {applicationDeadline}</Typography>
          <Typography>Subject: {subjectCategory?.name}</Typography>
          <Typography>Application Fees: ${fees}</Typography>
          <Typography>Rating: {rating}</Typography>
          <Link to={`/scholarship/${_id}`}>
            <Button variant="gradient" color="green" className="mt-4">
                Scholarship Details
            </Button>
          </Link>

        </CardBody>
      </Card>
    );
  };


  export default ScholarshipCard;