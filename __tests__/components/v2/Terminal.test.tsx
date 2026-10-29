import { render, screen, fireEvent } from '@testing-library/react'
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
  const ctx = { out: jest.fn(), ok: jest.fn(), err: jest.fn(), node: jest.fn(), clear: jest.fn(), close: jest.fn() }
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