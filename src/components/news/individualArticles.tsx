import { useState } from 'react';
import { Article } from '../../newsData/newsFunctionality';
import { Modal } from 'react-bootstrap';
import '../../css/table.css';

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