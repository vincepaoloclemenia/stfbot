import React, { Component } from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop/withDragAndDrop.js'
import moment from 'moment'
import 'react-big-calendar/lib/addons/dragAndDrop'

BigCalendar.momentLocalizer(moment)
const DragAndDropCalendar = withDragAndDrop(BigCalendar)

class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.events = [
            {
              id: 0,
              title: 'All Day Event very long title',
              allDay: true,
              start: new Date(2018, 3, 0),
              end: new Date(2018, 3, 1),
            },
            {
              id: 1,
              title: 'Long Event',
              start: new Date(2018, 3, 7),
              end: new Date(2018, 3, 10),
            },
          
            {
              id: 2,
              title: 'DTS STARTS',
              start: new Date(2016, 2, 13, 0, 0, 0),
              end: new Date(2016, 2, 20, 0, 0, 0),
            },
          
            {
              id: 3,
              title: 'DTS ENDS',
              start: new Date(2016, 10, 6, 0, 0, 0),
              end: new Date(2016, 10, 13, 0, 0, 0),
            },
          
            {
              id: 4,
              title: 'Some Event',
              start: new Date(2018, 3, 9, 0, 0, 0),
              end: new Date(2018, 3, 9, 0, 0, 0),
            },
            {
              id: 5,
              title: 'Conference',
              start: new Date(2018, 3, 11),
              end: new Date(2018, 3, 13),
              desc: 'Big conference for important people',
            },
            {
              id: 6,
              title: 'Meeting',
              start: new Date(2018, 3, 12, 10, 30, 0, 0),
              end: new Date(2018, 3, 12, 12, 30, 0, 0),
              desc: 'Pre-meeting meeting, to prepare for the meeting',
            },
            {
              id: 7,
              title: 'Lunch',
              start: new Date(2018, 3, 12, 12, 0, 0, 0),
              end: new Date(2018, 3, 12, 13, 0, 0, 0),
              desc: 'Power lunch',
            },
            {
              id: 8,
              title: 'Meeting',
              start: new Date(2018, 3, 12, 14, 0, 0, 0),
              end: new Date(2018, 3, 12, 15, 0, 0, 0),
            },
            {
              id: 9,
              title: 'Happy Hour',
              start: new Date(2018, 3, 12, 17, 0, 0, 0),
              end: new Date(2018, 3, 12, 17, 30, 0, 0),
              desc: 'Most important meal of the day',
            },
            {
              id: 10,
              title: 'Dinner',
              start: new Date(2018, 3, 12, 20, 0, 0, 0),
              end: new Date(2018, 3, 12, 21, 0, 0, 0),
            },
            {
              id: 11,
              title: 'Birthday Party',
              start: new Date(2018, 3, 13, 7, 0, 0),
              end: new Date(2018, 3, 13, 10, 30, 0),
            },
            {
              id: 12,
              title: 'Late Night Event',
              start: new Date(2018, 3, 17, 19, 30, 0),
              end: new Date(2018, 3, 18, 2, 0, 0),
            },
            {
              id: 13,
              title: 'Multi-day Event',
              start: new Date(2018, 3, 20, 19, 30, 0),
              end: new Date(2018, 3, 22, 2, 0, 0),
            },
            {
              id: 14,
              title: 'Today',
              start: new Date(new Date().setHours(new Date().getHours() - 3)),
              end: new Date(new Date().setHours(new Date().getHours() + 3)),
            },
          ]
    }

    moveEvent({ event, start, end }) {
        const { events } = this.state

        const idx = events.indexOf(event)
        const updatedEvent = { ...event, start, end }

        const nextEvents = [...events]
        nextEvents.splice(idx, 1, updatedEvent)

        this.setState({
            events: nextEvents,
        })

        alert(`${event.title} was dropped onto ${event.start}`)
    }
    
    resizeEvent(resizeType, { event, start, end }){
        const { events } = this.state

        const nextEvents = events.map(existingEvent => {
            return existingEvent.id == event.id
            ? { ...existingEvent, start, end }
            : existingEvent
        })

        this.setState({
            events: nextEvents,
        })

        alert(`${event.title} was resized to ${start}-${end}`)
    }
    
    render() {
        return (
            <DragAndDropCalendar
                culture='en-GB'
                selectable
                events={this.events}
                onEventDrop={this.moveEvent.bind(this)}
                resizable
                onEventResize={this.resizeEvent.bind(this)}
                defaultView="week"
                defaultDate={new Date(2018, 3, 12)}
            />
        )
    }
}

export default DragDropContext(HTML5Backend)(Dashboard)