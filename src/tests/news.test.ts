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

  test("No articles Description field", () => {
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

  test("No articles Description array", () => {
  let noArticlesDescriptionArray = {
    articlesDescription: "",
    articlesName: "name",
    authors: [{ name: "Alex" }],
    dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
    publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
  };

  const apiResponseValidator = new ApiResponseValidator();

  const valid = apiResponseValidator.validate(noArticlesDescriptionArray);

  expect(valid).toBe(false);
  });

  test("No objects in article description array", () => {
    let responseObject = {
      articlesName: "name",
      articlesDescription: [
      ],
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(responseObject);

    expect(valid).toBe(true);
  });

  test("first element in articles Description array not object", () => {
    let firstElementInArticlesDescriptionArrayNotObject = {
      articlesDescription: [
        "",
      ],
      articlesName: "name",
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(firstElementInArticlesDescriptionArrayNotObject);

    expect(valid).toBe(false);
  });

  test("Second element in articles Description array not object", () => {
    let twoObjectsInArticlesDescriptionArray = {
      articlesDescription: [
        { type: "paragraph", content: "Hello World" },
        "",
      ],
      articlesName: "name",
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(twoObjectsInArticlesDescriptionArray);

    expect(valid).toBe(false);
  });

  test("No article name field", () => {
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

  test("No article name string", () => {
    let noArticleString = {
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      articlesName: 7,
      authors: [{ name: "Alex" }],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleString);

    expect(valid).toBe(false);
  });

  test("No authors", () => {
    let noArticleAuthor = {
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      articlesName: "name",
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleAuthor);

    expect(valid).toBe(false);
  });

  test("No authors array", () => {
    let noArticleAuthorArray = {
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      articlesName: "name",
      authors: "",
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleAuthorArray);

    expect(valid).toBe(false);
  });

  test("No objects in authors array", () => {
    let responseObject = {
      articlesName: "name",
      articlesDescription: [
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(responseObject);

    expect(valid).toBe(true);
  });
  
  test("first element in authors array not object", () => {
    let firstElementInAuthorsArrayNotObject = {
      articlesDescription: [
          { type: "paragraph", content: "Hello World" },
      ],
      articlesName: "name",
      authors: [""],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(firstElementInAuthorsArrayNotObject);

    expect(valid).toBe(false);
  });

  test("Second element in authors array not object", () => {
    let secondElementInAuthorsArrayNotObject = {
      articlesDescription: [
        { type: "paragraph", content: "Hello World" },
      ],
      articlesName: "name",
      authors: [{ name: "Alex" }, ""],
      dateModified: { date: "10:08", timezone_type: 3, timezone: "UTC" },
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(secondElementInAuthorsArrayNotObject);

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

  test("No date modified object", () => {
    let noArticleDateModiefiedObject = {
      articlesName: "name",
      articlesDescription: [
        { type: "heading", content: "Some heading" },
        { type: "paragraph", content: "Hello World" },
      ],
      authors: [{ name: "Alex" }],
      dateModified: "",
      publishedAt: { date: "10:03", timezone_type: 3, timezone: "UTC" },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleDateModiefiedObject);

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

  test("No published at object", () => {
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

describe("Should create sstring from Author names array", () => {
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
