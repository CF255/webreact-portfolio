import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

function renderHome() {
  return render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )
}

describe('Home (landing page)', () => {
  it('renders the name as the main heading', () => {
    renderHome()
    expect(screen.getByRole('heading', { level: 1, name: /andrews luis fernandez/i })).toBeInTheDocument()
  })

  it('renders the demo CTA so visitors can explore the app without an account', () => {
    renderHome()
    expect(screen.getByRole('button', { name: /explore the app \(demo\)/i })).toBeInTheDocument()
  })

  it('renders a log in link for visitors who are not authenticated', () => {
    renderHome()
    const loginLinks = screen.getAllByRole('link', { name: /log in/i })
    expect(loginLinks.length).toBeGreaterThan(0)
    loginLinks.forEach((link) => expect(link).toHaveAttribute('href', '/login'))
  })

  it('renders all main navigation sections', () => {
    renderHome()
    ;['About', 'Skills', 'Experience', 'Project', 'Contact'].forEach((label) => {
      expect(screen.getAllByRole('link', { name: label }).length).toBeGreaterThan(0)
    })
  })
})
