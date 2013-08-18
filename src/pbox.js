/*

*/
(function ($) {
    $.fn.extend({
        pBox: function (options) {
            var defaults = {
                templateUrl: null,
                template: "",
                placement: "bottom",
                animation: true,
                popupDelay: 0,
                triggerClass: 'in',
                popboxOpenClass: 'pbox-open',
            }

            var options = $.extend(defaults, options);

            var element = $(this);
            if (element.hasClass("open")) {
                $(".pbox").remove();
                element.removeClass("open");
            } else {
                var top = element.offset().top;
                var left = element.offset().left;
                var elementWidth = element.width();
                var elementHeight = element.height();
                //:
                var X = element.position().top;
                var Y = element.position().left;

                // get template
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
                $(body).append(pBox);
                pBox.addClass("open");
                element.addClass("open");
                var boxWidth = pBox.outerWidth(true);
                var boxWidth = pBox.outerWidth(true);
                switch (options.placement) {
                    case "bottom":
                        pBox.css("top", (top + elementHeight + 10) + "px");
                        pBox.css("left", left);
                        break;
                    case "top":
                        break;
                    default:
                        break;
                }
               
                
            }
           
            //return this.each(function () {

            //});
        }
    });
})(jQuery);