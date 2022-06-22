import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"


//importing hooks from react, axios
import { useEffect } from "react"
import { API_BASE_URL } from "../../constants"
import axios from "axios"

export default function Home(props) {

  //fetching transactions from api
  useEffect(() => {
    let transactionsURL = API_BASE_URL + "/bank/transactions"
    let transfersURL = API_BASE_URL + "/bank/transfers"

    const getTransactions = async () => {
      props.setIsLoading(true)
      try {
        const response = await axios.get(transactionsURL)
        if (response.data.transactions) {
          props.setTransactions(response.data.transactions)
        }
        const transferResponse = await axios.get(transfersURL)
        console.log(transferResponse)
        if (transferResponse?.data?.transfers) {
          props.setTransfers(transferResponse.data.transfers)
        }
         else {
          props.setError("Error fetching transactions.")
        }
      } catch (error) {
        console.log(error)
        props.setError(error)
      } finally {
        props.setIsLoading(false)
      }
    }
    getTransactions()
  }, [])
  console.log("transactions: ", props.transactions)

  //fetching transfers from api

  console.log("transfers:" + props.transfers)




  //filtering transaction based off of search input value
  let filteredTransactions = []
  if (props.filterInputValue != "" && props.transactions) {
    filteredTransactions = props.transactions.filter((transaction) => {
      return(transaction.description.toLowerCase().includes(props.filterInputValue.toLowerCase()))
    })
  }
  else {
    filteredTransactions = props.transactions
  }




  async function handleOnSubmitNewTransaction (evt) {
    props.setIsCreating(true)
    // try {
    //   const response = await axios.get(transfersURL)
    //   console.log(response)
    //   if (response.data.transfers) {
    //     props.setTransfers(response.data.transfers)
    //   } else {
    //     props.setError("Error fetching transfers.")
    //   }
    // } catch (error) {
    //   console.log(error)
    //   props.setError(error)
    // } finally {
    //   props.setIsLoading(false)
    // }


  }

  
  return (
    <div className="home">
      <AddTransaction isCreating = {props.isCreating} setIsCreating = {props.setIsCreating} form = {props.newTransactionForm} 
      setForm = {props.setNewTransactionForm} handleOnSubmit = {handleOnSubmitNewTransaction}/>

      {/* conditional rendering if loading or errors present */}

      {props.isLoading ? <h1>Loading...</h1> : <BankActivity transactions = {filteredTransactions} transfers = {props.transfers}/>}
      {props.error != null && <h2 className="error">{props.error}</h2>}

    </div>
  )
}
