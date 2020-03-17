import React from 'react'
import axios from 'axios'
import { Card, Button, Modal, Image, Header, Form,  Table, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3'

const Campaignn = ({ match, acc, history }) => {
    const [campaign, setCampaign] = React.useState(null)
    const [account, setAccount] = React.useState('')
    const [desc, setDesc] = React.useState('')
    const [recipient, setRecipient] = React.useState('')
    const [ether, setEther] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [summary, setSummary] = React.useState([])
    const [error, setError] = React.useState(null)

    React.useEffect(() => {
        if (acc.account) {
            setAccount(acc.account)
        }
    }, [acc])

    React.useEffect(() => {
        axios.post('http://localhost:8080/campaign', {
            address: match.params.id
        })
            .then(async (res) => {
                const address = match.params.id
                setCampaign(res.data)
                const camp = Campaign(address);
                const summary = await camp.methods.getSummary().call();
                console.log(summary)
                setSummary(summary)
                requestInfo()
            })
            .catch(err => console.log(err))
    }, [])

    const [info, setInfo] = React.useState({})

    const requestInfo = async () => {
        const camp = Campaign(match.params.id);
        const requestCount = await camp.methods.getRequestsCount().call();
        const approversCount = await camp.methods.approversCount().call();
    
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill()
                .map((element, index) => {
                    return camp.methods.requests(index).call();
                })
        );
        console.log(requests)
        setInfo({ requests, requestCount, approversCount })
    }

    const onClick = async event => {
        event.preventDefault()
        setLoading(true)
        setError(null)
        const address = campaign.address
     
        const camp = Campaign(address);
        try {
            await camp.methods.contribute().send({
                from: acc.account,
                value: web3.utils.toWei(ether, 'ether')
            });
            window.location.reload(true)
        } catch (err) {
            setError('Below the minimum contribution')
        }
        setEther('')
        setLoading(false)
    }

    const onRequest = async event => {
        event.preventDefault()
        setLoading(true)
        const address = campaign.address
     
        const camp = Campaign(address);
        try {
            await camp.methods
                .createRequest(desc, web3.utils.toWei(ether, 'ether'), recipient)
                .send({ from: acc.account });
                window.location.reload(true)
        } catch (err) {
            console.log(err.message)
        }
        setEther('')
        setLoading(false)
    }

    const approveRequest = async (event, index) => {
        event.preventDefault()
        setError(null)
        setLoading(true)
        const address = campaign.address
        const camp = Campaign(address);

        try {
            await camp.methods
                .approveRequest(index)
                .send({ from: acc.account });
                window.location.reload(true)
            
        } catch (err) {
            setError('Either you have not contributed or you have already contributed')
            console.log(err.message)
        }

        setLoading(false)
    }

    const finalizeRequest = async (event, index) => {
        event.preventDefault()
        setError(null)
        setLoading(true)
        const address = campaign.address
        const camp = Campaign(address);

        try {
            await camp.methods.finalizeRequest(index).send({
                from: acc.account
            });

            window.location.reload(true)
            
        } catch (err) {
            setError('Either Not enough approvals or not enough Ether to spend!')
            console.log(err.message)
        }
        setLoading(false)
    }

    const createRequest = () => {
        return (
            <Modal trigger={<Button primary loading={loading}>Request</Button>}>
                <Modal.Header>{campaign.title}</Modal.Header>
                <Modal.Content image>
                    <Form>
                        <Form.Field>
                            <label>Description</label>
                            <input placeholder='Description' value={desc} onChange={e=>{setDesc(e.target.value)}}/>
                            <label>Value in Ether</label>
                            <input placeholder='ether' value={ether} onChange={e=>{setEther(e.target.value)}}/>
                            <label>Recipient</label>
                            <input placeholder='Recipient' value={recipient} onChange={e=>{setRecipient(e.target.value)}}/>
                            <p>&nbsp;</p>
                            <Button onClick={onRequest} primary loading={loading}>Request</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

    const showModal = () => { 
        return (
            <Modal trigger={<Button secondary loading={loading}>Contribute</Button>}>
                <Modal.Header>
                    {campaign.title}
                    {error}
                </Modal.Header>
                <Modal.Content image>
                    <Form>
                        <Form.Field>
                            <label>Contribute to this Campaign!</label>
                            <input placeholder='ether' value={ether} onChange={e=>{setEther(e.target.value)}}/>
                            <p>&nbsp;</p>
                            <Button loading={loading} onClick={onClick} primary>Contribute</Button>
                        </Form.Field>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }

    const viewRequest = () => {
        
        return info.requestCount && (
            <Modal trigger={<Button loading={loading} onClick={()=>{setError(null)}}>View Request</Button>}>
                <Modal.Header>
                    Pending Requests
                    {
                        error && <p style={{color:'red'}}>{error}</p>
                    }
                </Modal.Header>
                <Modal.Content image scrolling>
                    <Modal.Description>
                    {
                        info.requests.map((request, index) => (
                            <div key={index} style={{padding:'20px'}}>
                                <Table celled >
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>ID</Table.HeaderCell>
                                        <Table.HeaderCell>Description</Table.HeaderCell>
                                        <Table.HeaderCell>Amount</Table.HeaderCell>
                                        <Table.HeaderCell>Recipient</Table.HeaderCell>
                                        <Table.HeaderCell>ApprovalCount</Table.HeaderCell>
                                        <Table.HeaderCell>Approve</Table.HeaderCell>
                                        {campaign.uid === acc.account && <Table.HeaderCell>Finalize</Table.HeaderCell>}
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    <Table.Row>
                                        <Table.Cell>{index}</Table.Cell>
                                        <Table.Cell>{request.description}</Table.Cell>
                                        <Table.Cell>{web3.utils.fromWei(request.value.toString(), 'ether')} </Table.Cell>
                                        <Table.Cell>{request.recipient.substring(0,8)}...</Table.Cell>
                                        <Table.Cell>{request.approvalCount} / {info.approversCount}</Table.Cell>
                                        <Table.Cell>
                                            <Button 
                                            disabled={request.complete}
                                            primary loading={loading} onClick={(e) => {approveRequest(e, index)}}>approve</Button>
                                        </Table.Cell>
                                        {campaign.uid === acc.account && 
                                            <Table.Cell>
                                                <Button 
                                                onClick={(e)=>{finalizeRequest(e, index)}}
                                                disabled={request.complete}
                                                loading={loading} secondary >
                                                    {request.complete ? 'FINALIZED!' : 'finalize'}
                                                </Button>
                                            </Table.Cell>}
                                    </Table.Row>
                                </Table.Body>
                            </Table>
                            </div>
                        ))
                    }
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        )
    }

    return (campaign && summary !== []) && (
        <div style={{
            height: '100vh',
            marginTop:'5%'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItem: 'center',
                alignContent: 'center',
            }}>
                
                <div>
                    
                <h2>Campaign Details</h2>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>Campaign Balance</Card.Header>
                                <Card.Description>
                                    {
                                        summary[1] && web3.utils.fromWei(summary[1].toString(), 'ether')
                                    }
                                    ether
                                </Card.Description>
                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content>
                                <Card.Header content='Minimum Contribution' />
                                <Card.Description
                                 content={`${summary[0] && web3.utils.fromWei(summary[0].toString(), 'ether')} ether`} 
                                />
                            </Card.Content>
                        </Card>

                        <Card>
                            <Card.Content
                                header='Request'
                                description={summary[2]}
                            />
                        </Card>

                        <Card
                            header='Contributors'
                            description={summary[3]}
                        />
                    </Card.Group>
                    <div style={{paddingTop:'20px'}}>
                        {showModal()}
                        {
                            campaign.uid === acc.account && createRequest()
                        }
                        {viewRequest()}
                    </div>

                    <div style={{margin: '30px', marginLeft:'20%',}}> 
                    <Card style={{width:'60vw'}}>
                        {/* <Image src={campaign.img ? campaign.img : 'https://react.semantic-ui.com/images/avatar/large/daniel.jpg'} wrapped ui={false} /> */}
                        <Card.Content>
                            <Card.Header>{campaign.title}</Card.Header>
                            {/* <Card.Meta>Joined in 2016</Card.Meta> */}
                            <Card.Description>
                                <p style={{lineHeight:'30px'}}>{campaign.description}</p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='user' />
                                {/* 10 Friends */}
                            </a>
                        </Card.Content>
                    </Card>
                </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(withRouter(Campaignn))