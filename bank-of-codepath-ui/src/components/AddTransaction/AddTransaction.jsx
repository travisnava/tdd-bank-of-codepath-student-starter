import * as React from "react"
import "./AddTransaction.css"

import { useState } from "react"

export default function AddTransaction(props) {

  const [category, setCategory] = useState("")
  const [amount, setAmount] = useState("")
  const [description, setDescription] = useState("")





  function handleOnFormFieldChange(evt) {
    if (evt.target.name === "category") {
      setCategory(evt.target.value)
    }
    if (evt.target.name === "amount") {
      setAmount(parseInt(evt.target.value))
    }
    if (evt.target.name === "description") {
      setDescription(evt.target.value)
    }
    props.setForm({"description": description, "category": category, "amount": amount})
  } 
  
  console.log(props.form)



  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>

      <AddTransactionForm handleOnFormFieldChange = {handleOnFormFieldChange} category = {category} amount = {amount} description = {description} 
      handleOnSubmit = {props.handleOnSubmit} form = {props.form} isCreating = {props.isCreating}/>
    </div>
  )
}

export function AddTransactionForm(form) {
  return (
    <div className="form">
      <div className="fields">
        <div className="field">
          <label>Description</label>
          <input type = "text" name = "description"  placeholder = "Enter a description" value = {form.description} onChange = {form.handleOnFormFieldChange}   />
        </div>
        <div className="field">
          <label>Category</label>
          <input type = "text" name = "category"   placeholder = "Enter a category" value = {form.category} onChange = {form.handleOnFormFieldChange} />
        </div>
        <div className="field half-flex">
          <label>Amount (cents)</label>
          <input type = "number" name = "amount"  placeholder = "$" value = {form.amount} onChange = {form.handleOnFormFieldChange}  />
        </div>

        <button className="btn add-transaction" type="submit" onClick = {form.handleOnSubmit}>
          Add
        </button>
      </div>
    </div>
  )
}
