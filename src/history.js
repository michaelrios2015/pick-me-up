import {createMemoryHistory, createBrowserHistory} from 'history'

// not sure how this works do we have enviorment variables??
// const history =
//   'process.env.NODE_ENV' === 'test'
//     ? createMemoryHistory()
//     : createBrowserHistory()

// This lets us reload but goes back to homepage and url never changes
const history = createMemoryHistory()
// history.go(0)

// The url changes but won't reload
// const history = createBrowserHistory()

// history.go(0);

export default history
