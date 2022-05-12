import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import serializeForm from 'form-serialize'

class CreateContact extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, { hash: true })
    if (this.props.onCreateContact)
      this.props.onCreateContact(values)
  }

  render() {
    return (
      <div>
        <Link className='close-create-contact' to='/'>Close</Link>
        <form onSubmit={this.handleSubmit} className='create-contact-form'>
          <div className='create-contact-details'>
            <input type='text' name='title' placeholder='Title'/>
            <input type="number" name='price' placeholder='Price'/>
            <button>Add Product</button>
          </div>
        </form>
      </div>
    )
  }
}

export default CreateContact
