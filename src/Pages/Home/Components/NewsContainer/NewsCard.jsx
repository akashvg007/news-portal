import React, { Component, useState } from "react";

import "./NewsContainer.scss";

const NewsCard = (props) => {
  const {
    abstract,
    thumbnail_standard,
    url,
    title,
    updated_date,
    section,
  } = props;
  return (
    <div
      id="news-card-wrapper"
      onClick={(e) => {
        e.stopPropagation();
        window.open(url);
      }}
    >
      <div className="thumnail">
        <img src={thumbnail_standard} alt="" />
      </div>
      <div className="news-details">
        <div className="title">
          {title}
          <span>({section})</span>
        </div>
        <div>{abstract}</div>
      </div>
    </div>
  );
};

export default NewsCard;
