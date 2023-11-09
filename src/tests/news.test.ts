import {
  NewsArticleContainer,
  Article,
  NewsLinksContainer,
  MapAPIDataToArticleObject,
  Description,
  ApiResponseValidator
} from "../AlexNovitchkovBurbank/news";

describe("Create links from news titles", () => {
  test("No titles", () => {
    const titleArray: Array<string> = [];

    const newsLinksContainer = new NewsLinksContainer();

    const container = newsLinksContainer.create(titleArray);

    expect(container).toBe(typeof HTMLDivElement);

    // Ask about children elements
  });

  test("1 title", () => {
    const titleArray = ["One"];

    const newsLinksContainer = new NewsLinksContainer();

    const container = newsLinksContainer.create(titleArray);

    expect(container).toBe(typeof HTMLDivElement);

    // Ask about children elements
  });

  test("2 titles", () => {
    const titleArray = ["One", "Two"];

    const newsLinksContainer = new NewsLinksContainer();

    const container = newsLinksContainer.create(titleArray);

    expect(container).toBe(typeof HTMLDivElement);

    // Ask about children elements
  });
});

describe("map api object", () => {
  test("valid object", () => {
    let responseObject = {
      articlesName: "name",
      articlesDescription: [
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

  const mockValidate = jest
    .spyOn(ApiResponseValidator.prototype, 'validate')
    .mockImplementation(() => {
      return true;
    });

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(apiResponseValidator);

    const articleObject = mapAPIDataToArticleObject.map(responseObject);

    // expect(articleObject.name).toBe("name");
    // expect(articleObject.authors).toBe("Alex");
    // expect(articleObject.description.heading).toBe("Some heading");
    // expect(articleObject.description.paragraph).toBe("Hello World");
    // expect(articleObject.dateModified).toBe("10:08 UTC -03:00");
  })

  test("invalid object", () => {
    let responseObject = {};

    const mockValidate = jest
    .spyOn(ApiResponseValidator.prototype, 'validate')
    .mockImplementation(() => {
      return false;
    });

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(apiResponseValidator);

    mapAPIDataToArticleObject.map(responseObject);

    expect(mockValidate).toThrowError("Invalid api response object");
  })
})

describe("Should test ApiResponseValidator", () => {
  test("All nessesary data present", () => {
    let responseObject = {
      articlesName: "name",
      articlesDescription: [
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(responseObject);

    expect(valid).toBe(true);
  });

  test("No data", () => {
    let emptyOject = {};

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(emptyOject);

    expect(valid).toBe(false);
  });

  test("No articles Description array", () => {
    let noArticlesDescription = {
      articlesName: "name",
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlesDescription);

    expect(valid).toBe(false);
  });

  test("No article name", () => {
    let noArticleName = {
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleName);

    expect(valid).toBe(false);
  });

  test("No authors", () => {
    let noArticleAuthor = {
      articlesName: "name",
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleAuthor);

    expect(valid).toBe(false);
  });

  test("No date modified", () => {
    let noArticleDateModiefied = {
      articlesName: "name",
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleDateModiefied);

    expect(valid).toBe(false);
  });

  test("No published at", () => {
    let noArticlePublishedDate = {
      articlesName: "name",
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlePublishedDate);

    expect(valid).toBe(false);
  });
});

describe("Should make container for article", () => {
  test("Article object contains data", () => {
    const name = "Blah";
    const authors = ["Alex", "Bob"];
    const dateModified = "10/03/2023 2:50:00 UTC +00:00";
    const publishedAt = "10/02/2023 2:50:00 UTC +00:00";

    const heading = "some heading";
    const paragraph = "Some content";

    const description = new Description(heading, paragraph);

    const article = new Article(
      name,
      description,
      authors,
      dateModified,
      publishedAt
    );
    const newsArticleContainer = new NewsArticleContainer();

    const container = newsArticleContainer.create(article);

    expect(container).toBe(typeof HTMLDivElement);

    //let elementsInContainer = container.children();
  });
});

describe("Should create sstring from Author names", () => {
  test("Should return blank string", () => {
    const authorNames: Array<string> = [];

    const authorNamesAsStringExpected = "Alex";

    const newsArticleContainer = new NewsArticleContainer();

    const authorNamesAsStringResult =
      newsArticleContainer.stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test("Should make string out of 1 author name", () => {
    const authorNames = ["Alex"];

    const authorNamesAsStringExpected = "Alex";

    const newsArticleContainer = new NewsArticleContainer();

    const authorNamesAsStringResult =
      newsArticleContainer.stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test("Should make string out of 2 author names", () => {
    const authorNames = ["Alex", "Bob"];

    const authorNamesAsStringExpected = "Alex and Bob";

    const newsArticleContainer = new NewsArticleContainer();

    const authorNamesAsStringResult =
      newsArticleContainer.stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test("Should make string out of 3 author names", () => {
    const authorNames = ["Alex", "Bob", "Caleb"];

    const authorNamesAsStringExpected = "Alex, Bob, and Caleb";

    const newsArticleContainer = new NewsArticleContainer();

    const authorNamesAsStringResult =
      newsArticleContainer.stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test("Should make string out of 4 author names", () => {
    const authorNames = ["Alex", "Alice", "Bob", "Caleb"];

    const authorNamesAsStringExpected = "Alex, Alice, Bob, and Caleb";

    const newsArticleContainer = new NewsArticleContainer();

    const authorNamesAsStringResult =
      newsArticleContainer.stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });
});

// https://www.geeksforgeeks.org/testing-with-jest/
// https://jestjs.io/docs/mock-functions
