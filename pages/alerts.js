import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alerts(){
  const notify = () => toast.success('Pago agregado', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });

  return (
      <>
    <div>
      <button onClick={notify}>Notify!</button>
    </div>
    <ToastContainer
      toastStyle={{backgroundColor:'#EDF5FC'}}
position="top-right"
autoClose={5000}
hideProgressBar
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
</>
  );
}