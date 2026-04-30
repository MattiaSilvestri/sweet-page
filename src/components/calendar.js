import { readSettings } from "../common/settings";
import { Calendar as FullCalendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export class Calendar {
  constructor() {
    this.settings = readSettings();
  }

  render() {
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar(calendarEl, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      height: '400px',
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,listWeek'
      }
    });
    calendar.render();
  }
}
