import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import {
  BrowserRouter,
  Route,
  Routes,

} from 'react-router-dom';
import Login from './Login';
import Navbar from './Navbar';
import Home from './Home';
import Leadboard from './Leadboard';
import NewQuestion from './NewQuestions';
import Question from './Question';
import Page404 from './Page404';
import { handleInitialData } from './../actions/shared';
import { setAuthedUser } from './../actions/authedUser';
import { PrivateRoute } from './PrivateRoute';
import LoadingBar from 'react-redux-loading-bar';

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData());
    // const userId = localStorage.getItem('userId');
    this.props.dispatch(setAuthedUser());
  }

  render() {
    const { authedUser } = this.props;
    const HomeComponent = authedUser === null ? Login : Home;
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                {authedUser && <Navbar dispatch={this.props.dispatch} />}
                <Routes>
                  <Route path="/" element={<HomeComponent/>} />
                  <Route
                    path="/question/:id"
                    element={<PrivateRoute element={<Question/>} authedUser={authedUser} />}
                  />
                  <Route
                    path="/leadboard"
                    element={<PrivateRoute element={<Leadboard/>} authedUser={authedUser} />}
                  />
                  <Route
                    path="/add"
                    element={<PrivateRoute element={<NewQuestion/>} authedUser={authedUser} />}
                  />
                  <Route path="*" element={<Page404/>} />
                </Routes>

              </div>
            </div>
          </section>
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ authedUser, users }) => {
  return {
    authedUser,
    users,
  }
}

export default connect(mapStateToProps)(App);
