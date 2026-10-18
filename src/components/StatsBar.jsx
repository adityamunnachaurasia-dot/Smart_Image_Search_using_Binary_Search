export default function StatsBar({ data }) {
  if (!data) return null;
  const { resultCount, comparisonCount, searchTimeMs, query, algorithm, linearComparison } = data;
  return (
    <div className="statsbar">
      <div><b>{resultCount}</b> result{resultCount === 1 ? '' : 's'} for <code>"{query}"</code></div>
      <div><b>Algorithm:</b> {algorithm}</div>
      <div><b>Comparisons:</b> {comparisonCount}</div>
      <div><b>Search time:</b> {searchTimeMs} ms <small>(algorithm only)</small></div>
      {linearComparison && (
        <div className="linear">
          Linear: {linearComparison.comparisonCount} comparisons · {linearComparison.resultCount} results
        </div>
      )}
    </div>
  );
}