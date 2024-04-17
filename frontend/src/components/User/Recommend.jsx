const Recommend = () => {
  const recommends = [
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
    },
    {
      img: "https://congthuong-cdn.mastercms.vn/stores/news_dataimages/2023/052023/09/10/in_article/sapa20230509102910.jpg?",
      title: "Tour du lịch Đà Nẵng: Bãi biển Mỹ Khê 1 ngày 1 đêm",
    },
  ];

  return (
    <>
      <p className="px-3 font-semibold  text-[20px]">Đề xuất cho bạn</p>
      {recommends.map((tour, index) => (
        <div key={index} className="my-1 mb-2">
          <img src={tour.img} alt="" className="rounded-sm" />
          <p className="title mt-1 text-[16px]">{tour.title}</p>
        </div>
      ))}
    </>
  );
};

export default Recommend;
