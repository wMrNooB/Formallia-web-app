import React from 'react';
import { Star } from 'lucide-react';

const Review = () => {
  const reviewData = {
    totalReviews: 128,
    averageRating: 4.2,
    distribution: [
      { stars: 5, percentage: 45, count: 562 },
      { stars: 4, percentage: 35, count: 437 },
      { stars: 3, percentage: 10, count: 125 },
      { stars: 2, percentage: 6, count: 75 },
      { stars: 1, percentage: 4, count: 49 }
    ],
    reviews: [
      {
        id: 1,
        author: "James Mitchell",
        rating: 5,
        comment: "This Italian wool suit exceeded all my expectations. The tailoring is impeccable, and the fit is perfect right off the rack. I've received countless compliments at business meetings.",
      },
      {
        id: 2,
        author: "Robert Chen",
        rating: 5,
        comment: "As a wedding photographer, I need suits that look sharp but allow movement. This suit delivers on both fronts. The fabric breathes well even during summer ceremonies.",
      },
      {
        id: 3,
        author: "Michael Torres",
        rating: 4,
        comment: "Great suit for the price point. The charcoal color is versatile, and the slim fit is modern without being too aggressive. Just needed minor alterations at the sleeves.",
      }
    ]
  };

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (<>
    <div className="w-4/5 border-t border-gray-300 mx-auto my-8"></div>
    <div className="w-3/4 ml-[210px]  pr-0 py-8 bg-white">
      <div className="flex ml-5 flex-col md:flex-row gap-20">
        <div className="w-full md:w-2/5">
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {renderStars(Math.round(reviewData.averageRating))}
            </div>
            <span className="text-gray-600">
              Based on {reviewData.totalReviews} reviews
            </span>
          </div>

          <div className="space-y-2">
            {reviewData.distribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-2">
                <span className="w-6">{item.stars}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="w-12 text-sm text-gray-600">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-2/3 max-w-3xl">
          <div className="space-y-12">
            {reviewData.reviews.map((review) => (
              <div key={review.id} className={`pb-8 w-full ${review.id !== reviewData.reviews[reviewData.reviews.length - 1].id ? 'border-b' : ''}`}>
                <div className="flex items-center gap-4 mb-3">
                  <div>
                    <h3 className="font-semibold">{review.author}</h3>
                    <div className="flex">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div> </>
  );
};

export default Review;