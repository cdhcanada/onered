import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, User } from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
}

const ProductReviews: React.FC<ProductReviewsProps> = ({
  productId,
  reviews,
  averageRating,
  totalReviews
}) => {
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
        } ${interactive ? 'hover:text-yellow-300' : ''}`}
        onClick={() => interactive && onRatingChange?.(i + 1)}
      />
    ));
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال التقييم
    console.log('New review:', newReview);
    setNewReview({ rating: 5, comment: '', userName: '' });
  };

  return (
    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6">التقييمات والمراجعات</h3>
      
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-400 mb-2">{averageRating}</div>
          <div className="flex items-center justify-center mb-2">
            {renderStars(Math.floor(averageRating))}
          </div>
          <div className="text-gray-300">من أصل {totalReviews} تقييم</div>
        </div>
        
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center space-x-2">
              <span className="text-gray-300 text-sm w-8">{stars}</span>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-yellow-400 h-2 rounded-full" 
                  style={{ width: `${(reviews.filter(r => r.rating === stars).length / totalReviews) * 100}%` }}
                ></div>
              </div>
              <span className="text-gray-300 text-sm w-8">
                {reviews.filter(r => r.rating === stars).length}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Review Form */}
      <div className="bg-gray-900/50 rounded-lg p-4 mb-6">
        <h4 className="text-lg font-semibold text-white mb-4">أضف تقييمك</h4>
        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">التقييم</label>
            <div className="flex items-center space-x-1">
              {renderStars(newReview.rating, true, (rating) => 
                setNewReview(prev => ({ ...prev, rating }))
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">الاسم</label>
            <input
              type="text"
              value={newReview.userName}
              onChange={(e) => setNewReview(prev => ({ ...prev, userName: e.target.value }))}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              placeholder="اسمك"
              required
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">التعليق</label>
            <textarea
              value={newReview.comment}
              onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
              rows={4}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-red-500"
              placeholder="شاركنا رأيك في المنتج..."
              required
            />
          </div>
          
          <button
            type="submit"
            className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-6 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200"
          >
            إرسال التقييم
          </button>
        </form>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-900/30 rounded-lg p-4 border border-gray-700">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-300" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">مشتري مؤكد</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(review.rating)}
                  </div>
                </div>
              </div>
              <span className="text-gray-400 text-sm">{review.date}</span>
            </div>
            
            <p className="text-gray-300 mb-3">{review.comment}</p>
            
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm">مفيد ({review.helpful})</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">رد</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;