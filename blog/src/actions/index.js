import _ from "lodash";
import jsonPlacerholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () =>
  async (dispatch, getState) => {
    await dispatch(fetchPosts());

    _.chain(getState().posts)
      .map("userId")
      .uniq()
      .forEach((id) => dispatch(fetchUser(id)))
      .value();
  };

export const fetchPosts = () =>
  async (dispatch) => {
    const response = await jsonPlacerholder.get("/posts");

    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };

export const fetchUser = (id) =>
  async (dispatch) => {
    const response = await jsonPlacerholder.get(`/users/${id}`);

    dispatch({ type: "FETCH_USER", payload: response.data });
  };
