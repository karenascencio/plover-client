import React from 'react'
import { useS3Upload } from 'next-s3-upload'
//import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import { useEffect,useState} from 'react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {patchPayment} from '../../lib/api'

export default function VoucherButton(props) {
		const {payment,handleSeeFile,rol} = props

		const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

		//aqui agregaremos el archivo
		const [file, setFile] = useState(payment.receipt)

		//estado para modificar lo que muestra el boton
		const [hasVoucher,setVoucher] = useState(!!payment.receipt)

		//una vez que tengas la url de la imagen hacemos la peticion de patch
		//useEffect(() => {
			//async function uploadPicture(){
				//await patchPayment(payment._id, { receipt: file })

		// const notify = () => toast.promise(
		// 	patchPayment(payment._id, { receipt: file }),
		// 	{
		// 	  pending: 'Subiendo comprobante',
		// 	  success: {
		// 		render({data}){
		// 		  return `Comprobante agregado exitosamente`
		// 		},
		// 		// other options
		// 		icon: "🟢",
		// 	  },
		// 	  error: {
		// 		render({data}){
		// 		  // When the promise reject, data will contains the error
		// 		  return `Error al agregar comprobante`
		// 		}
		// 	  }
		// 	}
		// )
		// notify()
		// 	//uploadPicture()
		// }, [file])



		const notifyPatch = (url) => toast.promise(
			patchPayment(payment._id, { receipt: url }),
			{
			  pending: 'Subiendo comprobante',
			  success: {
				render({data}){
				  return `Comprobante agregado exitosamente`
				},
				// other options
				icon: "🟢",
			  },
			  error: {
				render({data}){
				  // When the promise reject, data will contains the error
				  return `Error al agregar comprobante`
				}
			  }
			}
		)

		const handleFileChange = async file => {
			console.log('estamos tratando de subir una imagen')
			const { url } = await uploadToS3(file)
			console.log(url)
			notifyPatch(url)
			setFile(url)
			setVoucher(true)
		}



    return (
				<>
					{!hasVoucher && (
        		<div className=''>
        			<FileInput onChange={handleFileChange} />
        			<button
					disabled={rol=='paciente'?true:false}
          			id={payment._id}
          			onClick={openFileDialog}
          			className={`text-sm p-1 md:px-5 text-white ${rol=='paciente'?'bg-lighter-gray':'bg-plover-blue'}  rounded my-1`}
        				>Agregar
        			</button>
      			</div>)
					}
					{hasVoucher && (
						<div>
							<a
          			className='text-sm p-1 md:px-5 text-white bg-plover-blue  rounded my-1'
          			href={file}
								download
								target='_blank'
								rel="noreferrer"
        				>Mostrar
      				</a>
						</div> )
					}
				</>
				
    )
}
