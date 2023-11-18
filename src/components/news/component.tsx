import React, {useState} from 'react'
import {render} from "react-dom"
import {
  NewsApiRequest,
  NewsPageProcessors,
  MapAPIDataToArticleObject,
  ApiResponseValidator,
  Article,
} from "../../newsData/news";
import IndividualArticles from "./individualArticles"


class NewsComponentProcessor {
  process() {
    let newsApiRequest = new NewsApiRequest();

  const linkNames: string[] = [];

  const apiDataArray = newsApiRequest.apiRequest();

  const articleObject = {
    articlesDescription: [
      { type: "heading", content: "Some heading" },
      { type: "paragraph", content: "Hello World" },
    ],
      articlesName: "name",
      authors: [{ name: "Alex" }, {name: "Bob"}],
      dateModified: { date: "10:08", timezone_type: 12, timezone: "UTC" },
      publishedAt: { date: "10:08", timezone_type: 3, timezone: "UTC" },
    };

  const apiResponseValidator = new ApiResponseValidator();
  let mapAPIDataToArticleObject = new MapAPIDataToArticleObject(apiResponseValidator);

  const article = mapAPIDataToArticleObject.map(apiDataArray);

  const articles = [
    <IndividualArticles article={article} />
  ]

  return articles;
  }
}

export default function NewsComponent() {
  const newsProcessor = new NewsComponentProcessor();

  const articles = newsProcessor.process();

  return (<div>{articles}</div>);
}

// https://codingmanatee.wordpress.com/2023/07/12/type-number-is-not-assignable-to-type-reactnode-ts2322/ Used to figure out that I need to create a string for JSX
// https://stackoverflow.com/questions/65277539/property-props-does-not-exist-on-type-intrinsicattributes-string