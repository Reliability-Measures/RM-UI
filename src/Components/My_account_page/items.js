import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { getUserData } from '../../Redux/User_data/user_data_actions'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter'

function Items() {
  const dispatch = useDispatch()
  const data = useSelector((state) => state.user_data.data)
  const is_loading = useSelector((state) => state.user_data.isloading)
  const loaded = useSelector((state) => state.user_data.loaded)
  const google_json = useSelector((state) => state.google_json.data)
  let items = loaded && data.items ? data.items : []

  const { SearchBar, ClearSearchButton } = Search

  const columns = [
    {
      dataField: 'id',
      text: 'Item #',
      sort: true
    },
    {
      dataField: 'item_id',
      text: 'Item Id',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'subject',
      text: 'Subject',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'topics',
      text: 'Topic(s)',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'sub_topics',
      text: 'SubTopic(s)',
      filter: textFilter(),
      sort: true
    },
    {
      dataField: 'item_text',
      text: 'Item Text',
      filter: textFilter()
    },
    {
      dataField: 'date_created',
      text: 'Date Created',
      filter: textFilter()
    },
    {
      dataField: 'date_updated',
      text: 'Date Updated'
    },
    {
      dataField: 'privacy_status',
      text: 'Privacy Status',
      sort: true
    }
  ]
  let table_data =
    loaded &&
    items.map((val, index) => ({
      id: index + 1,
      item_id: val.id,
      subject: val.subject ? val.subject : 'None',
      topics:
        typeof val.topic === 'string'
          ? val.topic
          : val.topic === null
          ? 'None'
          : Object.values(val.topic) && Object.keys(val.topic).length > 0
          ? Object.values(val.topic).map((v) => (v ? <div>{v}</div> : null))
          : 'None',
      sub_topics:
        typeof val.sub_topics === 'string'
          ? val.sub_topics
          : val.sub_topics === null
          ? 'None'
          : Object.values(val.sub_topics) && Object.keys(val.sub_topics).length > 0
          ? Object.values(val.sub_topics).map((v) => (v ? <div>{v}</div> : 'None'))
          : 'None',
      item_text: val.text,
      date_created: val.date_created,
      date_updated: val.date_updated,
      privacy_status: val.private === 1 ? 'Private' : 'Public'
    }))
  const expandRow = {
    onlyOneExpanding: true,
    showExpandColumn: true,
    expandByColumnOnly: true,
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
                  <Col md='2'>
                    <SearchBar {...props.searchProps} />
                  </Col>
                  <Col md='1'>
                    <ClearSearchButton {...props.searchProps} />
                  </Col>
                  <Col md='6' />
                  <Col md='3'>
                    Refresh{' '}
                    <Button onClick={() => dispatch(getUserData({ user_profile: google_json.profileObj }))}>
                      <i className='fas fa-sync-alt'></i>
                    </Button>
                  </Col>
                </Row>
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  classes='table-responsive'
                  expandRow={expandRow}
                  filter={filterFactory()}
                />
              </>
            )}
          </ToolkitProvider>
        </>
      )}
    </>
  )
}

export default Items
