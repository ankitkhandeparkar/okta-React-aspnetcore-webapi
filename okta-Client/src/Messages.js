import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Header, Icon, Message, Table, Container } from 'semantic-ui-react';
import config from './config';

const Messages = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [messages, setMessages] = useState(null);
  const [messageFetchFailed, setMessageFetchFailed] = useState(false);

  useEffect(() => {
    if (authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      fetch(config.resourceServer.messagesUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          let index = 0;
          const formattedMessages = data.messages.map((message) => {
            const date = new Date(message.date);
            const day = date.toLocaleDateString();
            const time = date.toLocaleTimeString();
            index += 1;
            return {
              date: `${day} ${time}`,
              text: message.text,
              id: `message-${index}`,
            };
          });
          setMessages(formattedMessages);
          setMessageFetchFailed(false);
        })
        .catch((err) => {
          setMessageFetchFailed(true);
          console.error(err);
        });
    }
  }, [authState, oktaAuth]);

  const possibleErrors = [
        'Server is not responding',
        'Or Server may not be authorized'
  ];

  return (
    <Container text style={{marginTop: '7em'}}>
      <Header as="h1">
        <Icon name="mail outline" />
        My Messages
      </Header>
      {messageFetchFailed && <Message error header="Failed to fetch messages.  Please verify the following:" list={possibleErrors} />}
      {!messages && !messageFetchFailed && 
            <div className="ui active dimmer">
                <div className="ui large text loader">Loading Messages</div>
            </div>}
      {messages
      && ( <div>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr id={message.id} key={message.id}>
                <td>{message.date}</td>
                <td>{message.text}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      )}
    </Container>
  );
};

export default Messages;
