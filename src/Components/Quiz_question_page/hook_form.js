import React from 'react'
import { Row, Col } from 'react-bootstrap'
import MyInput from './Reuse_components/my_input'
import MultipleChoiceForm from './multiple_choice_form'
import { useFormContext } from 'react-hook-form'
import { question_details } from './question_details'
import DropdownTree from './dropdown_tree'
import { useSelector } from 'react-redux'

function HookForm() {
  const { watch } = useFormContext()
  const isLogin = useSelector((state) => state.google_json.isLogin)
  let subjects = question_details.subject_list.map((val) => val.label)
  let item_types = ['Multiple Choice']
  let acc_label = watch('quiz_question.tags.privacy') === false ? 'Private' : 'Public'
  let grades = []
  for (let i = 1; i <= 12; i++) {
    grades.push(String(i))
  }
  return (
    <>
      <Row>
        <Col md='12'>
          <MyInput label='Item Text' name='quiz_question.tags.item_text' input_type='textarea' id='item' />
        </Col>
        <Col>
          <MyInput
            label='Item Type'
            name='quiz_question.tags.item_type'
            input_type='select'
            options={item_types}
            id='item_type'
          />
        </Col>
        {watch('quiz_question.show.subject') !== false && (
          <>
            <Col>
              <MyInput
                label='Subject'
                name='quiz_question.tags.subject'
                input_type='select'
                options={subjects}
                id='subject'
              />
            </Col>
            <Col>
              <h4 style={{ textAlign: 'initial' }}>Item Topics</h4>
              <DropdownTree />
            </Col>
          </>
        )}
        {/* {watch('quiz_question.show.grade_level') !== false && ( */}
        <>
          <Col>
            <MyInput
              label='Grade-Level-Min'
              name='quiz_question.tags.grade_min'
              input_type='select'
              options={grades}
              id='grade_min'
            />
          </Col>
          <Col>
            <MyInput
              label='Grade-Level-Max'
              name='quiz_question.tags.grade_max'
              input_type='select'
              options={grades}
              id='grade_max'
            />
          </Col>
        </>
        {/* )} */}
        {isLogin && (
          <Col>
            <MyInput
              label={acc_label}
              label_size='h6'
              name='quiz_question.tags.privacy'
              input_type='checkbox'
              id='privacy'
            />
          </Col>
        )}
      </Row>
      <MultipleChoiceForm />
    </>
  )
}
// {/* <MyInput label='Item Weight' name='item_weight' input_type='range' max_range={10} />
//         <p>{watch('item_weight')}</p> */}
export default HookForm
