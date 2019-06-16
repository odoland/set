import Board from '../BoardComponents/Board';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { cards, clicked, score, status } = state;
  return { cards, clicked, score, status };
}

const mapDispatchToProps = {
  initCards: ((rows, cols) => ({
    type: 'INIT_CARDS',
    payload: { rows, cols }
  })),
  resetClicked: () => ({type: 'RESET_CLICKED'})
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);