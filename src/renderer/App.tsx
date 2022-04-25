const App = (): JSX.Element => {
  const quitApp = () => {
    window.apiApp.quitApp();
  };

  return (
    <div>
      <div>App</div>
      <button type="button" onClick={quitApp}>
        Quit App
      </button>
    </div>
  );
};

export default App;
