import * as React from 'react';
import { DataGrid, GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function BlogsList() {

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Blog ID', width: 70 },
    { field: 'blogTitle', headerName: 'Title', width: 200 },
    { field: 'blogSubTitle', headerName: 'Sub Title', width: 200 },
    {
      field: 'blogAuthor',
      headerName: 'Author',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 300,
      sortable:false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
  
          const api: GridApi = params.api;
          const thisRow: Record<string, GridCellValue> = {};
  
          api
            .getAllColumns()
            .filter((c) => c.field !== "__check__" && !!c)
            .forEach(
              (c) => (thisRow[c.field] = params.getValue(params.id, c.field))
            );
  
          return alert(JSON.stringify(thisRow, null, 4));
        };
  
        return (
          <Stack spacing={2} direction="row">
            <Button onClick={onClick} variant="contained">View</Button>
            <Button onClick={onClick} variant="contained">Edit</Button>
            <Button onClick={onClick} variant="contained">Delete</Button>  
          </Stack>
        );
      }
    },
  ];
  
  const rowsList = [
    { id:1, blogTitle: 'React Training', blogSubTitle: 'Day 1', blogAuthor: "Wayne Rooney" },
    { id:2, blogTitle: 'React Training', blogSubTitle: 'Day 2', blogAuthor: "Michael Owen" },
    { id:3, blogTitle: 'React Training', blogSubTitle: 'Day 3', blogAuthor: "Robin Van Percie" },
  ];

  const [open, setOpen] = React.useState(false);
  const [blogs, setBlogs] = React.useState(rowsList);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const blogItem = {
      id: blogs.length + 1,
      blogTitle: title.value,
      blogSubTitle: subtitle.value,
      blogAuthor: author.value
    }
    setBlogs([...blogs, blogItem]);
    setOpen(false);
    return true;
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div style={{textAlign:'left'}}><Button onClick={handleClickOpen} variant="outlined">+</Button></div>
      <DataGrid
        rows={blogs}
        columns={columns}
      />
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add Blog</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter the following details for a blog.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="subtitle"
          label="Subtitle"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
}