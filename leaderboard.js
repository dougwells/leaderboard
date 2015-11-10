PlayersList = new Meteor.Collection('players');



if (Meteor.isClient){


    Template.leaderboard.helpers({
        player: function(){
            return PlayersList.find({},{sort:{score:-1, name:1}});
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
        },

        'click #increment': function(){
            var id = Session.get('selectedPlayer');
            var newScore = 5+ PlayersList.findOne({_id:id}).score;
            PlayersList.update({_id:id}, {$set:{score: newScore}});
            console.log(newScore);

        }
    });

}

if (Meteor.isServer){

}