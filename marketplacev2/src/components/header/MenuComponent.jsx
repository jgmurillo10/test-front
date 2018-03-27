import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { setCategoryFilter, setTitle } from '../../actions';

const SubMenu = Menu.SubMenu;
const MenuComponent = ({ categories, dispatch }) => {
  let current;
  const getMenu = (arr) => (
    arr.map((d) => {
      if (d.sublevels) {
        return (
          <SubMenu key={d.id} title={d.name}>
            {getMenu(d.sublevels)}
          </SubMenu>
        );
      }
      return (<Menu.Item key={d.id}>{d.name}</Menu.Item>);
    })
  );
  const onClick = (e) => {
    dispatch(setCategoryFilter(e.key));
    dispatch(setTitle(`Productos de la subcategoría ${e.item.props.children}`));
  };

  return (
    <div className="menu-container">
      <Menu
        mode="horizontal"
        onClick={onClick}
        selectedKeys={[current]}
      >
        { getMenu(categories) }
      </Menu>
    </div>
  );
};

const mapStateToProps = state => ({
  categories: state.categories,
});

MenuComponent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    sublevels: PropTypes.array,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MenuComponent);
