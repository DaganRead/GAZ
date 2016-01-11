(function( window ) {
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
		store : function(type) {
			switch(type){
						case "sale" :
							var temp = JSON.parse(localStorage['data']);
							temp.sales = this.data.sales;
							localStorage['data'] = JSON.stringify(temp);
							console.log(localStorage['data']);
							break;
						case "customer" :
							var temp = JSON.parse(localStorage['data']);
							temp.customers = this.data.customers;
							localStorage['data'] = JSON.stringify(temp);
							console.log(localStorage['data']);
							break;
						case "item" :
							var temp = JSON.parse(localStorage['data']);
							temp.items = this.data.items;
							localStorage['data'] = JSON.stringify(temp);
							console.log(localStorage['data']);
							break;
						case "slaughter" :
							var temp = JSON.parse(localStorage['data']);
							temp.slaughters = this.data.slaughters;
							localStorage['data'] = JSON.stringify(temp);
							console.log(localStorage['data']);
							break;
						case "location" :
							var temp = JSON.parse(localStorage['data']);
							temp.locations = this.data.locations;
							localStorage['data'] = JSON.stringify(temp);
							console.log(localStorage['data']);
							break;
			}
		},
		init : function() {
			if (!localStorage['installed']) {
				localStorage['installed'] = true;
				localStorage['data'] = JSON.stringify({
										sales:[],
										customers:[],
										items:[],
										slaughters:[],
										locations:[]
									});
				console.log('installing...');
			};
			return function () {
				this.data = JSON.parse(localStorage['data']);
				app.binding();
				console.log(this.data);
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
					app.forms.newSale.purchaseTable.forEach(function(element, index, array) {
						HTMLFrag += `<tr><td><input type="text" class="tableInput" placeholder="`;
						HTMLFrag += element.itemCode;
						HTMLFrag += `" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="`;
						HTMLFrag += element.quantity;
						HTMLFrag += `" /></td></tr>`;
					});
					HTMLFrag += `</table><br /><input type="button" class="confirm" value="Confirm" onclick="app.newSale()" /><input type="button" class="cancel" value="Cancel"></article>`;
				app.DOM.newSale.innerHTML = HTMLFrag;
				/* Sales */
				var HTMLFrag = ``;
				this.data.sales.forEach(function(element, index, array) {
					HTMLFrag+=`
								<fieldset>
					    			<legend>
					    				&nbsp;`;
											HTMLFrag += element.slaughterDate;
					HTMLFrag+=`
					    				&nbsp;
					    			</legend>
					    			<figure class="location">
					    				<figcaption>`;
											HTMLFrag += element.location;
					HTMLFrag+=`
					    				</figcaption>
					    			</figure>
					    			Customer:`;
									HTMLFrag += element.customer;
					HTMLFrag+=`
									<br>
									<table class="purchase-table">`;

					element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {

						HTMLFrag+=`
											<tr>
												<td>`;
													HTMLFrag += innerElement.itemCode;
						HTMLFrag+=`
												</td>
												<td>x `;
													HTMLFrag += innerElement.quantity;
						HTMLFrag+=`
												</td>
												<td> R `;
													HTMLFrag += innerElement.price;
						HTMLFrag+=`
												</td>
											</tr>
						`;
					});

					HTMLFrag+=`
									</table>
									<br />
									Total:`;
					HTMLFrag+=`				
								</fieldset>`;
				});
				app.DOM.sales.innerHTML = HTMLFrag;

				/*customers*/
				HTMLFrag = ``;
				var newChar,
					compareChar = '9',
					numbersStarted = false;
				console.log(this.data.customers);
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
				               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
				               	HTMLFrag += element.location;
				               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
				               	HTMLFrag += element.address;
				               	HTMLFrag += `"/></fieldset>`;
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
				               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
				               	HTMLFrag += element.location;
				               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
				               	HTMLFrag += element.address;
				               	HTMLFrag += `"/></fieldset>`;
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
				               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
				               	HTMLFrag += element.location;
				               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
				               	HTMLFrag += element.address;
				               	HTMLFrag += `"/></fieldset>`;
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
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
			               		HTMLFrag += element.itemCode;
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
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
			               		HTMLFrag += element.itemCode;
			               		HTMLFrag += `" />`;
			               		HTMLFrag +=`</article>`;
			               	}else if(newChar == compareChar){
			               		HTMLFrag += `<article><input type="button" class="itemName" value="`;
			               		HTMLFrag += element.itemName;
			               		HTMLFrag += `" />`;
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
			               		HTMLFrag += element.itemCode;
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
			        HTMLFrag += `"/><input type="button" class="cancel" value="Delete"/>`;
			        HTMLFrag += `</article>`;
						
				});
				app.DOM.slaughters.innerHTML = HTMLFrag;

			    console.log('initialization complete.');
			}
		}(),
		forms: {
			newSale : {
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
				purchaseTable:[{
					itemCode : "WC",
					quantity: 2,
					price: 120
				},
				{
					itemCode : "8PCT",
					quantity: 1,
					price: 80
				}]
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
			// Update mapped structure
			var newSale = {
				slaughterDate: this.forms.newSale.slaughterDate(),
				firstName: this.forms.newSale.firstName(),
				lastName: this.forms.newSale.lastName(),
				purchaseTable: this.forms.newSale.purchaseTable
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
			//add to loaded dataset
			var newCustomer = {
				location : this.forms.newCustomer.location(),
				firstName : this.forms.newCustomer.firstName(),
				lastName : this.forms.newCustomer.lastName(),
				email : this.forms.newCustomer.email(),
				telephone : this.forms.newCustomer.telephone(),
				address : this.forms.newCustomer.address()
			};
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
				itemCode : this.forms.newItem.itemCode()
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
				console.log(this.forms.newSlaughter);
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
				console.log(newLocation);
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
								app.forms.newSale.purchaseTable.forEach(function(element, index, array) {
									HTMLFrag += `<tr><td><input type="text" class="tableInput" placeholder="`;
									HTMLFrag += element.itemCode;
									HTMLFrag += `" /></td><td class="headerLarge">x</td><td><input type="text" class="tableInput" placeholder="`;
									HTMLFrag += element.quantity;
									HTMLFrag += `" /></td></tr>`;
								});
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
				console.log("contacts sync success!");
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
				console.log("items sync success!");
			}
		},
		binding : function (){
			Object.observe(app.data.sales, function(changes) {
				changes.forEach(function(element, index, array) {
					if (element.type === "add") {
						//refresh with this data;
						console.log(element.object);
						var HTMLFrag = ``;
						element.object.forEach(function(element, index, array) {
							HTMLFrag+=`
										<fieldset>
							    			<legend>
							    				&nbsp;`;
													HTMLFrag += element.slaughterDate;
							HTMLFrag+=`
							    				&nbsp;
							    			</legend>
							    			<figure class="location">
							    				<figcaption>`;
													HTMLFrag += element.location;
							HTMLFrag+=`
							    				</figcaption>
							    			</figure>
							    			Customer:`;
											HTMLFrag += element.customer;
							HTMLFrag+=`
											<br>
											<table class="purchase-table">`;

							element.purchaseTable.forEach(function(innerElement, innerIndex, innerArray) {

								HTMLFrag+=`
													<tr>
														<td>`;
															HTMLFrag += innerElement.itemCode;
								HTMLFrag+=`
														</td>
														<td>x `;
															HTMLFrag += innerElement.quantity;
								HTMLFrag+=`
														</td>
														<td> R `;
															HTMLFrag += innerElement.price;
								HTMLFrag+=`
														</td>
													</tr>
								`;
							});

							HTMLFrag+=`
											</table>
											<br />
											Total:`;
							HTMLFrag+=`				
										</fieldset>`;
						});
						app.DOM.sales.innerHTML = HTMLFrag;
					};
				});
			});

			Object.observe(app.data.customers, function(changes) {
				changes.forEach(function(innerElement, innerIndex, innerArray) {
					if (innerElement.type === "add") {
					//refresh with this data;
						console.log(innerElement.object);
						var arr = innerElement.object,
							HTMLFrag = ``,
							newChar,
							compareChar = '9',
							numbersStarted = false;
						console.log(arr);
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
						               	HTMLFrag += element.firstName;
						               	HTMLFrag += `" onclick="app.accordion(this.parentNode.parentNode)"/></legend>`;
						               	
						               	HTMLFrag += `<input type="text" placeholder="`;
						               	HTMLFrag += element.firstName;
						               	HTMLFrag += `"/><input type="text" placeholder="`;
						               	HTMLFrag += element.lastName;
						               	HTMLFrag += `"/><input type="email" placeholder="`;
						               	HTMLFrag += element.email;
						               	HTMLFrag += `"/><input type="text" placeholder="`;
						               	HTMLFrag += element.telephone;
						               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
						               	HTMLFrag += element.location;
						               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
						               	HTMLFrag += element.address;
						               	HTMLFrag += `"/></fieldset>`;
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
						               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
						               	HTMLFrag += element.location;
						               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
						               	HTMLFrag += element.address;
						               	HTMLFrag += `"/></fieldset>`;
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
						               	HTMLFrag += `"/><figure class="location" ><figcaption>`;
						               	HTMLFrag += element.location;
						               	HTMLFrag += `</figcaption></figure><input type="textarea" placeholder="`;
						               	HTMLFrag += element.address;
						               	HTMLFrag += `"/></fieldset>`;
					               	};
								app.DOM.customers.innerHTML = HTMLFrag;
						});

					};
				});
			});

			Object.observe(app.data.items, function(changes) {		
				changes.forEach(function(element, innerIndex, innerArray) {
					if (element.type === "add") {
						//refresh with this data;
						console.log(element.object);
						var arr = element.object,
							HTMLFrag = ``, 
							newChar,
							compareChar = '9',
							numbersStarted = false;
						arr.sort(function(a, b) {
							return a.itemName.localeCompare(b.itemName);
						});
						arr.forEach(function(innerElement, index, innerArray) {
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
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
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
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
			               		HTMLFrag += innerElement.itemCode;
			               		HTMLFrag += `" />`;
			               		HTMLFrag +=`</article>`;
			               	}else if(newChar == compareChar){
			               		HTMLFrag += `<article><input type="button" class="itemName" value="`;
			               		HTMLFrag += innerElement.itemName;
			               		HTMLFrag += `" />`;
			               		HTMLFrag += `<input type="button" class="cancel" value="Delete"/>`;
								HTMLFrag+=`<input type="text" class="itemCode" placeholder="`;
			               		HTMLFrag += innerElement.itemCode;
			               		HTMLFrag += `" />`;
			               		HTMLFrag +=`</article>`;
			               	};
							app.DOM.items.innerHTML = HTMLFrag;
						});
					};
				});
			});

			Object.observe(app.data.slaughters, function(changes) {
				changes.forEach(function(element, index, array) {
					if (element.type === "add") {
						//refresh with this data;
						console.log(element.object);
						HTMLFrag = ``;
						var newChar,
							compareChar = '9',
							numbersStarted = false;
						element.object.forEach(function(innerElement, innerIndex, innerArray) {
					               	HTMLFrag += `<article>`;
					               		HTMLFrag += `<span class="slaughterDate">`;
					               		HTMLFrag += innerElement.slaughterDate;
					               		HTMLFrag += `</span><b>-</b><span>Total: </span><input type="text" value="R`;
					               		HTMLFrag += innerElement.total;
					               		HTMLFrag += `"/><input type="button" class="cancel" value="Delete"/>`;
					               		HTMLFrag += `</article>`;
						});
						app.DOM.slaughters.innerHTML = HTMLFrag;
					};
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
		},
		accordion : function(target) {
			classie.toggleClass(target, 'acc-open');
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
							console.log(app.forms.newSale.firstNameMatch);
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
							console.log(app.forms.newSale.lastNameMatch);
							if (app.forms.newSale.firstNameMatch == element.firstName && app.forms.newSale.lastNameMatch == element.lastName) {
								app.forms.newSale.location().innerHTML = element.location;
								classie.addClass(document.getElementById('newSale'), 'acc-open');
							};
						};
					});
				};
		}
	};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( app );
} else {
  // browser global
  window.app = app;
}
})( window );

app.init();
//app.sync.items();
//app.sync.customers();