# Step to do WebRTC through PeerJS

1. Go to peerjs websitef for our references.
    https://peerjs.com/

2. Copy the library the link below and put in index.html:
    <script src="https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js"></script>

3. Insert "esModuleInterop": true to tsconfig.json:
    "compilerOptions": {
        ....
        "esModuleInterop": true,
        ....
    }

4. Do the function for checking or Get our own ID.
5. Do the function for connect and received data. Test the data connection by pressing button.
6. Do the function for video peer connection. 
7. Do the function to open camera at first.