import React from 'react';

export default function ReviewsPage() {
  const reviews = [
    {
      id: 1,
      name: 'John Doe',
      text: 'Great learning platform!',
      rating: 5
    },
    {
      id: 2,
      name: 'Jane Smith',
      text: 'Very helpful courses',
      rating: 4
    }
  ];

  return (
    <div className="reviews-page">
      <h1>Student Reviews</h1>
      {reviews.map(review => (
        <div key={review.id} className="review-card">
          <h3>{review.name}</h3>
          <p>{review.text}</p>
          <div>Rating: {review.rating}/5</div>
        </div>
      ))}
    </div>
  );
}