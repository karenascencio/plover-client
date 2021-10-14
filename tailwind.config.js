module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'plover-blue': '#274C77',
        'light-blue': '#EDF5FC',
        'login-blue': '#0A69B0',
        'lighter-gray': '#C4C4C4',
        'darker-gray': '#919390',
        'input-gray': '#FBFBFB',
        'input-hover': '#DDECFF'
      },
      spacing: {
        '060': '3.75rem',
        '050': '3.125rem',
        '080': '2.125rem',
        '700px': '700px',
        '100px': '100px',
        '110px': '110px',
        '95px': '95px',
        '80px': '80px',
        '65vw': '65vw',
        '2.5vw': '2.5vw',
        '30vw': '30vw',
        '70vw': '70vw',
        '100vw': '100vw',
        '100vh': '100vh',
        '140px': '140px',
        '90px': '90px',
        '23%': '23%',
        '8-5': '2.125rem',
        '034': '8.125rem',
        '30px': '1.875rem',
        '60vw': '60vw',
        '90vw': '90vw',
        '18rem': '18rem',
        '230px': '230px'
      },
      fontSize: {
        '14px': '14px',
        '10px': '10px',
        '8-5': '2.125rem',
        '034': '8.125rem'
      },
      fontFamily: {
        lato: "'Lato', sans-serif"
      },
      margin: {
        '5px': '0.313rem',
        '10px': '0.625rem',
        '50px': '3.125rem',
        '70px': '4.37rem',
        '90px': '5.62rem',
        '133px': '8.313rem',
        '166px': '10.375rem'
      },
      width: {
        '15px': '0.938rem',
        '30px': '1.875rem',
        '41px': '2.56rem',
        '92px': '5.75rem',
        '100px': '6.25rem',
        '110px': '6.87rem',
        '133px': '8.313rem',
        '180px': '11.25rem',
        '250px': '15.62rem',
        '280px': '17.5rem',
        '292px': '18.25rem',
        '392px': '24.5rem',
        '408px': '25.5rem',
        '539px': '33.68rem',
        '676px': '42.188rem'
      },
      height: {
        '15px': '0.938rem',
        '30px': '1.875rem',
        '41px': '2.56rem',
        '70px': '4.37rem',
        '90px': '5.62rem',
        '676px': '42.188rem',
        '100%': '100%'
      },
      maxWidth: {
        '18rem': '18rem',
        '26rem': '26rem',
        '10rem': '10rem',
        '230px': '230px'
      },
      minWidth: {
        '25%': '25%',
        '30%': '30%',
        '100px': '100px'
      }
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      full: '100%',
      200: '200px'
    }
  },
  variants: {
    extend: {
      fontWeight: ['hover'],
      backgroundColor: ['active']
    }
  },
  plugins: [
    require('@tailwindcss/custom-forms')
  ]
}
