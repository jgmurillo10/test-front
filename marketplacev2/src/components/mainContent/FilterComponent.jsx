import React from 'react';
import { Row, Col, Select, Radio, Slider } from 'antd';

const Option = Select.Option;
const FilterComponent = () => {
  const handleChangeSort = (value) => {
    console.log('handleChangeSort', value);
  };
  const handleChangeFilter = (value) => {
    console.log('handleChangeFilter', value);
  };
  const handleChangeRadio = (e) => {
    console.log('handleChangeRadio', e);
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
                <Option value="avaibility">Disponibilidad</Option>
                <Option value="quantity">Cantidad</Option>
                <Option value="name">Nombre</Option>
              </Select>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12} xl={12}>
              <Radio.Group value='asc' onChange={handleChangeRadio}>
                <Radio.Button style={{ width: 75 }} value="asc">Asc</Radio.Button>
                <Radio.Button style={{ width: 75 }} value="desc">Desc</Radio.Button>
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

export default FilterComponent;
