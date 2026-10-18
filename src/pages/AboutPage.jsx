import AlgoVisualizer from '../components/AlgoVisualizer.jsx';
import Reveal from '../components/Reveal.jsx';

export default function AboutPage() {
  return (
    <main className="container">
      <div className="prose">
        <Reveal>
          <span className="eyebrow" style={{
            display: 'inline-block',
            fontSize: '0.72rem',
            fontWeight: 800,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--red)',
            marginTop: 8,
          }}>Algorithm Deep Dive</span>
          <h1>How Binary Search Powers This App</h1>
          <p>
            Every keystroke you type triggers a real divide-and-conquer search on a
            sorted index. No <code>LIKE</code>, no <code>includes()</code> — actual midpoint
            comparisons that halve the search space each step.
          </p>
        </Reveal>

        <Reveal delay={60}>
          <h2>What is Binary Search?</h2>
          <p>
            A divide-and-conquer algorithm that finds an element in a <b>sorted</b> array
            by comparing the middle element with the target and discarding the half that
            cannot contain it.
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h2>Why must the index be sorted?</h2>
          <p>
            Each step must decide <b>which half to keep</b>. That decision only works if
            the array is sorted: if <code>arr[mid] &lt; target</code>, the target can only
            be to the right; if <code>arr[mid] &gt; target</code>, only to the left.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <h2>Complexity</h2>
          <ul>
            <li><b>Best case:</b> O(1) — the first midpoint is the target.</li>
            <li><b>Average / worst case:</b> O(log n) comparisons.</li>
            <li><b>Space:</b> O(1) iterative.</li>
          </ul>
          <p>
            Note: the binary search itself is O(log n), but a full search request also
            performs small additional work — walking the matched prefix range, deduplicating
            image IDs, applying category filters, and sorting the result set. The
            <b> comparisons </b>counted in the UI come from the binary search only, and
            search time in the API reflects the full server-side search handler.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <h2>Binary vs Linear</h2>
          <table>
            <thead>
              <tr><th>Algorithm</th><th>Time</th><th>Requires sorted input?</th></tr>
            </thead>
            <tbody>
              <tr><td>Linear Search</td><td>O(n)</td><td>No</td></tr>
              <tr><td>Binary Search</td><td>O(log n)</td><td>Yes</td></tr>
            </tbody>
          </table>
          <p>
            On this app both run against the same sorted index. Enable
            <b> "Compare with Linear Search" </b> on the home page to see real comparison
            counts side by side.
          </p>
        </Reveal>

        <Reveal delay={140}>
          <h2>How the app uses it</h2>
          <ol>
            <li><b>Startup:</b> load all images, normalize titles / categories / tags, sort the flat key list once.</li>
            <li><b>Search:</b> <code>binarySearchPrefix</code> lower-bounds the target in O(log n), then walks forward to collect every key starting with the prefix.</li>
            <li><b>Hydrate:</b> look up image metadata from the in-memory cache — no extra round trips.</li>
            <li><b>Filter & sort:</b> category filtering and result ordering are applied after the binary search.</li>
            <li><b>Uploads / deletes</b> patch the index incrementally — never a full rebuild per request.</li>
          </ol>
        </Reveal>

        <Reveal delay={160}>
          <h2>Interactive Demo</h2>
          <p>Try a target below. Watch <code>low</code>, <code>high</code>, and <code>mid</code> move — the highlighted cell is the current midpoint.</p>
          <AlgoVisualizer />
        </Reveal>
      </div>
    </main>
  );
}
