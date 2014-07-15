/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/// <reference path="../vendor/jquery.d.ts" />

module Respawn {
    var $respawn: JQuery = null;

    function initialize() {
        $respawn = $('#respawn');

        cu.RunAtInterval(update, 60);
    }

    function update() {
        if (cuAPI.hp) {
            $respawn.fadeOut();
        } else {
            $respawn.fadeIn();
        }
    }

    if (typeof cu !== 'undefined' && typeof cuAPI !== 'undefined') {
        cuAPI.OnInitialized(initialize);
    }
}
