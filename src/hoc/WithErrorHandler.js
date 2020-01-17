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
    }

    setVisibility() {
      this.setState({ error: null });
    }

    componentDidMount() {

      axios.interceptors.request.use(request => {
        this.setState({ error: null });
        return request;
      })


      axios.interceptors.response.use(response => response, error => {
        this.setState({ error: error });
      })
    }

    render() {
      return (
        <Fragment>
          <Modal isOpen={this.state.error} setVisibility={this.setVisibility}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  }

}

export default WithErrorHandler;