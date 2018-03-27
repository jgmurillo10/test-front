import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { fetchProductsByCategory } from '../../actions';

const SubMenu = Menu.SubMenu;
const MenuComponent = ({ categories, dispatch }) => {
  let current;
  const getMenu = (arr) => (
    arr.map((d) => {
      if (d.children) {
        return (
          <SubMenu key={d.value} title={d.label}>
            {getMenu(d.children)}
          </SubMenu>
        );
      }
      return (<Menu.Item key={d.value}>{d.label}</Menu.Item>);
    })
  );
  const onClick = (e) => {
    dispatch(fetchProductsByCategory(e.key, e.item.props.children));
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
  categories: state.categories.items,
});

MenuComponent.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    children: PropTypes.array,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MenuComponent);
