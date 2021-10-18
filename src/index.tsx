import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './components/Routes';

ReactDOM.hydrate(
  <Router>
    <Routes ssrData={window.ssrData} />
  </Router>,
  document.getElementById('root'),
  () => {
    delete window.ssrData;
  }
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
