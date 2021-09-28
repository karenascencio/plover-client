export default function RadioButtons (props) {
    const { textLabel,options,setFieldValue,handleBlur,textName,textValue} = props
    return (
      <div className={' my-5 flex flex-col flex-auto '}>
        <p className='text-sm text-plover-blue mb-2.5'>{textLabel}</p>
        <div className='grid grid-cols-3 gap-x-10 w-1/2'>
        {options.map((item,key)=>(
        <label key={key} className="inline-flex items-center">
         <input 
            type="radio" 
            className="form-radio text-plover-blue border border-plover-blue" 
            name={textName} 
            value={item} 
            checked={textValue===item}
            onChange={()=>setFieldValue(textName,item)}
            />
        <span className="ml-2 text-sm text-plover-blue">{item}</span>
        </label>
        ))
        }
        </div>
    </div>
    )
  }