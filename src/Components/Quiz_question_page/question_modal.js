import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { ListGroup, Row, Col, Modal, Button } from 'react-bootstrap'
import ListItem from './Reuse_components/list_item'
import { useFormContext } from 'react-hook-form'
import { postItem } from '../../Redux/Quiz_question/quiz_question_actions'
import ItemSentModal from './item_sent_modal'

function QuestionModal(props) {
  const [modalShow, setModalShow] = React.useState(false)
  const dispatch = useDispatch()
  const { watch } = useFormContext()
  const from_data = watch({ nest: true })
  const topic_path = useSelector((state) => state.quiz_question.topic_path)
  const google_json = useSelector((state) => state.google_json.data)
  const is_login = useSelector((state) => state.google_json.isLogin)
  let paths = topic_path.map((val) => val.path)
  let quiz_question = props.show === true && from_data
  let user_profile = is_login ? google_json.profileObj : {}
  let enough_choices = null
  let one_choice_selected = null
  let len_of_correct = []
  if (props.show === true) {
    quiz_question.item_choices.map((val) =>
      val.correct === false ? (val.correct = 0) : val.correct !== false ? (val.correct = 1) : null
    )
    quiz_question.tags.privacy = quiz_question.tags.privacy === false ? 1 : 0
    Object.assign(quiz_question.tags, { paths })
    Object.assign(quiz_question, { user_profile })

    enough_choices = from_data.item_choices.length > 1
    from_data.item_choices.forEach((val) => val.correct === 1 && len_of_correct.push(1))
    one_choice_selected = len_of_correct.length > 0
  }

  const handleSubmit = () => {
    props.onHide()
    setModalShow(true)
    dispatch(postItem(quiz_question))
  }
  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
              {quiz_question.tags.item_text}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md='6' className='text-left'>
                <ListItem text='Item Type: ' item={quiz_question.tags.item_type} color='primary' />
                {quiz_question.item_choices.map((val, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col sm>{`Choice ${index + 1} `}</Col>
                      <Col sm>{val.choice}</Col>
                      <Col sm>{val.correct === 1 ? <i className='fas fa-check'></i> : null} </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </Col>
              <Col md='6'>
                <ListGroup>
                  <ListItem text='Item Catagory' color='success' />
                  <ListItem
                    text='Subject: '
                    item={quiz_question.tags.subject !== '' ? <ListItem text={quiz_question.tags.subject} /> : null}
                  />
                  <ListItem
                    text='Topics: '
                    item={topic_path.map((va, index) => (
                      <ListItem key={index} text={va.label} />
                    ))}
                  />
                  {/* <ListItem text='Item Audience' color='info' />
                  <ListItem text='Minimun Grade: ' item={quiz_question.tags.grade_min} />
                  <ListItem text='Maximum Grade: ' item={quiz_question.tags.grade_max} /> */}
                </ListGroup>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            {!enough_choices && <p className='text-danger'>Need At Least 2 Answer Choices</p>}
            {!enough_choices && !one_choice_selected && <p className='text-danger'>And</p>}
            {!one_choice_selected && <p className='text-danger'>Must Have 1 Correct Choice</p>}
            <Button onClick={props.onHide}>Close</Button>
            <Button onClick={handleSubmit} disabled={!(enough_choices && one_choice_selected)}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <ItemSentModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default QuestionModal
