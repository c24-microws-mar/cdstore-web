import $ from 'jquery';
import catalogService from './services/catalog-service';
import cdItemView from './views/cd-item-view';
import buyButtonView from './views/buy-button-view';
import orderButtonView from './views/order-button-view';
import page from 'page';

page.base('/');
page('/', search);
page('#cart', cart);
page({
  hashbang:true
});

function search() {
  const mainApp = $('#mainApp').empty();
  catalogService
    .getAllCds()
    .then(cdList => {
      cdList.forEach(cd => {
        const line = $('<div></div>').appendTo(mainApp)

        buyButtonView.render(line, cd.albumId);
        cdItemView.render(line, cd);
    });
  });
}

function cart(cartId) {
  const mainApp = $('#mainApp').empty();
  
  catalogService
    .getAllCds()
    .then(cdList => {
      orderButtonView.render(mainApp);
      cdList.forEach(cd => {
        const line = $('<div></div>').appendTo(mainApp)
        cdItemView.render(line, cd);
      });
  });
}
