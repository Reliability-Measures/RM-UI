import React from 'react'
import { Link } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
//import ListItem from '../Quiz_question_page/Reuse_components/list_item'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'

function QuizLinkModal(props) {
  const link_loading = useSelector((state) => state.quiz_question.items_post_loading)
  const request_sent = useSelector((state) => state.quiz_question.items_post_sent)
  const response = useSelector((state) => state.quiz_question.items_post_response)
  const is_login = useSelector((state) => state.google_json.isLogin)
  let error = !response.quiz || !response.quiz.metadata
  let error_text = response.error
  // let pub_link = !error && request_sent ? response.quiz.metadata.published_url : null
  // let edit_link = !error && request_sent ? response.quiz.metadata.editor_url : null

  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' backdrop='static' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header>
            <Modal.Title>{!error && request_sent ? 'Quiz Ready' : 'Generating Quiz...'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-center'>
            {link_loading && <Loader type='ThreeDots' color='red' width={200} />}
            {error && request_sent && 'Error Try Again - ' + error_text}
            {!error && request_sent && (
              <>
                {/* <ListItem
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
                /> */}
                {is_login && (
                  <>
                    You can manage your quizzes from your <Link to='/myaccount'>account page</Link>.
                  </>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            {!request_sent ? <p>May take up to 30 seconds</p> : ''}
            <Button
              onClick={() => {
                props.onHide()
                window.location.reload()
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default QuizLinkModal
