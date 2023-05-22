import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Card, CardContent, CardMedia, Button, Typography } from "@mui/material";
import { useAuthorContext } from "../context/AuthorContext";
import Swal from "sweetalert2";
import { deleteAuthorByID, getAuthorByID } from "../api/authorrequest";

function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [authors, setAuthors] = useAuthorContext();
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const navigate=useNavigate();

  useEffect(() => {
    getAuthorByID(id).then((res) => {
      setAuthor(res);
    });
  }, [id]);

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
  const handleEditAuthor = (authorId) => {
    navigate(`/authors/edit/${authorId}`);
  };

  if (!author) {
    return <Typography>Loading...</Typography>;
  }

  const authorNameStyle = {
    marginBottom: "7px",
    color: author.isDead ? "red" : "black",
  };

  return (
    <div style={{ width: "80%", margin: "50px auto" }}>
      <Card variant="outlined">
        <CardMedia
          component="img"
          alt={author.name}
          image={author.imageUrl}
          title={author.name}
          style={{objectFit:"cover",objectPosition:"top center"}}
        />
        <CardContent style={{ display: "flex", justifyContent: "center", padding: "10px",flexDirection:"column",alignItems:'center'}}>
          <Typography gutterBottom variant="h5" component="div">
            <span style={authorNameStyle}>{author.name}</span>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {author.genre}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          {currentYear - author.birthyear}
          </Typography>
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center", padding: "10px",flexDirection:"column",alignItems:'center'}}>
          <Button variant="contained" style={{marginBottom:"20px",width:"30%"}} color="primary"  to={`/edit-author/${author._id}`}  onClick={() => handleEditAuthor(author._id)}>
                        Edit
          </Button>
          <Button onClick={() => handleDelete(author._id)} style={{width:"30%",}} variant="contained" color="error">
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default AuthorDetail;


