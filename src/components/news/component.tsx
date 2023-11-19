import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {
  NewsPageProcessors,
  MapAPIDataToArticleObject,
  ApiResponseValidator,
  Article,
} from '../../newsData/news';
import IndividualArticles from './individualArticles';
import { API_KEY } from './secretKey';

class NewsComponentProcessor {
  process(undformattedArticles: object[]) {
    const linkNames: string[] = [];

    const articleObject = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      dateModified: { date: '10:08', timezone_type: 12, timezone: 'UTC' },
      publishedAt: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      authors: [{ name: 'Alex' }, { name: 'Bob' }],
    };

    const apiResponseValidator = new ApiResponseValidator();
    let mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    const article = mapAPIDataToArticleObject.map(undformattedArticles[0]);

    const formattedArticles = [<IndividualArticles article={article} />];

    return formattedArticles;
  }
}

export default function NewsComponent() {
  const newsProcessor = new NewsComponentProcessor();

  const [apiData, setApiData] = useState([{}]);

  useEffect(() => {
    const getApiData = () => {
      const options = {
        method: 'GET',
        url: 'https://reuters-business-and-financial-news.p.rapidapi.com/article-date/2021-04-01',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host':
            'reuters-business-and-financial-news.p.rapidapi.com',
        },
      };

      axios
        .request(options)
        .then((response) => {
          setApiData(response.data);
        })
        .catch((e) => console.error(e));
    };

    getApiData();
  }, []);

  const articles = newsProcessor.process(apiData);

  return <div>{articles}</div>;
}

// https://codingmanatee.wordpress.com/2023/07/12/type-number-is-not-assignable-to-type-reactnode-ts2322/ Used to figure out that I need to create a string for JSX
// https://stackoverflow.com/questions/65277539/property-props-does-not-exist-on-type-intrinsicattributes-string
// https://www.youtube.com/watch?v=ZEKBDXGnD4s&t=650s Used for useEffect
