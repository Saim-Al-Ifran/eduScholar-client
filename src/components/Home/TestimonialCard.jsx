


  const generateStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<i key={i} className="fas fa-star text-[#FBC02D]"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-gray-400"></i>);
      }
    }
    return stars;
  };

  const TestimonialCard = ({ name, title, image, text, rating }) => {
    return (
      <div className="testimonial-card max-w-md mx-auto my-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
          <div className="flex items-center mb-4">
            <img className="w-16 h-16 rounded-full mr-4" src={image} alt={`Avatar of ${name}`} />
            <div className="text-left">
              <p className="text-gray-900 text-xl font-bold leading-none">{name}</p>
              <p className="text-gray-600">{title}</p>
            </div>
          </div>
          <p className="text-gray-700 text-base text-center">
            "{text}"
          </p>
          <div className="flex justify-center mt-4">
            {/* Display star rating */}
            <div className="flex">
              {generateStarRating(rating)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TestimonialCard;