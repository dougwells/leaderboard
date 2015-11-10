PlayersList = new Meteor.Collection('players');



if (Meteor.isClient){


    Template.leaderboard.helpers({
        player: function(){
            return PlayersList.find();
        },
        changeColor: function(){
            if(this._id == Session.get('selectedPlayer')){
                return "yellow";
            }
        }
    });

    Template.leaderboard.events({
        'click li.player': function(){
            Session.set('selectedPlayer', this._id);
        }
    });

}

if (Meteor.isServer){

}