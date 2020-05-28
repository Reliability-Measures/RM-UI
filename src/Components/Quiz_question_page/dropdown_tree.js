import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DropdownTreeSelect from 'react-dropdown-tree-select'
//import { question_details } from './question_details'
import { subjects } from '../Config'
import { TopicPath } from '../../Redux/Quiz_question/quiz_question_actions'
import { useFormContext } from 'react-hook-form'

function DropdownTree() {
  const { watch } = useFormContext()
  const dispatch = useDispatch()
  const subjects_init = useSelector((state) => state.dropbox.subjects_init)
  let question_json = subjects_init && subjects.subject_list
  let topics = [
    {
      label: 'Choose Subject First'
    }
  ]
  for (let i = 0; i < question_json.length; i++) {
    if (watch('tags.subject') === question_json[i].label || watch('quiz_create.subject') === question_json[i].label) {
      topics = question_json[i].children
    }
  }
  const onChange = (currentNode, selectedNodes) => {
    dispatch(TopicPath(selectedNodes))
  }
  const assignObjectPaths = (obj, stack) => {
    Object.keys(obj).forEach((k) => {
      const node = obj[k]
      if (typeof node === 'object') {
        node.path = stack ? `${stack}.${k}` : k
        assignObjectPaths(node, node.path)
      }
    })
  }
  assignObjectPaths(question_json)

  return (
    <>
      <DropdownTreeSelect
        data={topics}
        className='dropdown'
        onChange={onChange}
        inlineSearchInput={true}
        mode='hierarchical'
      />
    </>
  )
}

export default DropdownTree
