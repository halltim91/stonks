import { Description } from "../../newsData/newsFunctionality";
import { Article } from "../../newsData/newsFunctionality";
import { stringNamesOfAuthorsTogether } from "./individualArticles";

describe("Should make container for article", () => {
    /* test("Article object contains data", () => {
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
  
      expect(container).toBe(typeof(HTMLDivElement));
  
      //let elementsInContainer = container.children();
    }); */
  });
  
  describe("Should create string from Author names array", () => {
    test("Should return blank string", () => {
      const authorNames: string[] = [];
  
      const authorNamesAsStringExpected = "";
  
      const authorNamesAsStringResult =
        stringNamesOfAuthorsTogether(authorNames);
  
      expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
    });
  
    test("Should make string out of 1 author name", () => {
      const authorNames = ["Alex"];
  
      const authorNamesAsStringExpected = "Alex";
  
      const authorNamesAsStringResult =
        stringNamesOfAuthorsTogether(authorNames);
  
      expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
    });
  
    test("Should make string out of 2 author names", () => {
      const authorNames = ["Alex", "Bob"];
  
      const authorNamesAsStringExpected = "Alex and Bob";
  
      const authorNamesAsStringResult =
        stringNamesOfAuthorsTogether(authorNames);
  
      expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
    });
  
    test("Should make string out of 3 author names", () => {
      const authorNames = ["Alex", "Bob", "Caleb"];
  
      const authorNamesAsStringExpected = "Alex, Bob, and Caleb";
  
      const authorNamesAsStringResult =
        stringNamesOfAuthorsTogether(authorNames);
  
      expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
    });
  
    test("Should make string out of 4 author names", () => {
      const authorNames = ["Alex", "Alice", "Bob", "Caleb"];
  
      const authorNamesAsStringExpected = "Alex, Alice, Bob, and Caleb";
  
      const authorNamesAsStringResult =
        stringNamesOfAuthorsTogether(authorNames);
  
      expect(authorNamesAsStringResult).toBe(authorNamesAsStringExpected);
    });
  });