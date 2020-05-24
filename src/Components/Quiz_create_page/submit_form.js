import React from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { Form, Button, Dropdown, Col, Row } from 'react-bootstrap'
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
  const quiz_create = useForm({
    defaultValues: {
      quiz_name: '',
      quiz_description: '',
      options: [{ required: false, show_correct: false }]
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
        <h5>
          <i className='fas fa-star-of-life text-danger fa-xs'></i> Quiz name
          {errors.quiz_name && <p className='text-danger'>Required</p>}
        </h5>
        <MyInput input_type='textarea' rows='1' name='quiz_name' />
        <MyInput label='Quiz Description' label_size='h5' input_type='textarea' rows='1' name='quiz_description' />
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
                <MyInput label='Email and Name Required' input_type='radio' value='b' name='options.required' />
              </Col>
            </Row>
            <Dropdown id='filters' className='text-center' drop='left'>
              <Dropdown.Toggle variant='primary' id='filters_toggle'>
                Additional Options
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <MyInput
                  label='Show Correct Answers'
                  label_size='h5'
                  input_type='checkbox'
                  name='options.show_correct'
                />
              </Dropdown.Menu>
            </Dropdown>
            <br></br>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Button type='submit'>Confirm</Button>
            </Form>
          </>
        )}
        <QuizConfirmModal show={modalShow} onHide={() => setModalShow(false)} />
      </FormContext>
    </>
  )
}

export default SubmitForm
