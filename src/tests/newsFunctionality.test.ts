import {
  Article,
  NewsLinksContainer,
  MapAPIDataToArticleObject,
  Description,
  ApiResponseValidator,
} from '../newsData/newsFunctionality';

/* describe("map api object", () => {
  test("valid object", () => {
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

    const mockValidate = jest
      .spyOn(ApiResponseValidator.prototype, 'validate')
      .mockImplementation(() => {
        return true;
      });

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(apiResponseValidator);

    const result = mapAPIDataToArticleObject.map(articleObject);

    expect(mockValidate).toBeCalled();

    expect(result.name).toBe("name");

    expect(result.authors.length).toEqual(2);
    expect(result.authors[0]).toBe("Alex");
    expect(result.authors[1]).toBe("Bob");
    expect(result.description.heading).toBe("Some heading");
    expect(result.description.paragraph).toBe("\nHello World");
    expect(result.dateModified).toBe("10:08 UTC -12:00");
    expect(result.publishedAt).toBe("10:08 UTC -03:00");
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

    expect(mapAPIDataToArticleObject.map(responseObject)).toThrow(new Error("Article does not contain all the nessesary information"));

    expect(mockValidate).toBeCalled();
  })
}) */

describe('Should test ApiResponseValidator', () => {
  test('All nessesary data present', () => {
    const articleObject = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      authors: [{ name: 'Alex' }, { name: 'Bob' }],
      dateModified: { date: '10:08', timezone_type: 12, timezone: 'UTC' },
      publishedAt: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(articleObject);

    expect(valid).toBe(true);
  });

  test('No data', () => {
    let emptyOject = {};

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(emptyOject);

    expect(valid).toBe(false);
  });

  test('No articles Description field', () => {
    let noArticlesDescription = {
      articlesName: 'name',
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlesDescription);

    expect(valid).toBe(false);
  });

  test('No articles Description array', () => {
    let noArticlesDescriptionArray = {
      articlesDescription: '',
      articlesName: 'name',
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlesDescriptionArray);

    expect(valid).toBe(false);
  });

  test('No objects in article description array', () => {
    let responseObject = {
      articlesName: 'name',
      articlesDescription: [],
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(responseObject);

    expect(valid).toBe(false);
  });

  test('first element in articles Description array not object', () => {
    let firstElementInArticlesDescriptionArrayNotObject = {
      articlesDescription: [''],
      articlesName: 'name',
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(
      firstElementInArticlesDescriptionArrayNotObject
    );

    expect(valid).toBe(false);
  });

  test('No article paragraphs in articles Description array', () => {
    let twoObjectsInArticlesDescriptionArray = {
      articlesDescription: [{ type: 'heading', content: 'Hello World' }, ''],
      articlesName: 'name',
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(
      twoObjectsInArticlesDescriptionArray
    );

    expect(valid).toBe(false);
  });

  test('No article name field', () => {
    let noArticleName = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleName);

    expect(valid).toBe(false);
  });

  test('No authors', () => {
    let noArticleAuthor = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleAuthor);

    expect(valid).toBe(false);
  });

  test('authors is not array', () => {
    let noArticleAuthorArray = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      authors: '',
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleAuthorArray);

    expect(valid).toBe(false);
  });

  test('No objects in authors array', () => {
    let responseObject = {
      articlesName: 'name',
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(responseObject);

    expect(valid).toBe(false);
  });

  test('first element in authors array not object', () => {
    let firstElementInAuthorsArrayNotObject = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      authors: [''],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(
      firstElementInAuthorsArrayNotObject
    );

    expect(valid).toBe(false);
  });

  test('Second element in authors array not object', () => {
    let secondElementInAuthorsArrayNotObject = {
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      articlesName: 'name',
      authors: [{ name: 'Alex' }, ''],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(
      secondElementInAuthorsArrayNotObject
    );

    expect(valid).toBe(false);
  });

  test('No date modified', () => {
    let noArticleDateModiefied = {
      articlesName: 'name',
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [{ name: 'Alex' }],
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleDateModiefied);

    expect(valid).toBe(false);
  });

  test('No date modified object', () => {
    let noArticleDateModiefiedObject = {
      articlesName: 'name',
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [{ name: 'Alex' }],
      dateModified: '',
      publishedAt: { date: '10:03', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticleDateModiefiedObject);

    expect(valid).toBe(false);
  });

  test('No published at', () => {
    let noArticlePublishedDate = {
      articlesName: 'name',
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlePublishedDate);

    expect(valid).toBe(false);
  });

  test('No published at object', () => {
    let noArticlePublishedDateObject = {
      articlesName: 'name',
      articlesDescription: [
        { type: 'heading', content: 'Some heading' },
        { type: 'paragraph', content: 'Hello World' },
      ],
      authors: [{ name: 'Alex' }],
      dateModified: { date: '10:08', timezone_type: 3, timezone: 'UTC' },
      publishedAt: '',
    };

    const apiResponseValidator = new ApiResponseValidator();

    const valid = apiResponseValidator.validate(noArticlePublishedDateObject);

    expect(valid).toBe(false);
  });
});

describe('Return author names from author field in the api response', () => {
  test('No author names', () => {
    const authors: object[] = [];

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );
    const authorsArray =
      mapAPIDataToArticleObject.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
        authors
      );

    expect(authorsArray.length).toBe(0);
  });

  test('Authors array has object with no entries', () => {
    const authors = [{}];

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    expect(
      mapAPIDataToArticleObject.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
        authors
      )
    ).toThrow(new Error('No author name in author object'));
  });

  test('Authors array has object with 2 entries', () => {
    const authors = [
      {
        author: 'someAuthor',
        author2: 'someOtherAuthor',
      },
    ];

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    expect(
      mapAPIDataToArticleObject.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
        authors
      )
    ).toThrow(new Error('No author name in author object'));
  });

  test('1 author name', () => {
    const authors = [
      {
        authorName: 'Andrew Chung',
      },
    ];

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );
    const authorsArray =
      mapAPIDataToArticleObject.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
        authors
      );

    expect(authorsArray.length).toBe(1);
  });

  test('2 author names', () => {
    const authors = [
      {
        authorName: 'Andrew Chung',
      },
      {
        authorName: 'David Shepardson',
      },
    ];

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );
    const authorsArray =
      mapAPIDataToArticleObject.returnArrayOfAuthorNamesFromAuthorsArrayOfObjects(
        authors
      );

    expect(authorsArray.length).toBe(2);
  });
});

describe('Return DateTime not in format of it in the api response', () => {
  test('Object contains 2 pices of data', () => {
    const dateTime = {
      date: '2021-04-01 16:45:47.000000',
      timezone_type: 3,
    };

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    expect(mapAPIDataToArticleObject.getDateTimeString(dateTime)).toThrow(
      new Error('Article dateTime is not valid')
    );
  });

  test('Object contains 4 pices of data', () => {
    const dateTime = {
      date: '2021-04-01 16:45:47.000000',
      timezone_type: 3,
      something: 5,
    };

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );

    expect(mapAPIDataToArticleObject.getDateTimeString(dateTime)).toThrow(
      new Error('Article dateTime is not valid')
    );
  });

  test('Return correctly mapped date time string', () => {
    const dateTime = {
      date: '2021-04-01 16:45:47.000000',
      timezone_type: 3,
      timezone: 'UTC',
    };

    const apiResponseValidator = new ApiResponseValidator();
    const mapAPIDataToArticleObject = new MapAPIDataToArticleObject(
      apiResponseValidator
    );
    const formattedDateTime =
      mapAPIDataToArticleObject.getDateTimeString(dateTime);

    expect(formattedDateTime).toBe('2021-04-01 16:45:47 UTC -3:00');
  });
});

// https://www.geeksforgeeks.org/testing-with-jest/
// https://jestjs.io/docs/mock-functions
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
