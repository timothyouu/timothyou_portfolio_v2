import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import VersionToggle from '@/components/v2/VersionToggle'

describe('v2/VersionToggle', () => {
  it('renders v1 and v2 buttons', () => {
    render(<VersionToggle version="v2" setVersion={() => {}} />)
    expect(screen.getByText('v1')).toBeInTheDocument()
    expect(screen.getByText('v2')).toBeInTheDocument()
  })

  it('marks v2 button as active when version is v2', () => {
    render(<VersionToggle version="v2" setVersion={() => {}} />)
    const v2Btn = screen.getAllByText('v2')[0]
    expect(v2Btn.closest('button')).toHaveClass('active')
  })

  it('marks v1 button as active when version is v1', () => {
    render(<VersionToggle version="v1" setVersion={() => {}} />)
    const v1Btn = screen.getAllByText('v1')[0]
    expect(v1Btn.closest('button')).toHaveClass('active')
  })

  it('calls setVersion with v1 when v1 button is clicked', async () => {
    const setVersion = jest.fn()
    render(<VersionToggle version="v2" setVersion={setVersion} />)
    const user = userEvent.setup()

    const v1Btn = screen.getAllByText('v1')[0].closest('button')!
    await user.click(v1Btn)
    expect(setVersion).toHaveBeenCalledWith('v1')
  })

  it('calls setVersion with v2 when v2 button is clicked', async () => {
    const setVersion = jest.fn()
    render(<VersionToggle version="v1" setVersion={setVersion} />)
    const user = userEvent.setup()

    const v2Btn = screen.getAllByText('v2')[0].closest('button')!
    await user.click(v2Btn)
    expect(setVersion).toHaveBeenCalledWith('v2')
  })

  it('switch toggle calls setVersion to the opposite version', async () => {
    const setVersion = jest.fn()
    const { container } = render(<VersionToggle version="v2" setVersion={setVersion} />)
    const user = userEvent.setup()

    const switchEl = container.querySelector('.switch')!
    await user.click(switchEl)
    expect(setVersion).toHaveBeenCalledWith('v1')
  })
})
