var app = {
        DOM : {
            newSale: document.getElementById('newSale'),
            sales: document.getElementById('sales'),
            customers: document.getElementById('customers'),
            items: document.getElementById('items'),
            slaughters: document.getElementById('slaughters')
        },
        settings : {
            verboseConsole : false
        },
        data : {
            sales:[],
            customers:[],
            items:[],
            slaughters:[],
            locations:[]
        },
        simulate : function(evt) {
            alert('click');
          evt.preventDefault();
          var el = document.body;
          var touches = evt.changedTouches;
                
          for (var i = 0; i < touches.length; i++) {
            var event = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': true
            });
            touches[i].target.dispatchEvent(event);
          }
        },
    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function() {
        alert("Hello World!");
        this.store = new MemoryStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }

};

app.initialize();