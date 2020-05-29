import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

function QuizTable() {
  const data = useSelector((state) => state.quiz_question.quiz_get_response)
  let quizzes = typeof data.quiz === 'string' ? [] : data.quiz

  const { SearchBar, ClearSearchButton } = Search

  const columns = [
    {
      dataField: 'id',
      text: `Exam #`,
      sort: true
    },
    {
      dataField: 'quiz_name',
      text: 'Quiz',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'quiz_desc',
      text: 'Description',
      filter: textFilter()
    },
    {
      dataField: 'tags',
      text: 'Quiz Tags',
      filter: textFilter()
    },
    {
      dataField: 'no_of_items',
      text: 'No. of Items',
      sort: true
    },
    {
      dataField: 'responses',
      text: 'Total Responses',
      sort: true
    },
    {
      dataField: 'date_created',
      text: 'Date Created',
      filter: textFilter(),
      sort: true
    }
  ]
  let table_data = quizzes.map((val, index) => ({
    id: index + 1,
    quiz_name: (
      <a target='blank' href={val.metadata.published_url}>
        {val.name}
      </a>
    ),
    tags: val.tags ? val.tags : 'None',
    quiz_desc: val.description,
    no_of_items: val.no_of_questions,
    responses: val.responses,
    date_created: val.date_created
  }))
  return (
    <>
      {typeof data.quiz !== 'string' ? (
        <>
          <h1>Quizzes List</h1>
          <ToolkitProvider keyField='id' bootstrap4={true} data={table_data} columns={columns} search>
            {(props) => (
              <>
                <Row>
                  <Col md='3'>
                    <SearchBar {...props.searchProps} />
                  </Col>
                  <Col md='1'>
                    <ClearSearchButton {...props.searchProps} />
                  </Col>
                  <Col md='5' />
                  <Col md='3'>Quizzes Found: {data.quiz_count}</Col>
                </Row>
                <hr />
                <BootstrapTable {...props.baseProps} filter={filterFactory()} classes='table-responsive' />
              </>
            )}
          </ToolkitProvider>
        </>
      ) : (
        <h1>No Quizzes Found</h1>
      )}
    </>
  )
}

export default QuizTable
