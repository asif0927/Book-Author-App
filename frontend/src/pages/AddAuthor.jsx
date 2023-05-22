import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { postAuthors } from '../api/authorrequest';
import { useNavigate } from 'react-router-dom';
import { TextField, Checkbox, Button, FormControlLabel, Typography, Box } from '@mui/material';

const AddAuthor = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    name: '',
    birthyear: '',
    imageUrl: '',
    isDead: false,
    isMale: true,
    genre: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    birthyear: Yup.number()
      .positive('Birth year must be a positive number')
      .integer('Birth year must be an integer')
      .required('Birth year is required'),
    imageUrl: Yup.string().url('Image URL must be a valid URL'),
    genre: Yup.string().required('Genre is required'),
    isDead: Yup.boolean().required('Please specify if the author is deceased'),
    isMale: Yup.boolean().required("Please specify the author's gender"),
  });

  const onSubmit = async (values) => {
    try {
      await postAuthors(values);
      setSuccess(true);
      navigate('/authors');
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
  });

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',marginTop:"20px"}}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 3}}>
          <TextField
            id="name"
            name="name"
            label="Name"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <TextField
            id="birthyear"
            name="birthyear"
            label="Birth Year"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthyear}
            error={formik.touched.birthyear && formik.errors.birthyear}
            helperText={formik.touched.birthyear && formik.errors.birthyear}
          />
          <TextField
            id="genre"
            name="genre"
            label="Genre"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.genre}
            error={formik.touched.genre && formik.errors.genre}
            helperText={formik.touched.genre && formik.errors.genre}
          />
          <FormControlLabel
            control={
           <Checkbox
           id="isDead"
           name="isDead"
           checked={formik.values.isDead}
           onChange={formik.handleChange}
           onBlur={formik.handleBlur}
          />
          }
          label="Is Dead"
          error={formik.touched.isDead && Boolean(formik.errors.isDead)}
           helperText={formik.touched.isDead && formik.errors.isDead}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="isMale"
                name="isMale"
                checked={formik.values.isMale}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            }
            label="Is Male"
          />
          <TextField
            id="imageUrl"
            name="imageUrl"
            label="Image URL"
            variant="outlined"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
            error={formik.touched.imageUrl && formik.errors.imageUrl}
            helperText={formik.touched.imageUrl && formik.errors.imageUrl}
          />
          <Button variant="contained" color="primary" type="submit">
            Add Author
          </Button>
        </Box>
      </form>
      {success && <Typography variant="body1">Author added successfully!</Typography>}
    </div>
  );
};

export default AddAuthor;
