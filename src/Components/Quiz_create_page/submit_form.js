import React from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { Form, Button, Col, Row, Dropdown } from 'react-bootstrap'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import QuizConfirmModal from './quiz_confirm_modal'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

const quiz_create_valid = yup.object().shape({
  quiz_name: yup.string().required(),
  options: yup.object().shape({ required: yup.string().required() })
})

function SubmitForm() {
  const [modalShow, setModalShow] = React.useState(false)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const is_login = useSelector((state) => state.google_json.isLogin)
  const state_ids = useSelector((state) => state.quiz_question.items_selected_id)
  const state_texts = useSelector((state) => state.quiz_question.items_selected_text)
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
  const quiz_create = useForm({
    defaultValues: {
      quiz_name: '',
      quiz_description: '',
      options: { required: false, show_correct: false, searchable: 1 }
    },
    validationSchema: quiz_create_valid
  })
  const { handleSubmit, errors } = quiz_create
  const onSubmit = () => {
    setModalShow(true)
  }
  return (
    <>
      <FormContext {...quiz_create}>
        <br />
        <Row>
          <Col>Total Items Selected: {state_ids.length}</Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                Selected items
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {state_texts.map((val, index) => (
                  <Dropdown.Item key={index}>{val}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <br />
        <h5>
          <i className='fas fa-star-of-life text-danger fa-xs'></i> Quiz name
          {errors.quiz_name && <p className='text-danger'>Required</p>}
        </h5>
        <MyInput input_type='text' name='quiz_name' />
        <MyInput label='Quiz Description' label_size='h5' input_type='textarea' rows='2' name='quiz_description' />
        {items_recived && (
          <>
            {errors.options && errors.options.required && <p className='text-danger'>Required</p>}
            <h5>
              <i className='fas fa-star-of-life text-danger fa-xs'></i> Select One
            </h5>
            <Row>
              <Col>
                <MyInput label='Email Required' input_type='radio' value='e' name='options.required' />
              </Col>
              <Col>
                <MyInput label='Name Required' input_type='radio' value='n' name='options.required' />
              </Col>
              <Col>
                <MyInput label='Email/Name Required' input_type='radio' value='b' name='options.required' />
              </Col>
            </Row>
            {/* <Dropdown id='filters' className='text-center' drop='left'>
            <Dropdown.Toggle variant='outline-dark' id='filters_toggle'>
            Options On By Default
            </Dropdown.Toggle>
            <Dropdown.Menu>
            (Check If Do Not Want) */}
            <Row>
              {is_login && (
                <Col>
                  <MyInput
                    label='Searchable: &nbsp;'
                    //label_size='h5'
                    input_type='checkbox'
                    name='options.searchable'
                    id='searchable'
                  />
                </Col>
              )}
              <Col>
                <MyInput
                  label='Show Correct Answers: &nbsp;'
                  //label_size='h5'
                  input_type='checkbox'
                  name='options.show_correct'
                  id='show_correct'
                />
              </Col>
            </Row>
            {/* </Dropdown.Menu>
            </Dropdown> */}
            <br></br>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Button variant='outline-dark' type='submit'>
                Confirm
              </Button>
            </Form>
          </>
        )}
        <QuizConfirmModal show={modalShow} onHide={() => setModalShow(false)} />
      </FormContext>
    </>
  )
}

export default SubmitForm
