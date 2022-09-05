import { useState } from 'react'

import Select from 'react-select';
import Modal from 'react-modal'

import { customStylesSelectWhite } from '../@types/customStyles';
import { Trash } from 'phosphor-react'
import '../styles/components/dataGatheringComponet.css';

Modal.setAppElement('#root')

export function DataGatheringComponent () {

  const [ingredientsOptions, setIngredientsOptions] = useState([ { value: '1', label: 'Salmão' }, { value: '2', label: 'Atum'} ]);

  return (
    <div id="data-gathering-component-page">
      <div className="data-gathering-component">
        <div className="data-gathering-component-content">
          <div className="data-gathering-component-ingredient">
            <label>Ingrediente</label>
            <Select 
              styles={customStylesSelectWhite} 
              placeholder="Selecionar ingrediente"
              options={ingredientsOptions}
              isSearchable={false}
            />
          </div>

          <div className="data-gathering-component-input">
            <label>Quantidade inicial (kg)</label>
            <input type="number" min="0" placeholder="Digite a quantidade inicial"/>
          </div>

          <div className="data-gathering-component-input">
            <label>Quantidade final (kg)</label>
            <input type="number" min="0" placeholder="Digite a quantidade final"/>
          </div>
        </div>

        <button className="data-gathering-component-buttons"> 
          <Trash size={64} weight="fill" />
        </button>
      </div>
    </div> 
  )
}