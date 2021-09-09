import { Button } from '@material-ui/core';
import React from 'react';
import { DataGrid } from '@material-ui/data-grid';



const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'l1',
      headerName: 'Lever 1',
      width: 130,
      editable: false,
    },
    {
      field: 'l2',
      headerName: 'Lever 2',
      width: 130,
      editable: false,
    },
    {
      field: 'l3',
      headerName: 'Lever 3',
      width: 130,
      editable: false,
    },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      editable: false,
    }
    
  ];

function Body({history,handleGamePlay}) {
    return <div className="Body">
    <Button onClick={handleGamePlay}  variant="contained" color="secondary">Play Game : $2</Button>
    <br/>
    <br/>
    <div style={{ height: 500, width: '100%' }}>

    <DataGrid
        rows={history}
        columns={columns}
        pageSize={7}
        rowsPerPageOptions={[7]}
        />
    </div>
    <div className="footer">
      Copyright 2021 &nbsp;&nbsp;&nbsp; Made with ❤️ By SHUBH PALAN 
    </div>
    
</div>;;
}

export default Body;