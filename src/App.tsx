import React, { useState } from 'react';

function App(props: any) {

  const [state, setState] = useState(props.initialState);

  const getPosts = (cb: any) => {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then((response) => response.json())
    .then((json) => {
      const result:{id: number, title: string, body: string, userID: number}[] = [];
      
      json.forEach((record:{id: number, title: string, body: string, userID: number}) => result.push(record));

      cb(result);
    })
  }

  return (
    <div className="App">
      <h1 className="heading">
        {state.heading}
      </h1>
      <div className="content">
        <button className="load-posts" onClick={() => getPosts((values: any) => {
          var update = {
            posts: state.posts,
            heading: state.heading,
            view: state.view,
          };

          update.posts = values;

          setState(update);
        })}>Fetch posts</button>
        <ul className="posts">
          {state.posts.map((post: any, index: number) => {
            return (<div role="listitem" className="post-card" key={index}>
              <h2 className="post-title">
                {post.title}
              </h2>
              <button className="show-post" onClick={() => {
                  fetch('https://jsonplaceholder.typicode.com/posts/' + post.id)
                  .then(response => response.json())
                  .then(json => {
                    var updateView = {
                      posts: state.posts,
                      heading: state.heading,
                      view: state.view,
                    };

                    updateView.view = json;
                    
                    setState(updateView);
                  })
              }}>View</button>
            </div>)
          })}
        </ul>
        { state.view && 
        <article className="viewer">
          <h2 className="viewer-title">{state.view.title}</h2>
          <p className="viewer-content">
            {state.view.body}
          </p>
        </article>}
      </div>
    </div>
  );
}

export default App;
