document.addEventListener('DOMContentLoaded', function () {


    window.hintViewer = document.querySelector('.product-name-hints');
    window.searchListener = document.querySelector('[type="search"]');
    if (window.searchListener) {
        window.searchListener.addEventListener('input', doAutoHint);
    }

    var quantityListener = document.querySelector('[type="number"]');
    if (quantityListener) {
        quantityListener.addEventListener('focus', unFocus);
    }

});


window.searchQuery = '';

doAutoHint = function (e) {


    window.searchQuery = this.value;
    window.searchQueryLowerCase = this.value.toLowerCase();

    fetch('./json/data.json').then(response => response.json())
        .then(data => {
            window.hintViewer.classList.add('show-hints');
            data = data.filter(function (item) {
                return item.title.toLowerCase().replace(window.searchQueryLowerCase, '') !== item.title.toLowerCase();
            });

            var ul = window.hintViewer.querySelector('ul');
            ul.innerHTML = '';

            var inner = '';
            var item = '';

            if (data.length) {
                for (var i = 0; i < data.length; i++) {

                    var row = data[i];

                    inner = document.createElement('div');
                    inner.classList.add('d-flex');
                    inner.classList.add('justify-content-between');

                    var original_title = '';
                    if( row.title.length === window.searchQueryLowerCase.length ) {
                        original_title = row.title;
                        var temp_title = '';
                        for( var j = 0; j < row.title.length; j++ ) {
                            if( row.title[j] == window.searchQuery[j] ) {
                                temp_title += '<em>' + row.title[j] + '</em>';
                            } else {
                                temp_title += row.title[j];
                            }
                        }

                        row.title = temp_title;
                    } else {
                        row.title = row.title.replace(window.searchQuery, '<em>' + window.searchQuery + '</em>');
                    }

                    inner.innerHTML = '<span>' + row.title + '</span><strong>£' + row.price.toFixed(2) + '</strong>';

                    item = document.createElement('li');
                    item.appendChild(inner);

                    ul.appendChild(item);

                    if( data.length === 1 ) {
                        if( original_title == window.searchQuery ) {
                            window.hintViewer.classList.remove('show-hints');
                            document.querySelector('.add-to-cart').disabled = false;
                        }
                    }


                }
            } else {
                inner = document.createElement('div');
                inner.innerHTML = '<strong>No items found, please try to match the product name correctly.</strong>';

                item = document.createElement('li');
                item.appendChild(inner);

                ul.appendChild(item);
            }

        });





};

unFocus = function () {
    window.searchListener.focus();
};
