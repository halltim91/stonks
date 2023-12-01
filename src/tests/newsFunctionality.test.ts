import {
  NewsLinksContainer,
  ApiResponseValidator,
} from '../newsData/newsFunctionality';

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

// https://www.geeksforgeeks.org/testing-with-jest/
// https://jestjs.io/docs/mock-functions
