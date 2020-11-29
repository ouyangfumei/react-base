import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes'
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import './mock';
import './less/index.less';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
// 严格模式
// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
reportWebVitals();
