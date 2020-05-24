import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

function RamazanStat5() {
  const data_loaded_5 = useSelector((state) => state.ramadan_agg_results.loaded_5)
  const data_loaded_4 = useSelector((state) => state.ramadan_agg_results.loaded_4)
  const stat_5 = useSelector((state) => state.ramadan_agg_results.stat_5)
  const stat_4 = useSelector((state) => state.ramadan_agg_results.stat_4)
  return (
    <>
      {data_loaded_5 && data_loaded_4 ? (
        <Table responsive size='sm'>
          <thead>
            <tr>
              <th>Quiz #</th>
              <th>Responses ({stat_4[0].count})</th>
              <th>All Correct</th>
              <th>4 Correct</th>
              <th>3 Correct</th>
              <th>2 Correct</th>
              <th>1 Correct </th>
              <th>0 Correct </th>
            </tr>
          </thead>
          <tbody>
            {stat_5.map((val, index) => (
              <tr key={index}>
                <td>{val.quiz}</td>
                <td>{val.count}</td>
                <td>
                  {val.all_correct} ({Math.round(val.all_correct_perc, 0)}%)
                </td>
                <td>
                  {val.four_correct} ({Math.round(val.four_correct_perc, 0)}%)
                </td>
                <td>
                  {val.three_correct} ({Math.round(val.three_correct_perc, 0)}%)
                </td>
                <td>
                  {val.two_correct} ({Math.round(val.two_correct_perc, 0)}%)
                </td>
                <td>
                  {val.one_correct} ({Math.round(val.one_correct_perc, 0)}%)
                </td>
                <td>
                  {val.zero_correct} ({Math.round(val.zero_correct_perc, 0)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : null}
    </>
  )
}

export default RamazanStat5
