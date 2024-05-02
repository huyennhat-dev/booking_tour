import React, { useState } from 'react';
import { DateSelectArg, EventApi, EventClickArg, formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import {  INITIAL_EVENTS, createEventId } from './event-utils';
import DefaultLayout from '../../layout/DefaultLayout';

// Định nghĩa kiểu dữ liệu cho sự kiện
interface MyEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
}

export default function Calendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<MyEvent[]>([]);



  function handleDateSelect(selectInfo: DateSelectArg) {
      const title = prompt('Vui lòng nhập tiêu đề mới cho sự kiện của bạn!');
      const calendarApi = selectInfo.view.calendar;

      if (title) {
          calendarApi.addEvent({
              id: createEventId(),
              title,
              start: selectInfo.start,
              end: selectInfo.end,
              allDay: selectInfo.allDay
          });
      }
  }

  function handleEventClick(clickInfo: EventClickArg) {
      if (confirm(`Bạn có chắc chắn muốn xóa sự kiện này không '${clickInfo.event.title}'`)) {
          clickInfo.event.remove();
      }
  }

  function handleEvents(events: EventApi[]) {
      const myEvents: MyEvent[] = events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start || new Date(),
          end: event.end || new Date(),
          allDay: event.allDay
      }));
      setCurrentEvents(myEvents);
  }

  return (
      <DefaultLayout>
          <div className="w-full max-w-full p-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  headerToolbar={{
                      left: 'prev,next today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay'
                  }}
                  initialView='dayGridMonth'
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  initialEvents={INITIAL_EVENTS}
                  dayMaxEvents={true}
                  weekends={weekendsVisible}
                  select={handleDateSelect}
                  eventClick={handleEventClick}
                  eventsSet={handleEvents}
                  locale='vi'
              />
          </div>
      </DefaultLayout>
  );
}


