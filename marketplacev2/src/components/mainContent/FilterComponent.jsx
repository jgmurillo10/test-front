import React from 'react';
import { Row, Col, Select, Radio, Slider } from 'antd';
import { connect } from 'react-redux';
import { fetchSort, setSortName, setDesc } from '../../actions';

const Option = Select.Option;
const FilterComponent = ({ category, sortName, filterName, desc, disabled, sort, setSort, setDesc }) => {
  const handleChangeSort = (value) => {
    setSort(value);
    sort(category, value, desc);
  };
  const handleChangeFilter = (value) => {
    console.log('handleChangeFilter', value);
  };
  const handleChangeRadio = (e) => {
    console.log('handleChangeRadio', e.target.value);
    //change desc state
    setDesc(e.target.value);
    sort(category, sortName, e.target.value);
  };
  const filterStyle = {
    backgroundColor: 'white',
    marginTop: '1em',
    padding: '1em',
    borderRadius: '0.5em',
  };
  return (
    <div style={filterStyle}>
      <Row type="flex" justify="center">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <h2>Ordenar</h2>
          <Row type="flex" justify="center">
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Select
                placeholder="ordernar..."
                style={{ width: 150, paddingRight: '0.5em' }}
                onChange={handleChangeSort}
              >
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
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <h2>Filtrar</h2>
          <Row type="flex" justify="center">
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Select
                placeholder="filtrar..."
                onChange={handleChangeFilter}
                style={{ width: 150 }}
              >
                <Option value="filterPrice">Precio</Option>
                <Option value="filterAvaibility">Disponibilidad</Option>
                <Option value="filterStock">Stock</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Slider style={{ width: 150 }} range defaultValue={[20, 50]} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = state => ({
  category: state.products.category,
  sortName: state.filter.sortName,
  filterName: state.filter.filterName,
  desc: state.filter.desc,
  disabled: state.filter.disabled,
});

const mapsDispatchToProps = dispatch => ({
  sort: (category, by, desc) => dispatch(fetchSort(category, by, desc)),
  setSort: filterName => dispatch(setSortName(filterName)),
  setDesc: desc => dispatch(setDesc(desc)),
});

export default connect(mapStateToProps, mapsDispatchToProps)(FilterComponent);
