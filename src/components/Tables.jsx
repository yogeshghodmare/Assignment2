import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'

const Tables = () => {
    const [search,setSearch]=useState("")
    const [datapart,setdatapart]=useState([]);
    const [filtereddatapart,setFlitereddatapart]=useState([])



    const [selectedRows, setSelectedRows] = useState(false);
    const [toggledClearRows, setToggleClearRows] = useState(false);

  const handleChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  // Toggle the state so React Data Table changes to clearSelectedRows are triggered
  const handleClearRows = () => {
    setToggleClearRows(!toggledClearRows);
  }


    const getdatapart=async()=>
    {
      try {
        const response=await axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
        setdatapart(response.data)
        setFlitereddatapart(response.data)
      } catch (error) {
        console.log(error)
        
      }
    }
  
    const columns=[
      
      {
        name:"Name",
        selector: (row)=>row.name,
        sortable:true
      },
      {
        name:"Email",
        selector: (row)=>row.email,
        sortable:true
      },
      {
        name:"Role",
        selector: (row)=>row.role,
        sortable:true
      },
      {
        name:"Action",
        selector: (row)=>(
            <div>
            <button className='Edit_class' onClick={()=>{alert('Update')}}>Edit </button>
            &nbsp;
            <button className='Delete_class' onClick={handleDelete}> Delete</button>
            </div>
        )
      }
    ]
    
    // function handleSubmit(id)
    // {
    //     const conf=window.confirm("Do you want to delete?")
    //     if(conf)
    //     {
    //         axios.delete('http://localhost:3001/users'+id)
    //         .then(res=>{
    //             alert('record delete')
    //         }).catch(err=>console.log(err))
            
    //     }
    // }

    const handleDelete = () => {
        // Filter out the selected rows from the data
        const updatedData = datapart.filter((row) => !selectedRows.includes(row));
    
        // Update the state with the new data
        setdatapart(updatedData);
    
        // Clear the selected rows
        setSelectedRows([]);
      };

    useEffect(()=>{
      getdatapart();
    },[])

    useEffect(()=>{
        const result=datapart.filter((dat)=>{
            return dat.name.toLowerCase().match(search.toLowerCase())
        })
        setFlitereddatapart(result)
    },[search])

  return (
    <DataTable 
    columns={columns} 
    data={filtereddatapart} 
    pagination 
    selectableRows
    onSelectedRowsChange={handleChange}
    
    selectableRowsHighlight
    highlightOnHover
    subHeader
    subHeaderComponent={
        <input 
            type='text'
            placeholder='Search'
            className='Search'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            />
    }/>
    
  )
}

export default Tables