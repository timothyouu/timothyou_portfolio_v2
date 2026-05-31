import { CHANGELOG } from '@/data/v2/changelog'

// Shared changelog view — rendered both as a terminal node (`changelog` command)
// and inside the settings panel.
export default function Changelog() {
  return (
    <div className="changelog">
      {CHANGELOG.map((entry) => (
        <div className="changelog-entry" key={entry.version}>
          <div className="changelog-head">
            <span className="changelog-ver">v{entry.version}</span>
            <span className="changelog-date">{entry.date}</span>
          </div>
          <ul className="changelog-list">
            {entry.changes.map((change, i) => (
              <li key={i}>{change}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
