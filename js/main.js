var app;
alert('main');
    app = {
        picked : false,
        contactCached : null,
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
                    case "SELECT" :
                        touches[i].target.onchange.call(touches[i].target);
                        break;
                };      
            };
        },
        bindings : {
            customers : function() {
                alert('called');
            }
        },
        store : function(type) {
            switch(type){
                        case "sale" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.sales = this.data.sales;
                            window.localStorage['data'] = JSON.stringify(temp);
                            break;
                        case "customer" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.customers = this.data.customers;
                            window.localStorage['data'] = JSON.stringify(temp);
                            break;
                        case "item" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.items = this.data.items;
                            window.localStorage['data'] = JSON.stringify(temp);
                            break;
                        case "slaughter" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.slaughters = this.data.slaughters;
                            window.localStorage['data'] = JSON.stringify(temp);
                            break;
                        case "location" :
                            var temp = JSON.parse(window.localStorage['data']);
                            temp.locations = this.data.locations;
                            window.localStorage['data'] = JSON.stringify(temp);
                            break;
            }
        },
        initialize: function() {
/*                var public = io.connect('http://gaz-huntingapp.rhcloud.com:8000/public'),
                    restricted = io.connect('http://gaz-huntingapp.rhcloud.com:8000/restricted');*/

            return function() {      
                //app.binding();
                /*New Sales*/
                var HTMLFrag = '<article id="newSale"><span class="header">Slaughter Date:</span><br /><select id="newSaleSlaughterDate">';
                HTMLFrag += '<option disabled selected value=""></option>';
                this.data.slaughters.forEach(function(element, index, array) {
                    HTMLFrag += '<option value="';
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += '">';
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += '</option>';
                });
                HTMLFrag += '</select><br /><span class="header">Customer:</span><br /><figure class="location" onclick="app.pickContact()" ><figcaption id="newSaleLocation">Pick</figcaption></figure><input type="text" placeholder="Last Name" onblur="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" onblur="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">';
                    HTMLFrag += '<option disabled selected value=""></option>';
                    this.data.locations.forEach(function(element, index, array) {
                        HTMLFrag += '<option value="';
                        HTMLFrag += element.location;
                        HTMLFrag += '">';
                        HTMLFrag += element.location;
                        HTMLFrag += '</option>';
                    });
                    HTMLFrag += '</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable"><thead><tr><th>Item</th><th>Qnt</th><th>Mass</th></tr></thead><tbody><tr><td>';
                    HTMLFrag += '<select class="tableInput" onclick="app.purchaseTableAdd(this)" >';
                    HTMLFrag += '<option disabled selected value=""></option>';
                    this.data.items.forEach(function(innerElement, innerIndex, innerArray) {
                        HTMLFrag += '<option value="';
                        HTMLFrag += innerElement.itemCode;
                        HTMLFrag += '" data-price="';
                        HTMLFrag += innerElement.itemPrice;
                        HTMLFrag += '" >';
                        HTMLFrag += innerElement.itemName;
                        HTMLFrag += '</option>';
                    });
                    HTMLFrag += '</select>';
                    HTMLFrag += '</td><td><input type="text" class="tableInput" placeholder="0" /></td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>';
                    HTMLFrag += '</tbody></table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel" /></article>';
                app.DOM.newSale.innerHTML = HTMLFrag;
                /* Sales */
                var HTMLFrag = '',
                    total = 0;
                this.data.sales.forEach(function(element, index, array) {
                            HTMLFrag +='<fieldset data-index="';
                            HTMLFrag += index;
                            HTMLFrag += '"><legend>&nbsp;';
                            HTMLFrag += element.slaughterDate;
                            HTMLFrag+='&nbsp;</legend><figure class="location"><figcaption>';
                            HTMLFrag += element.location;
                            HTMLFrag+='</figcaption></figure>';
                            HTMLFrag += element.name.givenName;
                            HTMLFrag+='&nbsp;';
                            HTMLFrag += element.name.familyName;
                            if (index == 0) {
                                HTMLFrag += '<br class="clear"><table class="purchase-table"><thead><tr><th>Item</th><th></th><th>Qnt</th><th colspan="2"></th><th>Mass</th><th>@</th><th>Total</th></tr></thead><tbody>';
                            }else{
                                HTMLFrag += '<br class="clear"><table class="purchase-table"><tbody>';
                            };
                            element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                                innerElement = JSON.parse(innerElement);
                                HTMLFrag += '<tr><td colspan="2">';
                                HTMLFrag += '<select class="itemCode" onChange="app.update.sale(this)" data-index="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" >';
                                HTMLFrag += '<option disabled selected value=""></option>';
                                app.data.items.forEach(function(iiElement, iiIndex, iiArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += iiElement.itemCode;
                                    HTMLFrag += '" '; 
                                    if (iiElement.itemCode == innerElement.itemCode) {
                                        HTMLFrag += 'selected'; 
                                    };
                                    HTMLFrag += ' data-price="';
                                    HTMLFrag += iiElement.itemPrice;
                                    HTMLFrag += '" >';
                                    HTMLFrag += iiElement.itemName;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select>';
                                HTMLFrag += '</td><td colspan="2" class="small"><input type="text" class="quantity" data-index="';
                                HTMLFrag += innerIndex;         
                                HTMLFrag += '" onblur="app.update.sale(this)" placeholder="';
                                HTMLFrag += innerElement.quantity;
                                HTMLFrag += '"/></td><td colspan="2" class="small"><input type="text" class="weight" data-index="';
                                HTMLFrag += innerIndex;     
                                HTMLFrag += '" onblur="app.update.sale(this)" placeholder="';         
                                HTMLFrag += innerElement.totalWeight + 'kg';
                                HTMLFrag += '"/></td>';
                                HTMLFrag += '<td class="priceKG">';
                                HTMLFrag += 'R ' + innerElement.itemPrice;
                                HTMLFrag += '</td><td class="priceTag">';
                                HTMLFrag += 'R ' + innerElement.totalWeight * innerElement.itemPrice;
                                total    += innerElement.totalWeight * innerElement.itemPrice;
                                HTMLFrag += '</td></tr>';
                                /* if (innerElement.weights.length > 1) {
                                    innerElement.weights.forEach(function(iiElement, iiIndex, iiArray) {
                                        total += iiElement * innerElement.itemPrice;
                                        HTMLFrag += '<tr><td colspan="4"></td>';
                                        HTMLFrag += '<td colspan="2" class="small"><input type="text" class="weight" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '" onblur="app.update.sale(this)" placeholder="';         
                                        HTMLFrag += iiElement + 'kg';
                                        HTMLFrag += '"/></td><td class="priceKG">';
                                        HTMLFrag += 'R ' + innerElement.itemPrice;
                                        HTMLFrag += '</td><td class="priceTag">';
                                        HTMLFrag += 'R ' + total;
                                        HTMLFrag += '</td></tr>';
                                    });
                                };*/
                            });
                            HTMLFrag += '</tbody><tfoot><tr><td colspan="6">Total: </td><td colspan="2">';
                            HTMLFrag += 'R' + total;
                            HTMLFrag += '</td></tr></tfoot></table>';
                            total = 0;
                            HTMLFrag += '<br /><span class="noteHeader" >Notes:</span><br class="clear" /><textarea class="notes" data-index="';
                            HTMLFrag += index;
                            HTMLFrag += '" onblur="app.update.sale(this)" > '; 
                            HTMLFrag += element.notes;
                            HTMLFrag += '</textarea>';
                            HTMLFrag += '<input type="button" value="clear" class="noteClear" onclick="this.previousSibling.value=\' \' " /> <br class="clear" /><input type="image" src="img/delete.png" onclick="app.delete.sale(this.dataset.index)" class="cancel" data-index="';
                            HTMLFrag += index;
                            HTMLFrag += '"/></fieldset>';
                        });
                app.DOM.sales.innerHTML = HTMLFrag;
                /*customers*/
                HTMLFrag = '';
                var newChar,
                    compareChar = '9',
                    numbersStarted = false;
                this.data.customers.sort(function(a, b) {
                    return a.name.givenName.localeCompare(b.name.givenName);
                });
                this.data.customers.forEach(function(element, index, array) {
                            newChar = element.name.givenName.charAt(0);
                            if (newChar < compareChar) {
                                if (element == array[0]) {
                                    HTMLFrag += '<fieldset><legend>#</legend>';
                                };
                                HTMLFrag += '<fieldset data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"><legend><input type="button" value="';
                                HTMLFrag += element.displayName;
                                        HTMLFrag += '" onclick="app.accordion(this)" /></legend>';
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.givenName;
                                HTMLFrag += '"/><input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.familyName;
                                HTMLFrag += '"/>';
                                if (element.emails!=null) {
                                    element.emails.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="email" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                if (element.phoneNumbers!=null) {
                                    element.phoneNumbers.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                HTMLFrag += '<br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select onblur="app.update.customer(this.parentNode)">';
                                HTMLFrag += '<option disabled selected value=""></option>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article>';
                                if (element.addresses!=null) {
                                    element.addresses.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<textarea onblur="app.update.customer(this)">';
                                        HTMLFrag += innerElement.formatted;
                                        HTMLFrag += '</textarea>';
                                    });
                                };
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.dataset.index)" class="cancel" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"/></fieldset>';
                            };
                            if (newChar > compareChar){
                                HTMLFrag += '</fieldset><fieldset><legend>';                              
                                HTMLFrag += newChar;
                                HTMLFrag += '</legend>';  
                                compareChar = newChar;
                                HTMLFrag += '<fieldset data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"><legend><input type="button" value="';
                                HTMLFrag += element.displayName;
                                        HTMLFrag += '" onclick="app.accordion(this)" ';
                                        HTMLFrag += ' data-index="';
                                        HTMLFrag += index;
                                        HTMLFrag += '"/></legend>';
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.givenName;
                                HTMLFrag += '" /><input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.familyName;
                                HTMLFrag += '" />';
                                if (element.emails!=null) {
                                    element.emails.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="email" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                if (element.phoneNumbers!=null) {
                                    element.phoneNumbers.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                HTMLFrag += '<br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select onblur="app.update.customer(this.parentNode)">';
                                HTMLFrag += '<option disabled selected value=""></option>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article>';
                                if (element.addresses!=null) {
                                    element.addresses.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<textarea onblur="app.update.customer(this)">';
                                        HTMLFrag += innerElement.formatted;
                                        HTMLFrag += '</textarea>';
                                    });
                                };
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.dataset.index)" class="cancel" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"/>';                              
                                HTMLFrag += '</fieldset>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<fieldset data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"><legend><input type="button" value="';
                                HTMLFrag += element.displayName;
                                        HTMLFrag += '" onclick="app.accordion(this)" /></legend>';
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.givenName;
                                HTMLFrag += '"/><input type="text" onblur="app.update.customer(this)" placeholder="';
                                HTMLFrag += element.name.familyName;
                                HTMLFrag += '"/>';
                                if (element.emails!=null) {
                                    element.emails.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="email" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                if (element.phoneNumbers!=null) {
                                    element.phoneNumbers.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<input type="text" onblur="app.update.customer(this)" placeholder="';
                                        HTMLFrag += innerElement.value;
                                        HTMLFrag += '" data-index="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/>';
                                    });
                                };
                                HTMLFrag += '<br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select onblur="app.update.customer(this.parentNode)">';
                                HTMLFrag += '<option disabled selected value=""></option>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article>';
                                if (element.addresses!=null) {
                                    element.addresses.forEach(function(innerElement, innerIndex, innerArray) {
                                        HTMLFrag += '<textarea onblur="app.update.customer(this)">';
                                        HTMLFrag += innerElement.formatted;
                                        HTMLFrag += '</textarea>';
                                    });
                                };
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.dataset.index)" class="cancel" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '"/>';                              
                                HTMLFrag += '</fieldset>';
                            };
                        app.DOM.customers.innerHTML = HTMLFrag;
                });
                /*items*/
                HTMLFrag = '', 
                newChar,
                compareChar = '9',
                numbersStarted = false;
                this.data.items.sort(function(a, b) {
                    return a.itemName.localeCompare(b.itemName);
                });
                this.data.items.forEach(function(element, index, array) {
                            newChar = element.itemName.charAt(0);
                            if (newChar < compareChar) {
                                if (element == array[0]) {
                                    HTMLFrag += '<fieldset><legend>#</legend>';
                                };
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.dataset.index)" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '" /><input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" /><input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" /></article>';
                            };
                            if (newChar > compareChar){
                                HTMLFrag += '</fieldset><fieldset><legend>';                              
                                HTMLFrag += newChar;
                                HTMLFrag += '</legend>';  
                                compareChar = newChar;
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.dataset.index)" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '" /><input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" /><input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" /></article>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.dataset.index)" data-index="';
                                HTMLFrag += index;
                                HTMLFrag += '" /><input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" /><input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" /></article>';
                            };
                        app.DOM.items.innerHTML = HTMLFrag;
                });
                /*slaughters*/
                HTMLFrag = '';
                this.data.slaughters.sort(function(a, b) {
                    return a.slaughterDate.localeCompare(b.slaughterDate);
                });
                this.data.slaughters.forEach(function(element, index, array) {
                    HTMLFrag += '<article>';
                    HTMLFrag += '<span class="slaughterDate">';
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += '</span><b>-</b><span>Total: </span><input type="text" value="R';
                    HTMLFrag += element.total;
                    HTMLFrag += '"/><input type="image" src="img/delete.png" onclick="app.delete.slaughter(this.dataset.index)" class="cancel" data-index="';
                    HTMLFrag += index;
                    HTMLFrag += '" />';
                    HTMLFrag += '</article>';
                });
                app.DOM.slaughters.innerHTML = HTMLFrag;
            };
        },
        forms: {
            newSale : {
                arr: [],
                slaughterDate: function() {
                    var temp = document.getElementsByTagName('select');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleSlaughterDate") {
                            return temp[i].value;
                        };
                    };
                },
                location : function() {
                    var temp = document.getElementsByTagName('figcaption');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleLocation") {
                            return temp[i];
                        };
                    };
                },
                givenName : function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleFirstName") {
                            return temp[i].value;
                        };
                    };
                },
                familyName : function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleLastName") {
                            return temp[i].value;
                        };
                    };
                },
                email: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleEmail") {
                            return temp[i].value;
                        };
                    };
                },
                telephone: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleTelephone") {
                            return temp[i].value;
                        };
                    };
                },
                address: function() {
                    var temp = document.getElementsByTagName('textarea');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleAddress") {
                            return temp[i].value;
                        };
                    };
                },
                firstNameMatch : '',
                lastNameMatch : '',
                purchaseTable:[]
            },
            newCustomer : {
                location: function() {
                    var temp = document.getElementsByTagName('select');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerLocationSelect") {
                            return temp[i].value;
                        };
                    };
                },
                givenName: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerFirstName") {
                            return temp[i].value;
                        };
                    };
                },
                familyName:  function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerLastName") {
                            return temp[i].value;
                        };
                    };
                },
                email: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerEmail") {
                            return temp[i].value;
                        };
                    };
                },
                telephone: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerTelephone") {
                            return temp[i].value;
                        };
                    };
                },
                address: function() {
                    var temp = document.getElementsByTagName('textarea');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerAddress") {
                            return temp[i].value;
                        };
                    };
                }
            },
            newItem : {
                itemName: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newItemName") {
                            return temp[i].value;
                        };
                    };
                },
                itemCode: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newItemCode") {
                            return temp[i].value;
                        };
                    };
                },
                itemPrice: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newItemPrice") {
                            //alert(JSON.stringify(temp[i]));
                            return temp[i].value;
                        };
                    };
                }
            },
            newSlaughter : {
                slaughterDate :   function() {
                    var temp = document.getElementsByTagName('select');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleSlaughterDate") {
                            return temp[i].value;
                        };
                    };
                },
                total :  0
            },
            newLocation : {
                location :   function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleAddLocationText") {
                            return temp[i].value;
                        } else if (temp[i].id == "newCustomerAddLocationText") {
                            return temp[i].value;
                        };
                    };
                }
            }
        },
        accordion : function(target) {
            var container = target.parentNode.parentNode;
            classie.toggleClass(container, 'acc-open');
        },
        purchaseTableAdd : function(target) {
            if(!classie.hasClass(target, 'touched')){
                classie.addClass(target, 'touched');
                var input = document.createElement('tr'),
                    temp ='';

                    temp += '<td><select class="tableInput" onclick="app.purchaseTableAdd(this)" >';
                    temp += '<option disabled selected value=""></option>';
                    app.data.items.forEach(function(innerElement, innerIndex, innerArray) {
                        temp += '<option value="';
                        temp += innerElement.itemCode;
                        temp += '" data-price="';
                        temp += innerElement.itemPrice;
                        temp += '" >';
                        temp += innerElement.itemName;
                        temp += '</option>';
                    });
                    temp += '</select>';
                temp += '</td><td><input type="text" class="tableInput" placeholder="0" /></td><td><input type="text" class="tableInput" placeholder="0" /></td>';
                input.innerHTML = temp;
                document.getElementById('newSalePurchaseTable').children[1].appendChild(input);
            };
        },
        delete : {
            sale : function(idx) {

            },
            customer : function(idx) {

            },
            item : function(idx) {

            },
            slaughter : function(idx) {

            }
        },
        sync : {
            customers : function() {


            },
            items : function() {
                //app.data.items = [];
                app.data.items.sort(function(a, b) {
                    return a.itemName.localeCompare(b.itemName);
                });
                app.store('item');
                //alert("items sync success!");
            }
        }
    };
    //eventlistener
    document.body.addEventListener("touchend", app.simulate, false);
    function onContactSuccess(contact) {
        alert("Save Success");
    };

    function onContactError(contactError) {
        alert("Error = " + contactError.code);
    };
    function onSyncSuccess(contacts) {
        alert("Save Success");
    };

    function onSyncError(contactError) {
        alert("Error = " + contactError.code);
    };
    //app.initialize();
};
alert('fine');