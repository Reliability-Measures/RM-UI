import React from 'react'
import { useSelector } from 'react-redux'
import IndividualResultsCard from './individual_results_cards'
import IndividualQuizzesCards from './individual_quizzes_cards'
import IndividualTopicCard from './individual_topic_card'

function IndividualResultsContainer() {
  const error = useSelector((state) => state.ramadan_ind_results.ind_quizzes.error)
  const loading = useSelector((state) => state.ramadan_ind_results.loading)
  return (
    <div className='small'>
      {error && !loading ? (
        'Error Please Try Again'
      ) : (
        <>
          <IndividualResultsCard />
          <IndividualTopicCard />
          <IndividualQuizzesCards />
        </>
      )}
    </div>
  )
}

export default IndividualResultsContainer
