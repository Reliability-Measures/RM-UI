import React from 'react'
import { useSelector } from 'react-redux'

function CourseJumbo() {
  const google_courses = useSelector((state) => state.rm_courses_json.display)
  return (
    <>
      <h1>Course List</h1>
      {google_courses ? (
        <h3>Your Goolge Classroom Courses</h3>
      ) : !google_courses ? (
        <h3>RM Courses (Sample Classes)</h3>
      ) : (
        <div></div>
      )}
    </>
  )
}

export default CourseJumbo
