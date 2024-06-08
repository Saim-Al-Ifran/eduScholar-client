import { Carousel, Button } from "@material-tailwind/react";


const image1 = 'https://images.collegedunia.com/public/college_data/images/studyabroad/appImage/college_1090_29-15:00_o-HARVARD-UNIVERSITY-BUILDING-facebook.jpeg'
const image2 = 'https://media.gq-magazine.co.uk/photos/5d139a49bc4bf64ef07f0890/16:9/w_2560%2Cc_limit/Aerial-hp--GQ-25aug17_alamy_b.jpg';
const image3 = 'https://institute.careerguide.com/wp-content/uploads/2020/07/180216_queens_tower_lgbt_month_002-tojpeg_1545305547967_x1.jpg';

const Banner = () => {
  return (
    <>
 
      <Carousel
        transition={{ duration: 2 }}
        className="rounded-xl h-[500px] mt-4 mb-4" // Set a consistent height for the carousel
        controls={false} // Remove arrows
        autoplay={true} // Set autoplay to true
        loop={true}
        indicators={true}
        autoplayDelay={6000}
        prevArrow={false}
        nextArrow={false}
      >
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image1}
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
              Discover Our Courses
            </h2>
            <p className="text-white text-lg mb-6">
              Elevate your knowledge with our expertly crafted courses.
            </p>
            <Button
              size="lg"
               color="green"
            >
              Explore Courses
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image2}
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-white text-lg mb-6">
              Connect with like-minded learners and experts.
            </p>
            <Button
              size="lg"
              color="green"
            >
              Join Now
            </Button>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <img
            src={image3}
            alt="image 3"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <h2 className="text-white text-4xl font-bold mb-4">
              Start Your Journey
            </h2>
            <p className="text-white text-lg mb-6">
              Take the first step towards your educational goals.
            </p>
            <Button
              size="lg"
              color="green"
            >
              Get Started
            </Button>
          </div>
        </div>
      </Carousel>
    </>
  );
};

export default Banner;
