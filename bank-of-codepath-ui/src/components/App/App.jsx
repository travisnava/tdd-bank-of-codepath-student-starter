import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"

// importing components & react hooks
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import TransactionDetail from "../TransactionDetail/TransactionDetail"

export default function App() {



  //initial state variables
  const firstForm = {description: "", category: "", amount: 0}

  // state variables
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])
  const [error, setError] = useState(null)
  const [filterInputValue, setFilterInputValue] = useState("")
  const [newTransactionForm, setNewTransactionForm] = useState(firstForm)
  const [isCreating, setIsCreating] = useState(false)







  return (
    <div className="app">
      <BrowserRouter>
        <Navbar filterInputValue = {filterInputValue} setFilterInputValue = {setFilterInputValue}/>
        <main>
          <Routes>
            <Route path = "/" element = {<Home transactions = {transactions} setTransactions = {setTransactions} transfers = {transfers} setTransfers = {setTransfers} 
            error = {error} setError = {setError} isLoading = {isLoading} setIsLoading = {setIsLoading} filterInputValue = {filterInputValue} 
            newTransactionForm = {newTransactionForm} setNewTransactionForm = {setNewTransactionForm} isCreating = {isCreating} setIsCreating ={setIsCreating}/>}/>
            <Route path = "/transactions/:transactionId" element = {<TransactionDetail/>}/>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}
