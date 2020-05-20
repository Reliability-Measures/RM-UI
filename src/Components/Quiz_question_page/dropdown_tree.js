import React from 'react'
import { useDispatch } from 'react-redux'
import DropdownTreeSelect from 'react-dropdown-tree-select'
import { question_details } from './question_details'
import { TopicPath } from '../../Redux/Quiz_question/quiz_question_actions'
import { useFormContext } from 'react-hook-form'

function DropdownTree() {
  const { watch } = useFormContext()
  const dispatch = useDispatch()
  let question_json = question_details.subject_list
  let topics = [
    {
      label: 'Choose Subject First'
    }
  ]
  for (let i = 0; i < question_json.length; i++) {
    if (
      watch('quiz_question.tags.subject') === question_json[i].label ||
      watch('quiz_create.subject') === question_json[i].label
    ) {
      topics = question_json[i].children
    }
  }
  const onChange = (currentNode, selectedNodes) => {
    console.log('path:', selectedNodes)
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
