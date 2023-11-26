import { useState } from 'react';
import { Article } from '../../newsData/newsFunctionality';
import { Modal } from 'react-bootstrap';

export function stringNamesOfAuthorsTogether(authorNames: string[]): string {
  let authorsNamesString: string = '';

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

export default function DisplayIndividualArticles(props: {
  article: Article;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const authorNameString = stringNamesOfAuthorsTogether(props.article.authors);
  return (
    <div>
      <p>{props.article.name}</p>
      <button onClick={handleShowModal}>More</button>
      <Modal show={showModal} onHide={handleHideModal}>
        <h1>{props.article.name}</h1>
        <p>{props.article.description.heading}</p>
        <p>{props.article.description.paragraph}</p>
        <p>{authorNameString}</p>
        <p>{props.article.dateModified}</p>
        <p>{props.article.publishedAt}</p>
      </Modal>
    </div>
  );
}
