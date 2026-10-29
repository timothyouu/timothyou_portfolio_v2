import { createEvent, fireEvent, render, screen } from '@testing-library/react'
import Home from '@/components/v2/Home'

jest.mock('@/components/v2/TopBar', () => () => null)
jest.mock('@/components/v2/Footer', () => () => null)
jest.mock('@/components/v2/AsciiImage', () => () => null)

function openEncore(): HTMLElement {
  render(<Home goTo={jest.fn()} setSettingsOpen={jest.fn()} />)
  fireEvent.click(screen.getByText('Piano-practice feedback with Gemini coaching and Even Realities G2 glasses'))
  return screen.getByRole('button', { name: /Encore: toggle/ })
}

function enterPointer(button: HTMLElement, pointerType: string): void {
  const event = createEvent.pointerOver(button)
  Object.defineProperty(event, 'pointerType', { value: pointerType })
  fireEvent(button, event)
}

test('mouse hover reveals the glasses and leaving restores the cover', () => {
  const button = openEncore()
  expect(button).toHaveAttribute('aria-pressed', 'false')
  enterPointer(button, 'mouse')
  expect(button).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByRole('img', { name: 'Through the glasses mockup' })).toBeInTheDocument()
  fireEvent.pointerOut(button)
  expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('touch does not trigger hover, and tapping toggles without collapsing the card', () => {
  const button = openEncore()
  enterPointer(button, 'touch')
  expect(button).toHaveAttribute('aria-pressed', 'false')
  fireEvent.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'true')
  expect(screen.getByText(/Combines Basic Pitch/)).toBeInTheDocument()
  fireEvent.click(button)
  expect(button).toHaveAttribute('aria-pressed', 'false')
})

test('both simulations appear together and Escape dismisses the preview', () => {
  render(<Home goTo={jest.fn()} setSettingsOpen={jest.fn()} />)
  fireEvent.click(screen.getByText('Observe AI decisions under pressure in survival and finance simulations'))
  const button = screen.getByRole('button', { name: /Ender.s Bench: toggle/ })
  fireEvent.click(button)
  expect(screen.getByRole('img', { name: 'The Clearing mockup' })).toBeInTheDocument()
  expect(screen.getByRole('img', { name: 'Ledger Street mockup' })).toBeInTheDocument()
  fireEvent.keyDown(button, { key: 'Escape' })
  expect(button).toHaveAttribute('aria-pressed', 'false')
  expect(screen.queryByRole('img', { name: 'Ledger Street mockup' })).not.toBeInTheDocument()
})