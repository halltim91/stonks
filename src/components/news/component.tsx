import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {
  NewsPageProcessors,
  MapAPIDataToArticleObject,
  ApiResponseValidator,
  Article,
  Description,
} from '../../newsData/newsFunctionality';
import DisplayIndividualArticles from './individualArticles';
import { API_KEY } from './secretKey';
import Frame from '../frame';
import "../../css/table.css";
import './component.css';

class NewsComponentProcessor {
  process(undformattedArticles: object[]) {
    const linkNames: string[] = [];

    const apiResponseValidator = new ApiResponseValidator();
    let mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    let formattedArticles: Article[] = [];

    if (undformattedArticles.length <= 6) {
    for (let i = 0; i < undformattedArticles.length; i++) {
      const article = mapAPIDataToArticleObject.map(undformattedArticles[i]);

      formattedArticles.push(article);
    }
  }
  else {
    for (let i = 0; i < 6; i++) {
      const article = mapAPIDataToArticleObject.map(undformattedArticles[i]);

      formattedArticles.push(article);
    }
  }

    return formattedArticles;
  }
}

export default function NewsComponent() {
  const newsProcessor = new NewsComponentProcessor();

  const [apiData, setApiData] = useState([{}]);

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://reuters-business-and-financial-news.p.rapidapi.com/article-date/2021-04-01',
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'reuters-business-and-financial-news.p.rapidapi.com',
      }
    };

    axios
      .request(options)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((e) => console.error(e));
  }, []);

  const articles = newsProcessor.process(apiData);

  const articlesContainer = [];

  for (let i = 0; i < articles.length; i++) {
    articlesContainer.push(<DisplayIndividualArticles article={articles[i]} />);
  }

  return (
    <Frame title='News'>
      <table>
        <thead>
          <tr>
            <th className='headingRowName'>article</th>
          </tr>
        </thead>
        <tbody>
          {articlesContainer}
        </tbody>
      </table>
    </Frame>
  );
}

// https://codingmanatee.wordpress.com/2023/07/12/type-number-is-not-assignable-to-type-reactnode-ts2322/ Used to figure out that I need to create a string for JSX
// https://stackoverflow.com/questions/65277539/property-props-does-not-exist-on-type-intrinsicattributes-string
// https://www.youtube.com/watch?v=ZEKBDXGnD4s&t=650s Used for useEffect
