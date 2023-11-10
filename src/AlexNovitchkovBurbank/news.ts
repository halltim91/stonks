import axios from "axios";
import { error } from "console";
import { env } from "process";

export class NewsLinksContainer {
  create(titles: Array<string>): HTMLDivElement {
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
  validate(articleObject: Object): boolean {
    if (Object.keys(articleObject).length === 0) return false;
    if (!articleObject.hasOwnProperty("articlesDescription")) return false;

    const objectEntries = Object.entries(articleObject);

    for (let objectEntry of objectEntries) {
    }
    // objectEntries["articlesDescription"];
    return true;
  }
}

export class MapAPIDataToArticleObject {
  validator: ApiResponseValidator;

  constructor(validator: ApiResponseValidator) {
    this.validator = validator;
  }

  returnArrayOfAuthorNamesFromAuthorsObject(authorNames: object[]): string[] {
    let noAuthorObjectsArray: Array<string> = [""];


    for (let authorNameObject of authorNames) {
      if (Object.values(authorNameObject).length !== 1)
        throw error("No author name in author object");

      let authorName = Object.values(authorNameObject)[0];

      noAuthorObjectsArray.push(authorName);
    }
      
    return noAuthorObjectsArray;
  }

  map(article: object) {
    let authorArray: Array<string> = [];

    const valid = this.validator.validate(article);

    let description: Description = new Description("", "");
    let name: string = "";

    if (valid === false) throw error("Invalid api response object");

    const articleObjectEntries = Object.entries(article);

    for (const [key, value] of articleObjectEntries) {
      if (key === "articlesName") {
        name = value;
      }
      if (key === "articlesDescription") {
        description =
          this.returnArticleDescriptionObjectFromArticleString(value);
      }
      if (key === "authors") {
        for (let authorName of value)
          authorArray = (this.returnArrayOfAuthorNamesFromAuthorsObject(authorName));
      }
      if (key === "publishedAt" || key === "dateModified")
        this.getDateString(value);
    }

    //let articleObject = new Article();

    //return articleObject;
  }

  getDateString(dateObject: object) {
    let dateObjectValues = Object.values(dateObject);

    if (dateObjectValues.length !== 3)
      throw error("Article date is not valid");

    dateObjectValues[0] + " " + dateObjectValues[1] + dateObjectValues[2];
  }

  returnArticleDescriptionObjectFromArticleString(
    value: string
  ): Description {
    let heading: string = "";
    let paragraph: string = "";

    value = value.replace("[", "");
    value = value.replace("]", "");

    value = value.replace("},{", "^");
    value = value.replace("{", "");
    value = value.replace("}", "");

    const arrayOfObjects = value.split("^");

    for (let objectInArray of arrayOfObjects) {
      if (objectInArray.includes('"heading",')) {
        heading =
          objectInArray.replace('"type":"heading","content":"', "") + "\n";

        heading = heading.slice(0, heading.length - 1);
      } else if (objectInArray.includes('"paragraph",')) {
        paragraph =
          paragraph +
          objectInArray.replace('"type":"paragraph","content":"', "") +
          "\n";
      }
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
  apiRequest(): Array<Object> {
    let apiData: Array<Object> = [];
    let news: String = "";

    const options = {
      method: "GET",
      url: "https://reuters-business-and-financial-news.p.rapidapi.com/article-date/2021-04-01",
      headers: {
        "X-RapidAPI-Key": env.NEWS_API_KEY,
        "X-RapidAPI-Host": "reuters-business-and-financial-news.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((data) => (apiData = data.data))
      .then((data) => (apiData = data.json()))
      .catch((error) => console.error(error));

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
  authors: Array<string> = [];
  dateModified: string = "";
  publishedAt: string = "";

  constructor(
    articleName: string,
    articleDescription: Description,
    authors: Array<string>,
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
  create(article: Article): HTMLDivElement {
    const authorElement = document.createElement("h1");
    const descriptionElement = document.createElement("p");
    const authorsElement = document.createElement("p");
    const dateElement = document.createElement("p");

    const container = document.createElement("div");

    authorElement.innerText = article.name;
    descriptionElement.innerText =
      article.description.heading + "\n" + article.description.paragraph;
    authorsElement.innerText = this.stringNamesOfAuthorsTogether(
      article.authors
    );
    dateElement.innerText = article.publishedAt;

    container.appendChild(authorElement);
    container.appendChild(descriptionElement);
    container.appendChild(authorElement);
    container.appendChild(dateElement);

    return container;
  }

  stringNamesOfAuthorsTogether(authorNames: Array<string>): string {
    let authorsNamesString: string = "";

    for (let i = 0; i < authorNames.length; i++) {
      if (i === 0) authorsNamesString = authorNames[i];
      else if (i === authorNames.length - 1 && authorNames.length > 1)
        authorsNamesString = `${authorsNamesString} and ${authorNames[i]}`;
      else authorsNamesString = `${authorsNamesString}, ${authorNames[i]}`;
    }

    return authorsNamesString;
  }
}
