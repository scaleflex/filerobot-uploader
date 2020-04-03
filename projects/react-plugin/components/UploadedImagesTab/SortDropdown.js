import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SortTick from './SortTick';
import { I18n } from 'react-i18nify';
import { SortButton } from '../../styledComponents';


const SORT_COLS = [
  ['name', 'Name'],
  //['size', 'Size'],
  ['type', 'Type'],
  ['uploaded_at', 'Uploaded'],
  ['modified_at', 'Modified'],
];

class SortDropdown extends Component {
  state = { isDropdownOpened: false };

  constructor(props) {
    super(props);
    this.dropdownContainerRef = React.createRef();

    this.state = {
      sortCols: [...SORT_COLS]
    }
  }

  componentDidMount() {
    this.updateSortCosls();
    window.addEventListener('click', this.globalClickHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.globalClickHandler);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isProductsEnabled !== this.props.isProductsEnabled) {
      this.updateSortCosls();
    }
  }

  updateSortCosls = () => {
    this.setState({
      sortCols: [
        ...SORT_COLS,
        ...(this.props.isProductsEnabled ? [
          ['product_pos', 'Product position'],
          ['product_ref', 'Product reference'],
        ] : [])
      ]
    });
  }

  globalClickHandler = ({ target }) => {
    const dropdownElem = (this.dropdownContainerRef || {}).current || null;
    const isOutsideClick = dropdownElem && dropdownElem !== target && !dropdownElem.contains(target);

    if (isOutsideClick) {
      this.closeDropdown();
    }
  }

  btnClickHandler = ev => {
    ev.preventDefault();
    this.setState(({ isDropdownOpened }) => ({ isDropdownOpened: !isDropdownOpened }));
  }

  closeDropdown = () => {
    this.setState({ isDropdownOpened: false });
  }

  sort = type => {
    const { sortParams: { field, isUp } = {}, applySort } = this.props;

    if (field === type) {
      return applySort({ field, isUp: !isUp });
    }

    applySort({ field: type, isUp: true });
  }

  generateI18nKey = str => (str || '').toLowerCase().replace(/\s/gi, '_')

  render() {
    const { sortParams: { field, isUp } = {} } = this.props;
    const { isDropdownOpened, sortCols } = this.state;
    const activeField = field ? sortCols.find(([key]) => key === field) : null;
    const activeFieldName = (activeField || [])[1] || null;

    return (
      <SortButton
        as="div"
        ref={this.dropdownContainerRef}
        className="ai-btn default-btn"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textDecoration: 'none',
          position: 'relative'
        }}
        onClick={this.btnClickHandler}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {field && <SortTick flex color="white" active isUp={isUp}/>}

          <span className="ai-btn-label ai-btn-label-visible">
            {field
              ?
              I18n.t(`upload.${this.generateI18nKey(activeFieldName || field)}`)
              :
              I18n.t('upload.sort')
            }
          </span>
        </div>

        {isDropdownOpened &&
        <ul
          tabIndex={1}
          className="options-dropdown-menu"
          style={{ top: 35, left: '50%', width: 120, zIndex: 1, transform: 'translate(-50%)', outline: 0 }}
        >
          {sortCols.map(([key, name]) => (
            <li key={key} className={field === key ? 'active' : ''}>
              <button onClick={this.sort.bind(this, key)}>
                {I18n.t(`upload.${this.generateI18nKey(name || key)}`)}
                {' '}
                <SortTick color="dark" active={field === key} isUp={isUp}/>
              </button>
            </li>
          ))}
        </ul>}
      </SortButton>
    );
  }
}

export default SortDropdown;

SortDropdown.propTypes = {
  applySort: PropTypes.func.isRequired,
  sortParams: PropTypes.object.isRequired,
};
