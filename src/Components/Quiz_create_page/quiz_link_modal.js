import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'

function QuizLinkModal(props) {
  const link_loading = useSelector((state) => state.quiz_question.items_post_loading)
  const request_sent = useSelector((state) => state.quiz_question.items_post_sent)
  const response = useSelector((state) => state.quiz_question.items_post_response)
  let error = !response.quiz
  console.log(error)

  let pub_link = !error && request_sent ? response.quiz.metadata.published_url : null
  let edit_link = !error && request_sent ? response.quiz.metadata.editor_url : null

  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' backdrop="static" aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header>
            <Modal.Title>Generating Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            {link_loading && <Loader type='ThreeDots' color='red' width={500} />}
            {error && request_sent && 'Error Try Again'}
            {!error && request_sent && (
              <>
                <ListItem
                  item={
                    <a href={pub_link} target='blank'>
                      Quiz Link
                    </a>
                  }
                />
                <ListItem
                  item={
                    <a href={edit_link} target='blank'>
                      Editor Quiz Link
                    </a>
                  }
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default QuizLinkModal
