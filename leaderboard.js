PlayersList = new Meteor.Collection('players');



if (Meteor.isClient){

    Template.leaderboard.helpers({
        player: function(){
            return "a bit of text"
        }
    });

}

if (Meteor.isServer){

}