import React from 'react'
import { useS3Upload } from 'next-s3-upload'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'
import { useEffect,useState} from 'react'
import api from '../../lib/api'

export default function VoucherButton(props) {
		const {payment,handleSeeFile} = props

		const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

		//aqui agregaremos el archivo
		const [file, setFile] = useState(payment.receipt)

		//estado para modificar lo que muestra el boton
		const [hasVoucher,setVoucher] = useState(!!payment.receipt)

		//una vez que tengas la url de la imagen hacemos la peticion de patch
		useEffect(async () => {
			await api.patchPayment(payment._id, { receipt: file })
			
		}, [file])

		const handleFileChange = async file => {
			console.log('estamos tratando de subir una imagen')
			const { url } = await uploadToS3(file)
			console.log(url)
			setFile(url)
			setVoucher(true)
		}


    return (
				<>
					{!hasVoucher  && (
        		<div className=''>
        			<FileInput onChange={handleFileChange} />
        			<button
          			id={payment._id}
          			onClick={openFileDialog}
          			className='p-1 px-5 text-white bg-plover-blue  rounded my-1'
        				>Agregar
        			</button>
      			</div>)
					}
					{hasVoucher && (
						<div>
							<button
          			className='p-1 px-5 text-white bg-plover-blue  rounded my-1'
          			onClick={()=>handleSeeFile(file)}
        				>mostrar
      				</button>
						</div> )
					}
				</>
    )
}
