import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPanel from '@/components/v2/SettingsPanel'
import { TWEAK_DEFAULTS } from '@/components/v2/useTweaks'

describe('v2/SettingsPanel', () => {
  const defaultProps = {
    t: { ...TWEAK_DEFAULTS },
    setTweak: jest.fn(),
    onClose: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the settings heading', () => {
    render(<SettingsPanel {...defaultProps} />)
    expect(screen.getByText('settings')).toBeInTheDocument()
  })

  it('renders theme buttons', () => {
    render(<SettingsPanel {...defaultProps} />)
    expect(screen.getByText('light')).toBeInTheDocument()
    expect(screen.getByText('dark')).toBeInTheDocument()
  })

  it('renders font selector with all fonts', () => {
    render(<SettingsPanel {...defaultProps} />)
    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('JetBrains Mono')).toBeInTheDocument()
    expect(screen.getByText('IBM Plex Mono')).toBeInTheDocument()
    expect(screen.getByText('Fira Code')).toBeInTheDocument()
    expect(screen.getByText('Space Mono')).toBeInTheDocument()
  })

  it('renders reveal mode buttons', () => {
    render(<SettingsPanel {...defaultProps} />)
    expect(screen.getByText('ascii')).toBeInTheDocument()
    expect(screen.getByText('realistic')).toBeInTheDocument()
  })

  it('calls setTweak when theme button is clicked', async () => {
    const setTweak = jest.fn()
    render(<SettingsPanel {...defaultProps} setTweak={setTweak} />)
    const user = userEvent.setup()

    await user.click(screen.getByText('dark'))
    expect(setTweak).toHaveBeenCalledWith('theme', 'dark')
  })

  it('calls onClose when close button is clicked', async () => {
    const onClose = jest.fn()
    render(<SettingsPanel {...defaultProps} onClose={onClose} />)
    const user = userEvent.setup()

    await user.click(screen.getByText('✕'))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('toggles changelog visibility', async () => {
    render(<SettingsPanel {...defaultProps} />)
    const user = userEvent.setup()

    expect(screen.getByText('changelog')).toBeInTheDocument()
    // changelog content should not be visible initially
    const toggle = screen.getByRole('button', { expanded: false })
    await user.click(toggle)
    // After clicking, changelog content should appear (the button is now expanded)
    expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument()
  })
})
