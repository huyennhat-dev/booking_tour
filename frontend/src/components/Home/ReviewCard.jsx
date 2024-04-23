const ReviewCard = ({ review }) => {
  return (
    <div className="width-11/12 mx-auto md:w-[630px] h-[405px] flex flex-col justify-center items-center gap-y-6">
      <img src={review?.image} alt="" className="w-24 h-24 rounded-full" />
      <p className="text-lg font-medium text-[#EB662B]">
        {review?.review_heading}
      </p>
      <p className="text-xl text-[#05073C] text-center">
        {review?.description}
      </p>
      <p className="text-base font-medium text-[#05073C]">
        {review?.author_name}
      </p>
      <p className="text-base text-[#05073C]">Traveler</p>
    </div>
  );
};

export default ReviewCard;
