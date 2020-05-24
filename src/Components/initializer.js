import React from 'react'
import { useDispatch } from 'react-redux'
import { FileSuccess, FileFailure } from '../Redux/Dropbox_init/dropbox_actions'
import {
  fetchRamadanResultsStat4,
  fetchRamadanResultsStat5,
  fetchRamadanResultsStat6
} from '.././Redux/Ramadan_quiz_results/aggregated_actions'
//import { fetchCourses } from '.././Redux/RM-courses_init/rm_courses_init_actions'
import { Dropbox } from 'dropbox'
import fetch from 'cross-fetch'
import { cloud_provider, set_config } from './Config'

function Initializer() {
  const dispatch = useDispatch()
  let dbx = new Dropbox({
    accessToken: cloud_provider.cloud_access_key,
    fetch: fetch
  })
  dbx
    .filesDownload({ path: '/' + cloud_provider.cloud_config_file })
    .then((response) => {
      response.fileBlob.text().then((res) => {
        set_config(JSON.parse(res))
        dispatch(FileSuccess())
        dispatch(fetchRamadanResultsStat4())
        dispatch(fetchRamadanResultsStat5())
        dispatch(fetchRamadanResultsStat6())
      })
    })
    .catch((error) => {
      dispatch(FileFailure(error))
    })
  //dispatch(fetchCourses())
  return <></>
}

export default Initializer
