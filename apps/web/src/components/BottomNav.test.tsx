import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNav } from './BottomNav'
import '@testing-library/jest-dom/vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('BottomNav', () => {
  it('renders all 5 navigation links', () => {
    render(<BottomNav />)

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /transactions/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /budgets/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /pots/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /recurring bills/i })).toBeInTheDocument()
  })

  it('marks active item with aria-current', () => {
    render(<BottomNav />)

    const overviewLink = screen.getByRole('link', { name: /overview/i })
    expect(overviewLink).toHaveAttribute('aria-current', 'page')
  })

  it('renders links with correct hrefs', () => {
    render(<BottomNav />)

    expect(screen.getByRole('link', { name: /overview/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /transactions/i })).toHaveAttribute('href', '/transactions')
    expect(screen.getByRole('link', { name: /budgets/i })).toHaveAttribute('href', '/budgets')
    expect(screen.getByRole('link', { name: /pots/i })).toHaveAttribute('href', '/pots')
    expect(screen.getByRole('link', { name: /recurring bills/i })).toHaveAttribute('href', '/bills')
  })

  it('is hidden on desktop (md breakpoint)', () => {
    const { container } = render(<BottomNav />)
    const nav = container.querySelector('nav')
    expect(nav).toHaveClass('md:hidden')
  })
})
