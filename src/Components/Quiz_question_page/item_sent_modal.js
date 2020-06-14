import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Modal } from 'react-bootstrap'
import Loader from 'react-loader-spinner'

function ItemSentModal(props) {
  const loading = useSelector((state) => state.quiz_question.item_post_loading)
  const sent = useSelector((state) => state.quiz_question.item_post_sent)
  const res = useSelector((state) => state.quiz_question.item_post_response)
  const is_login = useSelector((state) => state.google_json.isLogin)
  return (
    <>
      {props.show === true && (
        <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
          <Modal.Header closeButton>
            <Modal.Title id='contained-modal-title-vcenter' className='text-center'>
              {sent && res.response === 1 ? 'Thank you for submitting ' : 'Storing Item'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {loading && <Loader />}
            {sent && res.response === 1 && (
              <>
                {/*<span className='text-primary'>Your Items</span> (Upcoming Feature)*/}
                {is_login && (
                  <>
                    You can manage your items from your <Link to='/myaccount'>account page</Link>.
                  </>
                )}
                <br></br>
                <div>You can create more items now or go to Create Quiz section to create a new quiz</div>
                <small>To view or manage items you created, please login</small>
              </>
            )}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
          </Modal.Footer> */}
        </Modal>
      )}
    </>
  )
}

export default ItemSentModal
