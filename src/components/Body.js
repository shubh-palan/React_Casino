import { Button } from '@material-ui/core';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';



const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'firstName',
      headerName: 'First name',
      width: 150,
      editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      editable: true,
    },
  ];

function Body({rows,handleGamePlay}) {
    return <div className="Body">
    <Button onClick={handleGamePlay}  variant="contained" color="secondary">Play Games</Button>
    <div style={{ height: 500, width: '100%' }}>

    <DataGrid
        rows={[]}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        />
    </div>
    
</div>;;
}

export default Body;