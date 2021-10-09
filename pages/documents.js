import React, { useState, useEffect } from 'react'
import { useS3Upload } from 'next-s3-upload'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

export default function Documents () {
  // nos traemos el uploader de s3
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()
  const [file, setFile] = useState('')
  const [docs, setDocs] = useState([])
  const [visible, setVisible] = useState(false)

    	// agregamos el manejador de la subida del archivo
  const handleFileChange = async file => {
    const { url } = await uploadToS3(file)
    console.log(url)
    setFile(url)
    setDocs([...docs, { uri: url }])
	  }

  return (
    <>
      <div>
        <FileInput onChange={handleFileChange} className='bg-red-500' />
        <button onClick={openFileDialog}>Upload file</button>
      </div>
      <button onClick={() => setVisible(true)}>mostrar</button>
      {visible && (
        <div>
          <DocViewer
            pluginRenderers={DocViewerRenderers}
            documents={docs}
          />
          <button onClick={() => setVisible(false)}>X</button>
        </div>)}
    </>
  )
}
