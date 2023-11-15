//import axios from "axios";
import React, { DetailedReactHTMLElement } from 'react'
export class NewsLinksContainer {
  create(titles: string[]): HTMLDivElement {
    const newsLinksEContainer = document.createElement("div");

    let titleFlexContainer = null;

    for (let title of titles) {
      titleFlexContainer = document.createElement("div");
      titleFlexContainer.innerText = title;

      newsLinksEContainer.appendChild(titleFlexContainer);
    }

    return newsLinksEContainer;
  }
}

export class ApiResponseValidator {
  validate(articleObject: object): boolean {
    let dataAboutArticle = Object.values(articleObject);

    if (Object.keys(articleObject).length === 0) return false;

    if (!articleObject.hasOwnProperty("articlesName")) return false;
    if (!(dataAboutArticle[1] instanceof String) === undefined) return false;

    if (!Object.hasOwn(articleObject, "articlesDescription")) return false;
    const articleDescriptionArray = (dataAboutArticle[0] as object[]);
    if (!(articleDescriptionArray instanceof Array)) return false;
    for (let articleDescriptionPart of articleDescriptionArray)
      if (new Object(articleDescriptionPart) === undefined) return false;

    if (!Object.hasOwn(articleObject, "authors")) return false;
    const authorsArray = (dataAboutArticle[2] as object[]);
    if (!(authorsArray instanceof Array)) return false;
    for (let authorsArrayPart of authorsArray)
      if (new Object(authorsArrayPart) === undefined) return false;

    if (!Object.hasOwn(articleObject, "dateModified")) return false;
    if (!(dataAboutArticle[3] instanceof Object)) return false;

    if (!Object.hasOwn(articleObject, "publishedAt")) return false;
    if (!(dataAboutArticle[4] instanceof Object) === undefined) return false;

    return true;
  }
}

export class MapAPIDataToArticleObject {
  validator: ApiResponseValidator;

  constructor(validator: ApiResponseValidator) {
    this.validator = validator;
  }

  map(article: Object): Article {
    let authorArray: string[] = [];

    const valid = this.validator.validate(article);

    let description: Description = new Description("", "");
    let name: string = "";
    let dateModified: string = "";
    let publishedAt: string = "";

    if (valid === false) {
      console.error("Invalid api response object");

      return new Article("", description, [""], "", "")
    }

    const articleObjectEntries = Object.entries(article);

    for (const [key, value] of articleObjectEntries) {
      if (key === "articlesName") name = value;
      if (key === "articlesDescription")
        description =
          this.returnArticleDescriptionObjectFromArticleDescriptionArray(value);
      if (key === "authors") {
          authorArray =
            this.returnArrayOfAuthorNamesFromAuthorsArrayObject(value);
      }
      if (key === "dateModified") dateModified = this.getDateString(value);
      if (key === "publishedAt") publishedAt = this.getDateString(value);
    }

    let articleObject = new Article(
      name,
      description,
      authorArray,
      dateModified,
      publishedAt
    );

    return articleObject;
  }

  returnArrayOfAuthorNamesFromAuthorsArrayObject(authorNames: object[]): string[] {
    let authorNamesArray: string[] = [""];

    for (let authorNameObject of authorNames) {
      if (Object.values(authorNameObject).length !== 1)
        throw Error("No author name in author object");

      let authorName = Object.values(authorNameObject)[0];

      authorNamesArray.push(authorName);
    }

    return authorNamesArray;
  }

  getDateString(dateObject: object): string {
    let dateString = "";
    let dateObjectValues = Object.values(dateObject);

    if (dateObjectValues.length !== 3) throw Error("Article date is not valid");

    const timeZoneString = String(dateObjectValues[1]);

    if (timeZoneString.length === 1) {
      const timeZoneInCorrectFormat = `+0${String(dateObjectValues[1])}:00`;
      dateString =
      `${String(dateObjectValues[0])} ${String(timeZoneInCorrectFormat)} ${String(dateObjectValues[2])}`;
    }
    else {
      const timeZoneInCorrectFormat = `+${String(dateObjectValues[1])}:00`;
      dateString =
      `${String(dateObjectValues[0])} ${timeZoneInCorrectFormat} ${String(dateObjectValues[2])}`;
    }

    return dateString;
  }

  returnArticleDescriptionObjectFromArticleDescriptionArray(articlesDescriptionArray: object[]): Description {
    let heading: string = "";
    let paragraph: string = "";

    for (let articleDescriptionPart of articlesDescriptionArray)  {
      const articleDescriptPartEntries = Object.entries(articleDescriptionPart)
      for (const [key, value] of articleDescriptPartEntries)
        if (key === "heading")
          heading = value;
        else
          paragraph = paragraph + "\n" + value
    }

    const description = new Description(heading, paragraph);

    return description;
  }
}

export class NewsPageProcessors {
  constructor() {}

  returnLinks(): void {}
}

export class NewsApiRequest {
  apiRequest(): object[] {
    let apiData: object[] = [];

    const options = {
      method: "GET",
      url: "https://reuters-business-and-financial-news.p.rapidapi.com/article-date/2021-04-01",
      headers: {
        "X-RapidAPI-Key": "123456" /*process.env.NEWS_API_KEY*/,
        "X-RapidAPI-Host": "reuters-business-and-financial-news.p.rapidapi.com",
      },
    };

    /* axios
      .request(options)
      .then((data) => (apiData = data.data))
      .then((data) => (apiData = data.json()))
      .catch((err) => console.error(err)); */

    return apiData;
  }
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://vitejs.dev/guide/env-and-mode.html

export class Description {
  heading: string;
  paragraph: string;

  constructor(heading: string, paragraph: string) {
    this.heading = heading;
    this.paragraph = paragraph;
  }
}

export class Article {
  name: string = "";
  description: Description;
  authors: string[] = [];
  dateModified: string = "";
  publishedAt: string = "";

  constructor(
    articleName: string,
    articleDescription: Description,
    authors: string[],
    dateModified: string,
    publishedAt: string
  ) {
    this.name = articleName;
    this.description = articleDescription;
    this.authors = authors;
    this.dateModified = dateModified;
    this.publishedAt = publishedAt;
  }
}

export class NewsArticleContainer {
  create(article: Article): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    const authorsString = this.stringNamesOfAuthorsTogether(article.authors)

    const articleNameElement = React.createElement("h1", null, article.name);
    const articleDescriptionHeadingElement = React.createElement("p", null, `${article.description.heading}`);
    const articleDescriptionParagraphElement = React.createElement("p", null, `${article.description.paragraph}`);
    const authorNamesElement = React.createElement("h1", null, authorsString);
    const dateModifiedElement = React.createElement("p", null, article.dateModified);
    const publishedAtElement = React.createElement("p", null, article.publishedAt);

    const containerElements = [articleNameElement, articleDescriptionHeadingElement, articleDescriptionParagraphElement, authorNamesElement, dateModifiedElement, publishedAtElement];

    //const articleContainer = document.createElement("div");
    const articleContainer = React.createElement("div", null, containerElements);


    return articleContainer;
  }

  stringNamesOfAuthorsTogether(authorNames: string[]): string {
    let authorsNamesString: string = "";

    for (let i = 0; i < authorNames.length; i++) {
      if (i === 0) authorsNamesString = authorNames[i];
      else if (i === authorNames.length - 1 && authorNames.length > 2)
        authorsNamesString = `${authorsNamesString}, and ${authorNames[i]}`;
      else if (i === authorNames.length - 1 && authorNames.length === 2)
        authorsNamesString = `${authorsNamesString} and ${authorNames[i]}`;
      else authorsNamesString = `${authorsNamesString}, ${authorNames[i]}`;
    }

    return authorsNamesString;
  }
}

// https://www.w3schools.com/typescript/typescript_object_types.php
// https://www.w3schools.com/typescript/typescript_casting.php
// https://www.w3schools.com/typescript/typescript_arrays.php
// https://www.w3schools.com/js/js_arrays.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn