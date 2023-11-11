import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  NewsApiRequest,
  NewsPageProcessors,
  NewsArticleContainer,
  MapAPIDataToArticleObject,
  ApiResponseValidator,
  Article,
} from "../AlexNovitchkovBurbank/news";

export default function NewsComponent() {
  let articleObjects: Article[] = [];
  let newsApiRequest = new NewsApiRequest();

  const linkNames: string[] = [];

  const apiDataArray = newsApiRequest.apiRequest();

  //const mapAPiDataToArticleObject = new MapAPIDataToArticleObject();

  for (let apiDataElement of apiDataArray) {
    //let article = mapAPiDataToArticleObject.map(apiDataElement);
    //linkNames.push(article.name);
  }

  let noArticlePublishedDateObject = {
      articlesName: "name",
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: "",
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlePublishedDateObject);

  console.log("is valid: " + valid);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
      Hello World
    </div>
  );
}
