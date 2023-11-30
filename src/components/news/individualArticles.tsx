import { useState } from 'react';
import { Article } from '../../newsData/newsFunctionality';
import { Modal } from 'react-bootstrap';

export const stringNamesOfAuthorsTogether =
  function stringNameOfAuthorsTogether(authorNames: string[]): string {
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
  };

export default function DisplayIndividualArticles(props: { article: Article }) {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const authorNameString = stringNamesOfAuthorsTogether(props.article.authors);

  let articleIdentifier = props.article.name;

  if (props.article.name.length > 15) {
    articleIdentifier = `${props.article.name.slice(0, 15)}...`;
  }

  return (
    <tr>
      <td>
        <button onClick={handleShowModal}>{articleIdentifier}</button>
        <Modal
          show={showModal}
          onHide={handleHideModal}
          animation={true}
          onExit={handleHideModal}
          size='xl'
        >
          <div className='modalDiv'>
            <Modal.Body>
              <div className='modalHeading'>
                <h2>{props.article.name}</h2>
                <button onClick={handleHideModal}>close</button>
              </div>
              <p>by {authorNameString}</p>
              <p>Published on {props.article.publishedAt}</p>
              <p>Modified on {props.article.dateModified}</p>
              <p>{props.article.description.heading}</p>
              <p>{props.article.description.paragraph}</p>
            </Modal.Body>
          </div>
        </Modal>
      </td>
    </tr>
  );
}
