Meteor.subscribe('instance');
Meteor.subscribe('emailList');


Template.manager.rendered = function(){
	var app = Instance.findOne({name: "bandersnatch"}); 
	$('#notif2').hide();
	if(app.status == "on"){
		$('#notif').html("App is currently running");
		$('#on').hide();
		$('#off').show();
	}else{
		$('#notif').html("App is currently off");
		$('#on').show();
		$('#off').hide();
	}
	
};

Template.manager.helpers({
	'bev': function(){
		return Beverages.find().fetch();
	},
	'snack': function(){
		return Snacks.find().fetch(); 
	},
	'bagel': function(){
		return Bagels.find().fetch();
	},
	'mixin': function(){
		return Milkshakes.find({type: "mixin"}).fetch(); 
	},
	'flavor': function(){
		return Milkshakes.find({type:'flavor'}).fetch();
	},
	'recip': function(){
		return EmailList.find({}).fetch(); 
	}
});

Template.emailChain.helpers({
	'indvEmail':function(){
		return this.email; 
	}, 

});

Template.manager.events({
	'click #on': function(evt) {
		Meteor.call("appOn");
		$('#notif').html("App is currently running");
		$('#on').hide();
		$('#off').show();
	},
	
	'click #off': function(evt) {
		Meteor.call("appOff");
		$('#notif').html("App is currently off");
		$('#on').show();
		$('#off').hide();
	},

	'click #sendEmail': function(evt){
		/* for loop that pulls all names from ul list and separated by ',' */
		Meteor.call('sendEmail', function(error,result) {
				if (error)
					return alert(error.reason); 
			}); 
		Meteor.call('pushFinished');

		
		$('#notif2').show();
   	  	setTimeout(function(){
          $("#notif2").fadeOut(1000);
   	 	}, 3000);
	},
	
	'click #addRecip': function(evt){
		var emailz = $('#recieveEmail').val(); 
		$('#recieveEmail').val('')
		Meteor.call('addToEmailList', emailz, function(error,result) {
				if (error)
					return alert(error.reason); 
			});
	},
	
	'click #addNewItem': function(evt){
		var itemType = $("#itemType").val(); 
		var itemName = $($("#itemTitle")).val();
		var itemPrice = parseFloat($($("#dollar")).val() + "." + $($("#cents")).val()); 
		Meteor.call('addNewItem',itemType, itemName, itemPrice, function(error,result) {
				if (error)
					return alert(error.reason); 
			});
		$('#notifAdded').show();
   	  	setTimeout(function(){
          $("#notifAdded").fadeOut(1000);
   	 	}, 3000);
	},
	
	'click .delEmail':function(evt){
		Meteor.call('delEmail', this.email, function(error, result){
			if(error)
				return alert(error.reason);
		});
	},

	'click #delThis': function(evt){
		var itemType = $('#first-choice').val();
		var item = $('#deleteItem').val();
		Meteor.call('deleteItem',itemType, item, function(error,result) {
				if (error)
					return alert(error.reason); 
			});
	},
	
});



