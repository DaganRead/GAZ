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
            app.binding();
            alert(JSON.stringify(this.data));  

        }()
};
app.binding = function (){
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
                        console.log(element.object);
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
                        console.log(element.object);
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
        };