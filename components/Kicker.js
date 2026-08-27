/* Kicker — the "// Label" eyebrow above a section or on a card.

   The slashes are ornament, not content: left in the text they are
   announced as "slash slash" before every one of the nine labels on the
   page, so they are marked decorative and the label reads on its own. */
(function () {
  function Kicker({ children, className }) {
    return (
      <p className={className}>
        <span aria-hidden="true">// </span>
        {children}
      </p>
    );
  }

  window.Kicker = Kicker;
})();
