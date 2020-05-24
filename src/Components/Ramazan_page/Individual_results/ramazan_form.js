import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { fetchRamadanResultsIndivisual } from '../../../Redux/Ramadan_quiz_results/indivisual_actions'
import { Row, Col, Accordion, Card } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import IndividualResultsContainer from './individual_results_container'
import '../Accordion.css'

function RamazanForm() {
  const error = useSelector((state) => state.ramadan_ind_results.error)
  const data_loaded = useSelector((state) => state.ramadan_ind_results.loaded)
  const data_loading = useSelector((state) => state.ramadan_ind_results.loading)
  const dispatch = useDispatch()
  const [expanded, setexpanded] = useState(false)
  const initialValues = {
    name: '',
    age: ''
  }
  const onSubmit = (values) => {
    //console.log(values)
    dispatch(fetchRamadanResultsIndivisual(values))
    formik.handleReset()
  }
  const validate = (values) => {
    let errors = {}
    //console.log(values)
    if (!values.name) {
      errors.name = 'Required'
    } else if (values.name.length < 2) {
      errors.name = 'Atleast 2 letters required!'
    }
   if (values.age && (values.age < 5 || values.age > 99)) {
      errors.age = 'between 5 and 99'
    }
    return errors
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })
//console.log(formik.errors)
  return (
    <div>
      <Accordion>
        <Card>
          <Accordion.Toggle
            className='panel-heading'
            eventKey='0'
            onClick={() =>
              setexpanded((prevExpanded) => (prevExpanded = !prevExpanded))
            }>
            <Row as={(Card.Header, 'h2')}>
              <Col />
              <Col>Individual Results</Col>
              <Col>
                {!expanded ? (
                  <i className='fas fa-chevron-down'></i>
                ) : expanded ? (
                  <i className='fas fa-chevron-up'></i>
                ) : null}
              </Col>
            </Row>
          </Accordion.Toggle>
          <Accordion.Collapse eventKey='0'>
            <Card.Body>
              <form onSubmit={formik.handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <small id='namehelp' className='form-text text-muted'>
                      Please use the same name and age used for the quiz.
                    </small>
                  </label>
                  <Row>
                    <Col />
                    <Col md='3'>
                      Name
                      <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.name}
                      />
                      {formik.errors.name ? <div className='small text-danger'>{formik.errors.name}</div>:null}
                    </Col>
                    <Col md='3'>
                      Age
                      <input
                        type='number'
                        id='age'
                        name='age'
                        className='form-control'
                        onChange={formik.handleChange}
                        value={formik.values.age}
                      />
                      {formik.errors.age ? <div className='small text-danger'>{formik.errors.age}</div>:null}
                    </Col>
                    <Col />
                  </Row>
                </div>
                <button type='submit' className='btn btn-primary'>
                  Submit
                </button>
              </form>
              {data_loading ? (
                <div>
                  <Loader
                    type='Puff'
                    color='#00BFFF'
                    height={100}
                    width={100}
                  />
                </div>
              ) : null}
              <br></br>
              {error && !data_loading ? (
                <div style={{ color: 'red' }}>No quizzes found</div>
              ) : !error && data_loaded ? (
                <IndividualResultsContainer />
              ) : null}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  )
}

export default RamazanForm
