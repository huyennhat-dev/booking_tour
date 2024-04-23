import React from "react";
import { Article1 } from "../../assets/export";

const ArticleCard = ({ article }) => {
  return (
    <div className={`flex flex-col gap-y-2`}>
      <img src={article?.image} alt="" className="w-full" />
      <div className="flex gap-3 md:gap-x-6 lg:gap-x-6 xl:gap-x-6">
        <span className="text-xs text-[05073C] font-normal">
          {article?.date}
        </span>
        <span className="text-xs text-[05073C] font-normal">
          {article.author}
        </span>
      </div>
      <p className="text-[05073C] font-medium text-base">{article.title}</p>
    </div>
  );
};

export default ArticleCard;
