import Card from '../BoardComponents/Card';
import { connect } from 'react-redux';
import { registerClick, checkClick, stopFlashes } from '../store/actions';

function mapStateToProps(state) {
  const { cards, clicked, score, status } = state;
  return { cards, clicked, score, status };
}

const mapDispatchToProps = {
  registerClick,
  checkClick,
  stopFlashes
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);