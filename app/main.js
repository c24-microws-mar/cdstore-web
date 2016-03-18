import $ from 'jquery';
import catalogService from './services/catalog-service';
import suggestionService from './services/suggestion-service';
import cdItemView from './views/cd-item-view';
import buyButtonView from './views/buy-button-view';
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
      cdList.forEach(cd => {
        const line = $('<div></div>').appendTo(mainApp)

        cdItemView.render(line, cd);
      })

      return cdList;
    })
    .then(cdList => {
      if (cdList && cdList.length) {
        suggestionService.getSuggestions(cdList[0])
          .then(suggestions => {
            console.log(suggestions);
          });
      }
    });
}
