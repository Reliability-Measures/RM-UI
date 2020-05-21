import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { FormContext, useForm } from 'react-hook-form'
import Analyzepage from './Components/Analyze_page/Analyze_page'
import Home from './Components/home_page'
import Error from './Components/error_page'
import Header from './Components/Header/header'
import CoursesPage from './Components/Courses_page/courses_page'
import Initializer from './Components/initializer'
import Test from './Components/test'
import QuizQuestionPage, { quiz_question_form_values } from './Components/Quiz_question_page/quiz_question_page'
import QuizCreatePage from './Components/Quiz_create_page/quiz_create_page'
import { quiz_create_form_values } from './Components/Quiz_create_page/get_questions'
//import MyAccountPage from './Components/My_account_page/my_account_page'
//import RamazanPage from './Components/Ramazan_page/ramazan_page'
console.log(process.env.REACT_APP_GOOGLE_KEY)
console.log(process.env.REACT_APP_CLOUD_API_KEY)

function App() {
  const drop_init = useSelector((state) => state.dropbox.init)
  const methods = useForm({
    defaultValues: {
      quiz_question: quiz_question_form_values,
      quiz_create: quiz_create_form_values
    }
  })
  return (
    <BrowserRouter>
      <FormContext {...methods}>
        {!drop_init && <Initializer />}
        {drop_init && (
          <div className='App'>
            <Header />
            <Switch>
              <Route path='/' component={Home} exact />
              <Route path='/analyze' component={Analyzepage} exact />
              <Route path='/courses' component={CoursesPage} exact />
              <Route path='/createquestion' component={QuizQuestionPage} exact />
              <Route path='/createquiz' component={QuizCreatePage} exact />
              {/*<Route path='/myaccount' component={MyAccountPage} exact />*/}
              <Route path='/test' component={Test} exact />
              <Route component={Error} />
              {/* <Route path='/ramazan' component={RamazanPage} exact /> */}
            </Switch>
          </div>
        )}
      </FormContext>
    </BrowserRouter>
  )
}

export default App
