import React, {useState} from 'react'
import {render} from "react-dom"
import {
  NewsApiRequest,
  NewsPageProcessors,
  NewsArticleContainer,
  MapAPIDataToArticleObject,
  ApiResponseValidator,
  Article,
} from "../../AlexNovitchkovBurbank/news";

export default function NewsComponent() {
  let newsApiRequest = new NewsApiRequest();

  const linkNames: string[] = [];

  //const apiDataArray = newsApiRequest.apiRequest();

  //const mapAPiDataToArticleObject = new MapAPIDataToArticleObject();

  // for (let apiDataElement of apiDataArray) {
  //   let article = mapAPiDataToArticleObject.map(apiDataElement);
  //   linkNames.push(article.name);
  // }

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

  const article = mapAPIDataToArticleObject.map(articleObject);

  const newsArticleContainerObject = new NewsArticleContainer();
  let newsArticleContainer = newsArticleContainerObject.create(article);

  const articles = [
    newsArticleContainer
  ]

  return (<div>{articles}</div>);
}

// https://codingmanatee.wordpress.com/2023/07/12/type-number-is-not-assignable-to-type-reactnode-ts2322/ Used to figure out that I need to create a string for JSX