import React, { useState, useEffect } from "react";
import "./NewsContainer.scss";
import { GetData } from "../../../../Helper/APICalls";
import NewsCard from "./NewsCard";
import Pagination from "./Pagination";

const NewsContainer = () => {
  const [lists, setLists] = useState([]);
  const [articles, setArticles] = useState([]);
  const [totalArticle, setTotalArticle] = useState(0);
  const [pagelist, setPagelist] = useState({ page: 0, limit: 10 });
  const getLists = async () => {
    const result = await GetData(
      "https://api.nytimes.com/svc/news/v3/content/section-list.json"
    );
    if (result.status == "OK") setLists(result?.results || []);
  };

  const getArticle = async () => {
    const result = await GetData(
      "https://api.nytimes.com/svc/news/v3/content/all/all.json",
      pagelist
    );
    console.log("results", result);
    if (result.status == "OK") {
      setArticles(result?.results || []);
      setTotalArticle(result?.num_results);
    }
  };
  useEffect(() => {
    getLists();
    getArticle();
  }, []);

  useEffect(() => {
    getArticle();
  }, [pagelist]);

  const handleClickList = (section) => {
    const newData = articles.filter(
      (item) => item.section.toLowerCase() === section.toLowerCase()
    );
    setArticles(newData);
  };

  const pageChange = (page) => {
    setPagelist({ ...pagelist, page: page - 1 });
  };

  return (
    <div className="news-wrapper">
      <div className="list-section">
        {lists.map((list) => (
          <div
            className="list-item"
            key={list.section}
            onClick={(e) => handleClickList(list.section)}
          >
            {list.display_name}
          </div>
        ))}
      </div>
      <div className="article-section">
        <div className="artcle-body">
          {articles.map((article) => (
            <NewsCard {...article} />
          ))}
        </div>

        <div>
          <Pagination
            totalItems={totalArticle}
            currentPage={pagelist.page + 1}
            pageSize={pagelist.limit}
            pageChange={pageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default NewsContainer;
