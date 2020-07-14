import React from 'react';
import { render } from '@testing-library/react';
import {
  getByRole as domGetByRole,
  findByRole as domFindByRole,
  findByText as domFindByText,
  fireEvent,
} from '@testing-library/dom'
import App from './App';

import data from './test-data.json';

const initialValues = {
  heading: 'Test heading',
  posts: data,
  view: null,
}

test('renders page title', () => {
  const { getByText } = render(<App initialState={initialValues} />);
  const headingElement = getByText(new RegExp(initialValues.heading, 'i'));
  expect(headingElement).toBeInTheDocument();
});

test('renders posts list', () => {
  const { getByRole } = render(<App initialState={initialValues} />);
  const postsList = getByRole("list");
  expect(postsList).toBeInTheDocument();
  expect(postsList.children).toHaveLength(initialValues.posts.length);
});

test('list items have a button to load the post', async () => {
  const { getAllByRole, findByRole } = render(<App initialState={initialValues} />);
  const [firstPost] = getAllByRole("listitem");
  expect(firstPost).toBeInTheDocument();

  const viewButton = domGetByRole(firstPost, "button");

  fireEvent(
    viewButton,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
  )

  const viewArea = await findByRole("article");
  
  const viewAreaHeading = await domFindByRole(viewArea, "heading");

  expect(viewAreaHeading.innerHTML).toBe(initialValues.posts[0].title);

  domFindByText(viewArea, new RegExp(initialValues.posts[0].body));
})
