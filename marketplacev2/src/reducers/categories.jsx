// const categories = (state = [], action) => {
//   switch (action.type) {
//     case 'GET_ALL':
//       fetch('/categories')
//         .then(res => res.json())
//         .then(categories => categories);
//     default:
//       return state;
//   }
// };
import categories from './categories.json';
// export default categories;
export default () => {
  return categories;
};
