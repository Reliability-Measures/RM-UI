import React from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Analyzepage from './Components/Analyze_page/Analyze_page'
import Home from './Components/home_page'
import Error from './Components/error_page'
import Header from './Components/Header/header'
import CoursesPage from './Components/Courses_page/courses_page'
import Initializer from './Components/initializer'
import Test from './Components/test'
import QuizQuestionPage from './Components/Quiz_question_page/quiz_question_page'
import QuizCreatePage from './Components/Quiz_create_page/quiz_create_page'
import MyAccountPage from './Components/My_account_page/my_account_page'
import RamazanPage from './Components/Ramazan_page/ramazan_page'

function App() {
  const config_init = useSelector((state) => state.dropbox.config_init)
  return (
    <BrowserRouter>
      {!config_init && <Initializer />}
      {config_init && (
        <div className='App'>
          <Header />
          <Switch>
            <Route path='/' component={Home} exact />
            <Route path='/analyze' component={Analyzepage} exact />
            <Route path='/courses' component={CoursesPage} exact />
            <Route path='/createquestion' component={QuizQuestionPage} exact />
            <Route path='/createquiz' component={QuizCreatePage} exact />
            <Route path='/myaccount' component={MyAccountPage} exact />
            <Route path='/ramazan' component={RamazanPage} exact />
            <Route path='/ramadan' component={RamazanPage} exact />
            <Route path='/test' component={Test} exact />
            <Route component={Error} />
          </Switch>
        </div>
      )}
    </BrowserRouter>
  )
}

export default App
