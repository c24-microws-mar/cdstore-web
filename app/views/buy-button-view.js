import $ from 'jquery';
import cartService from './../cart-service';

export default {
  render: (baseElement, id) => {
    $('<button>Buy Me!</button>')
      .click(OnBuyButton)
      .data('id', id)
      .appendTo(baseElement)
  }
}

function OnBuyButton(event) {
  const id = $(this).data('id');
  cartService.addItem(id);
}
