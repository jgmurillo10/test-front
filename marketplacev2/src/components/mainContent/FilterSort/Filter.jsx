import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Select, Slider } from 'antd';
import { fetchAvailability, setFilterName, fetchMinMax } from '../../../actions';

const Filter = ({ category, disabled, minPrice, maxPrice, minQuantity, maxQuantity, filterName, fetchAvailability, setFilterName, fetchMinMax }) => {
  const Option = Select.Option;
  const handleChangeFilter = (value) => {
    setFilterName(value);
  };
  const onChangeCheckBox = (e) => {
    fetchAvailability(category, e.target.checked);
  };
  const onAfterChange = (value) => {
    fetchMinMax(category, filterName, value[0], value[1], minPrice, maxPrice);
  };
  return (
    <Col xs={24} sm={12} md={12} lg={12} xl={12}>
      <h2>Filtrar</h2>
      <Row type="flex" justify="center">
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Select
            placeholder="filtrar..."
            onChange={handleChangeFilter}
            style={{ width: 150 }}
          >
            <Option value="nofilter">-</Option>
            <Option value="price">Precio</Option>
            <Option value="quantity">Stock</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Slider 
            onAfterChange={onAfterChange} 
            disabled={disabled} 
            style={{ width: 150 }} 
            range 
            defaultValue={filterName === 'price' ? [minPrice,maxPrice] : [minQuantity,maxQuantity]} 
            min={filterName === 'price' ? minPrice : minQuantity}
            max={filterName === 'price' ? maxPrice : maxQuantity}
          />
        </Col>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Checkbox style={{ marginTop: '1em' }} onChange={onChangeCheckBox}>Mostrar disponibles</Checkbox>
        </Col>
      </Row>
    </Col>
  )
};

const mapStateToProps = state => ({
  category: state.products.category,
  disabled: state.filter.disabledFilter,
  minPrice: state.filter.minPrice,
  maxPrice: state.filter.maxPrice,
  minQuantity: state.filter.minQuantity,
  maxQuantity: state.filter.maxQuantity,
  filterName: state.filter.filterName,
});

const mapDispatchToProps = dispatch => ({
  fetchAvailability: (category, available) => dispatch(fetchAvailability(category, available)),
  setFilterName: (filterName) => dispatch(setFilterName(filterName)),
  fetchMinMax: (category, filter, min, max, minPrice, maxPrice) => dispatch(fetchMinMax(category, filter, min, max, minPrice, maxPrice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
