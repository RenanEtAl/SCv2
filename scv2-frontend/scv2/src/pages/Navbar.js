import React from 'react'
import {
    Container,
    Menu,
    Button
} from 'semantic-ui-react'
import { connect } from 'react-redux'

const Navbar = ({ acc }) => {
    return (
        <div>
            <Menu fixed='top' inverted>
                <Container>
                    <Menu.Item header>
                        Safe Crowding
                    </Menu.Item>
                    <Menu.Item as ='a' href='/'>
                        Home
                    </Menu.Item>
                    <Menu.Item as='a' href='/campaigns'>
                        Campaigns
                    </Menu.Item>
                    {acc.account && <Menu.Item as='a' href='/create'>
                        Create
                    </Menu.Item>}
                    {/* {
                        acc.account && <Menu.Item as='a' href='/#'>
                        My Campaign
                    </Menu.Item>
                    } */}
                    <Menu.Item position='right'>
                        ID: &nbsp;
                        {
                            acc.account && acc.account.substring(0, 10)
                        }
                        .....
                        {acc.account && acc.account.substring(35, )}
                    </Menu.Item>
                </Container>
            </Menu>
        </div>
    )
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(Navbar)