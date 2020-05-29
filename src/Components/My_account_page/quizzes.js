import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Button } from 'react-bootstrap'
import { getUserData } from '../../Redux/User_data/user_data_actions'
import Loader from 'react-loader-spinner'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import AnalysisModal from './analysis_modal'
import { getResponses } from '../../Redux/Quiz_question/quiz_question_actions'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

function Quizzes() {
  const dispatch = useDispatch()
  const [modalShow, setModalShow] = React.useState(false)
  const [selected_quiz, setselected_quiz] = React.useState('')
  const data = useSelector((state) => state.user_data.data)
  const google_json = useSelector((state) => state.google_json.data)
  const is_loading = useSelector((state) => state.user_data.isloading)
  const loaded = useSelector((state) => state.user_data.loaded)
  let exams = loaded ? data.exams : null

  const { SearchBar, ClearSearchButton } = Search

  const columns = [
    {
      dataField: 'id',
      text: 'Exam #',
      sort: true
    },
    {
      dataField: 'quiz_id',
      text: 'Quiz ID',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'quiz_name',
      text: 'Quiz',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'editor_link',
      text: 'Edit'
    },
    {
      dataField: 'quiz_desc',
      filter: textFilter(),
      text: 'Description'
    },
    {
      dataField: 'no_of_items',
      text: 'No. of Items',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'responses',
      text: 'Total Responses',
      sort: true
    },
    {
      dataField: 'google_summary',
      text: 'Google Form Summary'
    },
    {
      dataField: 'date_created',
      text: 'Date Created',
      filter: textFilter(),
      sort: true
    }
  ]
  let table_data =
    loaded &&
    exams.map((val, index) => ({
      id: index + 1,
      quiz_id: val.id,
      quiz_name: (
        <a target='blank' href={val.metadata.published_url}>
          {val.name}
        </a>
      ),
      editor_link: (
        <a target='blank' href={val.metadata.editor_url}>
          Edit
        </a>
      ),
      quiz_desc: val.description,
      no_of_items: val.no_of_questions,
      responses: val.responses,
      date_created: val.date_created,
      google_summary: (
        <a target='blank' href={val.metadata.summary_url}>
          Summary
        </a>
      )
    }))

  const selectRow = {
    mode: 'radio',
    selectionHeaderRenderer: () => 'Analysis',
    selectionRenderer: () => (
      <Button variant='link'>
        <i className='fas fa-chart-bar '></i>
      </Button>
    ),
    onSelect: (row, isSelect, rowIndex, e) => {
      console.log(row.editor_link.props.href)
      setselected_quiz(row.quiz_name)
      dispatch(
        getResponses({ edit_url: 'https://docs.google.com/forms/d/1DEUSZfBvcZIaL4c255z6boYHrNhcbg6A93JQqvUNUzY/edit' })
      )
      setModalShow(true)
    }
  }

  return (
    <>
      {is_loading && <Loader />}
      {loaded && !is_loading && (
        <>
          <h1>Quizzes Table</h1>
          <ToolkitProvider keyField='id' bootstrap4={true} data={table_data} columns={columns} search>
            {(props) => (
              <>
                <Row>
                  <Col md='2'>
                    <SearchBar {...props.searchProps} />
                  </Col>
                  <Col md='1'>
                    <ClearSearchButton {...props.searchProps} />
                  </Col>
                  <Col md='6' />
                  <Col md='3'>
                    Refresh{' '}
                    <Button onClick={() => dispatch(getUserData({ user_id: google_json.profileObj.email }))}>
                      <i className='fas fa-sync-alt'></i>
                    </Button>
                  </Col>
                </Row>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  selectRow={selectRow}
                  classes='table-responsive'
                  filter={filterFactory()}
                />
              </>
            )}
          </ToolkitProvider>
        </>
      )}
      <AnalysisModal show={modalShow} onHide={() => setModalShow(false)} quiz_name={selected_quiz} />
    </>
  )
}

export default Quizzes
