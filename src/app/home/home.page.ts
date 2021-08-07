import { AfterViewInit, Component } from '@angular/core';

declare var Peer: any;
var peer = new Peer();

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {

  mypeerid: any;
  anotherid: any;

  constructor() { }
  ngAfterViewInit() {
    this.checkOurOwnID();
    //this.receivedData();
    //this.openCamera();
    this.mediaAnswer();
  }
  // Function to check ID
  checkOurOwnID() {
    setTimeout(() => {
      this.mypeerid = peer.id;
      console.log(this.mypeerid);
    }, 1000);
  }
  // ## Data Connection ##
  receivedData() {
    peer.on('connection', function (conn) {
      conn.on('data', function (data) {
        // Will print 'hi!'
        console.log(data);
      });
    });
  }
  connectToPeer() {
    var conn = peer.connect(this.anotherid);
    // on open will be launch when you successfully connect to PeerServer
    conn.on('open', function () {
      // here you have conn.id
      conn.send('hi!');
    });
  }
  openCamera() {
    var video = document.createElement('video');
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({ video: { width: 320, height: 320 }, audio: false }, function (stream) {
      video.srcObject = stream;
      video.play();
      document.getElementById("myList").appendChild(video);
    });
  }
  // ## Media calls ##
  mediaAnswer() {
    var video = document.createElement('video');
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    peer.on('call', function (call) {
      n.getUserMedia({ video: { width: 320, height: 320 }, audio: false }, function (stream) {
        call.answer(stream); // Answer the call with an A/V stream.
        call.on('stream', function (remoteStream) {
          // Show stream in some video/canvas element.
          video.srcObject = remoteStream;
          video.play();
          document.getElementById("myList").appendChild(video);
        });
      }, function (err) {
        console.log('Failed to get local stream', err);
      });
    });
  }
  mediaCall() {
    var video = document.createElement('video');
    var locaVar = peer;
    var fname = this.anotherid;
    var n = <any>navigator;
    n.getUserMedia = n.getUserMedia || n.webkitGetUserMedia || n.mozGetUserMedia;
    n.getUserMedia({ video: { width: 320, height: 320 }, audio: false }, function (stream) {
      var call = locaVar.call(fname, stream);
      call.on('stream', function (remoteStream) {
        // Show stream in some video/canvas element.
        video.srcObject = remoteStream;
        video.play();
        document.getElementById("myList").appendChild(video);
      });
    }, function (err) {
      console.log('Failed to get local stream', err);
    });
  }

}