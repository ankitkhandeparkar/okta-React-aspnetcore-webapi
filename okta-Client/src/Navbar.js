import { useOktaAuth } from '@okta/okta-react';
import { Link } from 'react-router-dom';
import { Container, Icon, Menu } from 'semantic-ui-react';
import React from 'react'

const Navbar = () => {
    const { authState, oktaAuth } = useOktaAuth();

    const login = async () => oktaAuth.signInWithRedirect();
    const logout = async () => oktaAuth.signOut();
    return (
        <div>
            <Menu fixed="top" inverted>
                <Container>
                    <Menu.Item header>
                        <Link to="/">Okta-React Project</Link>
                    </Menu.Item>
                    {authState.isAuthenticated && (
                        <Menu.Item id="messages-button">
                            <Icon name="mail outline" />
                            <Link to="/messages">Messages</Link>
                        </Menu.Item>
                    )}
                    {authState.isAuthenticated && (
                        <Menu.Item id="logout-button" onClick={logout}>Logout</Menu.Item>
                    )}
                    {!authState.isPending && !authState.isAuthenticated && (
                        <Menu.Item onClick={login}>Login</Menu.Item>
                    )}
                </Container>
            </Menu>
        </div>
    )
}

export default Navbar
