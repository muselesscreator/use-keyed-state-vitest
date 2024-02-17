import React from 'react';

export const useKeyedState = (_ : unknown, val: NonNullable<unknown>) => React.useState(val);

export default { useKeyedState };
