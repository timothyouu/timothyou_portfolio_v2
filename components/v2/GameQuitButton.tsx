import styles from './TerminalGame.module.css'

export default function GameQuitButton({ onExit }: { onExit: () => void }) {
  return <button onClick={onExit} onPointerUp={event => {
    if (event.pointerType !== 'touch' || !event.isPrimary) return
    if (event.currentTarget.contains(document.elementFromPoint(event.clientX, event.clientY))) onExit()
  }}><span className={styles.keyboardHint}>Esc · </span>Quit</button>
}
