export const customStyleModal = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    border: '1px solid #CCC',
    background: '#FFFFFF',
    overflow: 'auto',
    borderRadius: '10px',
  }
}

export const customStylesSelect = {
  menuList: () => ({
    backgroundColor: '#DCDCDC',
    color: 'black',
    padding: 20,
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: '#DCDCDC',
    border: '0px',
  }),
  dropdownIndicator: () => ({
    color: 'black',
  })
}


export const customStyleModalDataGathering = {	
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    border: '1px solid #CCC',
    background: '#FFFFFF',
    overflow: 'auto',
    borderRadius: '10px',
  }
}

export const customStylesSelectWhite = {
  menuList: () => ({
    backgroundColor: 'white',
    color: 'black',
    padding: 20,
    fontWeight: '300'
  }),
  control: (styles: any) => ({
    ...styles,
    backgroundColor: 'white',
    border: '0px',
    fontWeight: '300'
  }),
  dropdownIndicator: () => ({
    color: 'black',
  })
}