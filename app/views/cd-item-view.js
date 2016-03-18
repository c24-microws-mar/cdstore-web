import $ from 'jquery';

export default {
  render: (baseElement, cd) => {
    $('<td></td>').text(cd.artist).appendTo(baseElement)
    $('<td></td>').text(cd.album).appendTo(baseElement)
    $('<td></td>').text(cd.price).appendTo(baseElement)
  }
}