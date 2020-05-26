import React from 'react'
import { Row, Col } from 'react-bootstrap'
import MyInput from './Reuse_components/my_input'
import MultipleChoiceForm from './multiple_choice_form'
import { useFormContext } from 'react-hook-form'
import { subjects } from '../Config'
//import { question_details } from './question_details'
import DropdownTree from './dropdown_tree'
import { useSelector } from 'react-redux'

function HookForm() {
  const { watch, errors } = useFormContext()
  const isLogin = useSelector((state) => state.google_json.isLogin)
    const subjects_init = useSelector((state) => state.dropbox.subjects_init)
  let subject = subjects_init && subjects.subject_list.map((val) => val.label)
  let item_types = ['Multiple Choice']
  let acc_label = watch('tags.privacy') === false ? 'Private' : 'Public'
  let grades = []
  for (let i = 1; i <= 12; i++) {
    grades.push(String(i))
  }
  return (
    <>
      <Row  Style={"padding: 20px"}>
        <Col md='12'>
          <MyInput
            label={<><i className='fas fa-star-of-life text-danger fa-xs'></i> Item Text</>}
            label_size='h2'
            placeholder='Enter question here..'
            name='tags.item_text'
            input_type='textarea'
            id='item'
            rows='2'
          />
          {errors.tags && errors.tags.item_text && <p className='text-danger'>Item Text Is Required</p>}
        </Col>
        <Col >
          <MyInput
            label={<><i className='fas fa-star-of-life text-danger fa-xs'></i> Item Type</>}
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
            <Col >


              <MyInput
                  label= {<><i className='fas fa-star-of-life text-danger fa-xs'></i> Subject</>}
                label_size='h5'
                name='tags.subject'
                input_type='select'
                options={subject}
                id='subject'
              />
              {errors.tags && errors.tags.subject && <p className='text-danger'>Subject Is Required</p>}
              </Col>

            <Col md='4' className='h5 text-left'>
              Item Topics
              <DropdownTree />
            </Col>
          </>
        )}
        {/* {watch('quiz_question.show.grade_level') !== false && ( */}
        {/*<>*/}
          {/*<Col md='2'>*/}
            {/*<MyInput*/}
              {/*label='Grade-Level-Min'*/}
              {/*label_size='h5'*/}
              {/*name='tags.grade_min'*/}
              {/*input_type='select'*/}
              {/*options={grades}*/}
              {/*id='grade_min'*/}
            {/*/>*/}
          {/*</Col>*/}
          {/*<Col md='2'>*/}
            {/*<MyInput*/}
              {/*label='Grade-Level-Max'*/}
              {/*label_size='h5'*/}
              {/*name='tags.grade_max'*/}
              {/*input_type='select'*/}
              {/*options={grades}*/}
              {/*id='grade_max'*/}
            {/*/>*/}
          {/*</Col>*/}
        {/*</>*/}
        {/* )} */}
        {isLogin && (
          <Col md='1'>
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
