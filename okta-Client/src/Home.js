import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';

const Home = () => {
    const { authState, oktaAuth } = useOktaAuth();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (!authState.isAuthenticated) {
          // When user isn't authenticated, forget any user info
          setUserInfo(null);
        } else {
          oktaAuth.getUser().then((info) => {
            setUserInfo(info);
          });
        }
      }, [authState, oktaAuth]); // Update if authState changes
    return (
        <div>
            
        Home Page

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            Welcome ,&nbsp;
            {userInfo.name}
            !
          </p>
          <p>
            Succesfully Logged In at Client Side using Open Id Connect
          </p>
          <h5>Access Token is</h5>
          <h5>{authState.accessToken.accessToken}</h5>
        </div>
        )}

        </div>
    )
}

export default Home
