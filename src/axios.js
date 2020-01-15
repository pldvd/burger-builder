import Axios from 'axios';

const instance = Axios.create({
  baseURL: "https://react-burger-builder-8ee58.firebaseio.com/"
});

export default instance;