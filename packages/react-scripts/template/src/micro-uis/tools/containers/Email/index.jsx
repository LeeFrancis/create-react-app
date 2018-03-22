import React from 'react';
import ErrorBoundary from '../../toolsError';

// Add this to the ContentItem component to test error handling
// contentItemData={[
//   {
//     paragraph: 'Uncomment this to test the Email tool Error Handling',
//     heading: 'TEST'
//   }
// ]}

export default () => (
  <ErrorBoundary team="lee">
    <button>Connected Email tool</button>
  </ErrorBoundary>
);
