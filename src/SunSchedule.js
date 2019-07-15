import React, { useState, useEffect } from 'react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './styles.css';

const locations = require('./locations.json');
const apiUrl = 'https://api.sunrise-sunset.org/json?';

export default function SunSchedule() {
  const [date, setDate] = useState(new Date());
  const [sunShedule, setSunSchedule] = useState([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const sunScheduleDate = date.toISOString().substring(0, 10);
    async function getSunSchedule() {
      setloading(true);
      const sunScheduleData = locations.map(async item => {
        try {
          const response = await fetch(
            `${apiUrl}lat=${item.lat}&lng=${item.lng}&date=${sunScheduleDate}`
          );
          const data = await response.json();
          item.sunrise = data.results.sunrise;
          item.sunset = data.results.sunset;
          return item;
        } catch (error) {
          return console.error(error);
        }
      });
      await Promise.all(sunScheduleData)
        .then(values => {
          setSunSchedule(values);
          setloading(false);
        })
        .catch(error => console.error(error));
    }
    getSunSchedule();
  }, [date]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className='Instructions'>
      <div>
        <h1>Please select the date</h1>
        <div>
          <DatePicker
            aria-label='date'
            selected={date}
            onChange={e => setDate(e)}
          />
          <dl>
            {sunShedule.map(listitem => (
              <React.Fragment key={listitem.lat}>
                <dt>{listitem.name}</dt>
                <dd>
                  <span role='img' aria-label='sunrise'>
                    🌅
                  </span>
                  {listitem.sunrise}
                </dd>
                <dd>
                  <span role='img' aria-label='sunset'>
                    🌄
                  </span>
                  {listitem.sunset}
                </dd>
              </React.Fragment>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
