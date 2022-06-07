
function EditURL({ URLs, handleEditURL }) {
  return (
    <form className='URLs' onSubmit={handleEditURL}>
        <h4>Task URLs</h4>
    {URLs.map((URL,index) =>
      <label key={index} >{URL.description}:<input type='text' id={URL.description} className='URL-input' placeholder={URL.address}/></label> )}
      <input className='btn' type="submit" value="Save"></input>  
      </form>
  )
}

export default EditURL