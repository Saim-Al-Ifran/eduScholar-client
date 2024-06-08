import Slider from 'react-slick';
import TestimonialCard from '../../../components/Home/TestimonialCard';
const testimonials = [
    {
      name: "John Doe",
      title: "Software Engineer",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      text: "EduScholar has been a game-changer for my studies. The courses are well-structured and easy to follow.",
      rating:4.5
    },
    {
      name: "Jane Smith",
      title: "Data Scientist",
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      text: "I love the community aspect of EduScholar. Connecting with other learners has been invaluable.",
      rating:5
    },
    {
      name: "Sam Wilson",
      title: "Product Manager",
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      text: "The variety of courses available is fantastic. I've learned so much in such a short time.",
      rating:3
    },
    {
      name: "Sara Lee",
      title: "UX Designer",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      text: "The instructors are top-notch and always available to help. Highly recommend EduScholar!",
      rating:5
    }
  ];

const Review = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Show 3 slides by default
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        responsive: [
          {
            breakpoint: 1024, // Adjust the breakpoint for tablets
            settings: {
              slidesToShow: 2,  
            }
          },
          {
            breakpoint: 600, // Adjust the breakpoint for mobile devices
            settings: {
              slidesToShow: 1,  
            }
          }
        ]
      };

    return (
        <div className="container mx-auto py-8">
        <h2 className="text-center text-3xl font-bold mb-6">What Our Students Say</h2>
        <div className='slider-container'>
            <Slider {...settings}>
                {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
                ))}
            </Slider>
        </div>

        </div>
    );
    };

export default Review;  