import React from 'react'
import { useSelector } from 'react-redux'
import { ListGroup } from 'react-bootstrap'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'

function UserData() {
  const data = useSelector((state) => state.google_json.data.profileObj)
  return (
    <>
      <ListGroup>
        <ListItem text='Name: ' item={data.name} />
        <ListItem text='Email: ' item={data.email} />
      </ListGroup>
      <h2>Statistics (soon)</h2>
    </>
  )
}

export default UserData
