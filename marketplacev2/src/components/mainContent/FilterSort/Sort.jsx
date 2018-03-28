import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Select, Radio } from 'antd';
import { fetchSort, setSortName, setDesc } from '../../../actions';

const Sort = ({ category, sortName, filterName, desc, disabled, sort, setSort, setDesc }) => {
  const Option = Select.Option;
  const handleChangeSort = (value) => {
    if (value !== '-') {
      setSort(value);
      sort(category, value, desc);  
    }
  };
  const handleChangeRadio = (e) => {
    setDesc(e.target.value);
    sort(category, sortName, e.target.value);
  };
  return (
    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
      <h2>Ordenar</h2>
      <Row type="flex" justify="center">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Select
            placeholder="ordernar..."
            style={{ width: 150, paddingRight: '0.5em' }}
            onChange={handleChangeSort}
          >
            <Option value="noSort">-</Option>
            <Option value="price">Precio</Option>
            <Option value="available">Disponibilidad</Option>
            <Option value="quantity">Cantidad</Option>
            <Option value="name">Nombre</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Radio.Group defaultValue={desc} onChange={handleChangeRadio} disabled={disabled}>
            <Radio.Button style={{ width: 75 }} value={false}>asc</Radio.Button>
            <Radio.Button style={{ width: 75 }} value={true}>desc</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>

    </Col>
  );
};

const mapStateToProps = state => ({
  category: state.products.category,
  sortName: state.filter.sortName,
  filterName: state.filter.filterName,
  desc: state.filter.desc,
  disabled: state.filter.disabled,
});

const mapDispatchToProps = dispatch => ({
  sort: (category, by, desc) => dispatch(fetchSort(category, by, desc)),
  setSort: filterName => dispatch(setSortName(filterName)),
  setDesc: desc => dispatch(setDesc(desc)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sort);
