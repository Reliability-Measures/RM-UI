import React from 'react'
import { Modal, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import Loader from 'react-loader-spinner'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'
import BootstrapTable from 'react-bootstrap-table-next'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

function AnalysisModal(props) {
  //const data = useSelector((state) => state.quiz_question.responses_get_response.quiz_analysis)
  const data = {
    overall_quiz: { average: 0.393, kr20: 0.247, weighted_avg: 0.37 },
    overall_items: { diff_avg: 0.607, idr_avg: 0.151 },
    item_analysis: [
      { item_id: 1, difficulty: 0.571, idr: 0.249, num_correct: 3 },
      { item_id: 2, difficulty: 0.714, idr: 0.237, num_correct: 2 },
      { item_id: 3, difficulty: 0.429, idr: 0.13, num_correct: 4 },
      { item_id: 4, difficulty: 0.429, idr: -0.012, num_correct: 2 }
    ],
    student_scores: [
      { student: 1, score: 0.75, weighted_score: 0.7006 },
      { student: 2, score: 0.75, weighted_score: 0.7006 },
      { student: 3, score: 0.25, weighted_score: 0.294 },
      { student: 4, score: 0.25, weighted_score: 0.177 },
      { student: 5, score: 0.25, weighted_score: 0.177 },
      { student: 6, score: 0, weighted_score: 0 },
      { student: 7, score: 0.5, weighted_score: 0.529 }
    ],
    exclude: ['4'],
    assumptions: 'No student response assumptions were made',
    group_analysis: 'No groups were found, or all students are in the same group',
    topic_avgs: 'No topics were found',
    topic_rights: 'No topics were found'
  }
  const data_loading = useSelector((state) => state.quiz_question.responses_get_loading)
  const data_loaded = useSelector((state) => state.quiz_question.responses_get_received)

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
  let table_data =
    data_loaded &&
    data.item_analysis.map((val, index) => ({
      id: index + 1,
      item_id: val.item_id,
      difficulty: val.difficulty,
      num_correct: val.num_correct,
      idr: val.idr
    }))

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
  let table_data1 =
    data_loaded &&
    data.student_scores.map((val, index) => ({
      id: index + 1,
      score: val.score,
      weighted_score: val.weighted_score
    }))
  return (
    <>
      <Modal {...props} dialogClassName='modal-width' backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title id='contained-modal-title-vcenter'>
            {data_loading ? (
              <>
                <h2>Generating Analysis...</h2>
                <small>(Load Time Will Vary Based on How My Respondents)</small>
              </>
            ) : (
              data_loaded &&
              !data_loading && (
                <>
                  Qiuz Name :{' '}
                  <a target='blank' href={props.quiz_name.props.href}>
                    {props.quiz_name.props.children}
                  </a>
                </>
              )
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
          {data_loading ? (
            <Loader />
          ) : (
            data_loaded &&
            !data_loading && (
              <>
                <Row>
                  <Col md='1' />
                  <Col>
                    <h3>Overall Scores</h3>
                    <Row>
                      <Col>
                        <ListItem text='Kr20 : ' item={data.overall_quiz.kr20} />
                      </Col>
                      <Col>
                        <ListItem text='Average Score : ' item={data.overall_quiz.average} />
                      </Col>
                      <Col>
                        <ListItem text='Weighted Average : ' item={data.overall_quiz.weighted_avg} />
                      </Col>
                    </Row>
                    <h3>Overall Item Averages</h3>
                    <Row>
                      <Col>
                        <ListItem text='Difficulty Average : ' item={data.overall_items.diff_avg} />
                      </Col>
                      <Col>
                        <ListItem text='IDR Average : ' item={data.overall_items.idr_avg} />
                      </Col>
                    </Row>
                    <h3>Item Analysis</h3>
                    <Row>
                      <BootstrapTable
                        keyField='id'
                        bootstrap4={true}
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
                        wrapperClasses='table-responsive'
                        data={table_data1}
                        columns={columns1}
                      />
                    </Row>
                  </Col>
                  <Col md='1' />
                </Row>
              </>
            )
          )}
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  )
}

export default AnalysisModal
