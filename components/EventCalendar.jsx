import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion } from 'framer-motion';

// Lokalisierung für den Kalender
const localizer = momentLocalizer(moment);

// Konvertierung zwischen Eorzea-Zeit und Erdzeit
const convertToEorzeaTime = (earthDate) => {
  // Eorzea-Zeit läuft etwa 20.57x schneller als Erdzeit
  const eorzeaMultiplier = 20.571428571428573;
  
  // Millisekunden seit Unix-Epoche
  const earthMs = earthDate.getTime();
  
  // Konvertierung zu Eorzea-Millisekunden
  const eorzeaMs = earthMs * eorzeaMultiplier;
  
  // Neues Datum mit Eorzea-Zeit
  return new Date(eorzeaMs);
};

const convertToEarthTime = (eorzeaDate) => {
  // Eorzea zu Erde Konvertierung
  const eorzeaMultiplier = 20.571428571428573;
  
  // Millisekunden seit Unix-Epoche in Eorzea-Zeit
  const eorzeaMs = eorzeaDate.getTime();
  
  // Konvertierung zu Erd-Millisekunden
  const earthMs = eorzeaMs / eorzeaMultiplier;
  
  // Neues Datum mit Erdzeit
  return new Date(earthMs);
};

// Eorzea-Monatsnamen
const eorzeaMonths = [
  'Erstmond', 'Zweitmond', 'Drittmond', 'Viertmond', 'Fünftmond', 'Sechstmond',
  'Siebentmond', 'Achtmond', 'Neuntmond', 'Zehntmond', 'Elftmond', 'Zwölftmond'
];

const EventCalendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());
  const [timeMode, setTimeMode] = useState('earth'); // 'earth' oder 'eorzea'
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Beispiel-Events laden
  useEffect(() => {
    // In einer echten Anwendung würden diese Daten von einer API kommen
    const fetchEvents = async () => {
      setIsLoading(true);
      
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const currentDate = new Date();
      const nextMonth = new Date(currentDate);
      nextMonth.setMonth(currentDate.getMonth() + 1);
      
      const sampleEvents = [
        {
          id: 1,
          title: 'Vortrag: Die Geheimnisse von Azys Lla',
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3, 19, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 3, 21, 0),
          location: 'Haupthalle',
          description: 'Ein faszinierender Vortrag über die verborgenen Geheimnisse der schwebenden Insel Azys Lla und die allagische Technologie.',
          type: 'lecture',
          eorzeaDate: 'Astralmond, 12. Tag'
        },
        {
          id: 2,
          title: 'Workshop: Allagische Schriftzeichen',
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6, 14, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 6, 16, 0),
          location: 'Studiensaal',
          description: 'Lernen Sie die Grundlagen der allagischen Schrift und entziffern Sie alte Texte unter Anleitung unserer Experten.',
          type: 'workshop',
          eorzeaDate: 'Astralmond, 15. Tag'
        },
        {
          id: 3,
          title: 'Neue Ausstellung: Primals - Götter und Monster',
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 10),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 15),
          location: 'Ausstellungshalle 2',
          description: 'Eine umfassende Ausstellung über die Primae, ihre Beschwörungen und ihren Einfluss auf die Geschichte Eorzeas.',
          type: 'exhibition',
          eorzeaDate: 'Umbralmond, 15. Tag - Astralmond, 15. Tag'
        },
        {
          id: 4,
          title: 'Führung: Verborgene Symbole in Eorzea',
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 15, 16, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 15, 18, 0),
          location: 'Treffpunkt: Eingang',
          description: 'Entdecken Sie die verborgene Symbolik in der Architektur und Kunst Eorzeas bei dieser geführten Tour durch das Museum.',
          type: 'tour',
          eorzeaDate: 'Astralmond, 20. Tag'
        },
        {
          id: 5,
          title: 'Sonderausstellung: Die Waffen der Krieger des Lichts',
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 20),
          end: new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 10),
          location: 'Ausstellungshalle 1',
          description: 'Eine Sammlung legendärer Waffen, die von den Kriegern des Lichts im Kampf gegen die Primals und das Garleanische Imperium geführt wurden.',
          type: 'exhibition',
          eorzeaDate: 'Astralmond, 25. Tag - Umbralmond, 10. Tag'
        }
      ];
      
      setEvents(sampleEvents);
      setIsLoading(false);
    };
    
    fetchEvents();
  }, []);
  
  // Event-Handler für Klick auf Event
  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
  };
  
  // Event-Handler für Wechsel zwischen Erd- und Eorzea-Zeit
  const toggleTimeMode = () => {
    setTimeMode(prevMode => prevMode === 'earth' ? 'eorzea' : 'earth');
  };
  
  // Benutzerdefinierte Event-Komponente für den Kalender
  const EventComponent = ({ event }) => (
    <div className={`calendar-event event-${event.type}`}>
      <div className="event-title">{event.title}</div>
      <div className="event-location">{event.location}</div>
    </div>
  );
  
  return (
    <div className="event-calendar-container">
      <div className="calendar-header">
        <h2 className="magical-text">Veranstaltungskalender</h2>
        <div className="calendar-controls">
          <button 
            className={`time-toggle-btn ${timeMode === 'earth' ? 'active' : ''}`}
            onClick={toggleTimeMode}
          >
            Erdzeit
          </button>
          <button 
            className={`time-toggle-btn ${timeMode === 'eorzea' ? 'active' : ''}`}
            onClick={toggleTimeMode}
          >
            Eorzea-Zeit
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Lade Veranstaltungen...</p>
        </div>
      ) : (
        <div className="calendar-wrapper">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={['month', 'week', 'day', 'agenda']}
            view={view}
            onView={setView}
            date={date}
            onNavigate={setDate}
            onSelectEvent={handleSelectEvent}
            components={{
              event: EventComponent
            }}
            eventPropGetter={(event) => ({
              className: `event-${event.type}`
            })}
            formats={{
              monthHeaderFormat: (date) => {
                if (timeMode === 'eorzea') {
                  // Vereinfachte Darstellung für Eorzea-Monate
                  const monthIndex = date.getMonth() % 12;
                  return eorzeaMonths[monthIndex] + ' ' + date.getFullYear();
                }
                return moment(date).format('MMMM YYYY');
              }
            }}
          />
        </div>
      )}
      
      {selectedEvent && (
        <motion.div 
          className="event-details-modal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <div className="modal-content">
            <button className="close-btn" onClick={() => setSelectedEvent(null)}>×</button>
            <h3>{selectedEvent.title}</h3>
            <div className="event-meta">
              <p className="event-date">
                <strong>Datum:</strong> {timeMode === 'earth' 
                  ? moment(selectedEvent.start).format('DD.MM.YYYY HH:mm') + ' - ' + moment(selectedEvent.end).format('HH:mm')
                  : selectedEvent.eorzeaDate
                }
              </p>
              <p className="event-location"><strong>Ort:</strong> {selectedEvent.location}</p>
            </div>
            <p className="event-description">{selectedEvent.description}</p>
            <div className="event-actions">
              <button className="btn btn-primary">Teilnehmen</button>
              <button className="btn btn-secondary">Zum Kalender hinzufügen</button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EventCalendar;
