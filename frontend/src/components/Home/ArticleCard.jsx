import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article }) => {
  return (
    <div className={`flex flex-col gap-y-2`}>
      <Link to="/">
        <img src={article?.image} alt="" className="w-full" />
      </Link>
      <div className="flex gap-3 md:gap-x-6 lg:gap-x-6 xl:gap-x-6">
        <span className="text-xs text-[05073C] font-normal">
          {article?.date}
        </span>
        <span className="text-xs text-[05073C] font-normal">
          {article.author}
        </span>
      </div>
      <Link to="/">
        <p className="text-[05073C] font-medium text-base text-ellipsis line-clamp-2">
          {article.title}
        </p>
      </Link>
    </div>
  );
};

export default ArticleCard;
