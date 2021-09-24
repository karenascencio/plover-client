module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  //agregamos mas cosas a tailwind
  theme: {
    extend: {
      colors: {
        'plover-blue': '#274C77',
        'light-blue': '#EDF5FC',
        'lighter-gray': '#C4C4C4',
        'darker-gray': '#919390',
        'input-gray': '#FBFBFB'
      },
      spacing: {
        '060': '3.75rem',
        '050': '3.125rem',
        '110px': '110px',
        '100px': '100px',
        '95px': '95px',
        '65vw': '65vw',
        '2.5vw': '2.5vw',
        '30vw': '30vw',
        '100vw': '100vw',
        '140px': '140px',
        '90px': '90px',
        '23%': '23%',
        '8-5': '2.125rem',
        '034': '8.125rem'
      },
      fontSize: {
        '14px': '14px',
        '10px': '10px',
        '8-5': '2.125rem',
        '034': '8.125rem'
      },
      fontFamily: {
        lato: "'Lato', sans-serif"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
