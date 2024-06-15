import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Trendinge from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import VideoItemDetails from './components/VideoItemDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import NxtWatchContext from './context/NxtWatchContext'
import './App.css'

class App extends Component {
  state = {isDark: true, savedList: []}

  onAddSavedList = item => {
    const {savedList} = this.state
    savedList.push(item)
    this.setState({savedList})
  }

  onRemoveSavedList = id => {
    const {savedList} = this.state
    const updated = savedList.filter(each => each.id !== id)
    this.setState({savedList: updated})
  }

  onChangeDark = () => {
    this.setState(prevState => ({isDark: !prevState.isDark}))
  }

  render() {
    const {isDark, savedList} = this.state

    return (
      <NxtWatchContext.Provider
        value={{
          isDark,
          onChangeDark: this.onChangeDark,
          savedList,
          onAddSavedList: this.onAddSavedList,
          onRemoveSavedList: this.onRemoveSavedList,
        }}
      >
        <>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/trending" component={Trendinge} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <ProtectedRoute
              exact
              path="/videos/:id"
              component={VideoItemDetails}
            />
            <Route exact path="/not-found" component={NotFound} />
            <Route path="/not-found" component={NotFound} />

            <Redirect to="/not-found" />
          </Switch>
        </>
      </NxtWatchContext.Provider>
    )
  }
}

export default App
