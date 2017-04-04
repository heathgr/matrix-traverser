import { connect } from 'react-redux';
import Main from '../components/Main';

const stateToProps = state => ({
  matrix: state.get('matrix'),
});

const MainContainer = connect(stateToProps)(Main);

export default MainContainer;
