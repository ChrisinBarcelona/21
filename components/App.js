/* App — mounts the two full-height sections. */
(function () {
  const Hero = window.Hero;
  const Capabilities = window.Capabilities;

  function App() {
    return (
      <main className="bg-black">
        <Hero />
        <Capabilities />
      </main>
    );
  }

  window.App = App;

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
