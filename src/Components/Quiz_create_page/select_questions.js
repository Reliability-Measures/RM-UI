import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Col, Row, Button } from 'react-bootstrap'
import Loader from 'react-loader-spinner'
import { ItemSelectedId, ItemSelectedText, ItemSelectedReset } from '../../Redux/Quiz_question/quiz_question_actions'
import BootstrapTable from 'react-bootstrap-table-next'
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import ListItem from '../Quiz_question_page/Reuse_components/list_item'

function SelectQuestions() {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.quiz_question.item_get_response.items)
  const response = useSelector((state) => state.quiz_question.item_get_response)
  const items_n = useSelector((state) => state.quiz_question.item_get_response.total_items)
  const items_recived = useSelector((state) => state.quiz_question.item_get_received)
  const items_loading = useSelector((state) => state.quiz_question.item_get_loading)
  const state_ids = useSelector((state) => state.quiz_question.items_selected_id)
  const state_texts = useSelector((state) => state.quiz_question.items_selected_text)

  const { SearchBar } = Search
  const columns = [
    {
      dataField: 'id',
      text: 'Item ID',
      sort: true,
      headerStyle: () => {
        return { width: '10%' }
      }
    },
    {
      dataField: 'item',
      text: 'Items'
    }
  ]
  let table_data =
    items_recived &&
    items.map((val, index) => ({
      id: val.id,
      item: val.text
    }))
  let items_selected_id_l = null
  let items_selected_text_l = null

  const handleOnSelect = (row, isSelect) => {
    if (isSelect && state_ids.indexOf(row.id) === -1) {
      items_selected_id_l = row.id
      items_selected_text_l = row.item
      dispatch(ItemSelectedId(items_selected_id_l))
      dispatch(ItemSelectedText(items_selected_text_l))
    }
    if (!isSelect) {
      state_ids.splice(state_ids.indexOf(row.id), 1)
      state_texts.splice(state_texts.indexOf(row.text), 1)
      dispatch(ItemSelectedReset(state_ids, []))
      state_texts.forEach((val) => dispatch(ItemSelectedText(val)))
    }
  }

  const handleOnSelectAll = (isSelect, rows) => {
    rows.forEach((val, index) => {
      if (isSelect && state_ids.indexOf(val.id) === -1) {
        items_selected_id_l = val.id
        items_selected_text_l = val.item
        dispatch(ItemSelectedId(items_selected_id_l))
        dispatch(ItemSelectedText(items_selected_text_l))
      }
    })
    if (!isSelect) {
      dispatch(ItemSelectedReset([], []))
    }
  }
  const selectRow = {
    mode: 'checkbox',
    bgColor: '#c8e6c9',
    selected: state_ids,
    onSelect: handleOnSelect,
    onSelectAll: handleOnSelectAll
  }
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
        {items_recived &&
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
                          {typeof val.topic === 'string' ? (
                            <ListItem item={val.topic} />
                          ) : val.topic === null ? (
                            <ListItem item={'None'} />
                          ) : Object.values(val.topic) ? (
                            Object.values(val.topic).map((v) => (v ? <ListItem item={v} /> : null))
                          ) : (
                            'None'
                          )}
                        </Col>
                        <Col>
                          Sub-Topic(s)
                          {typeof val.sub_topics === 'string' ? (
                            <ListItem item={val.sub_topics} />
                          ) : val.sub_topics === null ? (
                            <ListItem item={'None'} />
                          ) : Object.values(val.sub_topics) ? (
                            Object.values(val.sub_topics).map((v) => (v ? <ListItem item={v} /> : null))
                          ) : (
                            'None'
                          )}
                        </Col>
                      </Row>
                    </Card.Title>
                    <hr></hr>
                    <Card.Text>
                      {val.choices.map((va, index) => (
                        <div key={index} className='text-left'>
                          <Row>
                            <Col style={{ color: [va.correct === 1 && 'green'] }} className='h5'>
                              {va.choice} {va.correct === 1 && <i className='fas fa-check text-success'></i>}
                            </Col>
                          </Row>
                        </div>
                      ))}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </>
          ))}
      </>
    )
  }
  const customTotal = (from, to, size) => (
    <span className='react-bootstrap-table-pagination-total'>
      Showing {from} to {to} of {size} Results
    </span>
  )
  const options = {
    showTotal: true,
    paginationTotalRenderer: customTotal,
    sizePerPageList: [
      {
        text: '10',
        value: 10
      },
      {
        text: '20',
        value: 20
      },
      {
        text: '30',
        value: 10
      },
      {
        text: 'All',
        value: table_data.length
      }
    ] // A numeric array is also available. the purpose of above example is custom the text
  }
  return (
    <>
      {items_recived && (
        <>
          <Row>
            <Col>
              <ToolkitProvider keyField='id' bootstrap4={true} data={table_data} columns={columns} search>
                {(props) => (
                  <>
                    <Row>
                      {/* <Col>Total Items Selected: {state_ids.length}</Col>
                      <Col>
                        <Dropdown>
                          <Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
                            Selected items
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {state_texts.map((val, index) => (
                              <Dropdown.Item key={index}>{val}</Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Col> */}
                      <Col>Subject: {items_recived && items_n > 0 && items[0].subject}</Col>
                      <Col>
                        <SearchBar placeholder='Search Table' {...props.searchProps} />
                      </Col>
                      <Col>
                        <Button variant='outline-dark' onClick={() => dispatch(ItemSelectedReset([], []))}>
                          Reset Items
                        </Button>
                      </Col>
                    </Row>
                    <hr />
                    <BootstrapTable
                      {...props.baseProps}
                      //classes='table-responsive'
                      expandRow={expandRow}
                      selectRow={selectRow}
                      pagination={paginationFactory(options)}
                    />
                  </>
                )}
              </ToolkitProvider>
            </Col>
          </Row>
        </>
      )}
      {response.error && !items_loading && <h3>Error Please Try Again</h3>}
      {items_n === 0 && !items_loading && <h3>No Questions Found</h3>}
      {items_loading && <Loader type='Puff' color='green' height={200} width={200} />}
    </>
  )
}

export default SelectQuestions
