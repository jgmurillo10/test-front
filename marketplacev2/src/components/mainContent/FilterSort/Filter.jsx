import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Select, Slider } from 'antd';
import { fetchAvailability } from '../../../actions';

const Filter = ({ category, fetchAvailability }) => {
  const Option = Select.Option;
  const handleChangeFilter = (value) => {
    console.log('handleChangeFilter', value);
  };
  const onChangeCheckBox = (e) => {
    console.log('onChangeCheckBox', e.target.checked);
    fetchAvailability(category, e.target.checked);


  }
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
            <Option value="filterPrice">Precio</Option>
            <Option value="filterStock">Stock</Option>
          </Select>
        </Col>
        <Col xs={24} sm={12} md={12} lg={12} xl={12}>
          <Slider style={{ width: 150 }} range defaultValue={[20, 50]} />
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
});

const mapDispatchToProps = dispatch => ({
  fetchAvailability: (category, available) => dispatch(fetchAvailability(category, available)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
