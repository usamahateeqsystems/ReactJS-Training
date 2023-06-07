import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup
    .string('Enter Title')
    .min(8, 'Title must be atleast 8 characters long')
    .required('Title is required'),
  subtitle: yup
    .string('Enter Subtitle')
    .min(8, 'Subtitle must be atleast 8 characters long')
    .required('Subtitle'),
  author: yup
    .string('Enter Author Name')
    .min(8, 'Author must be atleast 8 characters long')
    .required('Author'),
});

export default function Dashboard() {

  const formik = useFormik({
    initialValues: {
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAdd();
    },
  });

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
          setBlogId(params.row.id);
          setOpenView(true);
  
        };

        const onDelClick = (e) => {
          e.stopPropagation();
          setBlogTitle(params.row.blogTitle);
          setBlogSubTitle(params.row.blogSubTitle);
          setBlogAuthor(params.row.blogAuthor);
          setBlogId(params.row.id);

          setDelConfirmView(true);
        };

        const onEditClick = (e) => {
          e.preventDefault();
          setBlogTitle(params.row.blogTitle);
          setBlogSubTitle(params.row.blogSubTitle);
          setBlogAuthor(params.row.blogAuthor);
          setBlogId(params.row.id);
          setOpen(true);
      
        }

        return (
          <Stack spacing={2} direction="row">
            <Button onClick={onClick} color="info" variant="contained">View</Button>
            <Button onClick={onEditClick} color="success" variant="contained">Edit</Button>
            <Button onClick={onDelClick} color="error" variant="contained">Delete</Button>
          </Stack>
        );
      }
    },
  ];
  
  const [open, setOpen] = React.useState(false);
  const [openView, setOpenView] = React.useState(false);
  const [delConfirmView, setDelConfirmView] = React.useState(false);
  const [blogs, setBlogs] = React.useState([]);
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

  const handleAdd = () => {
      if (blogId === ''){
        const blogItem = {
          id: blogs.length + 1,
          blogTitle: title.value,
          blogSubTitle: subtitle.value,
          blogAuthor: author.value
        }
        setBlogs([...blogs, blogItem]);
      }
      else
      {
        const idx = blogs.findIndex(({ id }) => id === blogId);
        if (idx)
        {
          blogs[idx]['blogTitle'] = title.value;
          blogs[idx]['blogSubTitle'] = subtitle.value;
          blogs[idx]['blogAuthor'] = author.value;
        }
        setBlogs(blogs);
      }
      setBlogTitle('');
      setBlogSubTitle('');
      setBlogAuthor('');
      setBlogId('');
  
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
      <form onSubmit={formik.handleSubmit}>
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
          onChange={formik.handleChange}
          value={formik.values.title || blogTitle}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          autoFocus
          margin="dense"
          id="subtitle"
          label="Subtitle"
          type="text"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.subtitle || blogSubTitle}
          error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
          helperText={formik.touched.subtitle && formik.errors.subtitle}

        />
        <TextField
          autoFocus
          margin="dense"
          id="author"
          label="Author"
          type="text"
          fullWidth
          variant="standard"
          onChange={formik.handleChange}
          value={formik.values.author || blogAuthor}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}

        />
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
        <Button variant='contained' type="submit">{
          blogId && (<div>Update</div>)
        }{
        !blogId && (<div>Add</div>)
        }</Button>
      </DialogActions>
      </form>
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