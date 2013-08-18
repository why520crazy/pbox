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
        offset         : 4,
        align          : null
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
                this.boxElement = null;
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
                    var boxElement = $("<div class='pbox'></div>");
                    boxElement.append(template);
                    $body.append(boxElement);
                    self.boxElement = boxElement;
                    $element.bind("click.pbox", function () {
                        self.open();
                    })
                }

                init();

                return this;
            }

            pBoxFn.prototype.open = function () {
                var pBox = this;
                if (this.$element.hasClass("open")) {
                    this.close();
                } else {
                    var elementTop = this.$element.offset().top,
                        elementLeft = this.$element.offset().left,
                        elementRight = this.$element.offset().right,
                        top , left,
                        elementOuterWidth = this.$element.outerWidth(),
                        elementOuterHeight = this.$element.outerHeight(),
                        boxWidth = pBox.boxElement.outerWidth(true),
                        boxHeight = pBox.boxElement.outerHeight(true);
                    //elementWidth = this.$element.width(),
                    //elementHeight = this.$element.height(),
                    //X = this.$element.position().top,
                    //Y = this.$element.position().left;
                    switch (this.options.placement) {
                        case "bottom":
                            top = elementTop + elementOuterHeight + this.options.offset;
                            if (options.align === "left") {
                                left = elementLeft;
                            } else if (options.align === "right") {
                                left = elementLeft;
                            }
                            else {
                                left = elementLeft - boxWidth / 2 + elementOuterWidth / 2;
                            }
                            if(top > 0)
                            this.boxElement.css("top", top);
                            this.boxElement.css("left", left);
                            break;
                        case
                        "top"
                        :
                            break;
                        default:
                            break;
                    }

                    this.boxElement.addClass("open");
                    this.boxElement.removeClass("close");
                    this.$element.addClass("open");
                    //this.$element.removeClass("close");

                    if (this.options.autoClose === true) {
                        this.$element.bind("mousedown.pbox", function (event) {
                            event.stopPropagation();
                        });

                        $document.bind("mousedown.pbox", function (event) {
                            pBox.close();
                        });

                        pBox.boxElement.bind("mousedown.pbox", function (event) {
                            event.stopPropagation();
                        });
                    }
                }
            }

            pBoxFn.prototype.close = function () {
                this.$element.removeClass("open");
                //this.$element.addClass("close");
                this.boxElement.removeClass("open");
                this.boxElement.addClass("close");

                if (this.options.autoClose === true) {
                    this.$element.unbind("mousedown.pbox");
                    $document.unbind("mousedown.pbox");
                    this.boxElement.unbind("mousedown.pbox");
                }
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