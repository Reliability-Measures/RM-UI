import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'

function Quizzes() {
  const data = useSelector((state) => state.user_data.data)
  const is_loading = useSelector((state) => state.user_data.isloading)
  const loaded = useSelector((state) => state.user_data.loaded)
  let exams = loaded ? data.exams : null
  let exams_count = loaded ? data.exams_count : null

  const { SearchBar, ClearSearchButton } = Search

  const columns = [
    {
      dataField: 'id',
      text: `Exams (${exams_count})`,
      sort: true,
      headerStyle: () => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'quiz_name',
      text: 'Quiz Name',
      sort: true
    },
    {
      dataField: 'editor_link',
      text: 'Edit'
    },
    {
      dataField: 'analaysis',
      text: 'Analaysis(Upcoming Feature)'
    }
  ]
  let table_data =
    loaded &&
    exams.map((val, index) => ({
      id: index + 1,
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
      analaysis: 'Analaysis'
    }))
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
                  <Col md='3'>
                    <SearchBar {...props.searchProps} />
                    <ClearSearchButton {...props.searchProps} />
                  </Col>
                </Row>
                <hr />
                <BootstrapTable {...props.baseProps} />
              </>
            )}
          </ToolkitProvider>
        </>
      )}
    </>
  )
}

export default Quizzes
