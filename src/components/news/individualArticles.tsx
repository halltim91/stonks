import React from 'react'
import { Article } from '../../newsData/news';

export function stringNamesOfAuthorsTogether(authorNames: string[]): string {
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

export default function IndividualArticleContainer(props: {article: Article}) {
    const authorNameString = stringNamesOfAuthorsTogether(props.article.authors);
    return <div><h1>{props.article.name}</h1><p>{props.article.description.heading}</p><p>{props.article.description.paragraph}</p><p>{authorNameString}</p><p>props.dateModified</p><p>props.publishedAt</p></div>;
}