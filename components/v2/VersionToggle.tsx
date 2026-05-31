'use client'

type Props = { version: 'v1' | 'v2'; setVersion: (v: 'v1' | 'v2') => void }

export default function VersionToggle({ version, setVersion }: Props) {
  const isV1 = version === 'v1'
  return (
    <div className={`vtoggle ${version}`}>
      <button className={isV1 ? 'active' : ''} onClick={() => setVersion('v1')}>v1</button>
      <div className="switch" onClick={() => setVersion(isV1 ? 'v2' : 'v1')}>
        <div className="knob"></div>
      </div>
      <button className={!isV1 ? 'active' : ''} onClick={() => setVersion('v2')}>v2</button>
    </div>
  )
}
