import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import * as yup from 'yup'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import { Form, Button } from 'react-bootstrap'
import { getQuiz } from '../../Redux/Quiz_question/quiz_question_actions'

const individual_quiz_search_valid = yup.object().shape({
  id: yup.number().required().positive().integer(),
  name: yup.string().required()
})

function IndividualQuizSearch() {
  const individual_quiz_search = useForm({
    defaultValues: {
      id: '',
      name: ''
    },
    validationSchema: individual_quiz_search_valid
  })

  const { handleSubmit, errors } = individual_quiz_search
  const dispatch = useDispatch()
  const onSubmit = (form_data) => {
    console.log(form_data)
    dispatch(getQuiz(form_data))
  }
  return (
    <>
      <FormContext {...individual_quiz_search}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <MyInput
            label={
              <>
                <i className='fas fa-star-of-life text-danger fa-xs'></i> Quiz Id
              </>
            }
            label_size='h2'
            placeholder='Enter Id...'
            name='id'
            input_type='text'
            rows='1'
          />
          {errors.id && <p className='text-danger'>Id is Required (Must Be a Positive Integer Number)</p>}
          <MyInput
            label={
              <>
                <i className='fas fa-star-of-life text-danger fa-xs'></i> Quiz Name
              </>
            }
            label_size='h2'
            placeholder='Enter Quiz Name...'
            name='name'
            input_type='text'
            rows='2'
          />
          {errors.name && <p className='text-danger'>Quiz Name is Required</p>}
          <Button variant='outline-dark' type='submit'>
            Search
          </Button>
        </Form>
      </FormContext>
    </>
  )
}

export default IndividualQuizSearch
