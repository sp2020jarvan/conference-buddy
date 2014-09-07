'use strict';

angular.module('conferenceBuddyApp')
	.controller('TrackController', ['$scope', 'ConferenceService', 'DialogService', function ($scope, conferenceService, dialogService) {

    $scope.conference = {tracks: [ ]};
    $scope.currentTrack = null;
    $scope.copperfield = '';

    var currentTrackIndex = 0;

    conferenceService.load().then(function(conference) {
        $scope.conference = conference;
        updateTrack();
    }).catch(function(err) {
        dialogService.showError('Backend Error', 'Failed to load conference data from the backend', err.data + ' HTTP-Status:' + err.status);
    });

		commentService.load().then(function (data) {
			$scope.comments = data;
		});

		$scope.formatSpeakers = function (talk) {
			var speakers = '';
			talk.speakers.forEach(function (speaker) {
				if (speakers !== '') {
					speakers += ' & ';
				}
				speakers += speaker.name + ' ' + speaker.surname;
			});
			return speakers;
		};

    $scope.previousTrack = function() {
        if ($scope.hasPreviousTrack()) {
            currentTrackIndex -= 1;
            updateTrack();
        }
    };

    $scope.hasPreviousTrack = function() {
        return currentTrackIndex > 0;
    };

    $scope.showDetails = function(index) {
        var talk = $scope.currentTrack.talks[index];
        if ($scope.hasAbstract(talk)) {
            var options = {
                talk: talk,
                formatSpeakers: $scope.formatSpeakers
            };
            dialogService.showModal({templateUrl: 'partials/talk.html'}, options);
        }
    };

    $scope.hasAbstract = function(talk) {
        return talk.abstract && talk.abstract.length > 0;
    };

		$scope.showDetails = function (index) {
			var talk = $scope.currentTrack.talks[index];
			if ($scope.hasAbstract(talk)) {
				var options = {
					talk: talk,
					formatSpeakers: $scope.formatSpeakers
				};
				dialogService.showModal({templateUrl: 'partials/talk.html'}, options);
			}
		};

    function updateTrack() {
        $scope.currentTrack = $scope.conference.tracks[currentTrackIndex];
        toggleMagic();
    }

	}]);
