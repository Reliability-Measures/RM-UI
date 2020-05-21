import React from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import QuizConfirmModal from './quiz_confirm_modal'
import { useSelector } from 'react-redux'
import * as yup from 'yup'

const quiz_create_valid = yup.object().shape({
  quiz_name: yup.string().required()
})

function SubmitForm() {
  const [modalShow, setModalShow] = React.useState(false)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const quiz_create = useForm({
    defaultValues: {
      quiz_name: '',
      quiz_description: '',
      options: [{ email: false, name: false, show_correct: false }]
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
        <MyInput label='Quiz name' label_size='h5' input_type='textarea' rows='1' name='quiz_name' />
        {errors.quiz_name && <p className='text-danger'>Quiz Name Is Required</p>}
        <MyInput label='Quiz Description' label_size='h5' input_type='textarea' rows='1' name='quiz_description' />
        <MyInput label='Email Required' label_size='h5' input_type='checkbox' name='options.email' />
        <MyInput label='Name Required' label_size='h5' input_type='checkbox' name='options.name' />
        <MyInput label='Show Correct Answers' label_size='h5' input_type='checkbox' name='options.show_correct' />
        {items_recived && (
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Button type='submit'>Confirm</Button>
          </Form>
        )}
        <QuizConfirmModal show={modalShow} onHide={() => setModalShow(false)} />
      </FormContext>
    </>
  )
}

export default SubmitForm
