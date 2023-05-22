import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAuthorByID, editAuthorByID } from "../api/authorrequest";
import { Button, TextField, Checkbox} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function EditAuthor() {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialValues = {
    name: "",
    birthyear: "",
    imageUrl: "",
    isDead: false,
    isMale: true,
    genre: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    birthyear: Yup.number()
      .positive("Birth year must be a positive number")
      .integer("Birth year must be an integer")
      .required("Birth year is required"),
    imageUrl: Yup.string().url("Image URL must be a valid URL"),
    genre: Yup.string().required("Genre is required"),
    isDead: Yup.boolean().required("Please specify if the author is deceased"),
    isMale: Yup.boolean().required("Please specify the author's gender"),
  });

  useEffect(() => {
    getAuthorByID(id).then((res) => {
      initialValues.name = res.name;
      initialValues.birthyear = res.birthyear;
      initialValues.imageUrl = res.imageUrl;
      initialValues.isDead = res.isDead;
      initialValues.isMale = res.isMale;
      initialValues.genre = res.genre;
    });
  }, [id, initialValues]);

  function handleSubmit(values) {
    editAuthorByID(id, values)
      .then(() => {
        navigate(`/authors/${id}`);
      })
      .catch((error) => {
        console.error("Error updating author:", error);
      });
  }

  return (
    <div style={{display:"flex",justifyContent:"center",marginTop:"20px"}}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div style={{marginBottom:"20px"}}>
            <Field name="name" as={TextField} label="Name" required />
            <ErrorMessage name="name" component="div" />
          </div>
          <div  style={{marginBottom:"20px"}}>
            <Field
              name="birthyear"
              as={TextField}
              label="Birth Year"
              required
            />
            <ErrorMessage name="birthyear" component="div" />
          </div>
          <div style={{marginBottom:"20px"}}>
            <Field name="imageUrl" as={TextField} label="Image URL" />
            <ErrorMessage name="imageUrl" component="div"  />
          </div>
          <div style={{marginBottom:"20px"}}>
            <Field name="isDead" type="checkbox" as={Checkbox} />
            <label htmlFor="isDead">Is Dead</label>
            <ErrorMessage name="isDead" component="div" />
          </div>
          <div  style={{marginBottom:"20px"}}>
            <Field name="isMale" type="checkbox" as={Checkbox} />
            <label htmlFor="isMale">Is Male</label>
            <ErrorMessage name="isMale" component="div" />
          </div>
          <div style={{marginBottom:"20px"}}>
            <Field name="genre" as={TextField} label="Genre" required />
            <ErrorMessage name="genre" component="div" />
          </div>
          <Button type="submit" variant="contained" color="primary" style={{margin:"0 auto",display:"flex"}}>
            Update
          </Button>
        </Form>
      </Formik>
    </div>
  );
}

export default EditAuthor;  