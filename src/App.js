import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux'
import AppRouter from './routes/AppRouter'

function App() {
  return (
    <Provider store={store}>
      <PersistGate  persistor={persistor}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
