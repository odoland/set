import Board from '../BoardComponents/Board';
import { connect } from 'react-redux';
import { initCards, resetClicked } from '../store/actions';

function mapStateToProps(state) {
  const { cards, clicked, score, status } = state;
  return { cards, clicked, score, status };
}

const mapDispatchToProps = {
  initCards,
  resetClicked,
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);