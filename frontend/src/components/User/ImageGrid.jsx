/* eslint-disable react/prop-types */
const GridImage = (props) => {
  const photos = props.photos;

  if (photos.length == 1)
    return (
      <div className="w-full">
        <img src={photos[0]} alt="" className="object-cover w-full" />
      </div>
    );
  if (photos.length == 2)
    return (
      <div className="grid grid-cols-2  gap-1">
        <div className="col-span-1 row-span-2 ">
          <img src={photos[0]} alt="" className="object-cover w-full" />
        </div>
        <div className="col-span-1">
          <img src={photos[1]} alt="" className="object-cover w-full" />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-5 grid-rows-2 gap-1">
      <div className="col-span-3 row-span-2 ">
        <img src={photos[0]} alt="" className="h-full object-cover" />
      </div>
      <div className="col-span-2">
        <img src={photos[1]} alt="" className="h-[200px] w-full object-cover " />
      </div>
      <div className="col-span-2">
        <img src={photos[2]} alt="" className="h-[200px] w-full object-cover " />
      </div>
    </div>
  );
};

export default GridImage;
