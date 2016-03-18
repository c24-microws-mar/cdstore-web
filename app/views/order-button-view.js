import $ from 'jquery';
import notificationService from './../services/notification-service';
import person from './../person-data';
import page from 'page';

export default {
  render: (baseElement, cartId) => {
    $('<button>Order and enjoy!</button>')
      .click(OnOrderButton)
      .appendTo(baseElement)
  }
}

function OnOrderButton(event) {
  const fakeCardId = '';
  notificationService
    .sendNotification(person, fakeCardId)
    .then(() => {
      page('/#thankYou');
    });
}
