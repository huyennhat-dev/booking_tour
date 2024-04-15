/* eslint-disable react/prop-types */
const Heading = (props) => {
  return (
    <div className="w-[100%] text-center py-2 my-1">
      <h1 className="text-[30px] font-semibold">{props.title}</h1>
    </div>
  );
};

export default Heading;
