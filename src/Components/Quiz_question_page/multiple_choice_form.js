import React from 'react'
import { useFormContext, useFieldArray, Controller } from 'react-hook-form'
import { Button, ListGroup, Row, Col, Form } from 'react-bootstrap'

function MultipleChoiceForm() {
  const { watch, control, errors } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: 'item_choices' })
  return (
    <>
      {watch('tags.item_type') === 'Multiple Choice' ? (
        <>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col className='h4 text-left'>
                  Item Choices
                  {errors.item_choices && <p className='text-danger'>All Choices Must Be Filled</p>}
                </Col>
                <Col className='text-right' style={{ paddingRight: 0 }}>
                  Check Correct Answer(s)
                </Col>
                <Col className='text-right'>
                  <Button
                    type='button'
                    onClick={() => {
                      append({ choice: '', correct: false })
                    }}>
                    <i className='fas fa-plus'></i>
                  </Button>{' '}
                  Add
                </Col>
              </Row>
            </ListGroup.Item>
            {fields.map((item, index) => (
              <ListGroup.Item key={item.id}>
                <Row>
                  <Col className='text-left'>Choice {index + 1}</Col>
                  <Col className='text-right'>
                    <Controller
                      as={<input type='checkbox' className='double' />}
                      name={`item_choices[${index}].correct`}
                      defaultValue={item.correct}
                      control={control}
                    />
                  </Col>
                  <Col className='text-right'>
                    <Button type='button' onClick={() => remove(index)}>
                      Delete
                    </Button>
                  </Col>
                </Row>
                <Row className='justify-content-left'>
                  <Col md='6'>
                    <Controller
                      as={<Form.Control as='textarea' rows='2' />}
                      autoComplete='off'
                      name={`item_choices[${index}].choice`}
                      control={control}
                      defaultValue={item.choice}
                    />
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : null}
    </>
  )
}

export default MultipleChoiceForm
