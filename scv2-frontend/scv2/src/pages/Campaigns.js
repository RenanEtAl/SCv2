import React from 'react'
import { Table } from 'semantic-ui-react'
import axios from 'axios'
import Navbar from './Navbar'
import { connect } from 'react-redux'
import web3 from '../ethereum/web3'

const Campaigns = () => {
    const [campaigns, setCampaigns] = React.useState([])

    React.useEffect(() => {
        axios.get('http://localhost:8080/campaigns')
            .then(res => {
                console.log(res.data)
                const display = res.data.map(campaign => (
                    <Table.Row key={campaign._id}>
                        <Table.Cell>
                            {campaign.uid.substring(0, 25)}...
                        </Table.Cell>
                        <Table.Cell singleLine>
                            <a href={`/campaign/${campaign.address}`}>
                                {campaign.title}
                            </a>
                        </Table.Cell>
                        <Table.Cell>
                            {campaign.description.length > 300 ? `${campaign.description.substring(0, 300)}...` : campaign.description }
                        </Table.Cell>
                        <Table.Cell>
                            {web3.utils.fromWei(campaign.min.toString(), 'ether')}
                        </Table.Cell>
                        {/* <Table.Cell>
                            {campaign.amount} ether
                        </Table.Cell> */}
                    </Table.Row>
                ))

                setCampaigns(display)
            })
            .catch(err => { console.log(err) })
    }, [])

    return (
        <>
        <br/><br/>
        <Table
            celled
            padded
        >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell singleLine>Owner</Table.HeaderCell>
                    <Table.HeaderCell>Title (Click for detail)</Table.HeaderCell>
                    <Table.HeaderCell>Description</Table.HeaderCell>
                    <Table.HeaderCell>Minimum in Ether</Table.HeaderCell>
                    {/* <Table.HeaderCell>Amount</Table.HeaderCell> */}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {campaigns}
            </Table.Body>
        </Table>
        </>
    )
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Campaigns)