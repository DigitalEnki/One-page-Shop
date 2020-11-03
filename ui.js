document.addEventListener('DOMContentLoaded', function(){


    window.hintViewer = document.querySelector('.product-name-hints');
    window.searchListener = document.querySelector('[type="search"]');
    if( window.searchListener ) {
        window.searchListener.addEventListener('input', doAutoHint);
    }

    var quantityListener = document.querySelector('[type="number"]');
    if( quantityListener ) {
        quantityListener.addEventListener('focus', unFocus);
    }

});



doAutoHint = function() {

    window.hintViewer.classList.add('show-hints');

};

unFocus = function() {
    window.searchListener.focus();
};
