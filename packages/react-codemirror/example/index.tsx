import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Core from '../components/Core';

function Example() {
  const [sv, setSV] = useState('javascript');
  return (
    <div style={{ width: 800, height: 500 }}>
      <div style={{ marginBottom: 10 }}>
        <select
          value={sv}
          onChange={(e) => {
            setSV(e.target.value);
          }}
        >
          <option value="go">GO</option>
          <option value="rust">rust</option>
          <option value="javascript">javascript</option>
        </select>
      </div>
      <Core codeMirrorOptions={{ readOnly: false, mode: sv }} />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Example />
  </React.StrictMode>,
  document.getElementById('root')
);
