import React from 'react'
import { useSelector } from 'react-redux'
import { Card, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'

function CourseDetails() {
  const display_bool = useSelector((state) => state.rm_courses_json.display)
  const islogin = useSelector((state) => state.google_json.isLogin)
  const data_loaded = useSelector((state) => state.rm_courses_json.loaded)
  const google_courses = useSelector((state) => state.google_json.data)
  const rm_courses = useSelector((state) => state.rm_courses_json.data)
  let courses =
    display_bool && data_loaded
      ? google_courses
      : !display_bool && data_loaded
      ? rm_courses
      : []
  let courses_length = islogin ? google_courses.courses.length : 'null'
  console.log(courses)
  return (
    <div>
      {display_bool && courses_length === 0 ? (
        <div>
          <br></br>
          <h4>No Classes with this account</h4>
        </div>
      ) : null}
      {data_loaded && islogin ? (
        courses.courses.map((val, index) => (
          <Card key={index}>
            <Card.Header as='h5'>{val.name}</Card.Header>
            <Card.Body>
              <Card.Title>{val.section}</Card.Title>
              <Card.Text>
                {val.descriptionHeading}
                <br></br>
                {val.description}
              </Card.Text>
              <OverlayTrigger
                placement='bottom'
                delay={{ show: 200 }}
                overlay={
                  <Tooltip id={'tool'}>
                    <strong>
                      Make sure you are logged into the right google account for
                      this link to work
                    </strong>
                  </Tooltip>
                }>
                <Button
                  disabled={!display_bool}
                  variant='primary'
                  target='_blank'
                  href={val.alternateLink}>
                  Go to Google Classroom
                </Button>
              </OverlayTrigger>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default CourseDetails
