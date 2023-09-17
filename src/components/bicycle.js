import '../styles/bicycle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBicycle } from '@fortawesome/free-solid-svg-icons';

library.add(faBicycle);

function Bicycle() {
  return (
    <button id="bicycle" className="control-off">
      <FontAwesomeIcon icon="bicycle" color="white" size="xl" />
    </button>
  );
}
export default Bicycle;
