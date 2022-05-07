const api = process.env.REACT_APP_PRODUCTS_API_URL || 'http://reactnd-contacts-server.eba-appcpife.us-east-1.elasticbeanstalk.com'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJVNGF2OEVTbjl4ZWl3aUpVcFlEOVhrNGlCb3NBNm4iLCJpYXQiOjE2NTE5MDA2OTN9.FSWLQ_M0xbfQcySZFEQSy7xjftQyF_6E0qCpi5yUjds"

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
