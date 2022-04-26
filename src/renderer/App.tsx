import { useState } from 'react';

const App = (): JSX.Element => {
  const [name, setName] = useState<string>('');

  const quitApp = () => {
    window.apiApp.quitApp();
  };

  const save = async () => {
    const message = await window.apiPhoto.addPhoto({
      name,
    });
    console.log({ message });
  };

  return (
    <div>
      <div>App</div>
      <input
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      <button type="button" onClick={save}>
        Save to database
      </button>
      <button type="button" onClick={quitApp}>
        Quit App
      </button>
    </div>
  );
};

export default App;
