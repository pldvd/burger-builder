import React, { Component, Fragment } from 'react';
import Modal from '../components/UI/Modal/Modal';
import { AxiosInstance } from 'axios';

interface stateWithError {
  error: null | { message: string },
}

const WithErrorHandler = (WrappedComponent: typeof React.Component, axios: AxiosInstance) => {

  return class extends Component<{}, stateWithError> {

    constructor(props: {}) {
      super(props);
      this.state = {
        error: null
      };
      this.setVisibility = this.setVisibility.bind(this);
    }

    reqInterceptor = axios.interceptors.request.use(request => {
      this.setState({ error: null });
      return request;
    })


    resInterceptor = axios.interceptors.response.use(response => response, error => {
      this.setState({ error: error });
    })

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);

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
          <Modal isOpen={!!this.state.error} setVisibility={this.setVisibility}>
            <div style={this.errorMsgStyle}>{this.state.error ? `An error occured: ${this.state.error.message}` : null}</div>
          </Modal>
          <WrappedComponent httpError={this.state.error} {...this.props} />
        </Fragment>
      )
    }
  }

}

export default WithErrorHandler;