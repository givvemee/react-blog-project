import React, { useEffect } from "react";
import qs from "qs";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import { listPosts } from "../../modules/posts";

const PostListContainer = ({ location, match }) => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ posts, loading, user }) => ({
      posts: posts.posts,
      error: posts.error,
      loading: loading['posts/LIST_POSTS'],
      user: user.user,
    }),
  );

  useEffect(() => {
    const { username } = match.params;
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, location.search]);

  return (
    <PostList
      loading={loading}
      error={error}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default withRouter(PostListContainer);

// import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import qs from 'qs'
// import { listPosts } from '../../lib/api/posts';
// import PostList from '../../components/posts/PostList';
// import { withRouter } from 'react-router';

// const PostListContainer = ({location, match}) => {
//     const dispatch = useDispatch()
//     const {posts, error, loading, user} = useSelector(({posts, loading, user}) => ({
//         posts: posts.posts,
//         error: posts.error,
//         loading: loading['posts/LIST_POST'],
//         user: user.user
//     }),
//     )

//     useEffect(() => {
//         const {username} = match.parse;
//         const {tag, page} = qs.parse(location.search, {
//             ignoreQueryPrefix: true
//         })
//         dispatch(listPosts({username, page, tag}))
//     }, [dispatch, location.search])

  

//     return (
//         <PostList loading={loading} error={error} posts={posts} showWriteButton={user}/>
//     );
// };

// export default withRouter(PostListContainer);