import $ from 'jquery';
import catalogService from './services/catalog-service';
import suggestionService from './services/suggestion-service';
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
        const table = $('<table></table>').appendTo(mainApp)
        const line = $('<tr></tr>').appendTo(table)
        
        buyButtonView.render(line, cd.albumId);
        cdItemView.render(line, cd);
    });
  });
}

function cart(context) {
  const mainApp = $('#mainApp').empty();
  const cartIdParam = context.querystring;
  const cartId = cartIdParam.substring(7, cartIdParam.length);
  catalogService
    .getAllCds()
    .then(cdList => {
	orderButtonView.render(mainApp, cartId);
    const headLine = $('<div><h2>Cart</h2></div>').appendTo(mainApp)
      cdList.slice(0, 3).forEach(cd => {
        const table = $('<table></table>').appendTo(mainApp)
        const line = $('<tr></tr>').appendTo(table)

        cdItemView.render(line, cd);
      })

      return cdList;
    })
    .then(cdList => {
      if (cdList && cdList.length) {
        suggestionService.getSuggestions(cdList[0])
          .then(suggestions => {
          const headLine = $('<div><h2>Suggestions</h2></div>').appendTo(mainApp)
            console.log('received suggestions', suggestions);
            suggestions.forEach(suggestion => {
              const table = $('<table></table>').appendTo(mainApp)
              const line = $('<tr></tr>').appendTo(table)
              
              buyButtonView.render(line, suggestion.albumId);
              cdItemView.render(line, suggestion);
            })
          });
      }
    });
}
