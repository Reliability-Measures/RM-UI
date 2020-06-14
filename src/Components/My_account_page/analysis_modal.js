import React from 'react'
import { Modal, Row, Col, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

function AnalysisModal(props) {
  const data = useSelector((state) => state.user_data.data)
  let exams = data.exams ? data.exams : []

  const columns = [
    {
      dataField: 'id',
      text: 'Items',
      sort: true
    },
    {
      dataField: 'item_id',
      text: 'Item ID',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'difficulty',
      text: 'Item Difficulty',
      sort: true
    },
    {
      dataField: 'num_correct',
      text: 'No. of Correct',
      sort: true
    },
    {
      dataField: 'idr',
      text: 'IDR',
      sort: true
    }
  ]
  const columns1 = [
    {
      dataField: 'id',
      text: 'Students',
      sort: true
    },
    {
      dataField: 'score',
      text: 'Score',
      sort: true
    },
    {
      dataField: 'weighted_score',
      text: 'Weighted Score',
      sort: true
    }
  ]
  let table_data = []
  let table_data1 = []
  let modal_header = <div className='h2'>No Analysis Found</div>
  let overall_scores = null
  let overall_item_avg = null
  exams.forEach((val, index) => {
    if (val.id === props.quiz_id && val.analysis) {
      if (val.analysis.item_analysis) {
        table_data = val.analysis.item_analysis.map((va, index) => ({
          id: index + 1,
          item_id: va.item_id,
          difficulty: va.difficulty,
          num_correct: va.num_correct,
          idr: va.idr
        }))
        table_data1 = val.analysis.student_scores.map((va, index) => ({
          id: index + 1,
          score: va.score,
          weighted_score: va.weighted_score
        }))
        modal_header = (
          <>
            <Container fluid>
              <Row as='h2'>
                <Col>Quiz Name : {val.name}</Col>
                <Col>Quiz ID: {val.id}</Col>
              </Row>
            </Container>
          </>
        )
        overall_scores = (
          <>
            <Container fluid>
              <h3>Overall Scores</h3>
              <Row>
                <Col>
                  <ListItem text='Kr20 : ' item={val.analysis.overall_quiz.kr20} />
                </Col>
                <Col>
                  <ListItem text='Average Score : ' item={val.analysis.overall_quiz.average} />
                </Col>
                <Col>
                  <ListItem text='Weighted Average : ' item={val.analysis.overall_quiz.weighted_avg} />
                </Col>
              </Row>
            </Container>
          </>
        )
        overall_item_avg = (
          <>
            <Container fluid>
              <h3>Overall Item Averages</h3>
              <Row>
                <Col>
                  <ListItem text='Difficulty Average : ' item={val.analysis.overall_items.diff_avg} />
                </Col>
                <Col>
                  <ListItem text='IDR Average : ' item={val.analysis.overall_items.idr_avg} />
                </Col>
              </Row>
            </Container>
          </>
        )
      }
    }
  })
  return (
    <>
      <Modal {...props} dialogClassName='modal-width' backdrop='static'>
        <Modal.Header className='text-center' closeButton>
          {modal_header}
        </Modal.Header>
        <Modal.Body className='text-center'>
          <>
            <Container fluid>
              <Row>
                <Col md='1' />
                <Col>
                  {overall_scores}
                  {overall_item_avg}
                  <h3>Item Analysis</h3>
                  <Row>
                    <BootstrapTable
                      keyField='id'
                      bootstrap4={true}
                      striped
                      wrapperClasses='table-responsive'
                      filter={filterFactory()}
                      data={table_data}
                      columns={columns}
                    />
                  </Row>
                  <h3>Student Scores</h3>
                  <Row>
                    <BootstrapTable
                      keyField='id'
                      bootstrap4={true}
                      striped
                      wrapperClasses='table-responsive'
                      data={table_data1}
                      columns={columns1}
                    />
                  </Row>
                </Col>
                <Col md='1' />
              </Row>
            </Container>
          </>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AnalysisModal
