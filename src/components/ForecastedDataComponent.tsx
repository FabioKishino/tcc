import Modal from 'react-modal'

import '../styles/components/forecastedDataComponent.css';
import { ForecastedData } from '../@types';

Modal.setAppElement('#root')

export function ForecastedDataComponent({ date, ingredients }: ForecastedData) {

  function formatDate() {
    const dateArray = date.split('-');
    const day = dateArray[0];
    const month = dateArray[1];
    const year = dateArray[2];
    return `${day}/${month}/${year}`;
  }

  return (
    <li className='list-group-item'>
      <h2 style={{ display: "flex", justifyContent: "center" }}>{formatDate()}</h2>
      {ingredients.map((i, index) => {
        return (
          <div key={index} className="data-forecast-ingredient">
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{i.name}</h3>
              <h3>{i.amount} {i.unit}</h3>
            </div>
            <hr
              style={{
                height: '1px',
                margin: "2px 0px"
              }}
            />
          </div>
        )
      })}

    </li>
  )
}