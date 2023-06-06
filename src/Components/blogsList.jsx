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
import { Typography } from '@mui/material';

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
      width: 500,
      sortable:false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking

          setBlogTitle(params.row.blogTitle);
          setBlogSubTitle(params.row.blogSubTitle);
          setBlogAuthor(params.row.blogAuthor);
          setBlogId(params.row.blogId);
      
          setOpenView(true);
  
        };

        const onDelClick = (e) => {
          setBlogTitle(params.row.blogTitle);
          setBlogSubTitle(params.row.blogSubTitle);
          setBlogAuthor(params.row.blogAuthor);
          setBlogId(params.row.id);

          setDelConfirmView(true);
        };
        
  
        return (
          <Stack spacing={2} direction="row">
            <Button onClick={onClick} color="info" variant="contained">View</Button>
            <Button color="success" variant="contained">Edit</Button>
            <Button onClick={onDelClick} color="error" variant="contained">Delete</Button>
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
  const [openView, setOpenView] = React.useState(false);
  const [delConfirmView, setDelConfirmView] = React.useState(false);
  const [blogs, setBlogs] = React.useState(rowsList);
  const [blogTitle, setBlogTitle] = React.useState('');
  const [blogSubTitle, setBlogSubTitle] = React.useState('');
  const [blogAuthor, setBlogAuthor] = React.useState('');
  const [blogId, setBlogId] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseView = () => {
    setOpenView(false);

    setBlogTitle('');
    setBlogSubTitle('');
    setBlogAuthor('');
    setBlogId('');

  }

  const handleClose = () => {
    setBlogTitle('');
    setBlogSubTitle('');
    setBlogAuthor('');
    setBlogId('');

    setOpen(false);
  };

  const handleDelClose = () => {
    setDelConfirmView(false);
  }

  const handleDelConfirm = () => {
    const newData = blogs?.filter((item) => item.id !== blogId)
    setBlogs(newData)
    setDelConfirmView(false);
  }

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
      <div style={{textAlign:'left'}}><Button onClick={handleClickOpen} variant="contained">+</Button></div>
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
          value={blogTitle}
        />
        <TextField
          autoFocus
          margin="dense"
          id="subtitle"
          label="Subtitle"
          type="text"
          fullWidth
          variant="standard"
          value={blogSubTitle}
        />
        <TextField
          autoFocus
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          value={blogAuthor}
        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' onClick={handleAdd}>Add</Button>
      </DialogActions>
    </Dialog>
    <Dialog open={openView} onClose={handleCloseView}>
      <DialogTitle>{blogTitle}</DialogTitle>
      <DialogContent>
        <Typography gutterBottom>
          {blogSubTitle}
        </Typography>
        <DialogContentText>
          By {blogAuthor}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleCloseView}>Close</Button>
      </DialogActions>
    </Dialog>
    <Dialog
        open={delConfirmView}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Deletion?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete blog ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelClose}>No</Button>
          <Button onClick={handleDelConfirm} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}