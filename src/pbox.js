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
        templateUrl : null,
        template    : "",
        placement   : "bottom",
        animation   : true,
        popupDelay  : 0,
        triggerClass: 'in',
        openClass   : 'pbox-open',
        closeClass  : 'pbox-close',
        autoClose   : true,
        offset      : 4,
        align       : null
    }

    var tools = {

    }

    $.fn.extend({
        pBox: function (options) {
            var $document = $(document), $body = $(document.body);

            function pBoxFn($element, options) {
                var self = this;
                this.options = $.extend({}, defaults, options);
                ;
                this.$element = $element;
                this.boxElement = null;
                var init = function () {
                    var align = self.$element.attr("data-align") || self.$element.attr("align");
                    if (align !== undefined && align !== null) {
                        self.options.align = align;
                    }
                    var placement = self.$element.attr("data-placement") || self.$element.attr("data-placement");
                    if (placement !== undefined && placement !== null) {
                        self.options.placement = placement;
                    }

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
                    boxElement.find(".close").bind("click",function(){
                        self.close();
                    })

                }

                init();

                return this;
            }

            pBoxFn.prototype.open = function () {
                var pBox = this;
                if (this.$element.hasClass(this.options.openClass)) {
                    this.close();
                } else {
                    var elementTop = this.$element.offset().top,
                        elementLeft = this.$element.offset().left,
                        elementRight = this.$element.offset().right,
                        dicOuterWidth = $document.outerWidth(),
                        dicOuterHeight = $document.outerHeight(),
                        top , left, right, bottom,
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
                            if (pBox.options.align === "left") {
                                left = elementLeft;
                            } else if (pBox.options.align === "right") {
                                left = elementLeft + elementOuterWidth - boxWidth;
                                //right = elementRight - elementOuterWidth;
                            }
                            else {
                                left = elementLeft - boxWidth / 2 + elementOuterWidth / 2;
                            }

                            if(left < 0){
                                left = 4;
                            }
                            if(left + boxWidth > dicOuterWidth){
                                left = undefined;
                                right = 4;
                                //this.boxElement.css("right", 4);
                            }
                            if(top + boxHeight > dicOuterHeight){
                                //this.boxElement.css("bottom", top);
                                top = elementTop - boxHeight - pBox.options.offset;
                            }
                            break;
                        case "top":
                            break;
                        default:
                            break;
                    }

                    if (top !== undefined) {
                        this.boxElement.css("top", top);
                    }
                    if (left !== undefined) {
                        this.boxElement.css("left", left);
                    }
                    if (right !== undefined) {
                        this.boxElement.css("right", right);
                    }

                    this.boxElement.addClass(this.options.openClass);
                    this.boxElement.removeClass(this.options.closeClass);
                    this.$element.addClass(this.options.openClass);

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
                this.$element.removeClass(this.options.openClass);
                this.boxElement.removeClass(this.options.openClass);
                this.boxElement.addClass(this.options.closeClass);

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