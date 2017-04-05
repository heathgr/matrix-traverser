import { connect } from 'react-redux';
import Main from '../components/Main';

const stateToProps = state => ({
  matrix: state.matrix,
  solutions: state.solutions,
});

const MainContainer = connect(stateToProps)(Main);

export default MainContainer;
