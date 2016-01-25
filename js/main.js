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
            return function() {      
                this.data = JSON.parse(window.localStorage['data']);
                //app.binding();
                alert(JSON.stringify(this.data));  
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
                    HTMLFrag += '</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable">';
                    HTMLFrag += '<tr><td><input type="text" class="tableInput" onclick="app.purchaseTableAdd(this)" placeholder="Item Code" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>';
                    HTMLFrag += '</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel"></article>';
                app.DOM.newSale.innerHTML = HTMLFrag;

                /* Sales */
                var HTMLFrag = '';
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
                            HTMLFrag+='<br class="clear"><table class="purchase-table">';
                            element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                                innerElement = JSON.parse(innerElement);
                                HTMLFrag += '<tr><td><input type="text" class="itemCode" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" oninput="app.update.sale(this)" placeholder="';
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += '"/></td><td class="headerLarge">X</td><td class="small"><input type="text" class="quantity" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" oninput="app.update.sale(this)" placeholder="';
                                HTMLFrag += innerElement.quantity;
                                HTMLFrag += '"/></td><td class="small"><input type="text" class="priceTag" alt="';
                                HTMLFrag += innerIndex;
                                HTMLFrag += '" oninput="app.update.sale(this)" placeholder="';
                                HTMLFrag += innerElement.weight;
                                HTMLFrag += '"/></td><td><span id="priceTag">R 0</span></td></tr>';
                            });

                            HTMLFrag+='</table><br />';
                            HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.sale(this.alt)" value="Delete" alt="';
                            HTMLFrag += index;
                            HTMLFrag += '"/>Total:<span>';
                            HTMLFrag += element.total;
                            HTMLFrag += '</span>';
                            HTMLFrag+='</fieldset>';
                        });
                app.DOM.sales.innerHTML = HTMLFrag;

                /*customers*/
                HTMLFrag = '';
                var newChar,
                    compareChar = '9',
                    numbersStarted = false;
                alert(JSON.stringify(this.data.customers));
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
                                HTMLFrag += element.location;
                                HTMLFrag += '</figcaption></figure><select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '"/>';                              
                                HTMLFrag += '</fieldset>';
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
                                HTMLFrag += element.location;
                                HTMLFrag += '</figcaption></figure><select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="';
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
                                HTMLFrag += element.location;
                                HTMLFrag += '</figcaption></figure><select>';
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += '<option value="';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '" >';
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += '</option>';
                                });
                                HTMLFrag += '</select></article><textarea>';
                                HTMLFrag += element.address;
                                HTMLFrag += '</textarea>';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="';
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
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '" />';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
                            };
                            if (newChar > compareChar){
                                HTMLFrag += '</fieldset><fieldset><legend>';                              
                                HTMLFrag += newChar;
                                HTMLFrag += '</legend>';  
                                compareChar = newChar;
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '"/>';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
                            }else if(newChar == compareChar){
                                HTMLFrag += '<article><input type="button" class="itemName" value="';
                                HTMLFrag += element.itemName;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="';
                                HTMLFrag += index;
                                HTMLFrag += '" />';
                                HTMLFrag+='<input type="text" class="itemCode" placeholder="';
                                HTMLFrag += element.itemCode;
                                HTMLFrag += '" />';
                                HTMLFrag += '<input type="text" class="itemPrice" placeholder="';
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += '" />';
                                HTMLFrag +='</article>';
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
                    HTMLFrag += '"/><input type="button" class="cancel" value="X" onclick="app.delete.slaughter(this.alt)" alt="';
                    HTMLFrag += index;
                    HTMLFrag += '" />';
                    HTMLFrag += '</article>';
                        
                });
                app.DOM.slaughters.innerHTML = HTMLFrag;

                alert('initialization complete.');
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
            var purchaseTableInputs = document.getElementsByTagName('input'),
                alternate = true,
                foo = {
                    itemCode: '',
                    quantity: 0,
                    weight:0,
                    price:0
                };
            for (var i = 0; i < purchaseTableInputs.length; i++) {
                if (classie.hasClass(purchaseTableInputs[i], 'tableInput')) {
                    if(alternate){
                        alternate = false;
                        foo.itemCode = purchaseTableInputs[i].value;
                    }else{
                        alternate = true;
                        foo.quantity = purchaseTableInputs[i].value;
                        if (foo.itemCode != '') {
                            this.forms.newSale.purchaseTable.push(JSON.stringify(foo));
                        };
                    };
                };
            };
            alert(this.forms.newSale.purchaseTable);
            // Update mapped structure
            var newSale = {
                slaughterDate: this.forms.newSale.slaughterDate(),
                firstName: this.forms.newSale.firstName(),
                lastName: this.forms.newSale.lastName(),
                purchaseTable: this.forms.newSale.purchaseTable,
                location: this.forms.newSale.location().innerHTML,
                total: 0
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
                alert(this.forms.newSlaughter);
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
                alert(newLocation);
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
                                HTMLFrag += '</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable">';
                                HTMLFrag += '<tr><td><input type="text" class="tableInput" onclick="app.purchaseTableAdd(this)" placeholder="Item Code" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>';
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
                }else{
                    this.newTab.children[1].innerHTML = "New " + value.slice(0, -1);
                };
            }
        }
};
app.initialize();