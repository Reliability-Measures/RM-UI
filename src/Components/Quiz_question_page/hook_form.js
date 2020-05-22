import React from 'react'
import { Row, Col } from 'react-bootstrap'
import MyInput from './Reuse_components/my_input'
import MultipleChoiceForm from './multiple_choice_form'
import { useFormContext } from 'react-hook-form'
import { question_details } from './question_details'
import DropdownTree from './dropdown_tree'
import { useSelector } from 'react-redux'

function HookForm() {
  const { watch, errors } = useFormContext()
  const isLogin = useSelector((state) => state.google_json.isLogin)
  let subjects = question_details.subject_list.map((val) => val.label)
  let item_types = ['Multiple Choice']
  let acc_label = watch('tags.privacy') === false ? 'Private' : 'Public'
  let grades = []
  for (let i = 1; i <= 12; i++) {
    grades.push(String(i))
  }
  return (
    <>
      <Row>
        <Col md='12'>
          <MyInput
            label='Item Text'
            label_size='h2'
            placeholder='Enter question here..'
            name='tags.item_text'
            input_type='textarea'
            id='item'
            size='lg'
          />
          {errors.tags && errors.tags.item_text && <p className='text-danger'>Item Text Is Required</p>}
        </Col>
        <Col md='2'>
          <MyInput
            label='Item Type'
            label_size='h5'
            name='tags.item_type'
            input_type='select'
            options={item_types}
            id='item_type'
          />
          {errors.tags && errors.tags.item_type && <p className='text-danger'>Item Type Is Required</p>}
        </Col>
        {watch('show.subject') !== false && (
          <>
            <Col md='2'>
              <MyInput
                label='Subject'
                label_size='h5'
                name='tags.subject'
                input_type='select'
                options={subjects}
                id='subject'
              />
            </Col>
            <Col md='2' className='h5 text-left'>
              Item Topics
              <DropdownTree />
            </Col>
          </>
        )}
        {/* {watch('quiz_question.show.grade_level') !== false && ( */}
        <>
          <Col md='2'>
            <MyInput
              label='Grade-Level-Min'
              label_size='h5'
              name='tags.grade_min'
              input_type='select'
              options={grades}
              id='grade_min'
            />
          </Col>
          <Col md='2'>
            <MyInput
              label='Grade-Level-Max'
              label_size='h5'
              name='tags.grade_max'
              input_type='select'
              options={grades}
              id='grade_max'
            />
          </Col>
        </>
        {/* )} */}
        {isLogin && (
          <Col md='2'>
            <MyInput label={acc_label} label_size='h5' name='tags.privacy' input_type='checkbox' id='privacy' />
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