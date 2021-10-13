import React from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Alerts(){
  const resolveWithSomeData = new Promise(resolve => setTimeout(() => resolve("Subiendo comprobante"), 3000));
  const notify = () =>toast.promise(
      resolveWithSomeData,
      {
        pending: 'Promise is pending',
        success: {
          render({data}){
            return `Hello ${data}`
          },
          // other options
          icon: "🟢",
        },
        error: {
          render({data}){
            // When the promise reject, data will contains the error
            return <MyErrorComponent message={data.message} />
          }
        }
      }
  )

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