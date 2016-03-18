import $ from 'jquery';
import notificationService from './../services/notification-service';
import person from './../person-data';
import page from 'page';

export default {
  render: (baseElement, cartId) => {
    console.log('cartId', cartId);
    $('<button>Order and enjoy!</button>')
      .click(OnOrderButton.bind(cartId))
      .appendTo(baseElement)
  }
}

function OnOrderButton(event, cartId) {
  notificationService
    .sendNotification(person, cartId)
    .then(() => {
      page('/#thankYou');
    });
}
