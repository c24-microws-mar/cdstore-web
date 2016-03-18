import $ from 'jquery';

export default {
  render: (baseElement, cd) => {
    $('<span></span>').text(cd.artist).appendTo(baseElement)
    $('<span></span>').text(cd.album).appendTo(baseElement)
    $('<span></span>').text(cd.price).appendTo(baseElement)
  }
}