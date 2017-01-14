// ==UserScript==
// @name         vonClownstick
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Making news less depressing!
// @author       Frank M.G. Jørgensen
// @match        http://*/*
// @match        https://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var replaceArray = [
        [/@realdonaldtrump/gi,  '@shitforbrains'],
        [/Melania Trump/gi,  'Goldigia von Clownstick'],
        [/Donald J. Trump/gi,   'Farty McFuckface'],
        [/Donald Trump/gi,    'Fuckface von Clownstick'],
        [/President Trump/gi,          'President Lying McBastard'],
        [/Trump Tower/gi,  'Golden Shower Tower'],
        [/Trump/gi,            'von Clownstick'],
        // etc.
    ];
    var numTerms    = replaceArray.length;
    var txtWalker   = document.createTreeWalker (
        document.body,
        NodeFilter.SHOW_TEXT,
        {   acceptNode: function (node) {
            //-- Skip whitespace-only nodes
            if (node.nodeValue.trim() )
                return NodeFilter.FILTER_ACCEPT;

            return NodeFilter.FILTER_SKIP;
        }
        },
        false
    );
    var txtNode     = null;

    while (txtNode  = txtWalker.nextNode () ) {
        var oldTxt  = txtNode.nodeValue;

        for (var i  = 0;  i < numTerms;  i++) {
            oldTxt  = oldTxt.replace (replaceArray[i][0], replaceArray[i][1]);
        }
        txtNode.nodeValue = oldTxt;
    }
})();
