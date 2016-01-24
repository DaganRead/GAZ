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
          evt.preventDefault();
          var el = document.body;
          var touches = evt.changedTouches;
            for (var i = 0; i < touches.length; i++) {
                var tabs = touches[i].target.parentNode.parentNode.children;
                switch(touches[i].target.nodeName){
                    case "LABEL" :
                    for (var ii = 0; ii < tabs.length; ii++) {
                            tabs[ii].children[0].checked = false;
                        };
                        touches[i].target.control.checked = true;
                        touches[i].target.control.onclick.call(touches[i].target.control);
                        break;
                    case "INPUT" :
                        alert('trigger');
                        break;
                };      
            };
    },
    store : function(type) {
            switch(type){
                        case "sale" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.sales = this.data.sales;
                            window.localStorage['data'] = JSON.stringify(temp);
                            alert(window.localStorage['data']);
                            break;
                        case "customer" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.customers = this.data.customers;
                            window.localStorage['data'] = JSON.stringify(temp);
                            alert(window.localStorage['data']);
                            break;
                        case "item" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.items = this.data.items;
                            window.localStorage['data'] = JSON.stringify(temp);
                            alert(window.localStorage['data']);
                            break;
                        case "slaughter" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.slaughters = this.data.slaughters;
                            window.localStorage['data'] = JSON.stringify(temp);
                            alert(window.localStorage['data']);
                            break;
                        case "location" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.locations = this.data.locations;
                            window.localStorage['data'] = JSON.stringify(temp);
                            alert(window.localStorage['data']);
                            break;
            }
        },
        initialize: function() {
            if (!window.localStorage['installed']) {
                window.localStorage['installed'] = true;
                window.localStorage['data'] = JSON.stringify({
                                        sales:[],
                                        customers:[],
                                        items:[],
                                        slaughters:[],
                                        locations:[]
                                    });
                alert('installing...');
            };      
            this.data = JSON.parse(window.localStorage['data']);
            //app.binding();
            alert(this.data);  

        }()
};