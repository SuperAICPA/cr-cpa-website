import React from 'react';
import CPAWebsite from './cpa-website';

// Google reviews are rendered inside the pages themselves (home page and landing pages),
// so they no longer appear a second time below the footer.
function App() {
  return <CPAWebsite />;
}

export default App;
