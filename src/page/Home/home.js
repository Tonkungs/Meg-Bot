import React from "react";
// import { Formik } from 'formik';
import moment from 'moment';
import Chat from '../../components/chat';
// import MyEnhancedForm from './formen';

moment.locale('th');

class Home extends React.Component {
  // constructor(props) {
  //   super(props);

    // this.state = {
    //   date: '',
    //   time: '',
    //   dateTime: '',
    //   datesRange: ''
    // };

    // this.handleClick = this.handleClick.bind(this);
  // }

  handleChange = (event, {name, value}) => {
    if (name) {
      this.setState({ [name]: value });
    }
  }

  // handleClick(e) {
    // const { value } = e.currentTarget;
    // console.log(value);
    //   this.setState({
    //       counter: this.state.counter + 1
    //   })
    // กัน side effect เลยใช่ข้างล่างแทน
    // this.setState(prevState => ({
    //   value
    // }));
    //  this.setState(() => ({
    //   value
    // }));
  // }


  render() {
    return (
      <React.Fragment>
         {/* <style>{`
        .chat {
          height: 100vh;
        }

    `}</style> */}
        <Chat />
      </React.Fragment>
    );
  }
}

export default Home;
// export default connect(
//   state => ({
//     sandwiches: state.sandwiches
//   })
// )(Home);
