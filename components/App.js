/* App — composition. Hero owns the first video; Projects and Skills share the
   second, which is pinned behind the whole band so the cards' glass has
   something moving to blur. The footer sits below the band on solid canvas.

   The landmarks are siblings, not nested: the wordmark header, the section
   nav and the footer each stand outside <main> so that skipping to the
   content actually skips past all of them. */
(function () {
  const FadingVideo = window.FadingVideo;
  const TopBar = window.TopBar;
  const BottomNav = window.BottomNav;
  const Hero = window.Hero;
  const Projects = window.Projects;
  const Skills = window.Skills;
  const Footer = window.Footer;

  const BAND_VIDEO =
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

  function App() {
    return (
      <React.Fragment>
        <a href="#content" className="skip-link font-body">Skip to content</a>

        <TopBar />

        <main id="content" tabIndex={-1} className="bg-black">
          <Hero />

          <div className="relative bg-black">
            {/* One viewport-tall video sticking to the top of the band, so the
                clip is never stretched across two full sections. */}
            <div className="absolute inset-0 z-0">
              <div className="sticky top-0 h-screen w-full overflow-hidden">
                <FadingVideo src={BAND_VIDEO} className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="relative z-10">
              <Projects />
              <Skills />
            </div>
          </div>
        </main>

        <Footer />

        <BottomNav />
      </React.Fragment>
    );
  }

  window.App = App;

  ReactDOM.createRoot(document.getElementById("root")).render(<App />);
})();
