import React from 'react';
import { Row, Col } from 'antd';


const FilterComponent = () => {
  const filterStyle = {
    backgroundColor: 'white',
    marginTop: '1em',
    padding: '1em',
  };
  return (
    <div style={filterStyle}>
      <Row>
        <Col span={12}>
          <h2>Ordenar</h2>
          <p>Precio</p>
          <p>Disponibilidad</p>
          <p>Cantidad</p>
          <p>Nombre</p>
        </Col>
        <Col span={12}>
          <h2>Filtrar</h2>
          <p>Precio</p>
          <p>Disponibilidad</p>
          <p>Stock</p>
        </Col>
      </Row>
    </div>
  );
};

export default FilterComponent;
