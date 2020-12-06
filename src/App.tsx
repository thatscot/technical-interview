import React, { useState } from "react";
import "./app.css";

function App(props: any) {
  const [state, setState] = useState(props.initialState);

  const [getPostsError, setGetPostsError] = useState<Boolean>(false);
  const [getPostError, setGetPostError] = useState<Boolean>(false);

  const parseResponse = (response: any) => {
    try {
      return response.json();
    } catch (error) {
      return null;
    }
  };

  const getPosts = async (): Promise<any> => {
    try {
      return parseResponse(
        await fetch("https://jsonplaceholder.typicode.com/posts")
      );
    } catch (error) {
      return null;
    }
  };

  const getPost = async (postId: number): Promise<any> => {
    try {
      parseResponse(
        await fetch("https://jsonplaceholder.typicode.com/posts/" + postId)
      );
    } catch (error) {
      return null;
    }
  };

  const handlePostsClick = async () => {
    const posts: {
      id: number;
      title: string;
      body: string;
      userID: number;
    }[] = await getPosts();

    if (posts) {
      setState({ ...state, posts: posts });
    } else {
      setGetPostsError(true);
    }
  };

  const handleViewClick = async (postId: number) => {
    const post: {
      id: number;
      title: string;
      body: string;
      userID: number;
    } = await getPost(postId);

    if (post) {
      setState({ ...state, view: post });
    } else {
      setGetPostError(true);
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="heading">{state.heading}</h1>
        <button className="load-posts" onClick={() => handlePostsClick()}>
          Fetch posts
        </button>
      </div>
      <div className="content">
        <div>
          <div className="content-container">
            <div>
              {getPostsError && <h1> There was an issue getting posts</h1>}
              {state.posts && (
                <ul className="posts">
                  {state.posts.map((post: any, index: number) => {
                    return (
                      <div role="listitem" className="post-card" key={index}>
                        <h2 className="post-title">{post.title}</h2>
                        <button
                          className="show-post"
                          onClick={() => handleViewClick(post.id)}
                        >
                          View
                        </button>
                      </div>
                    );
                  })}
                </ul>
              )}
            </div>
            <div className="post-container">
              {getPostError && <h1> There was an issue getting this post.</h1>}
              {state.view && (
                <article className="viewer">
                  <h2 className="viewer-title">{state.view.title}</h2>
                  <p className="viewer-content">{state.view.body}</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
