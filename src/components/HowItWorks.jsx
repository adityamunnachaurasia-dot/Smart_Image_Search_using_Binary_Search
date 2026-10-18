import Reveal from './Reveal.jsx';

const STEPS = [
  {
    n: '01',
    title: 'Organize',
    body: 'Image metadata — titles, categories, tags — is normalized and placed into a sorted search index at startup.',
  },
  {
    n: '02',
    title: 'Search',
    body: 'Binary search repeatedly halves the search range to locate the first key that matches your query prefix.',
  },
  {
    n: '03',
    title: 'Match',
    body: 'Matching index entries are mapped to image records. Duplicate hits from multiple fields are deduplicated.',
  },
  {
    n: '04',
    title: 'Discover',
    body: 'Matched images are filtered by category, ordered, and displayed in the interactive gallery.',
  },
];

export default function HowItWorks() {
  return (
    <section className="how" id="how">
      <div className="section-heading">
        <span className="eyebrow">The Process</span>
        <h2>The Search Process.</h2>
        <p>Four stages between your keystroke and the image you see.</p>
      </div>
      <div className="how-grid">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 60}>
            <article className="how-card">
              <span className="num">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}