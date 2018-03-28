import React from 'react';
import { InputNumber, Modal, message } from 'antd';

const confirm = Modal.confirm;
const showConfirm = (p, addProductCart) => {
  let quantity = 1;
  const onChange = (e) => {
    quantity = e;
  };
  const content = (
    <InputNumber min={1} defaultValue={1} onChange={onChange} />
  );
  if (!p.available) {
    return message.error('Este producto no está disponible');
  }
  return confirm({
    title: `¿Cuántas unidades de ${p.name} deseas agregar a tu carrito?`,
    content,
    onOk() {
      addProductCart(p, quantity);
      message.success(`Agregaste ${quantity} unidades de ${p.name} a tu carrito.`);
    },
    onCancel() {
    },
  });
};

export default showConfirm;
