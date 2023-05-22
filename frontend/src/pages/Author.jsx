import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, TextField, Select, MenuItem } from "@mui/material";
import { Card } from "antd";
import { useAuthorContext } from "../context/AuthorContext";
import { Link,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteAuthorByID, getAllAuthors } from "../api/authorrequest";

function Author() {
  const [authors, setAuthors] = useAuthorContext();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const [genderFilter, setGenderFilter] = useState("all");
  const navigate=useNavigate();

  useEffect(() => {
    getAllAuthors().then((res) => {
      setAuthors(res);
    });
  }, [setAuthors]);

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAuthorByID(id);
        setAuthors(authors.filter((x) => x._id !== id));
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  function handleGenderFilterChange(event) {
    setGenderFilter(event.target.value);
  }

  const handleEditAuthor = (authorId) => {
    navigate(`/authors/edit/${authorId}`);
  };


  const filteredAuthors = authors.filter((author) => {
    if (genderFilter === "all") {
      return true;
    } else if (genderFilter === "male") {
      return author.isMale;
    } else if (genderFilter === "female") {
      return !author.isMale;
    }
    return false;
  });

  return (
    <>
      <div style={{ width: "80%", margin: "50px auto" }}>
        <div style={{ display: "flex", alignItems: "baseline" ,justifyContent:"center"}}>
          <TextField
            onChange={(e) => {
              getAllAuthors(e.target.value).then((res) => {
                setAuthors(res);
              });
            }}
            style={{ marginBottom: "15px" }}
            id="outlined-basic"
            label="Search Artist"
            variant="outlined"
          />
          <Select value={genderFilter} onChange={handleGenderFilterChange} style={{ marginLeft: "15px" }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </div>
        <Grid container spacing={2}>
          {filteredAuthors.map((author) => {
            const authorNameStyle = {
              marginBottom: "7px",
              color: author.isDead ? "red" : "black",
            };

            return (
              <Grid key={author._id} item lg={3} md={6} sm={12}>
                <Card
                  hoverable
                  cover={
                    <Link to={`/authors/${author._id}`}>
                      <img
                        style={{
                          height: "300px",
                          width: "100%",
                          objectFit: "cover",
                          objectPosition: "top center",
                        }}
                        alt="example"
                        src={author.imageUrl}
                      />
                    </Link>
                  }
                >
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <Typography style={{ marginBottom: "7px" }}>
                        <Link to={`/authors/${author._id}`} style={authorNameStyle}>
                          {author.name}
                        </Link>
                      </Typography>
                      <Typography>{currentYear - author.birthyear}</Typography>
                      <Typography>{author.genre}</Typography>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",marginLeft:"20px"}}>
                      <Button variant="contained" 
                      style={{marginBottom:"20px",width:"100%"}}
                      onClick={() => handleEditAuthor(author._id)}
                       color="primary">
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(author._id)}
                        variant="contained"
                        color="error"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </>
  );
}

export default Author;




