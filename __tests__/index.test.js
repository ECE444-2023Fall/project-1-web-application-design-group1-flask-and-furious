import EventCard from '@/components/EventCard'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
 
describe('EventCard', () => {
  it('Renders Event Name', () => {
    render(<EventCard
        key={1}
        eventName={'Awesome Concert'}
        eventDescription={
          'Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.'
        }
        eventLocation={'Galbraith 202'}
        eventDate={'29/10/2023'}
        eventTime={'8-10 pm'}
        eventTags={['Programming', 'Music', 'Dance']}
      />)
 
    const heading = screen.getByRole('heading', {
      name: /Awesome Concert/i,
    })
 
    expect(heading).toBeInTheDocument()
  })
})
