import { stringNamesOfAuthorsTogether } from './individualArticles';

describe('Should create string from Author names array', () => {
  test('Should return blank string', () => {
    const authorNames: string[] = [];

    const authorNamesAsStringExpected = '';

    const authorNamesAsStringResult = stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test('Should make string out of 1 author name', () => {
    const authorNames = ['Alex'];

    const authorNamesAsStringExpected = 'Alex';

    const authorNamesAsStringResult = stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test('Should make string out of 2 author names', () => {
    const authorNames = ['Alex', 'Bob'];

    const authorNamesAsStringExpected = 'Alex and Bob';

    const authorNamesAsStringResult = stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test('Should make string out of 3 author names', () => {
    const authorNames = ['Alex', 'Bob', 'Caleb'];

    const authorNamesAsStringExpected = 'Alex, Bob, and Caleb';

    const authorNamesAsStringResult = stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });

  test('Should make string out of 4 author names', () => {
    const authorNames = ['Alex', 'Alice', 'Bob', 'Caleb'];

    const authorNamesAsStringExpected = 'Alex, Alice, Bob, and Caleb';

    const authorNamesAsStringResult = stringNamesOfAuthorsTogether(authorNames);

    expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
  });
});
