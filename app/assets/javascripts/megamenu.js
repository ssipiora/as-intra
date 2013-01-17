// Item Name : Responsive Mega Menu Complete Set
// Item URI : http://codecanyon.net/item/mega-menu-complete-set/152825
// Author URI : http://codecanyon.net/user/Pixelworkshop/
// Version : 3.0



(function ($) {

    var settings = {
        menu_speed_show:300, // Time (in milliseconds) to show a drop down
        menu_speed_hide:200, // Time (in milliseconds) to hide a drop down
        menu_speed_delay:200, // Time (in milliseconds) before showing a drop down
        menu_effect:'hover_fade', // Drop down effect, choose between 'hover_fade', 'hover_slide', 'click_fade', 'click_slide', 'open_close_fade', 'open_close_slide'
        menu_click_outside:0, // Clicks outside the drop down close it (1 = true, 0 = false)
        menu_show_onload:0, // Drop down to show on page load (type the number of the drop down, 0 for none)
        hoverIntentConfig:{ // HoverIntent Configuration
            sensitivity:2, // number = sensitivity threshold (must be 1 or higher)
            interval:100, // number = milliseconds for onMouseOver polling interval
            over:megaMenuOver, // function = onMouseOver callback (REQUIRED)
            timeout:200, // number = milliseconds delay before onMouseOut
            out:megaMenuOut // function = onMouseOut callback (REQUIRED)
        }
    };

    var methods = {
        
        init:function (options) {
            settings = $.extend(1, settings, options);

            if (!($.browser.msie && parseInt($.browser.version) < 9)) {
                $(window).resize(function () {
                    megaMenuDropDownPosition();
                });
            }

            megaMenuDropDownPosition();

            if (settings.menu_click_outside === 1) {
                megaMenuClickOutside();
            }


            return this.each(function () {

                var megaMenu = $(this),
                    menuItem = $(megaMenu).children('li'),
                    menuItemLink = $(menuItem).children('a'),
                    menuDropDown = $(menuItem).find('.dropdown_container, .dropdown_fullwidth'),
                    menuItemFlyOut = $(menuItem).find('.dropdown_parent'),
                    menuItemFlyOutLink = $(menuItemFlyOut).children('a'),
                    menuItemFlyOutDropDown = $(menuItemFlyOut).find('.dropdown_flyout_level');

                menuItemElement = $(menuItem).add(menuItemFlyOut);
                menuDropDownElement = $(menuDropDown).add(menuItemFlyOutDropDown);

                if (Modernizr.touch) {

                    $(menuItemElement).toggleClass('noactive');

                    // Event attached to the link instead of the LI element
                    // to prevent the drop down from being closed if a touch
                    // event occurs within its area.

                    $(menuItemLink).bind('touchstart', function () {
                        var $this = $(this);
                        $this.parent(menuItem).toggleClass('active noactive')
                            .find(menuDropDown).first().toggle(0);
                        // No chaining here, the horizontal and vertical
                        // versions don't use the exact same structure.
                        $this.parent(menuItem).siblings().addClass('noactive').removeClass('active')
                            .find(menuDropDown).hide(0);
                        return false;
                    });

                    $(menuItemFlyOutLink).bind('touchstart', function () {
                        var $this = $(this);
                        $this.parent(menuItemFlyOut)
                            .toggleClass('active noactive')
                            .find(menuItemFlyOutDropDown).first()
                            .toggle(0);
                        $this.parent(menuItemFlyOut).siblings().addClass('noactive').removeClass('active')
                            .find(menuItemFlyOutDropDown).hide(0);
                        $this.parent(menuItemFlyOut).siblings()
                            .find(menuItemFlyOut).addClass('noactive').removeClass('active');
                        return false;
                    });
                    return;

                }

                switch (settings.menu_effect) {

                    case 'open_close_fade':
                    var menuEffectShow = 'fadeToggle',
                        menuEffectHide = 'fadeOut';
                        break;
                    case 'open_close_slide':
                    var menuEffectShow = 'slideToggle',
                        menuEffectHide = 'slideUp';
                        break;
                    case 'open_close_toggle':
                    var menuEffectShow = 'toggle',
                        menuEffectHide = 'hide';
                        break;

                }
                
                switch (settings.menu_effect) {

                    case 'hover_fade':
                    case 'hover_slide':
                    case 'hover_toggle':
                    case 'click_fade':
                    case 'click_slide':
                    case 'click_toggle':
                        $(menuItem).hoverIntent(settings.hoverIntentConfig);
                        $(menuItemFlyOut).hoverIntent(settings.hoverIntentConfig);
                        break;

                    case 'open_close_fade':
                    case 'open_close_slide':
                    case 'open_close_toggle':

                        $('.megamenu > li:nth-child(' + settings.menu_show_onload + ')')
                            .find(menuDropDown).show()
                            .closest(menuItem).toggleClass('active');

                        $(menuItem).unbind('mouseenter mouseleave').click(function () {

                            var $this = $(this);
                            $this.siblings().removeClass('active')
                                .find(menuDropDown)[menuEffectHide](settings.menu_speed_hide);
                            $this.toggleClass('active')
                                .find(menuDropDown).first()
                                .delay(settings.menu_speed_delay)[menuEffectShow](settings.menu_speed_show)
                                .click(function (event) {
                                    event.stopPropagation();
                                });

                        });

                        $(menuItemFlyOut).unbind('mouseenter mouseleave').click(function () {

                            var $this = $(this);
                            $this.siblings().removeClass('active')
                                .find(menuItemFlyOutDropDown)[menuEffectHide](settings.menu_speed_hide);
                            $this.siblings().find('li').removeClass('active');
                            $this.toggleClass('active')
                                .find(menuItemFlyOutDropDown).first()
                                .delay(settings.menu_speed_delay)[menuEffectShow](settings.menu_speed_show)
                                .click(function (event) {
                                    event.stopPropagation();
                                });

                        });

                        break;

                }

            }); // End each

        },

        update:function (options) {
            settings = $.extend(1, settings, options);
        }
    };

    $.fn.megaMenuCompleteSet = function (method) {

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('No found method ' + method);
        }

    };

    function megaMenuOver() {

        var $this = $(this),
            dropDownMega = $('.dropdown_container, .dropdown_fullwidth', $this),
            dropDownFlyOutLevel = $this.children('.dropdown_flyout_level');

        dropDownMega = $(dropDownMega).add(dropDownFlyOutLevel);
        
        switch (settings.menu_effect) {
            case 'hover_fade':
                $(dropDownMega).fadeIn(settings.menu_speed_show);
                $this.hover(function () {
                    $(dropDownMega).fadeOut(settings.menu_speed_hide);
                });
                break;
            case 'hover_slide':
                $(dropDownMega).slideDown(settings.menu_speed_show);
                $this.hover(function () {
                    $(dropDownMega).slideUp(settings.menu_speed_hide);
                });
                break;
            case 'hover_toggle':
                $(dropDownMega).show(settings.menu_speed_show);
                $this.hover(function () {
                    $(dropDownMega).hide(settings.menu_speed_hide);
                });
                break;
            case 'click_fade':
                $this.click(function () {
                    $(dropDownMega).fadeIn(settings.menu_speed_show);
                    $this.hover(function () {
                        $(dropDownMega).fadeOut(settings.menu_speed_hide);
                    });
                });
                break;
            case 'click_slide':
                $this.click(function () {
                    $(dropDownMega).slideDown(settings.menu_speed_show);
                    $this.hover(function () {
                        $(dropDownMega).slideUp(settings.menu_speed_hide);
                    });
                });
                break;
            case 'click_toggle':
                $this.click(function () {
                    $(dropDownMega).show(settings.menu_speed_show);
                    $this.hover(function () {
                        $(dropDownMega).hide(settings.menu_speed_hide);
                    });
                });
                break;

        }

    }

    function megaMenuOut() {
        $('.dropdown_container, .dropdown_fullwidth, .dropdown_flyout_level', this).hide();
    }

    function megaMenuClickOutside() {

        $(document).click(function () {
            $('.megamenu > li').removeClass('active');
            $('.dropdown_flyout li').removeClass('active');
            $('.dropdown_container, .dropdown_fullwidth, .dropdown_flyout_level').hide(0);
        });

        $('.megamenu').click(function (event) {
            event.stopPropagation();
        });
        if (Modernizr.touch) {
            $(document).click(function () {
                $('.megamenu > li, .dropdown_flyout li').addClass('noactive');
            });
            $(window).bind('orientationchange', function () {
                $('.megamenu > li, .dropdown_flyout li').addClass('noactive');
            });
        }

    }

    function megaMenuDropDownPosition() {

        // This part uses CSS so the drop downs remain opened when using the effects
        // 'open_close_fade', 'open_close_slide' and 'open_close_fade'.
        // Without those top and left values, the drop downs would be hidden
        // when not hovered.

        if ($(window).width() < 767) {
            $('.dropdown_container, .dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();
            $('.dropdown_first').css({'left':'0', 'top':'auto'}).hide();
            $('.dropdown_flyout_level, .dropdown_flyout_level_left').css({'left':'0', 'top':'0'}).hide();
        }
        else {
            $('.dropdown_container').css({'left':'auto', 'top':'auto'}).hide();
            $('.dropdown_fullwidth').css({'left':'-1px', 'top':'auto'}).hide();
            $('.dropdown_flyout_level').css({'left':'95%', 'top':'-21px'}).hide();
            $('.dropdown_flyout_level_left').css({'left':'-108%', 'right':'100%'}).hide();
        }
        $('.megamenu_container_vertical').find('.dropdown_container, .dropdown_fullwidth').css({'top':'0'});

    }

})(jQuery);