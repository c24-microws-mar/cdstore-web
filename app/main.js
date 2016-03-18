import $ from 'jquery';
import catalogService from './services/catalog-service';
import cdItemView from './views/cd-item-view';
import buyButtonView from './views/buy-button-view';

catalogService
  .getAllCds()
  .then(cdList => {
    let id = 0;
    cdList.forEach(cd => {
      const line = $('<div></div>').appendTo('body')

      buyButtonView.render(line, id++);
      cdItemView.render(line, cd);
  });
});


