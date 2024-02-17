# use-keyed-state

Simple wrapper for useState that adds a key to the call, allowing independent tracking of state calls and values, independent of the order of their calls.
Provides a mocking util for useKeyedState that allows simplified mocking and testing of this pattern.

## Utilities

### `useKeyedState` and `mockUseKeyedState` - React state hook wrapper and testing utility
This is a pair of methods to test react useState hooks, which are otherwise somewhat problematic to test directly.
#### Usage
Define a keystore (for checking against) of state keys;
```js
import { useKeyedState, StrictDict } from '@edx/use-keyed-state';
const state = StrictDict({
  field1: 'field1',
  field2: 'field2',
  field3: 'field3',
]);
// when initializing, use a state key as the first argument to make the calls uniquely identifiable.
const useMyComponentData = () => {
  const [field1, setField1] = useKeyedState(stateKeys.field1, initialValue);
};
```
When testing, initialize mock state utility outside of your tests
```js
import { mockUseKeyedState } from '@edx/use-keyed-state';
import * as hooks from './hooks';
const state = mockUseState(hooks.stateKeys);
```
For hooks that use these state hooks, first mock the state object for that test, and then test initialization arguments.
```js
state.mock();
const out = myHook();
state.expectInitializedWith(state.keys.field1, initialValue);
```
setState object contains jest functions for each state key.
Access setState object to validate changes and track effects/callbacks.
```js
state.mock();
const out = myHook();
expect(out.setField1).toEqual(state.setState.field1);
out.handleClick(); // out.handleClick = () => { setField2(null); }
expect(state.setField.field2).toHaveBeenCalledWith(null);
```
