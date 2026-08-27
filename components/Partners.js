/* Partners — glass caption chip above a row of partner wordmarks. */
(function () {
  const motion = window.Motion.motion;

  const PARTNERS = ["Aeon", "Vela", "Apex", "Orbit", "Zeno"];

  function Partners() {
    return (
      <motion.div
        initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
        animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 pb-8"
      >
        <span className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
          Collaborating with top aerospace pioneers globally
        </span>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 max-w-full">
          {PARTNERS.map((name) => (
            <span
              key={name}
              className="font-heading italic text-white text-2xl md:text-3xl tracking-tight"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    );
  }

  window.Partners = Partners;
})();
