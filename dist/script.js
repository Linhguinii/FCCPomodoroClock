// global variables
window.timer;
window.seconds_left = 0;
window.audio = new Audio("https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break_length: 5,
      session_length: 25,
      status: 'Session',
      time_left: '25:00' };


    this.playSound = this.playSound.bind(this);
    this.handleClickTimer = this.handleClickTimer.bind(this);
    this.handleClickReset = this.handleClickReset.bind(this);
    this.handleClickDecrement = this.handleClickDecrement.bind(this);
    this.handleClickIncrement = this.handleClickIncrement.bind(this);
    this.handleClickSessionDecrement = this.handleClickSessionDecrement.bind(this);
    this.handleClickSessionIncrement = this.handleClickSessionIncrement.bind(this);
  }
  playSound() {
    this.audio.current.play();
  }
  handleClickTimer() {
    let break_size = this.state.break_length;
    let session_size = this.state.session_length;
    // if already on-going timer
    if (window.timer) {
      clearInterval(window.timer);
      delete window.timer;
    }
    // no timer
    else {
        // if timer is pause
        if (window.seconds_left == 0) {
          const displayStatus = document.getElementById('timer-label');
          if (displayStatus.innerText == 'Session') {
            var time = this.state.session_length * 60 - 1;
          } else
          if (displayStatus.innerText == 'Break') {
            var time = this.state.break_length * 60 - 1;
          }
        }
        //
        else {
            // if session got incremented
            if (this.state.session_length * 60 >= window.seconds_left - 1) {
              var time = window.seconds_left - 1;
            }
            // else if 
            else if (this.state.session_length * 60 < window.seconds_left - 1) {
                var time = this.state.session_length * 60 - 1;
              }
          }
        //render the timer
        window.timer = setInterval(function () {
          var minutes = parseInt(time / 60, 10);
          var seconds = parseInt(time % 60, 10);
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          const display = document.getElementById('time-left');
          display.innerText = minutes + ":" + seconds;
          window.seconds_left = time;
          if (time == 0) {
            /*
            window.audio.play();
            */
            const audioElement = document.getElementById('beep');
            audioElement.play();
          }
          // if timer is done
          if (--time < -1) {

            /*
            
            var audio = new Audio('https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav');
            audio.play();
            */
            clearInterval(window.timer);
            const displayStatus = document.getElementById('timer-label');
            if (displayStatus.innerText == 'Session') {
              displayStatus.innerText = 'Break';
              const displayTimer = document.getElementById('time-left');
              displayTimer.innerText = break_size + ":00";
              delete window.timer;
              window.seconds_left = 0;
              const start = document.getElementById('start_stop');
              start.click();
            } else
            if (displayStatus.innerText == 'Break') {
              displayStatus.innerText = 'Session';
              const displayTimer = document.getElementById('time-left');
              displayTimer.innerText = session_size + ":00";
              delete window.timer;
              window.seconds_left = 0;
              const start = document.getElementById('start_stop');
              start.click();
            }

          }

        }, 1000);
      }
  }

  handleClickReset() {
    const audioElement = document.getElementById('beep');
    audioElement.pause();
    audioElement.load();
    clearInterval(window.timer);
    const displayBreak = document.getElementById('break-length');
    displayBreak.innerText = 5;
    const displaySession = document.getElementById('session-length');
    displaySession.innerText = 25;
    const displayTimeLeft = document.getElementById('time-left');
    displayTimeLeft.innerText = '25:00';
    this.setState({
      time_left: '25:00',
      break_length: 5,
      session_length: 25 });

    delete window.timer;
    window.seconds_left = 0;
    const displayStatus = document.getElementById('timer-label');
    displayStatus.innerText = 'Session';
  }
  handleClickDecrement() {
    const display = document.getElementById('break-length');
    if (this.state.break_length > 1) {
      display.innerText -= 1;
      this.state.break_length -= 1;
    }
  }
  handleClickIncrement() {
    const display = document.getElementById('break-length');
    if (this.state.break_length < 60) {
      this.state.break_length += 1;
      display.innerText = this.state.break_length;
    }
  }
  handleClickSessionDecrement() {
    const display = document.getElementById('session-length');
    if (this.state.session_length > 1) {
      display.innerText -= 1;
      this.state.session_length -= 1;
      if (display.innerText >= 10) {
        this.setState({
          //session_length : display.innerText,
          time_left: display.innerText + ":00" });

      } else
      if (display.innerText < 10) {
        this.setState({
          //session_length : display.innerText,
          time_left: "0" + display.innerText + ":00" });

      }
    }
  }
  handleClickSessionIncrement() {
    const display = document.getElementById('session-length');
    if (this.state.session_length < 60) {
      this.state.session_length += 1;
      display.innerText = this.state.session_length;
      this.setState({
        time_left: display.innerText + ":00" });

    }
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("audio", { ref: this.audio, id: "beep", src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" }), /*#__PURE__*/
      React.createElement("div", { id: "break-label" }, "Break Length"), /*#__PURE__*/


      React.createElement("div", { id: "break-length" },
      this.state.break_length), /*#__PURE__*/

      React.createElement("div", { id: "session-label" }, "Session Length"), /*#__PURE__*/


      React.createElement("div", { id: "session-length" },
      this.state.session_length), /*#__PURE__*/

      React.createElement("div", { id: "break-increment", onClick: this.handleClickIncrement }, "Break Increment"), /*#__PURE__*/


      React.createElement("div", { id: "break-decrement", onClick: this.handleClickDecrement }, "Break Decrement"), /*#__PURE__*/


      React.createElement("div", { id: "session-increment", onClick: this.handleClickSessionIncrement }, "Session Increment"), /*#__PURE__*/


      React.createElement("div", { id: "session-decrement", onClick: this.handleClickSessionDecrement }, "Session Decrement"), /*#__PURE__*/



      React.createElement("div", { id: "timer-label" },
      this.state.status), /*#__PURE__*/

      React.createElement("div", { id: "time-left" },
      this.state.time_left), /*#__PURE__*/

      React.createElement("div", { id: "start_stop", onClick: this.handleClickTimer }, "Start/Stop"), /*#__PURE__*/


      React.createElement("div", { id: "reset", onClick: this.handleClickReset }, "Reset")));




  }}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById('root'));