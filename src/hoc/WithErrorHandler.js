import React, { Component, Fragment } from 'react';
import Modal from '../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {

    constructor(props) {
      super(props);
      this.state = {
        error: null
      };
      this.setVisibility = this.setVisibility.bind(this);

      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      })


      axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error });
      })
    }

    setVisibility() {
      this.setState({ error: null });
    }

    errorMsgStyle = {
      padding: "1.5em",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      fontSize: "2.5rem",
      backgroundColor: "white",
      color: "red"
    }

    // componentDidMount() {

    //   axios.interceptors.request.use(request => {
    //     this.setState({ error: null });
    //     return request;
    //   })


    //   axios.interceptors.response.use(response => response, error => {
    //     this.setState({ error: error });
    //   })
    // }

    render() {
      return (
        <Fragment>
          <Modal isOpen={this.state.error} setVisibility={this.setVisibility}>
            <div style={this.errorMsgStyle}>{this.state.error ? `An error occured: ${this.state.error.message}` : null}</div>
          </Modal>
          <WrappedComponent httpError ={this.state.error} {...this.props} />
        </Fragment>
      )
    }
  }

}

export default WithErrorHandler;