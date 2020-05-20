import React from 'react'
import { ListGroup } from 'react-bootstrap'

function ListItem({ item, text, color }) {
  return (
    <>
      <ListGroup.Item variant={color}>
        {text} {item}
      </ListGroup.Item>
    </>
  )
}

export default ListItem
