import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import web3 from '../ethereum/web3'
import factory from '../ethereum/factory';
import { connect } from 'react-redux'

const CreateCampaign = ({ history, acc }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [min, setMin] = useState('')
    const [isLoading, setLoading] = useState(false)

    const handleSubmit = async () => {
        setLoading(true)
        // const minimum = (parseInt(min, 10) * 1000000000000000000).toString()
        // console.log(minimum)
        // const t = await web3.utils.fromWei(minimum.toString(), 'ether')
        // console.log(t)
        try {
            const res = await factory.methods
                .createCampaign(parseFloat(min))
                .send({
                    from: acc.account
                });

            const campaigns = await factory.methods.getDeployedCampaigns().call()
            console.log(campaigns.slice(-1).pop());
            axios.post('http://localhost:8080/create', {
                address: campaigns.slice(-1).pop(),
                blockNumber: res.blockNumber,
                blockHash: res.blockHash,
                transaction: res.transactionHash,
                title,
                description,
                min,
                uid: acc.account,
            })
                .then(res => {
                    setLoading(false)
                    history.push('/')
                })
                .catch(err => {
                    setLoading(false)
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
        setLoading(false)
    }

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 1000 }}>
                <Header as='h2' color='teal' textAlign='center'>
                    Create a Campaign
                </Header>
                <Form onSubmit={handleSubmit}>
                    <Segment stacked>
                        <Form.Input
                            required label='Title' fluid icon='pencil' iconPosition='left' placeholder='Campaign Title'
                            value={title} onChange={e => setTitle(e.target.value)}
                        />
                        <Form.TextArea
                            required size='ui massive form'
                            style={{ minHeight: 200 }}
                            label='Description' placeholder='Tell Us About Your Campaign'
                            value={description} onChange={e => setDescription(e.target.value)}
                        />
                        <Form.Input                       
                            required
                            label='Minimum Contribution'
                            fluid
                            icon='money'
                            iconPosition='left'
                            placeholder='Minimum Contribution Allowed'
                            value={min}
                            onChange={e => setMin(e.target.value)}
                        />
                        <Button primary fluid size='large' loading={isLoading}>
                            Create
                        </Button>
                        <br />
                        <Button fluid size='large' onClick={() => { history.push('/') }}>
                            Cancel
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid>
    )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(withRouter(CreateCampaign))