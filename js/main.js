var app;   
    app = {
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
            if (!window.localStorage['installed']) {
                window.localStorage['installed'] = true;
                window.localStorage['data'] = JSON.stringify({
                                        sales:[],
                                        customers:[],
                                        items:[],
                                        slaughters:[],
                                        locations:[]
                                    });
            };
            return function() {      
                this.data = JSON.parse(window.localStorage['data']);
                app.binding();
                /*New Sales*/
                var HTMLFrag = '<article id="newSale"><span class="header">Slaughter Date:</span><br /><select id="newSaleSlaughterDate">';
                this.data.slaughters.forEach(function(element, index, array) {
                    HTMLFrag += '<option value="';
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += '">';
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += '</option>';
                });
                HTMLFrag += '</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">';
                    this.data.locations.forEach(function(element, index, array) {
                        HTMLFrag += '<option value="';
                        HTMLFrag += element.location;
                        HTMLFrag += '">';
                        HTMLFrag += element.location;
                        HTMLFrag += '</option>';
                    });
                    HTMLFrag += '</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable"><tr><td>';
                    HTMLFrag += '<select class="tableInput" onclick="app.purchaseTableAdd(this)" >';
                    this.data.items.forEach(function(innerElement, innerIndex, innerArray) {
                        HTMLFrag += '<option value="';
                        HTMLFrag += innerElement.itemCode;
                        HTMLFrag += '" alt="';
                        HTMLFrag += innerElement.itemPrice;
                        HTMLFrag += '" >';
                        HTMLFrag += innerElement.itemName;
                        HTMLFrag += '</option>';
                    });
                    HTMLFrag += '</select>';
                    HTMLFrag += '</td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>';
                    HTMLFrag += '</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel" /></article>';
                app.DOM.newSale.innerHTML = HTMLFrag;
                /* Sales */
                var HTMLFrag = '',
                    total = 0;
                this.data.sales.forEach(function(element, index, array) {
                            HTMLFrag +='<fieldset alt="';
                            HTMLFrag += index;
                            HTMLFrag += '"><legend>&nbsp;';
                            HTMLFrag += element.slaughterDate;
                            HTMLFrag+='&nbsp;</legend><figure class="location"><figcaption>';
                            HTMLFrag += element.location;
                            HTMLFrag+='</figcaption></figure>';
                            HTMLFrag += element.firstName;
                            HTMLFrag+='&nbsp;';
                            HTMLFrag += element.lastName;
                            HTMLFrag += '<br class="clear"><table class="purchase-table">';

                            element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                                innerElement = JSON.parse(innerElement);
                                HTMLFrag += '<tr><td>';
                                HTMLFrag += '<select class="itemCode" onChange="this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.children[0].innerHTML = \'R \' + this.selectedOptions[0].attributes[0].value; app.update.sale(this)" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" oninput="app.update.sale(this)" >';

                                app.data.items.forEach(function(iiElement, iiIndex, iiArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += iiElement.itemCode;
                                    HTMLFrag += '" '; 
                                    if (iiElement.itemCode == innerElement.itemCode) {
                                        HTMLFrag += 'selected'; 
                                    };
                                    HTMLFrag += ' alt="';
                                    HTMLFrag += iiElement.itemPrice;
                                    HTMLFrag += '" >';
                                    HTMLFrag += iiElement.itemName;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select>';
                                HTMLFrag += '</td><td class="headerLarge">X</td><td class="small"><input type="text" class="quantity" alt="';
                                HTMLFrag += innerIndex;         
                                HTMLFrag += '" oninput="app.update.sale(this)" placeholder="';
                                HTMLFrag += innerElement.quantity;
                                HTMLFrag += '"/></td><td class="small"><td class="headerLarge">@</td><td><span class="priceKG">';
                                HTMLFrag += 'R ' + innerElement.itemPrice;
                                //alert(JSON.stringify(innerElement));
                                HTMLFrag += '</span></td><td><span id="priceTag">R ';
                                HTMLFrag += innerElement.quantity * innerElement.itemPrice;
                                total += innerElement.quantity * innerElement.itemPrice;
                                HTMLFrag += '</span></td></tr>';
                            });
                            HTMLFrag += '</table><br />Total: R ';
                            HTMLFrag += '<span>';
                            HTMLFrag += total;
                            total = 0;
                            HTMLFrag += '</span><br /><span class="noteHeader" >Notes:</span><br class="clear" /><textarea class="notes" alt="';
                            HTMLFrag += index;
                            HTMLFrag += '" oninput="app.update.sale(this)" > '; 
                            HTMLFrag += element.notes;
                            HTMLFrag += '</textarea>';
                            HTMLFrag += '<input type="button" value="clear" class="noteClear" onclick="this.previousSibling.value=\' \' " /> <br class="clear" /><input type="image" src="img/delete.png" onclick="app.delete.sale(this.alt)" class="cancel" alt="';
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
                    return a.firstName.localeCompare(b.firstName);
                });
                this.data.customers.forEach(function(element, index, array) {
                            newChar = element.firstName.charAt(0);
                            if (newChar < compareChar) {
                                if (element == array[0]) {
                                    HTMLFrag += '<fieldset><legend>#</legend>';
                                };
                                HTMLFrag += '<fieldset><legend><input type="button" value="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend>';
                                HTMLFrag += '<input type="text" placeholder="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.lastName;
                                HTMLFrag += '"/><input type="email" placeholder="';
                                HTMLFrag += element.email;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.telephone
                                HTMLFrag += '"/><br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '"/></fieldset>';
                            };
                            if (newChar > compareChar){
                                HTMLFrag += '</fieldset><fieldset><legend>';                              
                                HTMLFrag += newChar;
                                HTMLFrag += '</legend>';  
                                compareChar = newChar;
                                HTMLFrag += '<fieldset><legend><input type="button" value="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend>';
                                HTMLFrag += '<input type="text" placeholder="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.lastName;
                                HTMLFrag += '"/><input type="email" placeholder="';
                                HTMLFrag += element.email;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.telephone
                                HTMLFrag += '"/><br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '"/>';                              
                                HTMLFrag += '</fieldset>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<fieldset><legend><input type="button" value="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend>';
                                HTMLFrag += '<input type="text" placeholder="';
                                HTMLFrag += element.firstName;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.lastName;
                                HTMLFrag += '"/><input type="email" placeholder="';
                                HTMLFrag += element.email;
                                HTMLFrag += '"/><input type="text" placeholder="';
                                HTMLFrag += element.telephone
                                HTMLFrag += '"/><br /><article>';
                                HTMLFrag += '<figure class="location" ><figcaption>';
                                HTMLFrag += '<select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
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
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
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
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '" /><input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" /><input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" /></article>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
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
                    HTMLFrag += '"/><input type="image" src="img/delete.png" onclick="app.delete.slaughter(this.alt)" class="cancel" alt="';
                    HTMLFrag += index;
                    HTMLFrag += '" />';
                    HTMLFrag += '</article>';
                });
                app.DOM.slaughters.innerHTML = HTMLFrag;
            };
        }(),
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
                firstName : function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newSaleFirstName") {
                            return temp[i].value;
                        };
                    };
                },
                lastName : function() {
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
                firstName: function() {
                    var temp = document.getElementsByTagName('input');
                    for (var i = temp.length - 1; i >= 0; i--) {
                        if (temp[i].id == "newCustomerFirstName") {
                            return temp[i].value;
                        };
                    };
                },
                lastName:  function() {
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
        newSale : function() {
            var purchaseTableSelects = document.getElementsByTagName('select'),
                alternate = true,
                foo = {
                    itemCode: '',
                    quantity: 0,
                    weight:0,
                    itemPrice:0
                };
            //console.log(purchaseTableSelects);
            for (var i = 0; i < purchaseTableSelects.length; i++) {
                if (classie.hasClass(purchaseTableSelects[i], 'tableInput')) {
                        foo.itemCode = purchaseTableSelects[i].value;
                        foo.itemPrice = purchaseTableSelects[i].selectedOptions[0].attributes[1];
                        foo.quantity = purchaseTableSelects[i].parentNode.nextSibling.nextSibling.children[0].value;
                        if (foo.quantity != 0) {
                            this.forms.newSale.purchaseTable.push(JSON.stringify(foo));
                        navigator.notification.confirm(
                            foo,
                            function(buttonIndex) {

                            },
                            'Confirm Sync',
                            ['Add','Cancel']
                        );

                        };
                };
            };
            // Update mapped structure
            var newSale = {
                slaughterDate: this.forms.newSale.slaughterDate(),
                firstName: this.forms.newSale.firstName(),
                lastName: this.forms.newSale.lastName(),
                purchaseTable: this.forms.newSale.purchaseTable,
                location: this.forms.newSale.location().innerHTML,
                total: 0,
                notes : ''
            },
            newCustomer = {
                location : this.forms.newSale.location(),
                firstName : this.forms.newSale.firstName(),
                lastName : this.forms.newSale.lastName(),
                email : this.forms.newSale.email(),
                telephone : this.forms.newSale.telephone(),
                address : this.forms.newSale.address()
            };


            if (this.data.sales.indexOf(JSON.stringify(newSale)) == -1) {
                //add to loaded dataset
                this.data.sales.push(newSale);
                //update dataset
                this.store('sale');
            };
            if (this.forms.newSale.firstNameMatch == '' && this.forms.newSale.lastNameMatch == '') {
                if (this.data.customers.indexOf(JSON.stringify(newCustomer)) == -1) {
                    //add to loaded dataset
                    this.data.customers.push(newCustomer);
                    //update dataset
                    this.store('customer');
                };
            };
        },
        newCustomer : function() {
            var newCustomer = {
                location : this.forms.newCustomer.location(),
                firstName : this.forms.newCustomer.firstName(),
                lastName : this.forms.newCustomer.lastName(),
                email : this.forms.newCustomer.email(),
                telephone : this.forms.newCustomer.telephone(),
                address : this.forms.newCustomer.address()
            };
            //add to loaded dataset
            if (this.data.customers.indexOf(newCustomer) == -1) {
                this.data.customers.push(newCustomer);
                //update dataset
                this.store('customer');
            };
        },
        newItem : function() {
            //add to loaded dataset
            var newItem = {
                itemName: this.forms.newItem.itemName(),
                itemCode : this.forms.newItem.itemCode(),
                itemPrice : this.forms.newItem.itemPrice()
            };
            if (this.data.items.indexOf(newItem) == -1) {
                //alert(JSON.stringify(newItem.itemPrice));
                this.data.items.push(newItem);
                //update dataset
                this.store('item');         
            };
        },
        newSlaughter : function() {
            //add to loaded dataset
            var newSlaughter = {
                slaughterDate : this.forms.newSlaughter.slaughterDate,
                total : this.forms.newSlaughter.total
            };
            if (this.data.slaughters.indexOf(newSlaughter) == -1) {
                this.data.slaughters.push(newSlaughter);
                //update dataset
                this.store('slaughter');    
            };  
        },
        newLocation : function() {
            //add to loaded dataset
            var newLocation = {
                location : this.forms.newLocation.location()
            };
            if (this.data.locations.indexOf(JSON.stringify(newLocation)) == -1) {
                this.data.locations.push(newLocation);
                //update dataset
                this.store('location'); 
            };
            var temp = document.getElementsByTagName('input');
            for (var i = temp.length - 1; i >= 0; i--) {
                if (temp[i].id == "newSaleAddLocationText") {
                    temp[i].value = '';
                } else if (temp[i].id == "newCustomerAddLocationText") {
                    temp[i].value = '';
                };
            };  
        },
        nav : {
            prevTab : 0,
            currentTab : 0,
            newTab : document.getElementById( 'new-tab' ),
            to :  function(value, parent) {
                this.prevTab = this.currentTab;
                this.currentTab = value;
                if (value == "New") {
                    switch(this.prevTab){
                        case "Sales" :
                            var HTMLFrag = '<article id="newSale"><span class="header">Slaughter Date:</span><br /><select id="newSaleSlaughterDate">';
                            app.data.slaughters.forEach(function(element, index, array) {
                                HTMLFrag += '<option value="';
                                HTMLFrag += element.slaughterDate;
                                HTMLFrag += '">';
                                HTMLFrag += element.slaughterDate;
                                HTMLFrag += '</option>';
                            });
                            HTMLFrag += '</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">';
                                app.data.locations.forEach(function(element, index, array) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += element.location;
                                    HTMLFrag += '">';
                                    HTMLFrag += element.location;
                                    HTMLFrag += '</option>';
                                }); 
                                HTMLFrag += '</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable"><tr><td>';
                                HTMLFrag += '<select class="tableInput" onclick="app.purchaseTableAdd(this)" >';
                                app.data.items.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.itemCode;
                                    HTMLFrag += '" alt="';
                                    HTMLFrag += innerElement.itemPrice;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.itemName;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select>';
                                HTMLFrag += '</td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>';
                                HTMLFrag += '</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel"></article>';
                                parent.children[2].innerHTML = HTMLFrag;
                            break;
                        case "Customers" :
                                HTMLFrag = '<article id="newCustomer"><span>New Customer Details:</span><br class="clear"/><input type="text" placeholder="First Name" id="newCustomerFirstName"/><input type="text" placeholder="Last Name" id="newCustomerLastName"/><br /><input type="email" placeholder="Email" id="newCustomerEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newCustomerTelephone"/><br /><textarea id="newCustomerAddress" cols="50">Address</textarea> <br class="clear" /><select id="newCustomerLocationSelect">';
                                    app.data.locations.forEach(function(element, index, array) {
                                        HTMLFrag += '<option value="';
                                        HTMLFrag += element.location;
                                        HTMLFrag += '">';
                                        HTMLFrag += element.location;
                                        HTMLFrag += '</option>';
                                    });
                                    HTMLFrag += '</select><input type="text" placeholder="New Location" id="newCustomerAddLocationText"/><input type="button" id="newCustomerAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><input type="button" class="confirm" value="Confirm" onclick="app.newCustomer()" /><input type="button" class="cancel" value="Cancel"></article>';
                            parent.children[2].innerHTML = HTMLFrag;
                            break;
                        case "Items" :
                            parent.children[2].innerHTML = '<article id="newItem"><input type="text" id="newItemName" placeholder="Item Name"/><input type="text" id="newItemCode" placeholder="Item Code"/><input type="text" id="newItemPrice" placeholder="R0.00"/><br /><input type="button" class="confirm"value="Confirm" onclick="app.newItem()" /><input type="button" class="cancel" value="Cancel"></article>';
                            break;
                        case "Slaughters" :
                            parent.children[2].innerHTML = '<article id="newSlaughter"><span>New Slaughter Date:</span><br /><input type="text" id="newSlaughterDate" placeholder="Fri Jan 01 2016"/><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSlaughter()" /><input type="button" class="cancel" value="Cancel"></article>';
                            var slaughterDate = new Pikaday({ 
                                field: document.getElementById('newSlaughterDate'),
                                onSelect: function(date) {
                                    app.forms.newSlaughter.slaughterDate = slaughterDate.toString();
                                }
                            });
                            break;
                    }
                };
            }
        },
        binding : function (){
            Object.observe(app.data.sales, function(changes) {
                changes.forEach(function(element, index, array) {
                    var HTMLFrag = '',
                        total = 0;
                    //refresh with this data;
                    app.data.sales.forEach(function(element, index, array) {
                        HTMLFrag +='<fieldset alt="';
                        HTMLFrag += index;
                        HTMLFrag += '"><legend>&nbsp;';
                        HTMLFrag += element.slaughterDate;
                        HTMLFrag += '&nbsp;</legend><figure class="location"><figcaption>';
                        HTMLFrag += element.location;
                        HTMLFrag += '</figcaption></figure>';
                        HTMLFrag += element.firstName;
                        HTMLFrag += '&nbsp;';
                        HTMLFrag += element.lastName;
                        HTMLFrag += '<br class="clear"><table class="purchase-table">';

                        element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                            innerElement = JSON.parse(innerElement);
                            HTMLFrag += '<tr><td>';
                                HTMLFrag += '<select class="itemCode" onChange="this.parentNode.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.children[0].innerHTML = \'R \' + this.selectedOptions[0].attributes[0].value; app.update.sale(this)" alt="';
                            HTMLFrag += innerIndex;
                            HTMLFrag += '" oninput="app.update.sale(this)" >';

                            app.data.items.forEach(function(iiElement, iiIndex, iiArray) {
                                HTMLFrag += '<option value="';
                                HTMLFrag += iiElement.itemCode;
                                HTMLFrag += '" '; 
                                if (iiElement.itemCode == innerElement.itemCode) {
                                    HTMLFrag += 'selected'; 
                                };
                                HTMLFrag += ' alt="';
                                HTMLFrag += iiElement.itemPrice;
                                HTMLFrag += '" >';
                                HTMLFrag += iiElement.itemName;
                                HTMLFrag += '</option>';
                            });
                            HTMLFrag += '</select>';
                            HTMLFrag += '</td><td class="headerLarge">X</td><td class="small"><input type="text" class="quantity" alt="';
                            HTMLFrag += innerIndex;
                            HTMLFrag += '" oninput="app.update.sale(this)" placeholder="';
                            HTMLFrag += innerElement.quantity;
                            HTMLFrag += '"/></td><td class="small"><td class="headerLarge">@</td><td><span class="priceKG">';
                            HTMLFrag += 'R ' + innerElement.itemPrice;
                            HTMLFrag += '</span></td><td><span id="priceTag">R ';
                                HTMLFrag += innerElement.quantity * innerElement.itemPrice;
                                total += innerElement.quantity * innerElement.itemPrice;
                                HTMLFrag += '</span></td></tr>';
                            });
                            HTMLFrag += '</table><br />Total: R ';
                            HTMLFrag += '<span>';
                            HTMLFrag += total;
                            total = 0;
                            HTMLFrag += '</span><br /><span class="noteHeader" >Notes:</span><br class="clear" /><textarea class="notes" alt="';
                            HTMLFrag += index;
                        HTMLFrag += '" oninput="app.update.sale(this)" > '; 
                        HTMLFrag += element.notes;
                        HTMLFrag += '</textarea>';
                        HTMLFrag += '<input type="button" value="clear" class="noteClear" onclick="this.previousSibling.value=\' \' " /> <br class="clear" /><input type="image" src="img/delete.png" onclick="app.delete.sale(this.alt)" class="cancel" alt="';
                        HTMLFrag += index;
                        HTMLFrag += '"/></fieldset>';
                    });
                    app.DOM.sales.innerHTML = HTMLFrag;
                });
            });
            Object.observe(app.data.customers, function(changes) {
                changes.forEach(function(element, index, array) {
                        var arr = element.object,
                            HTMLFrag = '',
                            newChar,
                            compareChar = '9',
                            numbersStarted = false;
                    //refresh with this data;
                        arr.sort(function(a, b) {
                            return a.firstName.localeCompare(b.firstName);
                        });
                        arr.forEach(function(innerElement, innerIndex, innerArray) {
                                    newChar = innerElement.firstName.charAt(0);
                                    if (newChar < compareChar) {
                                        if (innerElement == innerArray[0]) {
                                            HTMLFrag += '<fieldset><legend>#</legend>';
                                        };
                                        HTMLFrag += '<fieldset><legend><input type="button" value="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend><input type="text" placeholder="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += '"/><input type="email" placeholder="';
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += '"/><br /><article>';
                                        HTMLFrag += '<figure class="location" ><figcaption>';
                                        HTMLFrag += '<select>';
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += '<option value="'
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += '" >';
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += '</option>';
                                        });
                                        HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += '</textarea><input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/></fieldset>';
                                    };
                                    if (newChar > compareChar){
                                        HTMLFrag += '</fieldset><fieldset><legend>';                              
                                        HTMLFrag += newChar;
                                        HTMLFrag += '</legend>';  
                                        compareChar = newChar;
                                        HTMLFrag += '<fieldset><legend><input type="button" value="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend><input type="text" placeholder="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += '"/><input type="email" placeholder="';
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += '"/><br /><article><figure class="location" ><figcaption>';
                                        HTMLFrag += '<select>';
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += '<option value="'
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += '" >';
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += '</option>';
                                        });
                                        HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += '</textarea><input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/></fieldset>';
                                    }else if(newChar == compareChar){
                                        HTMLFrag += '<fieldset><legend><input type="button" value="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '" onclick="app.accordion(this.parentNode.parentNode)"/></legend><input type="text" placeholder="';
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += '"/><input type="email" placeholder="';
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += '"/><input type="text" placeholder="';
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += '"/><br /><article><figure class="location" ><figcaption>';
                                        HTMLFrag += '<select>';
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += '<option value="'
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += '" >';
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += '</option>';
                                        });
                                        HTMLFrag += '</select></figcaption></figure></article><textarea>';
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += '</textarea><input type="image" src="img/delete.png" onclick="app.delete.customer(this.alt)" class="cancel" alt="';
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += '"/></fieldset>';
                                    };
                        });
                        app.DOM.customers.innerHTML = HTMLFrag;
                });
            });
            Object.observe(app.data.items, function(changes) {      
                changes.forEach(function(element, index, array) {
                    var arr = element.object,
                        HTMLFrag = '', 
                        newChar,
                        compareChar = '9',
                        numbersStarted = false;
                    //refresh with this data;
                    arr.sort(function(a, b) {
                        return a.itemName.localeCompare(b.itemName);
                    });
                    arr.forEach(function(innerElement, innerIndex, innerArray) {
                        newChar = innerElement.itemName.charAt(0);
                            if (newChar < compareChar) {
                                if (innerElement == innerArray[0]) {
                                    HTMLFrag += '<fieldset><legend>#</legend>';
                                };
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" />';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += innerElement.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
                            };
                            if (newChar > compareChar){
                                HTMLFrag += '</fieldset><fieldset><legend>';                              
                                HTMLFrag += newChar;
                                HTMLFrag += '</legend>';  
                                compareChar = newChar;
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '"/>';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += innerElement.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += '" /><input type="image" src="img/delete.png" class="cancel" onclick="app.delete.item(this.alt)" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" />';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += innerElement.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
                            };
                        
                    });
                    app.DOM.items.innerHTML = HTMLFrag;
                });
            });
            Object.observe(app.data.slaughters, function(changes) {
                changes.forEach(function(element, index, array) {
                        HTMLFrag = '';
                        var newChar,
                            compareChar = '9',
                            numbersStarted = false;
                        //refresh with this data;
                        element.object.forEach(function(innerElement, innerIndex, innerArray) {
                            HTMLFrag += '<article><span class="slaughterDate">';
                            HTMLFrag += innerElement.slaughterDate;
                            HTMLFrag += '</span><b>-</b><span>Total: </span><input type="text" value="R';
                            HTMLFrag += innerElement.total;
                            HTMLFrag += '"/><input type="image" src="img/delete.png" onclick="app.delete.slaughter(this.alt)" class="cancel" alt="';
                            HTMLFrag += innerIndex;
                            HTMLFrag += '" /></article>';
                        });
                        app.DOM.slaughters.innerHTML = HTMLFrag;
                });
            });
            Object.observe(app.data.locations, function(changes) {
                changes.forEach(function(element, index, array) {
                    if (element.type === "add") {
                        //refresh with this data;
                        HTMLFrag = '';
                        HTMLFrag += '</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">';
                        app.data.locations.forEach(function(element, index, array) {
                            HTMLFrag += '<option value="';
                            HTMLFrag += element.location;
                            HTMLFrag += '">';
                            HTMLFrag += element.location;
                            HTMLFrag += '</option>';
                        });
                        var temp = document.getElementsByTagName('select');
                        for (var i = temp.length - 1; i >= 0; i--) {
                            if (temp[i].id == "newSaleLocationSelect") {
                                temp[i].innerHTML = HTMLFrag;
                            } else if (temp[i].id == "newCustomerLocationSelect") {
                                temp[i].innerHTML = HTMLFrag;
                            };
                        };
                    };
                });
            });
        },
        accordion : function(target) {
            classie.toggleClass(target, 'acc-open');
        },
        purchaseTableAdd : function(target) {
            if(!classie.hasClass(target, 'touched')){
                classie.addClass(target, 'touched');
                var input = document.createElement('tr'),
                    temp ='';

                    temp += '<td><select class="tableInput" onclick="app.purchaseTableAdd(this)" >';
                    app.data.items.forEach(function(innerElement, innerIndex, innerArray) {
                        temp += '<option value="';
                        temp += innerElement.itemCode;
                        temp += '" alt="';
                        temp += innerElement.itemPrice;
                        temp += '" >';
                        temp += innerElement.itemName;
                        temp += '</option>';
                    });
                    temp += '</select>';
                temp += '</td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td>';
                input.innerHTML = temp;
                document.getElementById('newSalePurchaseTable').children[0].appendChild(input);
            };
        },
        customerSearch : function(firstName, lastName) {
            app.forms.newSale.location().innerHTML = '';
            if(classie.hasClass(document.getElementById('newSale'), 'acc-open')){
                classie.removeClass(document.getElementById('newSale'), 'acc-open');
            };
                if (firstName !== null) {
                    app.data.customers.forEach(function(element, index, array) {
                        if (element.firstName === firstName) {
                            if (app.forms.newSale.firstNameMatch != firstName) {
                                app.forms.newSale.firstNameMatch = firstName;
                            };
                            if (app.forms.newSale.firstNameMatch == element.firstName && app.forms.newSale.lastNameMatch == element.lastName) {
                                app.forms.newSale.location().innerHTML = element.location;
                                classie.addClass(document.getElementById('newSale'), 'acc-open');
                            };
                        };
                    });
                }else{
                    app.data.customers.forEach(function(element, index, array) {
                        if (element.lastName === lastName) {
                            if (app.forms.newSale.lastNameMatch != lastName) {
                                app.forms.newSale.lastNameMatch = lastName;
                            };
                            if (app.forms.newSale.firstNameMatch == element.firstName && app.forms.newSale.lastNameMatch == element.lastName) {
                                app.forms.newSale.location().innerHTML = element.location;
                                classie.addClass(document.getElementById('newSale'), 'acc-open');
                            };
                        };
                    });
                };
        },
        update : {
            sale : function(target) {
                var saleAlt = target.parentNode.parentNode.parentNode.parentNode.parentNode.attributes[0].value,
                    sale = app.data.sales[saleAlt];
                    sale.purchaseTable.forEach(function(element, index, array) {
                        sale.purchaseTable[index] = JSON.parse(element)
                    });
                var data = function() {
                    var children = target.parentNode.parentNode.children;
                            sale.purchaseTable[target.alt||target.attributes[1]] = {
                                itemCode : children[0].children[0].selectedOptions[0].value || children[0].children[0].placeholder,
                                quantity: children[2].children[0].value || children[2].children[0].placeholder,
                                itemPrice: children[5].children[0].innerHTML.slice(2)
                            };
                            children[children.length-1].innerHTML = 'R ' + sale.purchaseTable[saleAlt].itemPrice * sale.purchaseTable[saleAlt].quantity;
                        return sale;
                };
                var totalDOM = target.parentNode.parentNode.parentNode.parentNode.parentNode.children;
                data();
                var total=0;
                sale.purchaseTable.forEach(function(element, index, array) {
                    total += Number.parseInt(element.quantity) * Number.parseInt(element.itemPrice);
                    sale.purchaseTable[index] = JSON.stringify(element);
                });
                totalDOM[5].innerHTML = total;
                sale.total = total;
                app.data.sales[saleAlt] = sale;
                app.store('sale');
            }
        },
        delete : {
            sale : function(index) {
                app.data.sales.splice(index, 1);
                app.store('sale');
            },
            customer : function(index) {
                app.data.customers.splice(index, 1);
                app.store('customer');
            },
            item : function(index) {
                app.data.items.splice(index, 1);
                app.store('item');
            },
            slaughter : function(index) {
                app.data.slaughters.splice(index, 1);
                app.store('slaughter');
            }
        },
        sync : {
            customers : function() {
                function onPrompt(results) {
                //alert("You selected button number " + results.buttonIndex + " and entered " + results.input1);
                    function onSuccess(contacts) {
                        var msg = '',
                            temp = '',
                            syncArr = [],
                            tempNumber = 1,
                            syncNumber = 1;
                        contacts.forEach(function(element, index, array) {
                            if (element.name.formatted !== '' && element.displayName !== null && (element.displayName.indexOf('@') == -1 || element.name.formatted.indexOf('@') == -1) ) {
                            tempNumber ++;
                                if (app.data.customers.indexOf(element) == -1) {
                                    temp += syncNumber+' - ' + (element.name.formatted || element.displayName)  + '\n';
                                    syncNumber++;
                                    syncArr.push(element);
                                };
                            };
                        });
                    msg += (tempNumber - 1) + ' contacts successfully retrieved; ' + (syncNumber-1) + ' contacts are not in the customer listing:\n\n' + temp;                
                    navigator.notification.confirm(
                            msg,
                            function(buttonIndex) {
                                if (buttonIndex) {
                                    syncArr.forEach(function(element, index, array) {
                                        app.data.customers.push(element);
                                    });
                                    app.data.customers.sort(function(a, b) {
                                        return a.firstName.localeCompare(b.firstName);
                                    });
                                    app.store('customer');
                                };
                            },
                            'Confirm Sync',
                            ['Add','Cancel']
                        );
                    };

                    function onError(contactError) {
                        //alert(results.input1);
                        navigator.notification.alert('error', function() {}, 'No Contacts Found!', 'Try Again');
                    };

                    // find all contacts with 'Bob' in any name field
                    var options      = new ContactFindOptions();
                    options.filter   = results.input1;
                    options.multiple = true;
                    var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
                    navigator.contacts.find(fields, onSuccess, onError, options);
            };

            navigator.notification.prompt(
                'Please enter a search term',  // message
                onPrompt,                  // callback to invoke
                'Contact Sync',            // title
                ['Search','Cancel'],             // buttonLabels
                'batamgula'                 // defaultText
            );
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
    var el = document.body;
    //el.addEventListener("touchstart", app.simulate, false);
    el.addEventListener("touchend", app.simulate, false);
    //el.addEventListener("touchcancel", app.simulate, false);
    //el.addEventListener("touchmove", app.simulate, false);
    app.initialize();
