Template.home.events({
	'submit .newsletter-form' : function (e) {
		e.preventDefault();
		let userId = e.target.email.value;
//		console.log(e.target.email.value);
		Signup.insert({
			userId: userId
		}, function(err) {
			if (!err) {
				e.target.email.value = "";
				FlashMessages.sendSuccess("Thank you!");
			}
			else {
				FlashMessages.sendError(err);
			}
		});
	},
	'input .quantity': function (event, template) {
		Session.set("qty", event.currentTarget.value);
		let kg = parseInt(Session.get("kg"));
		
		Session.set("total", (kg* event.currentTarget.value*50) + 100);
		
	},
	'change .kgs': function (event, template) {
		Session.set("kg", event.currentTarget.value);
		let qty = parseInt(Session.get("qty"));
		Session.set("total", (qty* event.currentTarget.value*50) + 100);
		
	},
	'click .place-order' : function (e) {
		e.preventDefault();
		let kgs = $("[name='kgs']").val();
		let quantity = $("[name='quantity']").val();
		let address = $("[name='address']").val();
		let contactName = $("[name='name']").val();
		let contactNumber = $("[name='number']").val();
		let email = $("input[name='orderemail']").val();
		
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        

		if(!email || !contactName || !contactNumber || !address || !quantity || !kgs){
			
			FlashMessages.sendError("Please complete all fields");
		}
		else if(!re.test(email.toLowerCase())) {
			FlashMessages.sendError("Please enter a valid email");
		}
		else {
			let text = "You've got a new order\n" +"KGs: " + kgs + "\nQuantity: " +quantity+ "\nCustomer Name: " + contactName + "\nCustomer Email: " + email + "\nCustomer Number: " + contactNumber + "\nCustomer Address: " + address + "\nTotal: " + Session.get("total");
			console.log(text);
			Session.set("submitting", true);
			Meteor.call("sendEmail", text, email, function (err) {
				if(!err) {
					Session.set("submitting", false);
					FlashMessages.sendSuccess("Order Placed");

					kgs.val("");
					email.val("");
					contactName.val("");
					contactNumber.val("");
					address.val("");
					
				}
			});
		}
		
		

	}
});

Template.home.onRendered(function() {
	$('.team-details').showMore({
		minheight: 74,
		animationspeed: 250,
		buttoncss: 'show-button'
	});
});

Template.home.helpers({
	total: function() {
		return Session.get("total") || "0";
	},
	submitting : function() {
		return Session.get("submitting");
	}
});