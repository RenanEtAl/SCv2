import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import img1 from '../img/img1.png'
import img2 from '../img/img2.png'
import Layout from './HomepageLayout'

export default class Home extends Component {
        
    render() {
        return (
            <div style={{marginTop:'50px'}}>
                <Carousel>
                    <div>
                        <img src={img1} />
                        <p className="legend">Mudi: 4G LTE Privacy Router for Road Warriors</p>
                    </div>
                    <div>
                        <img src={img2} />
                        <p className="legend">9-in-1 Multifunction Tool Pen | EDC Essential</p>
                    </div>
                </Carousel>
                <Layout />
            </div>
        )
    }
}

// state = {
//     campaigns: []
// }

// async componentDidMount(){
//     const campaigns = await factory.methods.getDeployedCampaigns().call()
//     console.log(campaigns)
//     this.setState({campaigns})
// }

// onSubmit = async event => {
//     event.preventDefault();

//     try {
//         const accounts = await web3.eth.getAccounts();
//         const res = await factory.methods
//             .createCampaign(1)
//             .send({
//                 from: accounts[0]
//             });
        
//         console.log(res)
//     } catch (err) {
        
//     }

// };

// onContribute = async event => {
//     event.preventDefault();
//     const t = "0x787030C8Da70366f105DaFc232A72533A686646F";
//     const campaign = Campaign(t);

//     try {
//         const accounts = await web3.eth.getAccounts();
//         await campaign.methods.contribute().send({
//             from: accounts[0],
//             value: web3.utils.toWei('0.1', 'ether')
//         });
//     } catch (err) {
//     }
// }

// render() {
//     return (
//         <div>
//             <button onClick={this.onSubmit}>create</button>
//             <button onClick={this.onContribute}> Contribute </button>
//         </div>
//     )
// }