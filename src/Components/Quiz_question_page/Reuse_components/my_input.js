import React from 'react'
import { Form } from 'react-bootstrap'
import '../../Components.css'
import { useFormContext } from 'react-hook-form'

function MyInput({ label, name, options, input_type, max_range, id }) {
  const { register } = useFormContext()
  return (
    <>
      <Form.Group controlId={id} className='input'>
        <Form.Label as='h4'>{label}</Form.Label>
        {input_type === 'select' ? (
          <Form.Control as={input_type} name={name} ref={register}>
            <>
              <option value=''>choose...</option>
              {options.map((val, index) => (
                <option key={index} value={val}>
                  {val}
                </option>
              ))}
            </>
          </Form.Control>
        ) : null}
        {input_type === 'textarea' ? (
          <>
            <Form.Control as={input_type} name={name} ref={register} autoComplete='off' />
          </>
        ) : null}
        {input_type === 'range' ? (
          <>
            <Form.Control type={input_type} className='slider' min={1} max={max_range} name={name} ref={register} />
          </>
        ) : null}
        {input_type === 'switch' ? (
          <>
            <input type='checkbox' value={1} name={name} ref={register} />
          </>
        ) : null}
      </Form.Group>
    </>
  )
}

export default MyInput