import React from 'react';
import { Row, Col, Select, Radio, Slider, Switch } from 'antd';

const Option = Select.Option;
const FilterComponent = () => {
  const handleChange = (e) => {
    console.log(e.target);
  }
  const handleRadioChange = (e) => {
    console.log('handleRadioChange')
  }
  const filterStyle = {
    backgroundColor: 'white',
    marginTop: '1em',
    padding: '1em',
    borderRadius: '0.5em',
  };
  return (
    <div style={filterStyle}>
      <Row>
        <Col span={12}>
          <h2>Ordenar</h2>
          <Select defaultValue="lucy" onChange={handleChange}>
            <Option value="jack">Precio</Option>
            <Option value="lucy">Disponibilidad</Option>
            <Option value="Yiminghe">Cantidad</Option>
            <Option value="Yiminghe">Nombre</Option>
          </Select>
          <Radio.Group value={"large"} onChange={handleRadioChange}>
            <Radio.Button value="large">Ascendentemente</Radio.Button>
            <Radio.Button value="default">Descendentemente</Radio.Button>
          </Radio.Group>


        </Col>
        <Col span={12}>
          <h2>Filtrar</h2>
          <Select defaultValue="lucy" onChange={handleChange}>
            <Option value="jack">Precio</Option>
            <Option value="lucy">Disponibilidad</Option>
            <Option value="Yiminghe">Stock</Option>
          </Select>
           <Slider range defaultValue={[20, 50]} />
        </Col>
      </Row>
    </div>
  );
};

export default FilterComponent;
