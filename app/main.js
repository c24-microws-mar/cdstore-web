import $ from 'jquery';
import cdStoreService from './cd-store-service';


cdStoreService
  .getAllCds()
  .then(cdList => {
    let id = 0;
    cdList.forEach(cd => {
      const line = $('<div></div>').appendTo('body')

      $('<button>Buy Me!</button>')
        .click(OnBuyButton)
        .data('id', id++)
        .appendTo(line)

      $('<span></span>').text(cd.artist).appendTo(line)
      $('<span></span>').text(cd.album).appendTo(line)
      $('<span></span>').text(cd.price).appendTo(line)
  });
});

function OnBuyButton(event) {
  console.log("bought id", $(this).data('id'));
}
