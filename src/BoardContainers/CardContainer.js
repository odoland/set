import Card from '../BoardComponents/Card';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  const { cards, clicked, score, status } = state;
  return { cards, clicked, score, status };
}

const mapDispatchToProps = {
  registerClick: idx => ({
    type: 'CLICK',
    payload: { idx }
  }),
  checkClick: () => ({
    type: 'CHECK_CLICKED',
  }),
  stopFlashes: () => ({
    type: 'STOP_FLASHES'
  })
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);