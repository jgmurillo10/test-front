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
  return confirm({
    title: `¿Cuántas unidades de ${p.name} deseas agregar a tu carrito?`,
    content: content,
    onOk() {
      console.log('OK',p,quantity);
      addProductCart(p, quantity);
      message.success(`Agregaste ${quantity} unidades de ${p.name} a tu carrito.`);
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

export default showConfirm;
