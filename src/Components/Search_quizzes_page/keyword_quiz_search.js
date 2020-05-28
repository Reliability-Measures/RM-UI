import React from 'react'
import MyInput from '../Quiz_question_page/Reuse_components/my_input'
import { useForm, FormContext } from 'react-hook-form'
import { Form, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { getQuiz } from '../../Redux/Quiz_question/quiz_question_actions'
import * as yup from 'yup'

const keyword_quiz_search_valid = yup.object().shape({
  keyword: yup.string().required()
})

function KeywordQuizSearch() {
  const keyword_quiz_search = useForm({
    defaultValues: {
      keyword: ''
    },
    validationSchema: keyword_quiz_search_valid
  })

  const { handleSubmit, errors } = keyword_quiz_search
  const dispatch = useDispatch()
  const onSubmit = (form_data) => {
    console.log(form_data)
    dispatch(getQuiz(form_data))
  }
  return (
    <>
      <FormContext {...keyword_quiz_search}>
        <MyInput
          label={
            <>
              <i className='fas fa-star-of-life text-danger fa-xs'></i> Keyword
            </>
          }
          label_size='h2'
          placeholder='Enter Keyword...'
          name='keyword'
          input_type='textarea'
          rows='1'
        />
        {errors.keyword && <p className='text-danger'>Keyword is Required</p>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Button variant='outline-dark' type='submit'>
            Search
          </Button>
        </Form>
      </FormContext>
    </>
  )
}

export default KeywordQuizSearch
