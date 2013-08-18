/*!
 * pbox jQuery Plug v1.0.0
 * https://github.com/why520crazy/pbox
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Plug
 *
 * Date: 2013-08-18
 */
(function ($) {
    "use strict";

    var defaults = {
        templateUrl    : null,
        template       : "",
        placement      : "bottom",
        animation      : true,
        popupDelay     : 0,
        triggerClass   : 'in',
        popboxOpenClass: 'pbox-open',
        autoClose      : true,
        offset         : 4
    }

    var tools = {

    }

    $.fn.extend({
        pBox: function (options) {
            var options = $.extend({}, defaults, options);
            var $document = $(document), $body = $(document.body);

            function pBoxFn($element, options) {
                var self = this;
                this.options = options;
                this.$element = $element;
                this.pBox = null;
                var init = function () {
                    var template = "";
                    if (!$.isEmptyObject(options.template)) {
                        template = options.template;
                    } else if (!$.isEmptyObject(options.templateUrl)) {
                        //TODO get template by url
                        template = "URL";
                        $.get(options.templateUrl, function (data) {
                        })
                    } else {
                        throw new Error("template ");
                    }
                    var pBox = $("<div class='pbox'></div>");
                    pBox.append(template);
                    $body.append(pBox);
                    self.pBox = pBox;
                    $element.bind("click.pbox", function () {
                        self.open();
                    })
                }

                init();

                return this;
            }

            pBoxFn.prototype.open = function () {
                if (this.$element.hasClass("open")) {
                    this.close();
                } else {
                    var top = this.$element.offset().top,
                        left = this.$element.offset().left,
                        elementOuterWidth = this.$element.outerWidth(),
                        elementOuterHeight = this.$element.outerHeight(),
                        boxWidth = this.pBox.outerWidth(true),
                        boxWidth = this.pBox.outerWidth(true);
                    //elementWidth = this.$element.width(),
                    //elementHeight = this.$element.height(),
                    //X = this.$element.position().top,
                    //Y = this.$element.position().left;
                    switch (this.options.placement) {
                        case "bottom":
                            this.pBox.css("top", (top + elementOuterHeight + this.options.offset) + "px");
                            this.pBox.css("left", left);
                            break;
                        case "top":
                            break;
                        default:
                            break;
                    }

                    this.pBox.addClass("open");
                    this.pBox.removeClass("close");
                    this.$element.addClass("open");
                    //this.$element.removeClass("close");
                }
            }

            pBoxFn.prototype.close = function () {
                this.$element.removeClass("open");
                //this.$element.addClass("close");
                this.pBox.removeClass("open");
                this.pBox.addClass("close");
            }

            pBoxFn.prototype.destroy = function () {

            }


            return this.each(function () {
                var $element = $(this);
                return new pBoxFn($element, options);
            });
        }
    });
})(jQuery);