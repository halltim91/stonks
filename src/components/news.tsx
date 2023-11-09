import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  NewsApiRequest,
  NewsArticleContainer,
  NewsPageProcessors,
  MapAPIDataToArticleObject,
  Article,
} from "../AlexNovitchkovBurbank/news";

export default function NewsComponent() {
  let articleObjects: Array<Article> = [];
  let newsApiRequest = new NewsApiRequest();

  const linkNames: Array<string> = [];

  const apiDataArray = newsApiRequest.apiRequest();

  //const mapAPiDataToArticleObject = new MapAPIDataToArticleObject();

  for (let apiDataElement of apiDataArray) {
    //let article = mapAPiDataToArticleObject.map(apiDataElement);
    //linkNames.push(article.name);
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
      Hello world
    </div>
  );
}
