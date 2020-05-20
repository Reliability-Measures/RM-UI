import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import QuizConfirmModal from './quiz_confirm_modal'
import { useSelector } from 'react-redux'

function SubmitForm() {
  const [modalShow, setModalShow] = React.useState(false)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const { handleSubmit } = useFormContext()

  const onSubmit = () => {
    setModalShow(true)
  }
  return (
    <>
      <MyInput label='Quiz name' label_size='h5' input_type='textarea' rows='1' name='quiz_create.quiz_name' />
      <MyInput
        label='Quiz Description'
        label_size='h5'
        input_type='textarea'
        rows='1'
        name='quiz_create.quiz_description'
      />
      {items_recived && (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Button type='submit'>Confirm</Button>
        </Form>
      )}
      <QuizConfirmModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  )
}

export default SubmitForm
