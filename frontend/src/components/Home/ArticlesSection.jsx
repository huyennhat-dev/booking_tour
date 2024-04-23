import React from "react";
import { Link } from "react-router-dom";
import { styles } from "../../styles/styles";
import ArticleCard from "./ArticleCard";
import { articles } from "../../constants/whychoosetours";

const ArticlesSection = () => {
  return (
    <div
      className={`py-16 ${styles.horizontalPadding} flex flex-col gap-y-12 relative`}
    >
      <div className="w-full flex items-center justify-between">
        <h2 className={`${styles.headingSize}`}>Travel Articles</h2>
        <Link to="/" className="text-sm font-normal">
          See All
        </Link>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {articles.map((article, index) => {
          return <ArticleCard key={index} article={article} />;
        })}
      </div>
    </div>
  );
};

export default ArticlesSection;
