const api = process.env.REACT_APP_PRODUCTS_API_URL || 'http://minaroid-store.eba-rvjzq2ci.us-east-1.elasticbeanstalk.com'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJ4alQ2anRJNGRjZnZpREd5OXZYQzNVVzVhMWVhaTgiLCJpYXQiOjE2NTIzMzEyMDN9.7SyJ55m3k09Xw1zkGxj_NXvNLl2n8mThci9-4Nz0ygU"

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAll = () =>
  fetch(`${api}/products`, { headers })
    .then(res => res.json())

export const remove = (product) =>
  fetch(`${api}/products/${product.uid}`, { method: 'DELETE', headers , mode:'cors'})
    .then(res => res.json())


export const create = (body) =>
  fetch(`${api}/products`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(res => res.json())
