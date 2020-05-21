import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Dropdown } from 'react-bootstrap'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import Loader from 'react-loader-spinner'
import { useForm, FormContext } from 'react-hook-form'
import { ItemSelectedId, ItemSelectedText } from '../../Redux/Quiz_question/quiz_question_actions'

const select_items_form_values = {
  question_list: []
}

function SelectQuestions() {
  const dispatch = useDispatch()
  const select_items = useForm({
    defaultValues: {
      select_items_form_values
    }
  })
  const { formState, watch } = select_items
  const { touched } = formState
  const form_data = watch({ nest: true })
  const items = useSelector((state) => state.quiz_question.item_get_response.items)
  const items_n = useSelector((state) => state.quiz_question.item_get_response.total_items)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const items_loading = useSelector((state) => state.quiz_question.item_get_loading)
  if (items_recived) {
    items.forEach((val) => select_items_form_values.question_list.push({ question_id: '' }))
  }
  let items_selected_id = []
  let items_selected_text = []
  if (Object.keys(touched).length > 0) {
    let items_selected_id_l = []
    let items_selected_text_l = []
    form_data.question_list.forEach((val, index) => {
      if (val.question_id !== false) {
        items_selected_id_l.push(items[index].id)
        items_selected_text_l.push(items[index].text)
      }
    })
    items_selected_id = items_selected_id.concat(items_selected_id_l)
    items_selected_text = items_selected_text.concat(items_selected_text_l)
    dispatch(ItemSelectedId(items_selected_id))
    dispatch(ItemSelectedText(items_selected_text))
  }
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href='/#'
      ref={ref}
      onClick={(e) => {
        e.preventDefault()
        onClick(e)
      }}>
      {children}
      &#x25bc;
    </a>
  ))
  return (
    <>
      {items_recived && (
        <>
          <FormContext {...select_items}>
            <Row className='h5'>
              <Col md='4'>Total Questions Selected: {items_selected_id.length}</Col>
              <Col md='4'>
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                    Selected items
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {items_selected_text.map((val, index) => (
                      <Dropdown.Item key={index}>{val}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>
              <Col md='4'>Subject: {items_recived && items_n > 0 && items[0].subject}</Col>
            </Row>
            <br></br>
            <Row>
              <Col>
                {items.map((val, index) => (
                  <Card key={index}>
                    <Card.Header>
                      <Row as={Card.Title}>
                        <Col md='3'>Item ID: {val.id}</Col>
                        <Col md='6'></Col>
                        <Col md='2' className='text-right'>
                          Add Item <i className='fas fa-arrow-right'></i>
                        </Col>
                        <Col md='1' className='text-left'>
                          <MyInput input_type='checkbox' value='1' name={`question_list[${index}].question_id`} />
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Card.Title>{val.text}</Card.Title>
                      {val.choices.map((va, index) => (
                        <div key={index} className='ramadan-card-text'>
                          <Row>
                            <Col md='1'>
                              {va.correct === 1 && <i className='fas fa-check' style={{ color: 'green' }}></i>}
                            </Col>
                            <Col md='11' style={{ color: [va.correct === 1 && 'green'] }}>
                              {va.choice}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </FormContext>
        </>
      )}
      {items_n === 0 && !items_loading && <h3>No Questions Found</h3>}
      {items_loading && <Loader type='Puff' color='#00BFFF' height={200} width={200} />}
    </>
  )
}

export default SelectQuestions
