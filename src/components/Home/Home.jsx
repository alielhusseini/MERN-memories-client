import React, { useState, useEffect } from "react";
import Form from "../Form/Form.jsx";
import Posts from "../Posts/Posts.jsx";
import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../redux/actions/postsActions";
import Paginate from "../Pagination/Pagination.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import useStyles from "./styles";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from "@material-ui/core"

function useQuery() {
  // we made the URLSearchParams in a use function to use it as a hook
  return new URLSearchParams(useLocation().search); // to know on which page we are currently on & what search term are we looking for
}

export default function Home() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get("page") || 1; // reads our URL & see if we have a page parameter in there if not we are assigning 1 as our page
  const searchQuery = query.get("searchQuery");

  const handleKeyPress = e => {
    if (e.keyCode == 13) searchPost();
  };

  const handleAdd = newTag => setTags(prevTags => [...prevTags, newTag]);

  const handleDelete = tagToDelete => setTags(prevTags => [...prevTags].filter(tag => tag !== tagToDelete)); // no need for keys

  const searchPost = () => {
    if (searchTerm.trim() !== "" || tags.length > 0) {
      dispatch(getPostsBySearch({ search: searchTerm, tags: tags.join(",") })); // can't pass an array through URL parameters

      navigate(`/posts/search?seachQuery=${searchTerm || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipInput
                styles={{ margin: "10px 0" }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label="Search Tags"
                variant="outlined"
              />
              <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}
