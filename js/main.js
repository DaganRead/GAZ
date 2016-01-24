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
        alert();
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
            return function () {
                this.data = JSON.parse(window.localStorage['data']);
                app.binding();
                alert(this.data);
                /*New Sales*/
                var HTMLFrag = `<article id="newSale"><span class="header">Slaughter Date:</span><br /><select id="newSaleSlaughterDate">`;
                this.data.slaughters.forEach(function(element, index, array) {
                    HTMLFrag += `<option value="`;
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += `">`;
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += `</option>`;
                });
                HTMLFrag += `</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">`;
                    this.data.locations.forEach(function(element, index, array) {
                        HTMLFrag += `<option value="`;
                        HTMLFrag += element.location;
                        HTMLFrag += `">`;
                        HTMLFrag += element.location;
                        HTMLFrag += `</option>`;
                    });
                    HTMLFrag += `</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable">`;
                    HTMLFrag += `<tr><td><input type="text" class="tableInput" onclick="app.purchaseTableAdd(this)" placeholder="Item Code" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>`;
                    HTMLFrag += `</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel"></article>`;
                app.DOM.newSale.innerHTML = HTMLFrag;
                /* Sales */
                var HTMLFrag = ``;
                this.data.sales.forEach(function(element, index, array) {
                            HTMLFrag +=`<fieldset alt="`;
                            HTMLFrag += index;
                            HTMLFrag += `"><legend>&nbsp;`;
                            HTMLFrag += element.slaughterDate;
                            HTMLFrag+=`&nbsp;</legend><figure class="location"><figcaption>`;
                            HTMLFrag += element.location;
                            HTMLFrag+=`</figcaption></figure>`;
                            HTMLFrag += element.firstName;
                            HTMLFrag+=`&nbsp;`;
                            HTMLFrag += element.lastName;
                            HTMLFrag+=`<br class="clear"><table class="purchase-table">`;
                            element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                                innerElement = JSON.parse(innerElement);
                                HTMLFrag += `<tr><td><input type="text" class="itemCode" alt="`;
                                HTMLFrag += innerIndex;
                                HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += `"/></td><td class="headerLarge">X</td><td class="small"><input type="text" class="quantity" alt="`;
                                HTMLFrag += innerIndex;
                                HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                HTMLFrag += innerElement.quantity;
                                HTMLFrag += `"/></td><td class="small"><input type="text" class="priceTag" alt="`;
                                HTMLFrag += innerIndex;
                                HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                HTMLFrag += innerElement.weight;
                                HTMLFrag += `"/></td><td><span id="priceTag">R 0</span></td></tr>`;
                            });

                            HTMLFrag+=`</table><br />`;
                            HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.sale(this.alt)" value="Delete" alt="`;
                            HTMLFrag += index;
                            HTMLFrag += `"/>Total:<span>`;
                            HTMLFrag += element.total;
                            HTMLFrag += `</span>`;
                            HTMLFrag+=`</fieldset>`;
                        });
                app.DOM.sales.innerHTML = HTMLFrag;

                /*customers*/
                HTMLFrag = ``;
                var newChar,
                    compareChar = '9',
                    numbersStarted = false;
                alert(this.data.customers);
                this.data.customers.sort(function(a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
                this.data.customers.forEach(function(element, index, array) {
                            newChar = element.firstName.charAt(0);
                            if (newChar < compareChar) {
                                if (element == array[0]) {
                                    HTMLFrag += `
                                    <fieldset>
                                        <legend>#</legend>
                                    `;
                                };
                                HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                
                                HTMLFrag += `<input type="text" placeholder="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.lastName;
                                HTMLFrag += `"/><input type="email" placeholder="`;
                                HTMLFrag += element.email;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.telephone
                                HTMLFrag += `"/><br /><article>`;
                                HTMLFrag += `<figure class="location" ><figcaption>`;
                                HTMLFrag += element.location;
                                HTMLFrag += `</figcaption></figure><select>`;
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += `<option value="`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `" >`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `</option>`;
                                });
                                HTMLFrag += `</select></article><textarea>`;
                                HTMLFrag += element.address;
                                HTMLFrag += `</textarea>`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `"/>`;                              
                                HTMLFrag += `</fieldset>`;
                            };
                            if (newChar > compareChar){
                                HTMLFrag += `
                                </fieldset>
                                <fieldset>
                                    <legend>
                                `;                              
                                HTMLFrag += newChar;
                                HTMLFrag += `
                                    </legend>
                                `;  
                                compareChar = newChar;
                                HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                
                                HTMLFrag += `<input type="text" placeholder="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.lastName;
                                HTMLFrag += `"/><input type="email" placeholder="`;
                                HTMLFrag += element.email;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.telephone
                                HTMLFrag += `"/><br /><article>`;
                                HTMLFrag += `<figure class="location" ><figcaption>`;
                                HTMLFrag += element.location;
                                HTMLFrag += `</figcaption></figure><select>`;
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += `<option value="`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `" >`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `</option>`;
                                });
                                HTMLFrag += `</select></article><textarea>`;
                                HTMLFrag += element.address;
                                HTMLFrag += `</textarea>`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `"/>`;                              
                                HTMLFrag += `</fieldset>`;
                            }else if(newChar == compareChar){
                                HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                
                                HTMLFrag += `<input type="text" placeholder="`;
                                HTMLFrag += element.firstName;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.lastName;
                                HTMLFrag += `"/><input type="email" placeholder="`;
                                HTMLFrag += element.email;
                                HTMLFrag += `"/><input type="text" placeholder="`;
                                HTMLFrag += element.telephone
                                HTMLFrag += `"/><br /><article>`;
                                HTMLFrag += `<figure class="location" ><figcaption>`;
                                HTMLFrag += element.location;
                                HTMLFrag += `</figcaption></figure><select>`;
                                app.data.locations.forEach(function(innerElement, innerIndex, innerArray) {
                                    HTMLFrag += `<option value="`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `" >`;
                                    HTMLFrag += innerElement.location;
                                    HTMLFrag += `</option>`;
                                });
                                HTMLFrag += `</select></article><textarea>`;
                                HTMLFrag += element.address;
                                HTMLFrag += `</textarea>`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `"/>`;                              
                                HTMLFrag += `</fieldset>`;
                            };
                        app.DOM.customers.innerHTML = HTMLFrag;
                });
                /*items*/
                HTMLFrag = ``, 
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
                                    HTMLFrag += `
                                    <fieldset>
                                        <legend>#</legend>
                                    `;
                                };
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += element.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `" />`;
                                HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += element.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="text" class="itemPrice" placeholder="`;
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += `" />`;
                                HTMLFrag +=`</article>`;
                            };
                            if (newChar > compareChar){
                                HTMLFrag += `
                                </fieldset>
                                <fieldset>
                                    <legend>
                                `;                              
                                HTMLFrag += newChar;
                                HTMLFrag += `
                                    </legend>
                                `;  
                                compareChar = newChar;
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += element.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `"/>`;
                                HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += element.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="text" class="itemPrice" placeholder="`;
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += `" />`;
                                HTMLFrag +=`</article>`;
                            }else if(newChar == compareChar){
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += element.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += index;
                                HTMLFrag += `" />`;
                                HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += element.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="text" class="itemPrice" placeholder="`;
                                HTMLFrag += element.itemPrice;
                                HTMLFrag += `" />`;
                                HTMLFrag +=`</article>`;
                            };
                        app.DOM.items.innerHTML = HTMLFrag;
                });
                /*slaughters*/
                HTMLFrag = ``;
                this.data.slaughters.sort(function(a, b) {
                    return a.slaughterDate.localeCompare(b.slaughterDate);
                });
                this.data.slaughters.forEach(function(element, index, array) {
                    HTMLFrag += `<article>`;
                    HTMLFrag += `<span class="slaughterDate">`;
                    HTMLFrag += element.slaughterDate;
                    HTMLFrag += `</span><b>-</b><span>Total: </span><input type="text" value="R`;
                    HTMLFrag += element.total;
                    HTMLFrag += `"/><input type="button" class="cancel" value="X" onclick="app.delete.slaughter(this.alt)" alt="`;
                    HTMLFrag += index;
                    HTMLFrag += `" />`;
                    HTMLFrag += `</article>`;
                        
                });
                app.DOM.slaughters.innerHTML = HTMLFrag;

                alert('initialization complete.');
            }
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
                            var HTMLFrag = `<article id="newSale"><span class="header">Slaughter Date:</span><br /><select id="newSaleSlaughterDate">`;
                            app.data.slaughters.forEach(function(element, index, array) {
                                HTMLFrag += `<option value="`;
                                HTMLFrag += element.slaughterDate;
                                HTMLFrag += `">`;
                                HTMLFrag += element.slaughterDate;
                                HTMLFrag += `</option>`;
                            });
                            HTMLFrag += `</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">`;
                                app.data.locations.forEach(function(element, index, array) {
                                    HTMLFrag += `<option value="`;
                                    HTMLFrag += element.location;
                                    HTMLFrag += `">`;
                                    HTMLFrag += element.location;
                                    HTMLFrag += `</option>`;
                                }); 
                                HTMLFrag += `</select><input type="text" placeholder="New Location" id="newSaleAddLocationText"/><input type="button" id="newSaleAddLocationBtn" value="Add" onclick="app.newLocation()"><br class="clear"/><span class="header">Purchase Table:</span><br /><table id="newSalePurchaseTable">`;
                                HTMLFrag += `<tr><td><input type="text" class="tableInput" onclick="app.purchaseTableAdd(this)" placeholder="Item Code" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td></tr>`;
                                HTMLFrag += `</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel"></article>`;
                            parent.children[2].innerHTML = HTMLFrag;
                            break;
                        case "Customers" :
                                HTMLFrag = `<article id="newCustomer">
                                    <span>New Customer Details:</span><br class="clear"/>
                                    <input type="text" placeholder="First Name" id="newCustomerFirstName"/>
                                    <input type="text" placeholder="Last Name" id="newCustomerLastName"/><br />
                                    <input type="email" placeholder="Email" id="newCustomerEmail"/><br />
                                    <input type="text" placeholder="046-625 526 0" id="newCustomerTelephone"/><br />
                                    <textarea id="newCustomerAddress" cols="50">Address</textarea> 
                                    <br class="clear" />
                                    <select id="newCustomerLocationSelect">`;
                                    app.data.locations.forEach(function(element, index, array) {
                                        HTMLFrag += `<option value="`;
                                        HTMLFrag += element.location;
                                        HTMLFrag += `">`;
                                        HTMLFrag += element.location;
                                        HTMLFrag += `</option>`;
                                    });
                                    HTMLFrag += `</select>
                                    <input type="text" placeholder="New Location" id="newCustomerAddLocationText"/>
                                    <input type="button" id="newCustomerAddLocationBtn" value="Add" onclick="app.newLocation()">
                                    <br class="clear"/>
                                    <input type="button" class="confirm" value="Confirm" onclick="app.newCustomer()" />
                                    <input type="button" class="cancel" value="Cancel">
                                </article>
                            `;
                            parent.children[2].innerHTML = HTMLFrag;
                            break;
                        case "Items" :
                            parent.children[2].innerHTML = `
                                <article id="newItem">
                                    <input type="text" id="newItemName" placeholder="Item Name"/>
                                    <input type="text" id="newItemCode" placeholder="Item Code"/>
                                    <input type="text" id="newItemPrice" placeholder="R0.00"/>
                                    <br />
                                    <input type="button" class="confirm"value="Confirm" onclick="app.newItem()" />
                                    <input type="button" class="cancel" value="Cancel">
                                </article>
                            `;
                            break;
                        case "Slaughters" :
                            parent.children[2].innerHTML = `
                                <article id="newSlaughter">
                                    <span>New Slaughter Date:</span>
                                    <br />
                                    <input type="text" id="newSlaughterDate" placeholder="Fri Jan 01 2016"/>
                                    <br />
                                    <input type="button" class="confirm" value="Confirm" onclick="app.newSlaughter()" />
                                    <input type="button" class="cancel" value="Cancel">
                                </article>
                            `;
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
        },
        sync : {
            customers : function() {
                app.data.customers = [{
                    firstName : 'Zoro',
                    lastName : 'Zed',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Alex',
                    lastName : 'Arron',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Dagan',
                    lastName : 'Dollar',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'SS',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Dagan',
                    lastName : 'Dollar2',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'GT',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Bob',
                    lastName : 'Blade',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Abby',
                    lastName : 'Adelaid',
                    email : 'Abby@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Bernard',
                    lastName : 'Barron',
                    email : 'Bernard@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Dave',
                    lastName : 'Dare',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'GT',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Dave',
                    lastName : 'Daring',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'BH',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Graeme',
                    lastName : 'Green',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : '222',
                    lastName : 'Dollar',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                },
                {
                    firstName : 'Gray',
                    lastName : 'Gloomsday',
                    email : 'Arron@gmail.com',
                    telephone : '0763363078',
                    location : 'PA',
                    address : 'farm 2 southseas 6172'
                }
                ];
                app.data.customers.sort(function(a, b) {
                    return a.firstName.localeCompare(b.firstName);
                });
                app.store('customer');
                alert("contacts sync success!");
            },
                items : function() {
                app.data.items = [{
                    itemName : '8 Piece Chicken Theigh',
                    itemCode : '8PCT',
                    itemDescription : 'description goes here'
                },
                {
                    itemName : '8 Piece Chicken Drumstick',
                    itemCode : '8PCD',
                    itemDescription : 'description goes here'
                },
                {
                    itemName : 'Dozen eggs',
                    itemCode : 'DE',
                    itemDescription : 'description goes here'
                },
                {
                    itemName : 'Half dozen eggs',
                    itemCode : 'HDE',
                    itemDescription : 'description goes here'
                },
                {
                    itemName : 'Whole Chicken',
                    itemCode : 'WC',
                    itemDescription : 'description goes here'
                },
                {
                    itemName : 'z',
                    itemCode : 'z',
                    itemDescription : 'description goes here'
                }
                ];
                app.data.items.sort(function(a, b) {
                    return a.itemName.localeCompare(b.itemName);
                });
                app.store('item');
                alert("items sync success!");
            }
        },
        binding : function (){
            Object.observe(app.data.sales, function(changes) {
                changes.forEach(function(element, index, array) {
                    var HTMLFrag = ``;
                        //refresh with this data;
                        app.data.sales.forEach(function(element, index, array) {
                                    HTMLFrag +=`<fieldset alt="`;
                                    HTMLFrag += index;
                                    HTMLFrag += `"><legend>&nbsp;`;
                                    HTMLFrag += element.slaughterDate;
                                    HTMLFrag+=`&nbsp;</legend><figure class="location"><figcaption>`;
                                    HTMLFrag += element.location;
                                    HTMLFrag+=`</figcaption></figure>`;
                                    HTMLFrag += element.firstName;
                                    HTMLFrag+=`&nbsp;`;
                                    HTMLFrag += element.lastName;
                                    HTMLFrag+=`<br class="clear"><table class="purchase-table">`;
                                    element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {
                                        innerElement = JSON.parse(innerElement);
                                        HTMLFrag += `<tr><td><input type="text" class="itemCode" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                        HTMLFrag += innerElement.itemCode;
                                        HTMLFrag += `"/></td><td class="headerLarge">X</td><td class="small"><input type="text" class="quantity" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                        HTMLFrag += innerElement.quantity;
                                        HTMLFrag += `"/></td><td class="small"><input type="text" class="priceTag" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `" oninput="app.update.sale(this)" placeholder="`;
                                        HTMLFrag += innerElement.weight;
                                        HTMLFrag += `"/></td><td><span id="priceTag">R 0</span></td></tr>`;
                                    });

                                    HTMLFrag+=`</table><br />`;
                                    HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.sale(this.alt)" value="Delete" alt="`;
                                    HTMLFrag += index;
                                    HTMLFrag += `"/>Total:<span>`;
                                    HTMLFrag += element.total;
                                    HTMLFrag += `</span>`;
                                    HTMLFrag+=`             
                                                </fieldset>`;
                                });
                                app.DOM.sales.innerHTML = HTMLFrag;
                });
            });

            Object.observe(app.data.customers, function(changes) {
                changes.forEach(function(element, index, array) {
                        var arr = element.object,
                            HTMLFrag = ``,
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
                                            HTMLFrag += `
                                            <fieldset>
                                                <legend>#</legend>
                                            `;
                                        };
                                        HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                        
                                        HTMLFrag += `<input type="text" placeholder="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += `"/><input type="email" placeholder="`;
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += `"/><br /><article>`;
                                        HTMLFrag += `<figure class="location" ><figcaption>`;
                                        HTMLFrag += innerElement.location;
                                        HTMLFrag += `</figcaption></figure><select>`;
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += `<option value="`
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += `" >`;
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += `</option>`;
                                        });
                                        HTMLFrag += `</select></article><textarea>`;
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += `</textarea>`;
                                        HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `"/>`;
                                        HTMLFrag += `</fieldset>`;
                                    };
                                    if (newChar > compareChar){
                                        HTMLFrag += `
                                        </fieldset>
                                        <fieldset>
                                            <legend>
                                        `;                              
                                        HTMLFrag += newChar;
                                        HTMLFrag += `
                                            </legend>
                                        `;  
                                        compareChar = newChar;
                                        HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                        
                                        HTMLFrag += `<input type="text" placeholder="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += `"/><input type="email" placeholder="`;
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += `"/><br /><article>`;
                                        HTMLFrag += `<figure class="location" ><figcaption>`;
                                        HTMLFrag += innerElement.location;
                                        HTMLFrag += `</figcaption></figure><select>`;
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += `<option value="`
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += `" >`;
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += `</option>`;
                                        });
                                        HTMLFrag += `</select></article><textarea>`;
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += `</textarea>`;
                                        HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `"/>`;
                                        HTMLFrag += `</fieldset>`;
                                    }else if(newChar == compareChar){
                                        HTMLFrag += `<fieldset><legend><input type="button" value="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
                                        HTMLFrag += `<input type="text" placeholder="`;
                                        HTMLFrag += innerElement.firstName;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.lastName;
                                        HTMLFrag += `"/><input type="email" placeholder="`;
                                        HTMLFrag += innerElement.email;
                                        HTMLFrag += `"/><input type="text" placeholder="`;
                                        HTMLFrag += innerElement.telephone;
                                        HTMLFrag += `"/><br /><article>`;
                                        HTMLFrag += `<figure class="location" ><figcaption>`;
                                        HTMLFrag += innerElement.location;
                                        HTMLFrag += `</figcaption></figure><select>`;
                                        app.data.locations.forEach(function(inElem, inIndx, inArr) {
                                            HTMLFrag += `<option value="`
                                            HTMLFrag += inElem.location;
                                            HTMLFrag += `" >`;
                                            HTMLFrag += inElem.location;
                                        HTMLFrag += `</option>`;
                                        });
                                        HTMLFrag += `</select></article><textarea>`;
                                        HTMLFrag += innerElement.address;
                                        HTMLFrag += `</textarea>`;
                                        HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.customer(this.alt)" value="Delete" alt="`;
                                        HTMLFrag += innerIndex;
                                        HTMLFrag += `"/>`;
                                        HTMLFrag += `</fieldset>`;
                                    };
                        });
                        app.DOM.customers.innerHTML = HTMLFrag;
                });
            });

            Object.observe(app.data.items, function(changes) {      
                changes.forEach(function(element, index, array) {
                        var arr = element.object,
                            HTMLFrag = ``, 
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
                                    HTMLFrag += `
                                    <fieldset>
                                        <legend>#</legend>
                                    `;
                                };
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += innerIndex;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag +=`</article>`;
                            };
                            if (newChar > compareChar){
                                HTMLFrag += `
                                </fieldset>
                                <fieldset>
                                    <legend>
                                `;                              
                                HTMLFrag += newChar;
                                HTMLFrag += `
                                    </legend>
                                `;  
                                compareChar = newChar;
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += innerElement;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag += `</article>`;
                            }else if(newChar == compareChar){
                                HTMLFrag += `<article><input type="button" class="itemName" value="`;
                                HTMLFrag += innerElement.itemName;
                                HTMLFrag += `" />`;
                                HTMLFrag += `<input type="button" class="cancel" onclick="app.delete.item(this.alt)" value="X" alt="`;
                                HTMLFrag += innerIndex;
                                HTMLFrag += `"/>`;
                                HTMLFrag += `<input type="text" class="itemCode" placeholder="`;
                                HTMLFrag += innerElement.itemCode;
                                HTMLFrag += `" />`;
                                HTMLFrag += `</article>`;
                            };
                        });
                        app.DOM.items.innerHTML = HTMLFrag;
                });
            });

            Object.observe(app.data.slaughters, function(changes) {
                changes.forEach(function(element, index, array) {
                        HTMLFrag = ``;
                        var newChar,
                            compareChar = '9',
                            numbersStarted = false;
                        //refresh with this data;
                        alert(element.object);
                        element.object.forEach(function(innerElement, innerIndex, innerArray) {
                            HTMLFrag += `<article>`;
                            HTMLFrag += `<span class="slaughterDate">`;
                            HTMLFrag += innerElement.slaughterDate;
                            HTMLFrag += `</span><b>-</b><span>Total: </span><input type="text" value="R`;
                            HTMLFrag += innerElement.total;
                            HTMLFrag += `"/><input type="button" class="cancel" value="X" onclick="app.delete.slaughter(this.alt)" alt="`;
                            HTMLFrag += innerIndex;
                            HTMLFrag += `" />`;
                            HTMLFrag += `</article>`;
                        });
                        app.DOM.slaughters.innerHTML = HTMLFrag;
                });
            });

            Object.observe(app.data.locations, function(changes) {
                changes.forEach(function(element, index, array) {
                    if (element.type === "add") {
                        //refresh with this data;
                        alert(element.object);
                        HTMLFrag = ``;
                        HTMLFrag += `</select><br /><span class="header">Customer:</span><br /><figure class="location"><figcaption id="newSaleLocation"></figcaption></figure><input type="text" placeholder="Last Name" oninput="app.customerSearch( null, this.value )" id="newSaleLastName"/><input type="text" placeholder="First Name" id="newSaleFirstName" oninput="app.customerSearch( this.value )" /><br class="clear" /><input type="email" placeholder="Email" id="newSaleEmail"/><br /><input type="text" placeholder="046-625 526 0" id="newSaleTelephone"/><br /><textarea id="newSaleAddress" cols="50">Address</textarea> <br class="clear" /><select id="newSaleLocationSelect">`;
                        app.data.locations.forEach(function(element, index, array) {
                            HTMLFrag += `<option value="`;
                            HTMLFrag += element.location;
                            HTMLFrag += `">`;
                            HTMLFrag += element.location;
                            HTMLFrag += `</option>`;
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
                var input = document.createElement('tr');
                input.innerHTML = `<td><input type="text" class="tableInput" onclick="app.purchaseTableAdd(this)" placeholder="itemCode" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="0" /></td>`;
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
                            alert(app.forms.newSale.firstNameMatch);
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
                            alert(app.forms.newSale.lastNameMatch);
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
                    alert(sale);
                var data = function() {
                    var children = target.parentNode.parentNode.children;
                        for (var i = 0; i < sale.purchaseTable.length; i++) {
                            sale.purchaseTable[target.alt] = {
                                itemCode : children[0].children[0].value || children[0].children[0].placeholder,
                                quantity: children[2].children[0].value || children[2].children[0].placeholder,
                                price: children[3].children[0].value || children[3].children[0].placeholder.slice(2, -1)
                            };
                        };
                        alert(sale);
                        return sale;
                };
                var totalDOM = target.parentNode.parentNode.parentNode.parentNode.parentNode.children;
                totalDOM = totalDOM[totalDOM.length - 1];
                data();
                var total=0;
                sale.purchaseTable.forEach(function(element, index, array) {
                    total += Number.parseInt(element.quantity) * Number.parseInt(element.price);
                    sale.purchaseTable[index] = JSON.stringify(element);
                });
                totalDOM.innerHTML = total;
                sale.total = total;
                app.data.sales[saleAlt] = sale;
                app.store('sale');
            }
        },
        delete : {
            sale : function(index) {
                alert(index);
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
        }
    };

//eventlistener
var el = document.body;
//el.addEventListener("touchstart", app.simulate, false);
el.addEventListener("touchend", app.simulate, false);
//el.addEventListener("touchcancel", app.simulate, false);
//el.addEventListener("touchmove", app.simulate, false);
alert("initialized touch.");
// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( app );
} else {
  // browser global
  window.app = app;
}
app.initialize();