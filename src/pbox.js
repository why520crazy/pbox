﻿/*!
 * pbox jQuery Plug v1.0.0
 * https://github.com/why520crazy/pbox
 *
 * Copyright 2013 jQuery Plug
 *
 * Date: 2013-08-18
 */
(function ($) {
    "use strict";

    var defaults = {
        remoteUrl: null,
        content: "",
        placement: "bottom",
        animation: false,
        delay: 0,
        openClass: 'pbox-open',
        closeClass: 'pbox-close',
        autoClose: true,
        offset: 4,
        align: null,
        drag: true,
        destroy: true
        },
        $document = $(document), $body = $(document.body), $currentBox,
        dragParams = {
            left: 0,
            top: 0,
            currentX: 0,
            currentY: 0,
            flag: false
        };

    function pBoxFn($element, options) {
        var self = this;
        this.options = $.extend({}, defaults, options);
        this.$element = $element;
        this.$boxElement = null;

        this.init();
        if (self.options.destroy !== true) {
            this.initBox();
            this.initDrag();
        }

        return this;
    }

    pBoxFn.prototype.init = function () {
        var self = this;
        //根据标签语言设置options
        var align = this.$element.attr("data-align") || this.$element.attr("align");
        if (align !== undefined && align !== null) {
            this.options.align = align;
        }
        var placement = this.$element.attr("data-placement") || this.$element.attr("data-placement");
        if (placement !== undefined && placement !== null) {
            this.options.placement = placement;
        }

        this.$element.bind("click.pbox", function () {
            if (self.$element.hasClass(self.options.openClass)) {
                self.close();
            }
            else {
                self.open();
            }
        })

    };

    pBoxFn.prototype.initBox = function () {
        var self = this;
        //获取模板内容
        var template = "";
        if (!$.isEmptyObject(this.options.content)) {
            template = this.options.content;
        } else if (!$.isEmptyObject(this.options.remoteUrl)) {
            //TODO get template by url
            template = "URL";
            $.get(this.options.remoteUrl, function (data) {
            })
        } else {
            throw new Error("template ");
        }
        var $boxElement = $("<div class='pbox'></div>");
        $boxElement.append(template);
        $body.append($boxElement);
        this.$boxElement = $boxElement;
        this.$boxElement.find(".close").bind("click", function () {
            self.close();
        })
    };

    pBoxFn.prototype.initDrag = function () {
        var $boxElement = this.$boxElement, options = this.options;
        if (!options.drag) {
            return;
        }
        //拖拽
        var $pBoxHeader = $boxElement.find(".pbox-header");
        if ($pBoxHeader.length < 0) {
            return;
        }
        $pBoxHeader.css({cursor: "move"});

        $pBoxHeader.bind("mousedown", function (event) {
            dragParams.flag = true;
            $currentBox = $boxElement;
            var e = event;
            dragParams.currentX = e.clientX;
            dragParams.currentY = e.clientY;
            dragParams.left = $boxElement.offset().left;
            dragParams.top = $boxElement.offset().top;
        });

        $document.bind("mouseup", function (event) {
            dragParams.flag = false;
            dragParams.left = $boxElement.offset().left;
            dragParams.top = $boxElement.offset().top;
        });

        $document.bind("mousemove", function (event) {
            var e = event ? event : window.event;
            if (dragParams.flag) {
                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                var nowX = e.clientX, nowY = e.clientY;
                var disX = nowX - dragParams.currentX, disY = nowY - dragParams.currentY;
                $currentBox.css("left", parseInt(dragParams.left) + disX + "px");
                $currentBox.css("top", parseInt(dragParams.top) + disY + "px");
                return event.preventDefault();
            }
        });
    };

    pBoxFn.prototype.open = function () {
        var pBox = this;

        //初始化模板
        if (this.options.destroy) {
            this.initBox();
            this.initDrag();
        }
        var elementTop = this.$element.offset().top,
            elementLeft = this.$element.offset().left,
            elementRight = this.$element.offset().right,
            dicOuterWidth = $document.outerWidth(),
            dicOuterHeight = $document.outerHeight(),
            top , left, right, bottom,
            elementOuterWidth = this.$element.outerWidth(),
            elementOuterHeight = this.$element.outerHeight(),
            boxWidth = pBox.$boxElement.outerWidth(true),
            boxHeight = pBox.$boxElement.outerHeight(true);
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

                if (left < 0) {
                    left = 4;
                }
                if (left + boxWidth > dicOuterWidth) {
                    left = dicOuterWidth - boxWidth - 4;
                    //this.$boxElement.css("right", 4);
                }
                if (top + boxHeight > dicOuterHeight) {
                    //this.$boxElement.css("bottom", top);
                    top = elementTop - boxHeight - pBox.options.offset;
                }
                break;
            case "top":
                top = elementTop - boxHeight - this.options.offset;
                left = elementLeft;
                if (pBox.options.align === "left") {
                    left = elementLeft;
                } else if (pBox.options.align === "right") {
                    left = elementLeft + elementOuterWidth - boxWidth;
                }
                else {
                    left = elementLeft - boxWidth / 2 + elementOuterWidth / 2;
                }

                if (left < 0) {
                    left = 4;
                }
                if (left + boxWidth > dicOuterWidth) {
                    left = dicOuterWidth - boxWidth - 4;
                    //this.$boxElement.css("right", 4);
                }
                break;
            default:
                break;
        }

        if (top !== undefined) {
            this.$boxElement.css("top", top);
        }
        if (left !== undefined) {
            this.$boxElement.css("left", left);
        }
        if (right !== undefined) {
            this.$boxElement.css("right", right);
        }

        if (this.options.animation === true) {
            pBox.$boxElement.slideToggle("normal");
        } else {
            this.$boxElement.addClass(this.options.openClass);
            this.$boxElement.removeClass(this.options.closeClass);
        }
        this.$element.addClass(this.options.openClass);

        if (this.options.autoClose === true) {
            this.$element.bind("mousedown.pbox", function (event) {
                event.stopPropagation();
            });

            $document.bind("mousedown.pbox", function (event) {
                pBox.close();
            });

            pBox.$boxElement.bind("mousedown.pbox", function (event) {
                event.stopPropagation();
            });
        }
    };

    pBoxFn.prototype.close = function () {
        this.$element.removeClass(this.options.openClass);
        if (this.options.animation === true) {
            this.$boxElement.slideToggle();
            //this.$boxElement.removeClass(this.options.openClass);
            //this.$boxElement.addClass(this.options.closeClass);

        } else {
            this.$boxElement.removeClass(this.options.openClass);
            this.$boxElement.addClass(this.options.closeClass);
        }

        if (this.options.autoClose) {
            this.$element.unbind("mousedown.pbox");
            $document.unbind("mousedown.pbox");
            this.$boxElement.unbind("mousedown.pbox");
        }

        if (this.options.destroy) {
            this.destroy();
        }
    };

    pBoxFn.prototype.destroy = function () {
        this.$boxElement.remove();
    };

    $.fn.pBox = $.fn.pbox = function (options) {
        return this.each(function () {
            var $element = $(this);
//            var pbox = $element.data("pbox");
//            if(pbox){
//                return pbox;
//            }
            return new pBoxFn($element, options);
        });
    };
})(jQuery);