import React from 'react';

import { StrictDict } from '@muselesscreator/strict-dict';
import { useKeyedState } from '../hooks';

export const stateKeys = StrictDict({
  importedClicked: 'importedClicked',
  fileInputChanged: 'fileInputChanged',
  loaded: 'loaded',
  numEvents: 'numEvents',
});

export const formUrl = 'localhost:18000/form-url';

export const useExampleComponentData = () => {
  const [importClicked, setImportClicked] = useKeyedState(stateKeys.importedClicked, 0);
  const [, setLoaded] = useKeyedState(stateKeys.loaded, false);
  const [, setNumEvents] = useKeyedState(stateKeys.numEvents, 0);
  const fileInputRef = React.useRef();

  React.useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  React.useEffect(() => {
    setNumEvents(num => num + 1);
  }, [setNumEvents, importClicked]);

  const handleImportedComponentClicked = () => {
    fileInputRef.current?.click();
    setImportClicked(val => val + 1);
  };

  return {
    importClicked,

    fileInputRef,
    formAction: formUrl,
    handleImportedComponentClicked,
  };
};

export default useExampleComponentData;
