export class NewsLinksContainer {
  create(titles: string[]): HTMLDivElement {
    const newsLinksEContainer = document.createElement('div');

    let titleFlexContainer = null;

    for (let title of titles) {
      titleFlexContainer = document.createElement('div');
      titleFlexContainer.innerText = title;

      newsLinksEContainer.appendChild(titleFlexContainer);
    }

    return newsLinksEContainer;
  }
}

export class ApiResponseValidator {
  validate(article: object): boolean {
    const articleAsObject = Object(article);

    if (Object.keys(articleAsObject).length === 0) return false;

    if (!Object.hasOwn(articleAsObject, 'articlesDescription')) return false;
    if (!(articleAsObject.articlesDescription as object[])) return false;
    if (articleAsObject.articlesDescription.length === 0) return false;
    for (let typeOfArticleDescription of articleAsObject.articlesDescription)
      if (!(typeOfArticleDescription as object)) return false;

    if (!article.hasOwnProperty('articlesName')) return false;
    if ((articleAsObject.articlesName as string) === undefined) return false;
    if (articleAsObject.articlesName.length === 0) return false;

    if (!Object.hasOwn(article, 'dateModified')) return false;
    if (!(articleAsObject.dateModified as object)) return false;

    if (!Object.hasOwn(article, 'publishedAt')) return false;
    if (!(articleAsObject.publishedAt as object)) return false;

    if (!Object.hasOwn(article, 'authors')) return false;
    if (!(articleAsObject.authors as object[])) return false;
    if (articleAsObject.authors.length === 0) return false;
    for (let authorNameInObjectForm of articleAsObject.authors)
      if (!(authorNameInObjectForm as object)) return false;

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

    let description: Description = new Description('', '');
    let name: string = '';
    let dateModified: string = '';
    let publishedAt: string = '';

    if (valid === false)
      throw Error('Article does not contain all the nessesary information');

    const articleObjectEntries = Object.entries(article);

    for (const [key, value] of articleObjectEntries) {
      if (key === 'articlesName') name = value;
      if (key === 'articlesDescription')
        description =
          this.returnArticleDescriptionObjectFromArticleDescription(value);
      if (key === 'dateModified') dateModified = this.getDateTimeString(value);
      if (key === 'publishedAt') publishedAt = this.getDateTimeString(value);
      if (key === 'authors') {
        authorArray =
          this.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(value);
      }
    }

    let articleObject = new Article(
      name,
      description,
      dateModified,
      publishedAt,
      authorArray
    );

    return articleObject;
  }

  returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
    authorNames: object[]
  ): string[] {
    let authorNamesArray: string[] = [];

    for (let authorNameObject of authorNames) {
      if (Object.values(authorNameObject).length !== 1)
        throw new Error('No author name in author object');

      let authorName = Object.values(authorNameObject)[0];

      authorNamesArray.push(authorName);
    }

    return authorNamesArray;
  }

  getDateTimeString(dateObject: object): string {
    let dateObjectValues = Object.values(dateObject);

    if (dateObjectValues.length !== 3) throw new Error('Article dateTime is not valid');

    const timeZoneInCorrectFormat = `-${String(dateObjectValues[1])}:00`;
    const positionOfDelimeterBetweenSecondsAndMilleseconds = String(dateObjectValues[0]).indexOf(".");

    const dateTimeAsString = String(dateObjectValues[0]);

    let formattedDateTimeString = dateTimeAsString.slice(0, positionOfDelimeterBetweenSecondsAndMilleseconds);

    formattedDateTimeString = `${formattedDateTimeString} ${dateObjectValues[2]} ${timeZoneInCorrectFormat}`;

    return formattedDateTimeString;
  }

  returnArticleDescriptionObjectFromArticleDescription(
    articlesDescriptionString: string
  ): Description {
    let heading: string = '';
    let paragraph: string = '';

    articlesDescriptionString = articlesDescriptionString.replace('[', '');
    articlesDescriptionString = articlesDescriptionString.replace(']', '');

    let articlesDescriptionContentTypesObjectAsString =
      articlesDescriptionString.split('}');

    for (let articlesDescriptionContentTypeObjectAsString of articlesDescriptionContentTypesObjectAsString) {
      articlesDescriptionContentTypeObjectAsString =
        articlesDescriptionContentTypeObjectAsString.replace('{', '');

      if (articlesDescriptionContentTypeObjectAsString.includes('"heading"')) {
        let articlesDescriptionContentTypeObjectParts =
          articlesDescriptionContentTypeObjectAsString.split(':');

        if (articlesDescriptionContentTypeObjectParts.length > 0) {
          let headingValue =
            articlesDescriptionContentTypeObjectParts[
              articlesDescriptionContentTypeObjectParts.length - 1
            ];
          if (headingValue.length > 2)
            heading = headingValue.slice(1, headingValue.length - 1);
        }
      }

      if (
        articlesDescriptionContentTypeObjectAsString.includes('"paragraph"')
      ) {
        let articlesDescriptionContentTypeObjectParts =
          articlesDescriptionContentTypeObjectAsString.split(':');

        if (articlesDescriptionContentTypeObjectParts.length > 0) {
          let paragraphValue =
            articlesDescriptionContentTypeObjectParts[
              articlesDescriptionContentTypeObjectParts.length - 1
            ];
          if (paragraphValue.length > 2)
            paragraph =
              paragraph + paragraphValue.slice(1, paragraphValue.length - 1);
        }
      }
    }

    const description = new Description(heading, paragraph);

    return description;
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
  name: string = '';
  description: Description;
  dateModified: string = '';
  publishedAt: string = '';
  authors: string[] = [];

  constructor(
    articleName: string,
    articleDescription: Description,
    dateModified: string,
    publishedAt: string,
    authors: string[]
  ) {
    this.name = articleName;
    this.description = articleDescription;
    this.dateModified = dateModified;
    this.publishedAt = publishedAt;
    this.authors = authors;
  }
}

// https://www.w3schools.com/typescript/typescript_object_types.php
// https://www.w3schools.com/typescript/typescript_casting.php
// https://www.w3schools.com/typescript/typescript_arrays.php
// https://www.w3schools.com/js/js_arrays.asp
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn
