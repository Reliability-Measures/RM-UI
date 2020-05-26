import React from 'react'
import { useSelector } from 'react-redux'
import { Row, Col, Card } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'

function Items() {
  const data = useSelector((state) => state.user_data.data)
  const is_loading = useSelector((state) => state.user_data.isloading)
  const loaded = useSelector((state) => state.user_data.loaded)
  let items = loaded ? data.items : null
  let items_count = loaded ? data.items_count : null

  const { SearchBar, ClearSearchButton } = Search

  const columns = [
    {
      dataField: 'id',
      text: `Item #`,
      sort: true,
      headerStyle: () => {
        return { width: '6%' }
      }
    },
    {
      dataField: 'item_id',
      text: 'Item Id',
      sort: true,
      headerStyle: () => {
        return { width: '8%' }
      }
    },
    {
      dataField: 'subject',
      text: 'Subject',
      sort: true,
      headerStyle: () => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'item_text',
      text: 'Item Text',
      headerStyle: () => {
        return { width: '50%' }
      }
    },
    {
      dataField: 'date_created',
      text: 'Date Created',
      headerStyle: () => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'date_updated',
      text: 'Date Updated',
      headerStyle: () => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'privacy_status',
      text: 'Privacy Status',
      sort: true,
      headerStyle: () => {
        return { width: '8%' }
      }
    }
  ]
  let table_data =
    loaded &&
    items.map((val, index) => ({
      id: index + 1,
      item_id: val.id,
      subject: val.subject ? val.subject : 'None',
      item_text: val.text,
      date_created: val.date_created.substring(0, 10),
      date_updated: val.date_updated.substring(0, 10),
      privacy_status: val.private === 1 ? 'Private' : 'Public'
    }))
  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandHeaderColumnRenderer: ({ isAnyExpands }) => {
      if (isAnyExpands) {
        return <b></b>
      }
      return <b></b>
    },
    expandColumnRenderer: ({ expanded }) => {
      if (expanded) {
        return (
          <b>
            <i className='fas fa-angle-up'></i>
          </b>
        )
      }
      return (
        <b>
          <i className='fas fa-angle-down'></i>
        </b>
      )
    },
    renderer: (row, rowIndex) => (
      <>
        {loaded &&
          items.map((val, index) => (
            <>
              {rowIndex === index && (
                <Card key={index}>
                  <Card.Header className='h4'>{val.text}</Card.Header>
                  <Card.Body>
                    <Card.Title>
                      <Row>
                        <Col>
                          Topic(s)
                          {Object.values(val.topic)
                            ? Object.values(val.topic).map((v) => (v ? <ListItem item={v} /> : null))
                            : 'None'}
                        </Col>
                        <Col>
                          Sub-Topic(s)
                          {Object.values(val.sub_topics)
                            ? Object.values(val.sub_topics).map((v) => (v ? <ListItem item={v} /> : null))
                            : 'None'}
                        </Col>
                      </Row>
                    </Card.Title>
                    <Card.Text>
                      {val.choices.map((va, index) => (
                        <div key={index} className='text-left'>
                          <Row>
                            <Col style={{ color: [va.correct === 1 && 'green'] }} className='h4'>
                              {index + 1}) {va.choice}
                              {va.correct === 1 && <i className='fas fa-check text-success'></i>}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Card.Text>
                    {/* <Button variant='primary'>Edit Item</Button> */}
                  </Card.Body>
                </Card>
              )}
            </>
          ))}
      </>
    )
  }
  return (
    <>
      {is_loading && <Loader />}
      {loaded && !is_loading && (
        <>
          <h1>Items Table</h1>
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
                <BootstrapTable {...props.baseProps} expandRow={expandRow} />
              </>
            )}
          </ToolkitProvider>
        </>
      )}
    </>
  )
}

export default Items
