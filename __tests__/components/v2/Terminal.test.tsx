import { render, screen, fireEvent, act } from '@testing-library/react'
import Terminal, { buildCommands, type TerminalApi } from '@/components/v2/Terminal'
import { HOME_PROJECTS } from '@/data/v2/projects'
import { LINKS } from '@/data/v2/config'

function setup() {
  let path: string[] = []
  const api: TerminalApi = {
    goTo: jest.fn(), navigate: jest.fn(), setTheme: jest.fn(), setVersion: jest.fn(),
    setTweak: jest.fn(), openProject: jest.fn(), scrollTo: jest.fn(), close: jest.fn(),
    getState: () => ({ page: 'home', theme: 'light', version: 'v2', font: 'JetBrains Mono', asciiSize: 12, hoverReveal: 'ascii' }),
  }
  const ctx = { playGame: jest.fn(), out: jest.fn(), ok: jest.fn(), err: jest.fn(), node: jest.fn(), clear: jest.fn(), close: jest.fn() }
  const commands = buildCommands(api, () => path, (next) => { path = next })
  return { api, ctx, commands }
}

test('help documents every implemented command, including aliases', () => {
  const { commands, ctx } = setup()
  commands.help.run([], ctx)
  const { container } = render(ctx.node.mock.calls[0][0])
  for (const [name, command] of Object.entries(commands)) {
    const label = name + (command.usage ? ' ' + command.usage : '')
    expect(Array.from(container.querySelectorAll('.k')).map((el) => el.textContent)).toContain(label)
  }
})

test('project listing follows current data and ls respects the projects directory', () => {
  const { commands, ctx } = setup()
  commands.cd.run(['projects'], ctx)
  commands.ls.run([], ctx)
  const { container } = render(ctx.node.mock.calls[0][0])
  HOME_PROJECTS.forEach((project) => expect(container).toHaveTextContent(project.blurb))
  expect(container).not.toHaveTextContent('Recipe Assistant')
})

test('full project titles and slugs open the correct project and expose its current stack', () => {
  const { commands, api, ctx } = setup()
  commands.open.run(["Ender's", 'Bench'], ctx)
  expect(api.openProject).toHaveBeenCalledWith("Ender's Bench")
  commands.open.run(['encore'], ctx)
  expect(api.openProject).toHaveBeenCalledWith('Encore')
  commands.project.run(['enders-bench'], ctx)
  expect(ctx.out).toHaveBeenCalledWith(expect.stringContaining('LoRA · vLLM · DGX Spark'))
  commands.open.run(['missing-project'], ctx)
  expect(ctx.err).toHaveBeenCalledWith(expect.stringContaining('no project'))
})

test('whoami and shortcuts reflect current roles and sections', () => {
  const { commands, api, ctx } = setup()
  commands.whoami.run([], ctx)
  const { container } = render(ctx.node.mock.calls[0][0])
  expect(container).toHaveTextContent('openai product lab')
  expect(container).toHaveTextContent('fullyhacks director')
  expect(container).not.toHaveTextContent('student lab')
  commands.experience.run([], ctx)
  expect(api.navigate).toHaveBeenCalledWith('about', 'experience')
  commands.gear.run([], ctx)
  expect(api.navigate).toHaveBeenCalledWith('about', 'ram')
})

test('resume opens the shared replacement PDF and real remains a valid reveal alias', () => {
  const { commands, api, ctx } = setup()
  const open = jest.spyOn(window, 'open').mockImplementation(() => null)
  commands.resume.run([], ctx)
  expect(open).toHaveBeenCalledWith(LINKS.resume, '_blank', 'noopener')
  commands.reveal.run(['real'], ctx)
  expect(api.setTweak).toHaveBeenCalledWith('hoverReveal', 'realistic')
  open.mockRestore()
})

test('terminal autocompletes current project slugs and runs them with Enter', () => {
  const { api } = setup()
  render(<Terminal open onClose={jest.fn()} api={api} />)
  const input = screen.getByRole('textbox', { name: 'Terminal command' })
  fireEvent.change(input, { target: { value: 'open end' } })
  fireEvent.keyDown(input, { key: 'Tab' })
  expect(input).toHaveValue('open enders-bench')
  fireEvent.keyDown(input, { key: 'Enter' })
  expect(api.openProject).toHaveBeenCalledWith("Ender's Bench")
  expect(screen.getByText("opening Ender's Bench")).toBeInTheDocument()
})
test('snake accepts both control schemes, scores, restarts and returns focus to the shell', () => {
  jest.useFakeTimers()
  try {
    render(<Terminal open onClose={jest.fn()} api={setup().api} />)
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'snake' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    const game = screen.getByLabelText('Snake game')
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
    expect(game).toHaveFocus()
    fireEvent.keyDown(game, { key: 'd' })
    act(() => jest.advanceTimersByTime(160 * 6))
    expect(game).toHaveTextContent('SCORE 001')
    fireEvent.keyDown(game, { key: 'ArrowUp' })
    act(() => jest.advanceTimersByTime(160 * 8))
    expect(game).toHaveTextContent('GAME OVER')
    fireEvent.keyDown(game, { key: 'Enter' })
    expect(game).toHaveTextContent('SCORE 000')
    fireEvent.keyDown(game, { key: 'Escape' })
    const prompt = screen.getByRole('textbox')
    expect(prompt).toHaveFocus()
    expect(game).not.toBeInTheDocument()
    fireEvent.change(prompt, { target: { value: 'snake' } })
    fireEvent.keyDown(prompt, { key: 'Enter' })
    expect(screen.getByLabelText('Snake game')).toHaveTextContent('SCORE 000 · HI 001')
  } finally {
    jest.useRealTimers()
  }
})

function launchGame(command: string) {
  render(<Terminal open onClose={jest.fn()} api={setup().api} />)
  const prompt = screen.getByRole('textbox')
  fireEvent.change(prompt, { target: { value: command } })
  fireEvent.keyDown(prompt, { key: 'Enter' })
}

test('tetris speeds up after ten cleared lines and exits to the prompt', () => {
  jest.useFakeTimers()
  const random = jest.spyOn(Math, 'random').mockReturnValue(1.5 / 7)
  try {
    launchGame('tetris')
    const game = screen.getByLabelText('Tetris game')
    expect(game).toHaveFocus()
    const top = () => game.querySelector('[aria-label="Tetris playfield"] rect')?.getAttribute('y')
    act(() => jest.advanceTimersByTime(798))
    expect(top()).toBe('0.5')
    act(() => jest.advanceTimersByTime(1))
    expect(top()).toBe('10.5')
    for (const offset of Array(5).fill([-4, -2, 0, 2, 4]).flat()) {
      for (let i = 0; i < Math.abs(offset); i++) {
        fireEvent.keyDown(game, { key: offset < 0 ? 'a' : 'ArrowRight' })
      }
      fireEvent.keyDown(game, { key: ' ' })
    }
    expect(game).toHaveTextContent('LEVEL 1 · LINES 10')
    act(() => jest.advanceTimersByTime(714))
    expect(top()).toBe('0.5')
    act(() => jest.advanceTimersByTime(1))
    expect(top()).toBe('10.5')
    fireEvent.keyDown(game, { key: 'Escape' })
    expect(screen.getByRole('textbox')).toHaveFocus()
  } finally {
    jest.useRealTimers()
    random.mockRestore()
  }
})

test('etch draws a continuous keyboard stroke and clears it', () => {
  launchGame('etch')
  const game = screen.getByLabelText('Etch Sketch')
  fireEvent.keyDown(game, { key: 'w' })
  fireEvent.keyDown(game, { key: 'ArrowRight' })
  expect(game.querySelector('path')).toHaveAttribute('d', 'M60 30 L60 29 L61 29')
  fireEvent.keyDown(game, { key: 'c' })
  expect(game.querySelector('path')).toHaveAttribute('d', 'M60 30')
  fireEvent.keyDown(game, { key: 'Escape' })
  expect(screen.getByRole('textbox')).toHaveFocus()
})

test('tetris holds once per lock, swaps back and remembers its own high score', () => {
  const random = jest.spyOn(Math, 'random').mockReturnValue(0)
  try {
    launchGame('tetris')
    const game = screen.getByLabelText('Tetris game')
    random.mockReturnValue(0.2)
    fireEvent.keyDown(game, { key: 'c' })
    expect(screen.getByLabelText('Held I piece')).toBeVisible()
    expect(screen.getByRole('button', { name: 'Hold piece' })).toBeDisabled()
    fireEvent.keyDown(game, { key: 'c' })
    expect(screen.getByLabelText('Held I piece')).toBeVisible()
    fireEvent.keyDown(game, { key: ' ' })
    expect(game).toHaveTextContent('SCORE 36')
    fireEvent.keyDown(game, { key: 'c' })
    expect(screen.getByLabelText('Held O piece')).toBeVisible()
    const record = localStorage.getItem('portfolio.tetris.highScore')
    expect(Number(record)).toBeGreaterThanOrEqual(36)
    fireEvent.keyDown(game, { key: 'Escape' })
    const prompt = screen.getByRole('textbox')
    fireEvent.change(prompt, { target: { value: 'tetris' } })
    fireEvent.keyDown(prompt, { key: 'Enter' })
    expect(screen.getByLabelText('Tetris game')).toHaveTextContent('SCORE 0 · HI ' + record)
    expect(screen.getByLabelText('Empty hold slot')).toBeVisible()
  } finally {
    random.mockRestore()
  }
})
