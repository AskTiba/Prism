import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNav } from './BottomNav'
import '@testing-library/jest-dom/vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('BottomNav', () => {
  it('renders all 5 navigation items', () => {
    render(<BottomNav />)

    expect(screen.getByText('Overview')).toBeInTheDocument()
    expect(screen.getByText('Transactions')).toBeInTheDocument()
    expect(screen.getByText('Budgets')).toBeInTheDocument()
    expect(screen.getByText('Pots')).toBeInTheDocument()
    expect(screen.getByText('Recurring Bills')).toBeInTheDocument()
  })

  it('marks active item with aria-current', () => {
    render(<BottomNav />)

    const overviewLink = screen.getByText('Overview').closest('a')
    expect(overviewLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders links with correct hrefs', () => {
    render(<BottomNav />)

    expect(screen.getByText('Overview').closest('a')).toHaveAttribute('href', '/')
    expect(screen.getByText('Transactions').closest('a')).toHaveAttribute('href', '/transactions')
    expect(screen.getByText('Budgets').closest('a')).toHaveAttribute('href', '/budgets')
    expect(screen.getByText('Pots').closest('a')).toHaveAttribute('href', '/pots')
    expect(screen.getByText('Recurring Bills').closest('a')).toHaveAttribute('href', '/bills')
  })

  it('is hidden on desktop (md breakpoint)', () => {
    const { container } = render(<BottomNav />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('md:hidden')
  })
})
