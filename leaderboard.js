PlayersList = new Meteor.Collection('players');



if (Meteor.isClient){
    Meteor.subscribe('thePlayers');



    Template.leaderboard.helpers({
        player: function(){
            var currentUserId = Meteor.userId();
            return PlayersList.find({},{sort:{score:-1, name:1}});
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
            Meteor.call('incPlayerScore', id, newScore);
        },
        'click #decrement': function(){
            var id = Session.get('selectedPlayer');
            var newScore = -5+ PlayersList.findOne({_id:id}).score;
            Meteor.call('incPlayerScore', id, newScore);
        },

        'click #deletePlayer':function(){
            var id = Session.get('selectedPlayer');
            Meteor.call('deletePlayerData', id)
        }
    });

    Template.addPlayerForm.events({
        'submit form' : function(event, template){
            event.preventDefault();
            var playerNameVar = template.find('#playerName').value;
            Meteor.call("insertPlayerData", playerNameVar);
            playerNameVar = '';
        }
    })

}

if (Meteor.isServer){
    Meteor.publish('thePlayers', function() {
        return PlayersList.find({createdBy:this.userId});
    });

    Meteor.methods({
        'insertPlayerData': function(pName){
            PlayersList.insert({
                name:pName,
                score:0,
                createdBy: Meteor.userId()
            });
        },

        'deletePlayerData': function(id){
            PlayersList.remove({_id: id});
        },

        'incPlayerScore': function(id, newScore){
            PlayersList.update({_id:id}, {$set:{score: newScore}});
        }
    });
}