import JsSIP from 'jssip';

export const initSIP = ({ uri, password, wsUri }) => {
  const socket = new JsSIP.WebSocketInterface(wsUri);
  const configuration = {
    sockets: [socket],
    uri,
    password,
  };

  const ua = new JsSIP.UA(configuration);

  ua.on('connected', () => console.log('SIP connected'));
  ua.on('disconnected', () => console.log('SIP disconnected'));
  ua.on('registered', () => console.log('SIP registered'));
  ua.on('registrationFailed', (e) => console.error('Registration failed:', e));
  ua.on('newRTCSession', (e) => {
    const session = e.session;
    console.log('New session:', session);
  });

  ua.start();
  return ua;
};

export const makeCall = (ua, targetUri) => {
  const options = {
    mediaConstraints: { audio: true, video: false },
  };
  ua.call(targetUri, options);
};
