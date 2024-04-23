import React from "react";
import { styles } from "../../styles/styles";

const CommentForm = () => {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <h1 className={`${styles.blueText} text-2xl font-bold`}>Leave a Reply</h1>
      <p className="text-sm">
        Your email address will not be published. Required fields are marked *
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-x-6">
        <input
          type="text"
          placeholder="Name*"
          className="border rounded-xl p-3 text-sm outline-none"
        />
        <input
          type="text"
          placeholder="Email*"
          className="border rounded-xl p-3 text-sm outline-none mt-2 md:mt-0"
        />
      </div>
      <div className="w-full">
        <input
          type="text"
          placeholder="Title*"
          className="border w-full rounded-xl p-3 text-sm outline-none"
        />
      </div>
      <div className="w-full">
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          className="w-full border p-3 text-sm outline-none rounded-xl"
          placeholder="Comment*"
        ></textarea>
      </div>
      <div className="">
        <button
          className={`text-sm font-medium ${styles.bgOrange} py-3 px-4 rounded-xl text-white`}
        >
          Post Comment
        </button>
      </div>
    </div>
  );
};

export default CommentForm;
