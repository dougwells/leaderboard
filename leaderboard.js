PlayersList = new Meteor.Collection('players');



if (Meteor.isClient){


    Template.leaderboard.helpers({
        player: function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({createdBy: currentUserId},{sort:{score:-1, name:1}});
        },

        //run in HTML therefore "this" comes from HTML for each "player"
        changeColor: function(){
            if(this._id == Session.get('selectedPlayer')){
                return "yellow";
            }
        },

        playerName: function(){
            var selPlayer = Session.get('sName');
            return selPlayer;
        }
    });

    Template.leaderboard.events({
        'click li.player': function(){
            Session.set('selectedPlayer', this._id);
            Session.set('sName', this.name);
        },

        'click #increment': function(){
            var id = Session.get('selectedPlayer');
            var newScore = 5+ PlayersList.findOne({_id:id}).score;
            PlayersList.update({_id:id}, {$set:{score: newScore}});
        },
        'click #decrement': function(){
            var id = Session.get('selectedPlayer');
            var newScore = -5+ PlayersList.findOne({_id:id}).score;
            PlayersList.update({_id:id}, {$set:{score: newScore}});
        },

        'click #deletePlayer':function(){
            var id = Session.get('selectedPlayer');
            PlayersList.remove({_id: id});
        }
    });

    Template.addPlayerForm.events({
        'submit form' : function(event, template){
            event.preventDefault();
            var playerNameVar = template.find('#playerName').value;
            var currentUserId = Meteor.userId();
            PlayersList.insert({
                name:playerNameVar,
                score:0,
                createdBy: currentUserId
            });
        }
    })

}

if (Meteor.isServer){

}