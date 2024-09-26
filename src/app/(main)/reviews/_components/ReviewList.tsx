import Review from '@/app/components/Review/Review';

interface ReviewListProps {
  reviewList: any[];
}
const ReviewList = ({ reviewList }: ReviewListProps) => {
  return (
    <div className='space-y-12'>
      {reviewList.map((item, index) => (
        <Review
          image_source={item.Gathering.image}
          rating={item.score}
          description={item.comment}
          place={'item.place'}
          location={item.Gathering.location}
          user_name={item.User.name}
          date={item.createdAt}
          key={item.id}
        />
      ))}
    </div>
  );
};

export default ReviewList;
