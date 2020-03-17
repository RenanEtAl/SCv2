import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateCampaign from './pages/Create'
import Campaigns from './pages/Campaigns'
import Campaign from './pages/Campaign'
// import Request from './pages/Request'
import editAcc from './action/edit'
import Navbar from './pages/Navbar'
import { connect } from 'react-redux'
import web3 from './ethereum/web3'
import axios from 'axios'
import factory from './ethereum/factory'
// import Contribute from './pages/Contribute'
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(({ dispatch, ...others }) => {
  window.ethereum.on('accountsChanged', async () => {
    const account = await web3.eth.getAccounts()
    dispatch(editAcc(account[0]))
    // console.log(account)
  })

  React.useEffect(() => { 
    // const account = await web3.eth.getAccounts()
    // console.log(account)
    axios.get('http://localhost:8080/empty')
      .then(async()=>{
        const account = await web3.eth.getAccounts()
        const campaigns = await factory.methods.getDeployedCampaigns().call()
        console.log(campaigns)
        dispatch(editAcc(account[0]))
      })
  },[])

  return (
    <>
    <Navbar />
    <Switch>
      <Route path='/' exact={true} component={Home} />
      <Route path='/create' component={CreateCampaign} />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
      <Route path='/campaigns' component={Campaigns} />
      <Route path='/campaign/:id' component={Campaign} />
      {/* <Route path='/contribute/:id' component={Contribute} />
      
      
      
      
      <Route path='/request/:id' component={Request} /> */}
    </Switch>
    </>
  )
})