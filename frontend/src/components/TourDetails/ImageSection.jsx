const ImageSection = ({ images }) => {
  if (images?.length == 1)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-12">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </div>
    );
  if (images?.length == 2)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-6">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-6">
          <img
            src={images[1]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
      </div>
    );
  if (images?.length == 3)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-7">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-5 flex flex-col gap-y-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-y-2">
            <div className="w-full row-span-1 col-span-5">
              <img
                src={images[1]}
                alt=""
                className="rounded-lg object-cover w-full mt-2 md:mt-0 h-[246px]"
              />
            </div>
            <div className="row-span-1 col-span-5 flex gap-2 h-[246px]">
              <div className=" col-span-2 w-full">
                <img
                  src={images[2]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (images?.length >= 4)
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 md:grid-rows-2 gap-x-2 h-[500px]">
        <div className="row-span-2 col-span-7">
          <img
            src={images[0]}
            alt=""
            className="rounded-lg object-cover w-full h-[500px]"
          />
        </div>
        <div className="row-span-2 col-span-5 flex flex-col gap-y-2">
          <div className="grid grid-cols-1 grid-rows-2 gap-y-2">
            <div className="w-full row-span-1 col-span-5">
              <img
                src={images[1]}
                alt=""
                className="rounded-lg object-cover w-full mt-2 md:mt-0 h-[246px]"
              />
            </div>
            <div className="row-span-1 col-span-5 flex gap-2 h-[246px]">
              <div className=" col-span-2 w-full">
                <img
                  src={images[2]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px]"
                />
              </div>
              <div className=" col-span-2 w-full">
                <img
                  src={images[3]}
                  alt=""
                  className="rounded-lg object-cover w-full h-[246px] "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ImageSection;
