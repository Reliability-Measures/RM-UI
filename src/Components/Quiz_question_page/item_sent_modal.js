import React from 'react'
import { useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

function ItemSentModal(props) {
  const loading = useSelector((state) => state.quiz_question.item_post_loading)
  const sent = useSelector((state) => state.quiz_question.item_post_sent)
  const res = useSelector((state) => state.quiz_question.item_post_response)
  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
              {sent && res.response === 1 ? 'Thank you for submitting' : 'Storing Item'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading && <Loader />}
            {sent && res.response === 1 && (
              <>
                <span className='text-primary'>Your Items</span> (Upcoming Feature)
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  )
}

export default ItemSentModal
