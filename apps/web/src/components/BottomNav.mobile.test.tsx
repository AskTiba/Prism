import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BottomNav } from './BottomNav'
import '@testing-library/jest-dom/vitest'

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('BottomNav - Mobile Layout', () => {
  it('renders exactly 5 navigation items', () => {
    render(<BottomNav />)
    const nav = screen.getByRole('navigation')
    const links = nav.querySelectorAll('a')
    expect(links.length).toBe(5)
  })

  it('labels are not rendered (design shows icons only)', () => {
    render(<BottomNav />)
    const nav = screen.getByRole('navigation')
    const spans = nav.querySelectorAll('span')
    expect(spans.length).toBe(0)
  })

  it('all interactive elements have 48dp minimum touch targets', () => {
    render(<BottomNav />)
    const nav = screen.getByRole('navigation')
    const links = nav.querySelectorAll('a')
    links.forEach(el => {
      expect(el.className).toMatch(/min-h-\[48px\]/)
      expect(el.className).toMatch(/min-w-\[48px\]/)
    })
  })

  it('is visible only on mobile (md:hidden)', () => {
    render(<BottomNav />)
    const nav = screen.getByRole('navigation')
    expect(nav.className).toMatch(/md:hidden/)
  })

  it('matches design - no user profile icon', () => {
    render(<BottomNav />)
    const nav = screen.getByRole('navigation')
    const buttons = nav.querySelectorAll('button')
    expect(buttons.length).toBe(0)
  })
})
