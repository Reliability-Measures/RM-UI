import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useFormContext } from 'react-hook-form'
import { postItems, ResetSent } from '../../Redux/Quiz_question/quiz_question_actions'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'
import QuizLinkModal from './quiz_link_modal'

function QuizConfirmModal(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const dispatch = useDispatch()
  const { getValues } = useFormContext()
  const form_data = getValues({ nest: true })
  const items_selected_id = useSelector((state) => state.quiz_question.items_selected_id)
  const items_selected_text = useSelector((state) => state.quiz_question.items_selected_text)
  const google_json = useSelector((state) => state.google_json.data)
  const is_login = useSelector((state) => state.google_json.isLogin)
  let quiz_json = {}
  if (props.show === true) {
    form_data.quiz_create.question_list.map((val) =>
      val.question_id === false ? (val.question_id = 0) : (val.question_id = 1)
    )
    let item_ids = items_selected_id
    let quiz_name = form_data.quiz_create.quiz_name
    let quiz_description = form_data.quiz_create.quiz_description
    let user_profile = is_login ? google_json.profileObj : {}
    Object.assign(quiz_json, { item_ids })
    Object.assign(quiz_json, { quiz_name })
    Object.assign(quiz_json, { quiz_description })
    Object.assign(quiz_json, { user_profile })
  }
  const handleSubmit = () => {
    props.onHide()
    setModalShow(true)
    dispatch(postItems(quiz_json))
    dispatch(ResetSent())
  }

  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' backdrop='static' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
              Confirm Quiz Detials
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md='10'>
                <ListItem text='Quiz Name: ' item={<h4>{form_data.quiz_create.quiz_name}</h4>} color='success' />
                <ListItem text='Quiz Description: ' item={form_data.quiz_create.quiz_description} color='success' />
                <br></br>
              </Col>
              <Col md='10'>
                <ListItem text='Questions Selected: ' color='info' />
                {items_selected_text.map((val, index) => (
                  <ListItem key={index} text={index + 1 + ')'} item={val} />
                ))}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {!is_login && <div className='text-danger'>For editing access, you need to login first!</div>}

            <Button onClick={props.onHide}>Close</Button>
            <Button onClick={handleSubmit}>Create Quiz</Button>
          </Modal.Footer>
        </Modal>
      )}
      <QuizLinkModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default QuizConfirmModal
