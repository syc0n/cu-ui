/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

module BuildActions {
    var $commit = $('#btn-commit');
    $commit.addClass('add-btn');
    var $cancel = $('#btn-cancel');
    var $rotateX = $('#btn-rotate-x');
    var $rotateY = $('#btn-rotate-y');
    var $rotateZ = $('#btn-rotate-z');
    var $flipX = $('#btn-flip-z');
    var $flipY = $('#btn-flip-y');
    var $flipZ = $('#btn-flip-z');

    $commit.click(() => {
        cu.CommitBlock();
        $commit.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $commit.find('.button-active').remove();
        }, 1000);
    });

    $cancel.click(() => {
        cu.CancelBlockPlacement();
        $cancel.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $cancel.find('.button-active').remove();
        }, 1000);
    });

    $rotateX.click(() => {
        cu.BlockRotateX();
        $rotateX.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $rotateX.find('.button-active').remove();
        }, 1000);
    });

    $rotateY.click(() => {
        cu.BlockRotateY();
        $rotateY.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $rotateY.find('.button-active').remove();
        }, 1000);
    });

    $rotateZ.click(() => {
        cu.BlockRotateZ();
        $rotateZ.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $rotateZ.find('.button-active').remove();
        }, 1000);
    });

    $flipX.click(() => {
        cu.BlockFlipX();
        $flipX.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $flipX.find('.button-active').remove();
        }, 1000);
    });

    $flipY.click(() => {
        cu.BlockFlipY();
        $flipY.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $flipY.find('.button-active').remove();
        }, 1000);
    });

    $flipZ.click(() => {
        cu.BlockFlipZ();
        $flipZ.append($('<img/>').addClass('button-active').attr('src', '../images/skillbar/active-frame.gif'));
        setTimeout(() => {
            $flipZ.find('.button-active').remove();
        }, 1000);
    });

    cu.Listen('HandleBuildingModeChanged', buildingMode => {
        if (buildingMode == BuildUIMode.SelectingBlock) {
            $commit.removeClass('add-btn');
            if (!$commit.hasClass('remove-btn')) {
                $commit.addClass('remove-btn');
            }
        } else if (buildingMode == BuildUIMode.PlacingPhantom) {
            $commit.removeClass('remove-btn');
            if (!$commit.hasClass('add-btn')) {
                $commit.addClass('add-btn');
            }
        }
    });
}