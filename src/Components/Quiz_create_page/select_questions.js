import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Dropdown } from 'react-bootstrap'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import Loader from 'react-loader-spinner'
import { useFormContext } from 'react-hook-form'
import { ItemSelectedId, ItemSelectedText } from '../../Redux/Quiz_question/quiz_question_actions'

function SelectQuestions() {
  const dispatch = useDispatch()
  const { watch, formState } = useFormContext()
  const { dirty, isSubmitting, touched, submitCount, dirtyFields } = formState
  const form_data = watch({ nest: true })
  const items = useSelector((state) => state.quiz_question.item_get_response.items)
  const items_n = useSelector((state) => state.quiz_question.item_get_response.total_items)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const items_loading = useSelector((state) => state.quiz_question.item_get_loading)
  let items_selected_id = []
  let items_selected_text = []
  if (
    dirty &&
    Object.keys(touched).length > 0 && touched.quiz_create &&
    touched.quiz_create.question_list &&
    touched.quiz_create.question_list.length > 0
  ) {
    console.log(dirty, isSubmitting, touched, submitCount, dirtyFields)
    console.log(form_data.quiz_create.question_list)
    let items_selected_id_l = []
    let items_selected_text_l = []
    form_data.quiz_create.question_list.forEach((val, index) => {
      if (val.question_id !== false) {
        items_selected_id_l.push(items[index].id)
        items_selected_text_l.push(items[index].text)
      }
    })
    items_selected_id = items_selected_id.concat(items_selected_id_l)
    console.log('SelectQuestions -> items_selected_id', items_selected_id_l)
    console.log('SelectQuestions -> items_selected_id', items_selected_id)
    items_selected_text = items_selected_text.concat(items_selected_text_l)
    console.log('SelectQuestions -> items_selected_text', items_selected_text)
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
          <Row className='h5'>
            <Col md='4'>Total Questions Selected: {items_selected_id.length}</Col>
            <Col md='4'>
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                  Selected items
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {items_selected_text.map((val) => (
                    <Dropdown.Item>{val}</Dropdown.Item>
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
                        <MyInput
                          input_type='checkbox'
                          value='1'
                          name={`quiz_create.question_list[${index}].question_id`}
                        />
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
        </>
      )}
      {items_n === 0 && <h3>No Questions Found</h3>}
      {items_loading && <Loader type='Puff' color='#00BFFF' height={200} width={200} />}
      {/* <Carousel interval={null}>
          {items_recived &&
            items.map((val, index) => (
              <Carousel.Item key={index}>
                <Card key={index}>
                  <Card.Header>
                    <Row>
                      <Col md='2'>
                        <i className='fas fa-arrow-left fa-lg'> Previous</i>
                      </Col>
                      <Col>{val.id}</Col>
                      <Col md='2'>
                        <i className='fas fa-arrow-right fa-lg'> Next</i>
                      </Col>
                    </Row>
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>{val.text}</Card.Title>
                    {val.choices.map((va, index) => (
                      <div key={index} className='ramadan-card-text'>
                        <Row>
                          <Col>{<div style={{ fontWeight: 'bold' }}>{va.choice}</div>}</Col>
                          <Col>
                            {va.correct === 1 ? (
                              <div style={{ color: 'green' }}>
                                <i className='fas fa-check'></i>
                              </div>
                            ) : null}
                          </Col>
                        </Row>
                      </div>
                    ))}
                    <MyInput
                      input_type='checkbox'
                      value={index}
                      name={`quiz_create.question_list[${index}].question_id`}
                    />
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
        </Carousel> */}
    </>
  )
}

export default SelectQuestions
