'use strict';

angular.module('conferenceBuddyApp')
	.controller('TrackController', ['$scope', 'ConferenceService', 'DialogService', function ($scope, conferenceService, dialogService) {

		$scope.conference = {tracks: []};
		$scope.currentTrack = null;
		$scope.showDetailsIndex = -1;

		var currentTrackId = 0;

		conferenceService.load().then(function (conference) {
			$scope.conference = conference;
			updateTrack();
		}).catch(function (err) {
			dialogService.showError('Backend Error', 'Failed to load conference data from the backend',
					err.data + ' HTTP-Status:' + err.status);
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

		$scope.nextTrack = function () {
			if ($scope.hasNextTrack()) {
				currentTrackId += 1;
				updateTrack();
			}
		};

		$scope.hasNextTrack = function () {
			return $scope.conference.tracks.length > currentTrackId + 1;
		};

		$scope.previousTrack = function () {
			if ($scope.hasPreviousTrack()) {
				currentTrackId -= 1;
				updateTrack();
			}
		};

		$scope.hasPreviousTrack = function () {
			return currentTrackId > 0;
		};

		$scope.toggleDetails = function (index) {
			$scope.showDetailsIndex = $scope.showDetailsIndex === index ? -1 : index;
		};

		function updateTrack() {
			$scope.currentTrack = $scope.conference.tracks[currentTrackId];
		}

	}]);