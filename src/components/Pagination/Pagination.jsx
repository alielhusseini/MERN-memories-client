import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { getPosts } from "../../redux/actions/postsActions";
import useStyles from "./styles";

export default function Paginate({ page }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector(reducers => reducers.postsReducers)

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination 
      classes={{ ul: classes.ul }} 
      count={numberOfPages} page={Number(page) || 1} 
      variant="outlined" 
      color="primary"
      renderItem={item => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
}
