import { useState } from 'react';
import { Article } from '../../newsData/newsFunctionality';
import { Modal } from 'react-bootstrap';
import '../../css/table.css';

export function stringNamesOfAuthorsTogether(authorNames: string[] | undefined): string {
  let authorsNamesString: string = '';

  if (authorNames && authorNames.length > 0) {
    for (let i = 0; i < authorNames.length; i++) {
      if (i === 0) authorsNamesString = authorNames[i];
      else if (i === authorNames.length - 1 && authorNames.length > 2)
        authorsNamesString = `${authorsNamesString}, and ${authorNames[i]}`;
      else if (i === authorNames.length - 1 && authorNames.length === 2)
        authorsNamesString = `${authorsNamesString} and ${authorNames[i]}`;
      else authorsNamesString = `${authorsNamesString}, ${authorNames[i]}`;
    }

    console.log("author names:", authorNames);
  }

  return authorsNamesString;
}

export default function DisplayIndividualArticles(props: {
  article: Article;
}) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  // Check if props.article is defined before accessing its properties
  const authorNameString = stringNamesOfAuthorsTogether(props.article?.authors);
  const articleName = props.article?.name || 'No Name'; // Default to 'No Name' if article.name is undefined

  // Check if props.article.description is defined before accessing its properties
  const heading = props.article?.description?.heading || 'No Heading';
  const paragraph = props.article?.description?.paragraph || 'No Paragraph';

  // Check if props.article.dateModified is defined before accessing it
  const dateModified = props.article?.dateModified || 'No Date Modified';

  // Check if props.article.publishedAt is defined before accessing it
  const publishedAt = props.article?.publishedAt || 'No Published At';

  console.log("author names:", props.article?.authors);
  console.log("author names string:", authorNameString);

  return (
    <div>
      <p>{articleName}</p>
      <button onClick={handleShowModal}>More</button>
      <Modal show={showModal} onHide={handleHideModal}>
        <h1>{articleName}</h1>
        <p>{heading}</p>
        <p>{paragraph}</p>
        <p>{authorNameString}</p>
        <p>{dateModified}</p>
        <p>{publishedAt}</p>
      </Modal>
    </div>
  );
}









/*import { useState } from 'react';
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

export default function DisplayIndividualArticles(props: { article: Article }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const authorNameString = stringNamesOfAuthorsTogether(props.article.authors);

  const articleNameWords = props.article.name.split(' ');
  let articleIdentifier = ' ';

  if (articleNameWords.length > 4) {
    articleIdentifier =
      articleNameWords[0] +
      ' ' +
      articleNameWords[1] +
      ' ' +
      articleNameWords[2] +
      ' ' +
      articleNameWords[3] +
      '...';
  } else {
    articleIdentifier = props.article.name;
  }

  return (
    <tr>
      <td>
        <button onClick={handleShowModal}>{articleIdentifier}</button>
        <Modal
          show={showModal}
          onHide={handleHideModal}
          animation={true}
          className='modalSize'
          onExit={handleHideModal}
        >
          <Modal.Header closeLabel='close'>
            <Modal.Title>{props.article.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h1>{props.article.name}</h1>
            <p>{props.article.description.heading}</p>
            <p>{props.article.description.paragraph}</p>
            <p>{authorNameString}</p>
            <p>{props.article.dateModified}</p>
            <p>{props.article.publishedAt}</p>
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  );
}

*/