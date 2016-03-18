import $ from 'jquery';

export default {
  render: (baseElement, cd) => {
    var imageCell = $('<td class="imageCell"></td>');
    if (cd.hasCover) {
      $(`<img class="coverImage" src="${cd.coverUrl}"></img>`).appendTo(imageCell);
    }

    imageCell.appendTo(baseElement);
    $('<td class="itemCell"></td>').text(cd.artist).appendTo(baseElement)
    $('<td class="itemCell"></td>').text(cd.album).appendTo(baseElement)
    $('<td class="itemCell"></td>').text(`${cd.price}.00 Euro`).appendTo(baseElement)
  }
}