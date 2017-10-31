export const API = 'http://localhost:5001'
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

export const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json'
}

export const fetchCategories = () => {
  return fetch(`${API}/categories`, { headers }).then(res => res.json())
}

export const fetchComment = (parentId) => {
  return fetch(`${API}/posts/${parentId}/comments`, { headers })
    .then(res => res.json())  
}

export const addComment = (comment) => {
  return fetch(`${API}/comments`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(comment)
  })
    .then(res => res.json())
}

export const deleteComment = (commentId) => {
  return fetch(`${API}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
  })
    .then(res => res.json())
}

export const voteComment = (commentId, option) => {
  return fetch(`${API}/comments/${commentId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option })
  })
    .then(res => res.json())
}

export const updateComment = (commentId, timestamp, body) => {
  return fetch(`${API}/comments/${commentId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ timestamp: timestamp, body: body })
  })
    .then(res => res.json())
}

export const fetchPosts = () => {
  return fetch(`${API}/posts`, { headers })
    .then(res => res.json())
}

export const fetchPostsByCategory = (category) => {
  return fetch(`${API}/${category}/posts`, { headers })
    .then(res => res.json())
}

export const addPost = (post) => {
  return fetch(`${API}/posts`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(post)
  })
}

export const updatePost = (postId, title, body) => {
  return fetch(`${API}/posts/${postId}`, {
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({ title: title, body: body })
  })
    .then(res => res.json())
}

export const deletePost = (postId) => {
  return fetch(`${API}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  }).then(res => res.json())
}

// option is upVote or downVote
export const votePost = (postId, option) => {
  return fetch(`${API}/posts/${postId}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify({ option })
  }).then(res => res.json())
}
